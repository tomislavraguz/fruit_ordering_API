const {
    GraphQLList
} = require('graphql');

const knex = require('../../knex');
const OrderStatus = require('./OrderStatus');

const OrderStatusList = {
    type: new GraphQLList(OrderStatus),
    resolve: () => knex('order_status')
}

module.exports = OrderStatusList;