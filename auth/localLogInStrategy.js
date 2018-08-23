const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const knex = require('../knex')

const localLogInStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },async (email,password,done) => {
   const rows = await knex('user').select('id','password_hash','priviledge_level').where('email',email);
   if(!rows.length){
       done({err:'Cant find an account associated with the email'})
   } else {
    let isPassword = await bcrypt.compare(password, rows[0].password_hash)
    if(!isPassword) {
      done({err:'Wrong password'})
    } else {
        const { password_hash, ...userData } = rows[0];
        return done(null, userData)
    }
   }
})

module.exports = localLogInStrategy;