const {
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull
} =  require('graphql');

const knex = require('../../knex');
const Office = require('./Office');

const OfficePayload = new GraphQLInputObjectType ({
    name:'OfficePayload',
    fields:() => ({
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        address: { type: new GraphQLNonNull(GraphQLString) }
    })
})

const createOffice = {
    type: Office,
    args:{
        input: { type: new GraphQLNonNull(OfficePayload) }
    },
    resolve:(obj, args, context) => {
        
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } else if(context.session.passport.user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }

        const { input:office } = args;
        const {
            address,
            userId: user_id
        } = office;
        return knex.transaction( async(trx) => {
            try {
               const rows = await trx('user_office').insert({
                   address, user_id
               })
               return {
                   id: rows[0],
                   address,
                   user_id,
               };
            } catch (e) {
                throw e;
            }
        })

    }
}

module.exports = createOffice;