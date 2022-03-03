const http = require('http');
const dotenv = require('dotenv').config();
const redis = require('redis');

const node_host = process.env.NODE_HOST | 'localhost';
const node_port = process.env.NODE_PORT | '80';
const redis_host = process.env.REDIS_HOST | 'localhost';
const redis_port = process.env.REDIS_PORT | '6379';

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  const client = redis.createClient(redis_port,redis_host);
  client.on('error',(err)=> console.log('REDIS',err));
  multi = client.multi();
  await client.connect();
  multi.incr('vcount');
  multi.get('vcount');
  let r = await multi.exec().then((res)=>{
    console.log('REDIS:',res);
    return res;
  });
  res.end(`This is the ${r[1]} visitor>`);
});

server.listen(node_port, node_host, () => {
  console.log(`Server running at http://${node_host}:${node_port}/`);
});