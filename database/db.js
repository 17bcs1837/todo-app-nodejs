const PoolClass = require('pg').Pool;

const pool = new PoolClass({
    user: 'vytavlpy',
    host: '',
    database: '',
    password: '',
    port: 5432
})


module.exports = {
    query: (pgquery, params, callback) => {
        return pool.query(pgquery, params, callback);
    }
}
