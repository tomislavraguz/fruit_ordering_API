const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const excel = require('node-excel-export');

const schema = require('./graphql/schema');
const authRouter = require('./auth/authRouter');
const knex = require('./knex');

const sessionMiddleware = session({
    saveUninitialized: false,
    rolling: true,
    maxAge: 1000 * 60 * 30,
    resave: true,
    secret: 'keyboardcat'
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(sessionMiddleware);
app.use('/auth',authRouter);
app.use((req,res,next)=>{
    if(req.session){
        console.log('SESSION:',req.session.passport)
    }
    next()
})

app.use('/graphql', graphqlHTTP((req,res)=>({
    schema,
    context: req,
    graphiql: true
    }
)));

app.get('/admin/user-report/:userId',async(req,res)=>{

    // TODO: prevent SQL injection by validating userId and admin gate

    const rows = await knex('order').select(
        'order.id','order.expected_time','order.approved',
        `order_fruit.quantity`,knex.raw(`order_fruit.quantity * fruit.price_per_unit as subtotal`),
        `fruit.label`, `fruit.price_per_unit`,
        `user_office.address`,
        `order_status.label as status_label`)
        .join('order_fruit',`order_fruit.order_id`,'order.id')
        .join('fruit','fruit.id','order_fruit.fruit_id')
        .join('user_office','user_office.id','order.office_id')
        .join('order_status','order_status.id','order.status_id')
        .whereRaw(`order.office_id IN (SELECT office_id FROM user_office WHERE user_id = ${req.params.userId})`)

        const headerStyle = {
            font: {
              sz: 10
            }
          }
        const report = excel.buildExport(
            [ 
              {
                name: 'Fruits bought by office',
                specification: {
                    id:{ displayName:'Order id', width: 50, headerStyle },
                    address: { displayName:'Address', width: 100, headerStyle },
                    expected_time: { displayName:'Expected time', width: 100, headerStyle },
                    approved: { displayName:'Approved', width: 50, headerStyle },
                    status_label: { displayName:'Order Status', width: 70, headerStyle },
                    label:{ displayName:'Fruit label', width:70, headerStyle },
                    price_per_unit:{ displayName:'Price per unit', width: 70, headerStyle },
                    quantity: { displayName:'Quantity', width: 50, headerStyle },
                    subtotal: { displayName:'Subtotal', width: 50, headerStyle },
                }, 
                data: rows 
              }
            ]
          );

    res.send(report);
})

app.get('/',(req,res)=>{
    let testString = ''
    if(req.session.passport){testString += req.session.passport.user.email+' '+'<a href="/graphql">To graphiql</a><a href="/auth/logout">Logout</a>'}
    else{
      testString += `
                    <form action="/auth/login" method="post" enctype="application/x-www-form-urlencoded">
                      <p>Email:</p>
                      <input name="email" value="frooto@outlook.com"/>
                      <p>Password:</p>
                      <input name="password" value="tomo"/>
                      <button>SUBMIT</button>
                    </form>
                    `
    }
    res.send(testString);
})


app.listen(8080,()=>console.log('GraphQL API listening on port 8080'));