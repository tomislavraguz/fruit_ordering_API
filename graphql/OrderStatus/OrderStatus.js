const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const OrderStatus = new GraphQLObjectType({
    name:'OrderStatus',
    fields:()=>({
        id: { type: GraphQLInt },
        label: { type: GraphQLString }
    })
})

module.exports = OrderStatus;