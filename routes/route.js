module.exports = function(app, models) {

    var api = require('./api.js')(models);
    var pushComm = require('./mxview_agent.js')(models);
    var web_api = require('./web_api.js');

    app.get('/goform/link', web_api.web_api_getlink_summary);
    app.get('/goform/device', web_api.web_api_getdevice_summary);

    app.get('/getdeviceresult', web_api.getdevice_summary);
    app.get('/getlinkresult', web_api.getlink_summary);
    app.get('/PushFromMXview', pushComm.getMXviewData);
    app.get('/update/surfboard', api.updateSurfBoard);
    app.post('/add/surfboard', api.createSurfboard);
    app.get('/publish', web_api.getMXview_License);
    app.get('/getMessage', api.subscribeMessage);

}