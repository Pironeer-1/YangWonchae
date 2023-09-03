const mysql = require('mysql2');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'ywonchae1',
    password: 'ywonchae1',
    database: 'opentutorials',
    port: 3306
});

// connection.connect();
connection.query('SHOW DATABASES;', function (error, results) {
    console.log(results);
});
connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

// connection.end();