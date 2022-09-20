const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "archisvaze",
    host: "localhost",
    port: 5432,
    database: "docseek"
});

module.exports = pool;