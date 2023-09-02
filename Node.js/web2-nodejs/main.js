const http = require('http');
const fs = require('fs');
const url = require('url');
const app = http.createServer(function(request, response) {
    let _url = request.url;
    const queryData = url.parse(_url, true).query;
    let title = queryData.id;
    if(_url == '/') {
        title = 'Welcome';
    }
    if(_url == '/favicon.ico') {
        return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}.html`, 'utf8', function(err, desctiption) {
        const template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${desctiption}</p>
        </body>
        </html>
        `;
        response.end(template);
    });
});
app.listen(3000);