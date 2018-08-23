const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port: 3306,
      user : 'root',
      password : 'root',
      database : 'fruit_ordering'
    }
  });
  
  module.exports = knex;