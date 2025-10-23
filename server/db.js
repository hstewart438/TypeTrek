const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "314555",
    host: "localhost",
    port: "5432",
    database: "TypeTrekDB"
});

module.exports = pool;