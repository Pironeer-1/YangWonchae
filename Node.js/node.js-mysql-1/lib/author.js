const db = require('./db.js');
const template = require('./template.js');
const url = require('url');
var qs = require('querystring');

module.exports = {
    home: function(request, response) {
        db.query(`SELECT * FROM author`, function(error, authors) {
            
        });
    }
}