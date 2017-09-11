var connection = require('./connectSQL')();
connection.query("select max(imageId) from `image`", function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});