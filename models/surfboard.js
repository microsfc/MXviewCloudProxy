var mongoose = require('mongoose');

module.exports = function(connection) {
    var Schema = mongoose.Schema;

    var surfboardSchema = new Schema({
        name: String,
        type: String,
        length: String
    });

    connection.model('SurfBoard', surfboardSchema);
    var SurfBoard = connection.model('SurfBoard');

    return SurfBoard;
}


/*var mongoose = require('mongoose');

 var Schema = mongoose.Schema;

 var surfboardSchema = new Schema({
 name: String,
 type: String,
 length: String
 });

 mongoose.model('SurfBoard', surfboardSchema);
 var SurfBoard = mongoose.model('SurfBoard');

 module.exports = SurfBoard;*/