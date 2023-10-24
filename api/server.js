const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use((req, res, next) => {
    // Set the allowed origins here, or use a dynamic function to check the origin
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin(s) you want to allow

    // Set the allowed methods and headers as needed
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

server.use(auth);
server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;