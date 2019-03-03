var http = require('http'),
  httpProxy = require('http-proxy');

const intoStream = require('into-stream');
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if(req.headers.referer) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        console.log(body);

        body = body.replace(/(gender.*?)(=|:.?")(male|female|M|F|man|woman)/g, function (match, p1, p2, p3, offset, string) {
          return p1 + p2 + "X";
        });
        console.log(body);
        req.rawBody = body;
        proxy.web(req, res, {
          target: req.headers.referer,
          buffer: intoStream(req.rawBody)
        });
      });

    } else {
      proxy.web(req, res, {target: req.headers.referer});
    }
  }
  else {
    res.end('malformed proxy req');
  }
});

console.log("listening on port 7754");
server.listen(7754);
