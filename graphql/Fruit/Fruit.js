const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
   } = require('graphql');
   
const Fruit = new GraphQLObjectType({
    name:'Fruit',
    fields:() => ({
        id: { type: GraphQLInt },
        label: { type: GraphQLString },
        pricePerUnit: { type: GraphQLInt, resolve: obj => obj.price_per_unit }
    })
})

module.exports = Fruit;