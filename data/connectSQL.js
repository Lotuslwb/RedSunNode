var mysql = require('mysql');

function connectSQL() {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'RedSun91'
    });
    connection.connect();
    return connection;
}


module.exports = connectSQL;



