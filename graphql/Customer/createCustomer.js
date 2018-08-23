const {
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList
} =  require('graphql');
const bcrypt = require('bcryptjs');

const knex = require('../../knex');
const Customer = require('./Customer');

const CustomerOfficePayload = new GraphQLInputObjectType({
    name:'CustomerOfficePayload',
    fields:()=>({
        address: { type: GraphQLString }
    })
})

const CustomerPayload = new GraphQLInputObjectType ({
    name:'CustomerPayload',
    fields:() => ({
        label: { type:GraphQLString },
        password: { type:GraphQLString },
        email: { type:GraphQLString },
        phone: { type:GraphQLString },
        officeList: { type: new GraphQLList(CustomerOfficePayload) }
    })
})

const createCustomer = {
    type: Customer,
    args:{
        input: { type: CustomerPayload }
    },
    resolve:(obj, args, context) => {
        
        if(!context.session.passport){
            throw new Error('Authenthication required.')
        } else if(context.session.passport.user.priviledge_level !== 1){
            throw new Error('Authorization failure.')
        }

        const { input } = args;
        const { password, officeList, ...customer } = input;
        return knex.transaction( async(trx) => {
            try {
               customer.priviledge_level = 2;
               customer.password_hash =  await bcrypt.hash(password,8);
               const rows = await trx('user').insert(customer)
               customer.id = rows[0];

               const parallelExecutionArray = [];
               officeList.forEach(office => {
                   const promise = trx('user_office').insert({
                       user_id: customer.id,
                       address: office.address
                   }).then(rows => office.id = rows[0]);
                   parallelExecutionArray.push(promise);
               });
               await Promise.all(parallelExecutionArray);

               return customer;
            } catch (e) {
                throw e;
            }
        })

    }
}

module.exports = createCustomer;