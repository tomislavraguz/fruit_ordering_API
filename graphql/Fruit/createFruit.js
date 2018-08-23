const {
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLInt
} =  require('graphql');

const knex = require('../../knex');
const Fruit = require('./Fruit');

const FruitPayload = new GraphQLInputObjectType ({
    name:'FruitPayload',
    fields:() => ({
        label: { type:GraphQLString },
        pricePerUnit: { type: GraphQLInt }
    })
})

const createFruit = {
    type: Fruit,
    args:{
        input: { type: FruitPayload }
    },
    resolve:(obj, args, context) => {
        
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } else if(context.session.passport.user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }

        const { input:fruit } = args;
        const {
            label,
            pricePerUnit: price_per_unit
        } = fruit;
        return knex.transaction( async(trx) => {
            try {
               const rows = await trx('fruit').insert({
                   label, price_per_unit
               })
               fruit.id = rows[0];
               return fruit;
            } catch (e) {
                throw e;
            }
        })

    }
}

module.exports = createFruit;