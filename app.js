const express = require('express');
const http = require('http');
const path = require('path');

let app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/jsonp', function(req, res) {
    res.jsonp({
        name: 'JamesYin',
        number: req.query.number || '666'
    });
});

let server = http.createServer(app);

server.listen(3011);
