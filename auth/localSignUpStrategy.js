const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const knex = require('../knex')

const localSignUpStrategy = new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email',
  passwordField: 'password'
},async(req, email, password, done)=>{
   const { label } = req.body;
   let rows = await knex('user').select('email').where('email',email);
   if( rows.length ) {
        done(null, false, {error: 'There is already an account with this email.'})
        return;
    } else {
        const password_hash = await bcrypt.hash(password,8)
        rows = await knex('user').insert({ email, password_hash, label });
        done(null,{
          email,
          id:rows[0]
        })
    }
})

module.exports = localSignUpStrategy;
