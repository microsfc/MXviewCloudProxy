module.exports = function(mongoose) {

    var dbURI = 'mongodb://localhost:27017/test';
    var connection = mongoose.createConnection(dbURI, { server: { poolSize: 5} });

    //when successfully connected
    connection.on('connected', function () {
        console.log('Mongoose connection open to ' + dbURI);

    });

    // If the connection throws an error
    connection.on('disconnected', function (err) {
       console.log('Mongoose default connection error: ' + err);
    });

    //when the connection is disconnected
    connection.on('', function (){
        console.log('Mongoose the connection disconnected');
    });

    process.on('SIGINT', function (){

        connection.close( function() {
            console.log('Mongoose the connection disconnected through app termination');
        });
    });

    return connection;
}