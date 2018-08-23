const {
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const Order =require('./Order');
const knex = require('../../knex');

const CustomerListField = {
    type: new GraphQLList(Order),
    args: {
        sessionScope: { type: GraphQLBoolean }
    },
    resolve: (obj, args, context) => {
        const { sessionScope } = args;
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } 
        const { user } = context.session.passport;
        if(!sessionScope && user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }
        const baseQuery = knex('order').orderBy('id','desc');
        if(sessionScope){
            baseQuery.whereRaw(`office_id IN (SELECT id FROM user_office WHERE user_id = ${user.id})`)
        }
        return baseQuery;
    }
}

module.exports = CustomerListField;