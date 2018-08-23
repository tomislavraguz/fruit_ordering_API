const {
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList
} =  require('graphql');

const knex = require('../../knex');
const Order = require('./Order');

const OrderFruit = new GraphQLInputObjectType({
    name:'OrderFruitPayload',
    fields:()=>({
        fruitId: { type:GraphQLInt },
        quantity: { type: GraphQLInt }
    })
})

const OrderPayload = new GraphQLInputObjectType ({
    name:'OrderPayload',
    fields:() => ({
        officeId: { type: GraphQLInt },
        expectedTime: { type: GraphQLString },
        fruits: { type: new GraphQLList( OrderFruit ) }
    })
})

const createOrder = {
    type: Order,
    args:{
        input: { type: OrderPayload }
    },
    resolve:(obj, args, context) => {
       /* 
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } else if(context.session.passport.user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }
        */
        const { input:order } = args;
        const {
            officeId : office_id,
            expectedTime: expected_time,
            fruits
        } = order;
        return knex.transaction( async(trx) => {
            try {
               const rows = await trx('order').insert({
                   office_id, expected_time
               })
               order.id = rows[0];
               const parallelExecutionArray = [];
               fruits.forEach(fruit => {
                   const promise = trx('order_fruit').insert({
                       order_id: order.id,
                       fruit_id: fruit.fruitId,
                       quantity: fruit.quantity
                   }).then(rows => fruit.id = rows[0]);
                   parallelExecutionArray.push(promise);
               });
               await Promise.all(parallelExecutionArray);
               return order;
            } catch (e) {
                throw e;
            }
        })

    }
}

module.exports = createOrder;