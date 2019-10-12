const express = require('express');
const fs = require('fs');
const https = require('https');
const request = require('request');

const servers=['http://localhost:8080','http://192.168.43.104:8080'];
let cur=0;

var getIP = require('ipware')().get_ip;
const handler=(req,res) =>{
//console.log(req);
//req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
 //cur = (cur + 1) % servers.length;
}
function getClientIp(req) {
    var ipAddress;
    // The request may be forwarded from local web server.
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
      // 'x-forwarded-for' header may return multiple IP addresses in
      // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
      // the first one
      var forwardedIps = forwardedIpsStr.split(',');
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      // If request was not forwarded
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
  };
const profilerMiddleware = (req, res, next) => {
  //console.log(req);
  //req.get({url: 'http://localhost:8080', headers: req.headers});
  //processRequest(req);
  //res.setHeader('Content-Type', 'application/json');
  //res.send('Req OK');
  //res.redirect(servers[0]);
  //next();
  //var ipInfo = getIP(req);
  //console.log(getClientIp(req));
  //var k=getClientIp(req);
  //console.log(k);
  //var words=k.split('.');
  //console.log(words[3]);
  
  req.pipe(request({ url: servers[0] + req.url })).pipe(res);
  //console.log(getClientIp(req));
  //console.log(req.connection.remoteAddress);
  next();
  //cur = (cur + 1) % servers.length;
};



const app = express();
  // Use `express-sslify` to make sure _all_ requests use HTTPS
  //use(require('express-sslify').HTTPS()).
  app.use(profilerMiddleware);
  app.get('*', handler);
  app.post('*', handler);

app.listen(112,() => {
	console.log("server is running");
});

// Start an HTTPS server with some self-signed keys

//https.createServer(app).listen(443);

const localtunnel = require('localtunnel');

(async() => {
	const tunnel = await localtunnel(112, { subdomain: 'hello12345'} );

console.log(tunnel.url);
tunnel.on('close', function() {
    console.log("tunnel closed");
});
})();
