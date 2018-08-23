const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList
  } = require('graphql');

  const createCustomer = require('./Customer/createCustomer')
  const createFruit = require('./Fruit/createFruit')
  const createOrder = require('./Order/createOrder')
  const createOffice = require('./Office/createOffice')
  const updateOrder = require('./Order/updateOrder')

  const FruitList = require('./Fruit/FruitList')
  const CustomerList = require('./Customer/CustomerList')
  const CustomerField = require('./Customer/CustomerField')
  const OrderList = require('./Order/OrderList');
  const OrderStatusList = require('./OrderStatus/OrderStatusList');
  const Me = require('./Me/Me')
  
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQuery',
      fields: () => ({
        fruitList: FruitList,
        customer: CustomerField,
        customerList: CustomerList,
        orderList: OrderList,
        orderStatusList: OrderStatusList,
        me: Me
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'RootMutation',
      fields: ()=> ({
        createCustomer,
        createFruit,
        createOrder,
        createOffice,
        updateOrder
      })
    })
  });

module.exports = schema;