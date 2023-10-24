// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const auth = require('json-server-auth')
const express = require('express')
const cors = require('cors')

const app = express();
const port = 3000;

// Uncomment to allow write operations
const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

// Comment out to allow write operations
// const router = jsonServer.router('db.json')

const corsOptions = {
    origin: '*', // Replace '*' with the specific origin(s) you want to allow
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
};

const middlewares = jsonServer.defaults()

app.db = router.db

app.use(auth)
app.use(cors(corsOptions));
app.use(middlewares)
app.use(express.json());


// Define API routes
app.use('/', router);

app.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
