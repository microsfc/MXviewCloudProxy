var mongoose = require('mongoose');

module.exports = function(connection) {
    var Schema = mongoose.Schema;

    var accessorySchema = new Schema ({
        name:String,
        quantity:String
    });

    var Accessory = connection.model('Accessory', accessorySchema);

    return Accessory;
}