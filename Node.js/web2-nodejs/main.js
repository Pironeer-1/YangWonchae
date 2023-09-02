const http = require('http');
const fs = require('fs');
const url = require('url');
const app = http.createServer(function(request, response) {
    let _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    let title = queryData.id;

    if(pathname === '/') {
        if(queryData.id === undefined) {
            fs.readdir('./data', function(error, filelist) {
                const title = 'Welcome';
                desctiption = 'Hello, Node.js';
                let list = '<ul>';
                let i = 0;
                while(i < filelist.length) {
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + '</ul>';
                const template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${desctiption}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                let list = '<ul>';
                let i = 0;
                while(i < filelist.length) {
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + '</ul>';
                fs.readFile(`data/${queryData.id}`, 'utf8', function(error, description) {
                    const template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);