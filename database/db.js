const PoolClass = require('pg').Pool;

const pool = new PoolClass({
    user: 'vytavlpy',
    host: 'john.db.elephantsql.com',
    database: 'vytavlpy',
    password: 'Rboqm5vk8bnMOUyvnM21BBg9d4wlN_f5',
    port: 5432
})


module.exports = {
    query: (pgquery, params, callback) => {
        return pool.query(pgquery, params, callback);
    }
}
