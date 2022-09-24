const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "archisvaze",
    host: "localhost",
    port: 5432,
    database: "docseek"
});

module.exports = pool;

// const { Client } = require('pg');
// require("dotenv").config();


// const client = new Client(process.env.URL)

// module.exports = client;