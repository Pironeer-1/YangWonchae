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
            });
        });
    },
    update: function(request, response) {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            db.query(`SELECT * FROM author`, function(error2, authors) {
                const _url = request.url;
                const queryData = url.parse(_url, true).query;
                db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function(error3, author) {
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
                        <form action="/author/update_process" method="post">
                            <p>
                                <input type="hidden" name="id" value=${author[0].id}>
                            </p>
                            <p>
                                <input type="text" name="name" placeholder="name" value=${author[0].name}>
                            </p>
                            <p>
                                <textarea name="profile" placeholder="description">${author[0].profile}</textarea>
                            </p>
                            <p>
                                <input type="submit" value="update">
                            </p>
                        </form>
                        `,
                        ``
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        });
    },
    update_process: function(request, response) {
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            db.query(`
            UPDATE author
            SET name=?, profile=?
            WHERE id=?`,
            [post.name, post.profile, post.id],
            function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/author`});
                response.end();
            });
        });
    },
    delete_process: function(request, response) {
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            db.query(`
            DELETE FROM topic WHERE author_id=?`,
            [post.id],
            function(error1, result) {
                if(error1) {
                    throw error;
                }
                db.query(`
                DELETE FROM author WHERE id=?`,
                [post.id],
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    response.writeHead(302, {Location: `/author`});
                    response.end();
                });
            });
        });
    }
}