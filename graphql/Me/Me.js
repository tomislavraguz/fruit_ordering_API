const {
    GraphQLInt,
    GraphQLObjectType
} = require('graphql');

const Me = new GraphQLObjectType({
    name:'Me',
    fields:()=>({
        id:{ type:GraphQLInt },
        priviledge_level:{ type: GraphQLInt }
    })
})

const MeField = {
    type: Me,
    resolve: (obj, args, context) => {
        if(!context.session.passport){
            return null
        } else if(context.session.passport.user){
            return context.session.passport.user
        }
    }
}

module.exports = MeField;