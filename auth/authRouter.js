const express = require('express')
const passport = require('passport')
const localLogInStrategy = require('./localLogInStrategy')
const localSignUpStrategy = require('./localSignUpStrategy')

const router = express.Router()

router.use(passport.initialize());
router.use(passport.session());
passport.use('local', localLogInStrategy)
passport.use('local-signup', localSignUpStrategy)
passport.serializeUser(( user, done )=>{done(null, user)})
passport.deserializeUser(( user , done )=>{done( null, user.id )})

router.post('/login',(req,res) => {
    passport.authenticate('local',(err,user,info = {}) => {
        if(err){
            res.json(err)
        } else {
            req.logIn(user, err => err ? res.json(err) : res.json({data:{user}}))
        }
    })(req,res)
})
/*
router.post('/sign-up',(req,res) => {
    passport.authenticate('local-signup',(err,user,info = {}) => {
        if(info.error){
          res.json(info.error)
        } else {
          req.logIn(user,() => res.json(user))
        }
    })(req,res)
})
*/
router.get('/logout',(req,res)=>{
  req.logOut();
  res.cookie("connect.sid", "", { expires: new Date() }).send('gg')
})


module.exports = router;