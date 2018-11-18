// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/data.json')
const middlewares = jsonServer.defaults()

var serverInstance = null;

server.use(middlewares);

server.get('/close-without-error', (req, res) => {
  //a hack to close the server without error
  res.jsonp({'hasServer':!!serverInstance});
  if(serverInstance){
    serverInstance.close();
  }
});

server.use(router);
serverInstance = server.listen(3000, () => {
  process.stderr.write(''+process.pid);
})