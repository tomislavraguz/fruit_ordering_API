const {
    GraphQLList
} = require('graphql');
const Customer =require('./Customer');
const knex = require('../../knex');

const CustomerListField = {
    type: new GraphQLList(Customer),
    resolve: () => knex('user').where('priviledge_level',2)
}

module.exports = CustomerListField;