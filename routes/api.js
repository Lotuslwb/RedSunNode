var express = require('express');
var router = express.Router();

var path = require('path');

var utils = require('../commons/utils');
var sendData = utils.sendData;

/* 获取图片列表 */
router.get('/file/getImageList', function (req, res, next) {
    var fs = require('fs');

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


/*上传图片*/
router.post('/file/uploadImage', function (req, res, next) {
    console.log(req);
    var multiparty = require('multiparty');
    var fs = require('fs');

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/pic/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            res.send(sendData('999', err, '上传错误'));
        } else {
            var name = files.pic[0].path;
            res.send(sendData('200', path.basename(name), ''));
        }

    });
});


module.exports = router;
