module.exports = function(connection) {

    var User = require('./user')(connection);
    var Accessory = require('./accessory')(connection);
    var SurfBoard = require('./surfboard')(connection);

    return {
        user: User,
        accessory: Accessory,
        surfboard: SurfBoard
    }

}