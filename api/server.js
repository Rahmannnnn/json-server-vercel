const express = require('express');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = express();
const port = 3000;

const router = jsonServer.router('db.json');

// Enable CORS with specific options
const corsOptions = {
    origin: '*', // Replace '*' with the specific origin(s) you want to allow
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(auth);

// Define API routes
app.use('/api', router);

app.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});