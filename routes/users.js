var express = require('express');
var router = express.Router();

var path = require('path');

var utils = require('../commons/utils');
var sendData = utils.sendData;
var connection = require('../data/connectSQL')();


/* 认证用户psw */
router.post('/getPSWAuth', function (req, res, next) {
    var psw = req.body.psw;
    var openId = req.body.openId
    connection.query("SELECT * FROM `user` WHERE openId='" + openId + "'", function (err, rows, fields) {
        if (err) throw err;

        if (rows.length <= 0) {
            //新建用户
            var post = {openId: openId, psw: psw};
            connection.query('INSERT INTO `user` SET ?', post, function (error, results, fields) {
                if (error) throw error;
                res.send(sendData('200', true, ''));
            });

        } else {
            //验证密码
            res.send(sendData('200', (psw == rows[0].psw), ''));
        }
    });

});


module.exports = router;
