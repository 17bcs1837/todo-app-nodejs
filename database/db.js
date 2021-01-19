const PoolClass = require('pg').Pool;

const pool = new PoolClass({
    user: 'vytavlpy',
    host: 'john.db.elephantsql.com',
    database: 'vytavlpy',
    password: 'Rboqm5vk8bnMOUyvnM21BBg9d4wlN_f5',
    port: 5432
})


// const pool = new PoolClass({
//     user: 'zuhtuoykakdrhf',
//     host: 'ec2-3-231-241-17.compute-1.amazonaws.com',
//     database: 'dekt18icvh8hn5',
//     password: 'ba0f31a935063bd29c713f26fd509d8f7a71fae122ded42ff8d346b073b3f28f',
//     port: 5432
// })



module.exports = {
    query: (pgquery, params, callback) => {
        return pool.query(pgquery, params, callback);
    }
}