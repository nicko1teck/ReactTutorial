const http = require('http');


const server = http.createServer((request,response) => {


    const book = {
        author: 'charles dick',
        title: 'mid-level aspirations',
    }


    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(book));
    response.end();

});

server.listen(8000);