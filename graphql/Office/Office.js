const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const Office = new GraphQLObjectType({
    name:'Office',
    fields:()=>({
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt, resolve:obj => obj.user_id },
        address: { type: GraphQLString }
    })
})

module.exports = Office;