const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'ywonchae1',
    password: 'ywonchae1',
    database: 'opentutorials',
    port: 3306,
    multipleStatements: true
});
module.exports = db;