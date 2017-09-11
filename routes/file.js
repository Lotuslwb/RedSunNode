var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs-extra');
var path = require('path');

var utils = require('../commons/utils');
var sendData = utils.sendData;

var connection = require('../data/connectSQL')();


/* 获取图片列表 */
router.get('/getImageList', function (req, res, next) {

    var openId = req.query.openId;

    connection.query("SELECT * FROM `image` WHERE openId='" + openId + "'", function (err, rows, fields) {
        if (err) throw err;
        res.send(sendData('200', rows, ''));
    });
});


/*上传图片*/
router.post('/uploadImage', function (req, res, next) {

    var openId = req.query.openId;

    var picPath = './public/pic/' + openId + '/';

    fs.ensureDir(picPath, function (err) {
        if (err) throw err;

        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form({uploadDir: picPath});
        //上传完成后处理
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.send(sendData('999', err, '上传错误'));
                return false;
            }
            var name = files.pic[0].path;
            var imageName = path.basename(name);
            var imagePath = '/pic/' + openId + '/';

            connection.query("select max(imageId) from `image`", function (err, rows, fields) {
                if (err) throw err;
                var nextImageId = rows[0]['max(imageId)'] * 1 + 1;
                //将新图片插入数据库
                var newImage = {openId: openId, imageId: nextImageId, imageName: imageName, imagePath: imagePath};
                connection.query('INSERT INTO `image` SET ?', newImage, function (error, results, fields) {
                    if (error) throw error;
                    res.send(sendData('200', newImage, ''));
                });
            })

        });
    });
    
});


module.exports = router;
