const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

// Configure CORS options
const corsOptions = {
    origin: '*', // Replace '*' with the specific origin(s) you want to allow or set it to a function that dynamically validates the origin.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Adjust this according to your needs
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.use(cors(corsOptions)); // Apply CORS with the defined options
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