/**
 * Created by lotuslwb on 17/9/7.
 */
function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}


var utils = {
    sendData: sendData
}

module.exports = utils;