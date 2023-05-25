const {Pool} = require('pg')
const dbConnectionString = process.env.DB_URL

const query = (queryString, parameters, callback) => {
    const pool = new Pool({
        connectionString: dbConnectionString,
        ssl:              {
            rejectUnauthorized: false
        }
    })
    return pool.query(queryString, parameters, callback)
}

module.exports = {query}