// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/data.json')
const middlewares = jsonServer.defaults()

const fs = require('fs')

var serverInstance = null;

server.use(middlewares);

server.get('/close-without-error', (req, res) => {
  //a hack to close the server without error
  res.jsonp({'hasServer':!!serverInstance});
  if(serverInstance){
    fs.unlink('pid.out', ()=>{
      console.log('pid removed');
    })
    serverInstance.close();
  }
});

server.use(router);
serverInstance = server.listen(3000, () => {
  fs.writeFile('pid.out',''+process.pid,()=>{});
})