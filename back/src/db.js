const {Pool} = require('pg')
const dbConnectionString = process.env.DB_URL

const query = (queryString, parameters, callback) => {
    const pool = new Pool({
        connectionString: dbConnectionString
    })

    return pool.query(queryString, parameters, callback)
}

module.exports = {query}