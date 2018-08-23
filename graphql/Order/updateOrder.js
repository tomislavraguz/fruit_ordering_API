const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLBoolean
} = require('graphql');

const knex = require('../../knex');

const OrderUpdatableFields = new GraphQLInputObjectType({
    name:'UpdateOrderPayload',
    fields:()=>({
        statusId: { type: GraphQLInt },
        approved: { type: GraphQLBoolean }
    })
})

const updateOrder = { 
    type: GraphQLInt,
    args: {
        orderId: { type: new GraphQLNonNull(GraphQLInt) },
        fields: { type: new GraphQLNonNull(OrderUpdatableFields) }
    },
    resolve: async (obj, args, context) => {
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } else if(context.session.passport.user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }

        const { orderId, fields } = args;
        const updatesObject = {};
        if(fields.statusId){
            updatesObject.status_id = fields.statusId;
        }
        if(fields.approved){
            updatesObject.approved = fields.approved;
        }

        await knex.transaction(trx => 
            trx('order')
            .where('id', orderId)
            .update(updatesObject)
        )
        return 1;
    }
}

module.exports = updateOrder;