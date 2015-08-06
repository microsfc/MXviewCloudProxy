var GETLICENSE = '/goform/license?action=get';
var GETDEVICE_SUMMARY = '/goform/device?action=severity_summary&user_name=admin&password=';

function web_API_URL() {
    console.log('construct mqTopic');
};

web_API_URL.prototype.getLicenseURL = function() {
    return GETLICENSE;
};

web_API_URL.prototype.getDeviceSummary = function() {
    return GETDEVICE_SUMMARY;
};

module.exports = web_API_URL;