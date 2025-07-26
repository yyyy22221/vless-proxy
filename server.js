import fetch from 'node-fetch';
import { createServer } from 'http';

const target = 'https://premifr1.vpnjantit.com/vpnjantit'; // Your real VLESS WS address
const targetHost = new URL(target).host;
const targetPath = new URL(target).pathname;

createServer(async (req, res) => {
  const url = new URL(req.url, `https://${targetHost}`);
  url.pathname = targetPath;

  const proxyReq = await fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req
  });

  res.writeHead(proxyReq.status, Object.fromEntries(proxyReq.headers));
  proxyReq.body.pipe(res);
}).listen(process.env.PORT || 8080, () => {
  console.log('Proxy running');
});
