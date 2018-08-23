const {
    GraphQLList
} = require('graphql');
const Fruit = require('./Fruit');
const knex = require('../../knex')

const FruitListField = {
    type: new GraphQLList(Fruit),
    resolve: () => knex('fruit')
}

module.exports = FruitListField;