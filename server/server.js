// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const PORT = 8080;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => console.log(`JSON server is running at port ${PORT}`));
