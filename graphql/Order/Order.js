const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList, 
    GraphQLBoolean
} = require('graphql');

const knex = require('../../knex');
const Office = require('../Office/Office');
const OrderStatus = require('../OrderStatus/OrderStatus');

const OrderFruit = new GraphQLObjectType({
    name:'OrderFruit',
    fields: ({
        orderId: { type: GraphQLInt, resolve: obj => obj.order_id },
        quantity: { type: GraphQLInt },
        label: { type: GraphQLString },
        pricePerUnit: { type: GraphQLInt, resolve: obj => obj.price_per_unit }
    })
})

const FruitCart = new GraphQLObjectType({
    name:"FruitCart",
    fields:()=>({
        total:{type: GraphQLInt, resolve: obj => obj.reduce(
            (total, orderFruit) => total + orderFruit.price_per_unit*orderFruit.quantity,
            0
        )},
        orderFruitList: { type: new GraphQLList(OrderFruit), resolve: obj => obj}
    })
})

const Order = new GraphQLObjectType({
    name:'Order',
    fields:()=>({
        id: { type: GraphQLInt },
        officeId: { type: GraphQLInt, resolve: obj => obj.office_id },
        expectedTime: { type: GraphQLString, resolve: obj => obj.expected_time },
        statusId: { type: GraphQLInt ,resolve: obj => obj.status_id },
        approved: { type: GraphQLBoolean },
        status: { type: OrderStatus, resolve: obj => 
            knex('order_status').where('id',obj.status_id).then(rows => rows[0])  
        },
        office: { type: Office, resolve: obj =>
            knex('user_office').where('id',obj.office_id).then(rows => rows[0])  
        },
        fruitCart: { type: FruitCart, resolve: obj => {
            return knex('order_fruit')
            .join('fruit','fruit.id','order_fruit.fruit_id')
            .where('order_id',obj.id) 
        }}
    })
})

module.exports = Order;