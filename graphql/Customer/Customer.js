const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLInt,
 GraphQLList
} = require('graphql');

const Office = require('../Office/Office')
const knex = require('../../knex');

const Customer = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type: GraphQLInt },
        label: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        officeList: { 
            type: new GraphQLList(Office),
            resolve: customer => knex('user_office').where('user_id', customer.id)
        }
    })
})

module.exports = Customer;