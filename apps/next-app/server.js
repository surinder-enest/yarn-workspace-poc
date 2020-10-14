const http = require('http');
const https = require('https');
const fs = require('fs');
const tls = require('tls');
const { parse } = require('url');
const next = require('next');

const dev = false; //process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const privateKey = fs.readFileSync('../../../Certificates/s.mobilepages.co.privatekey.pem', 'utf8');
const certificate = fs.readFileSync('../../../Certificates/s.mobilepages.co.cert.pem', 'utf8');
const ca = fs.readFileSync('../../../Certificates/s.mobilepages.co.chain.pem', 'utf8');

try {
  var options = {
    SNICallback: function(domain, cb) {
      const fileNames = getCertificateFileNames(domain);
      console.log(domain);
      const certFileName = fileNames.cert;
      const certPrivateKey = fileNames.privateKey;
      const certChain = fileNames.chain;

      var exists = fs.existsSync(certFileName);

      try {
        if (exists) {
          if (cb) {
            // console.log("null domain")
            cb(
              null,
              tls.createSecureContext({
                key: fs.readFileSync(certPrivateKey, 'utf8'),
                cert: fs.readFileSync(certFileName, 'utf8'),
                ca: fs.readFileSync(certChain, 'utf8'), // this ca property is optional
              })
            );
          } else {
            // console.log("compatibility domain")
            // compatibility for older versions of node
            return tls.createSecureContext({
              key: fs.readFileSync(certPrivateKey, 'utf8'),
              cert: fs.readFileSync(certFileName, 'utf8'),
              ca: fs.readFileSync(certChain, 'utf8'), // this ca property is optional
            });
          }
        } else {
          console.log('NO certificate found');
          //throw new Error('No keys/certificates for domain requested');
          return null;
        }
      } catch (ex) {
        console.log('error in getting certificate details');
        console.log(ex);
        return null;
      }
    },
    // must list a default key and cert because required by tls.createServer()
    key: privateKey,
    cert: certificate,
    agent: new https.Agent({
      keepAlive: true,
    }),
    ca: ca,
    minVersion: 'TLSv1',
    maxVersion: 'TLSv1.3',
  };

  app.prepare().then(() => {
    https
      .createServer(options, function(req, res) {
        //res.end('Your dynamic SSL server worked!')
        // Here you can put proxy server routing here to send the request
        // to the application of your choosing, running on another port.
        // node-http-proxy is a great npm package for this

        handleRequest(app, req, res);
      })
      .listen(443, () => {
        console.log('HTTPs Server running on port 443');
      });

    const httpServer = http.createServer(app, function(req, res) {
      handleRequest(app, req, res);
    });
    httpServer.listen(80, () => {
      console.log('HTTP Server running on port 80');
    });
  });
} catch (err) {
  console.log('error');
  console.error(err.message);
  console.error(err.stack);
}

function handleRequest(app, req, res) {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;
  if (pathname === '/testconnection') {
    res.end('OK');
  } else {
    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }
}

//GET CERTIFICATE FILE NAME
function getCertificateFileNames(domain) {
  //DOMAIN WITHOUT www
  //WE WILL SAVE CERTIFICATE WITHOUT WWW SO WE ALWAYS HAVE
  //1 CERTIFICATE THAT WILL SERVER WWW.EXAMPLE.COM AND EXAMPLE.COM

  const fileName = domain.toLowerCase().replace('www.', '');

  const certFileName = '../../../Certificates/' + fileName + '.cert.pem';
  const certPrivateKey = '../../../Certificates/' + fileName + '.privatekey.pem';
  const certChain = '../../../Certificates/' + fileName + '.chain.pem';

  return {
    cert: certFileName,
    privateKey: certPrivateKey,
    chain: certChain,
  };
}
