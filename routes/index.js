var express = require('express');
var router = express.Router();
var passport = require('passport');

//Requiering the schemas
var Account = require("../models/account")
var todos = require('../models/todos');


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user){
todos.find({user : req.user.username},'body',function(err,td){
  console.log(td);
  res.render('index', { title: 'TodoApp',todoList : td,user : req.user});
  });
}
else{
  res.render('index', { title: 'TodoApp',todoList : [],user:req.user});
}
});

/*GET register page */
router.get('/register',function(req,res,next){
  res.render('register',{info : null});
});

/*POST register */
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

/*GET login */
router.get('/login', function(req, res) {
    res.render('login', { user : req.user ,message:req.flash("error")});
});

/*POST login */
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    console.log(req.flash);
    res.redirect('/');
});

/*logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



/* POST add todo */
router.post('/add',function(req,res){
  if(req.body.newTodo != ''){
    console.log(req.user.username);
    console.log("juste avant");
    var newTodo = new todos({body : req.body.newTodo,user: req.user.username});
    newTodo.save(function(err){
      if (err) throw err;
      console.log('well saves')
    });
  }
  res.redirect('/');
});

module.exports = router;
