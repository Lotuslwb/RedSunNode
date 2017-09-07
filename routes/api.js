var express = require('express');
var router = express.Router();

var utils = require('../commons/utils');

var sendData = utils.sendData;

/* GET home page. */
router.get('/file/getImageList', function (req, res, next) {
    var fs = require('fs');
    var path = require('path');
    var picPath = path.join(__dirname + '/../public/pic');
    var picdir = fs.readdir(picPath, function (err, files) {
        if (err) {
            console.error(err);
            return;
        } else {
            res.send(sendData('200', {list: files}, ''));
        }
    })

});


module.exports = router;
