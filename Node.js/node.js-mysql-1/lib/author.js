const db = require('./db.js');
const template = require('./template.js');
const url = require('url');
var qs = require('querystring');

module.exports = {
    home: function(request, response) {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            db.query(`SELECT * FROM author`, function(error2, authors) {
                const title = 'author';
                const list = template.list(topics);
                const html = template.HTML(title, list,
                    `
                    ${template.authorTable(authors)}
                    <style>
                        table {
                            border-collapse: collapse;
                        }
                        td {
                            border: 1px solid black;
                        }
                    </style>
                    <form action="/author/create_process" method="post">
                        <p>
                            <input type="text" name="name" placeholder="name">
                        </p>
                        <p>
                            <textarea name="profile" placeholder="description"></textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `,
                    ``
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    },
    create_process: function(request, response) {
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            db.query(`
            INSERT INTO author(name, profile)
            VAlUES(?, ?)`,
            [post.name, post.profile],
            function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/author`});
                response.end();
            })
        })
    }
}