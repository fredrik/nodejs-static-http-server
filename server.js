var sys         = require('sys'),
    path        = require('path'),
    http        = require('http'),
    paperboy    = require('paperboy')

var PUBLIC = path.join(path.dirname(__filename), 'public');


http.createServer(function(req, res) {
  paperboy
    .deliver(PUBLIC, req, res)
    .after(function(status_code) {
      sys.log('Served Request: ' + status_code + ' ' + req.url)
    })
    .otherwise(function() {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
    });
}).listen(8000, '127.0.0.1');

sys.log('ready at http://localhost:8000/')
