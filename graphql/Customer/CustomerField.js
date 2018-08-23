const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const Customer = require('./Customer');
const knex = require('../../knex')

const CustomerField = {
    type: Customer,
    args: {
        id: {type:new GraphQLNonNull(GraphQLInt)} 
    },
    resolve: (obj, args, context) => {
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } 
        const { user } = context.session.passport;
        if(    
            (user.priviledge_level !== 1) &&
            (user.priviledge_level === 2 && args.id !== user.id)
        ){
            throw new Error('Authorization failure.')
        }
        return knex('user')
        .where('priviledge_level', 2)
        .andWhere('id', args.id)
        .then(rows => rows[0])    
    }

}

module.exports = CustomerField;