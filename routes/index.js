var express = require('express');
var router = express.Router();
const db= require("../mildware/db-conn");

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    db.authenticate().then(()=>{
      res.json({message: 'Connection has been established successfully.'});
    }).catch(err=>{
      res.status(500).json({message: 'Unable to connect to the database:', error: err});
    });
  }catch(err){
    next(err);
  }
});

module.exports = router;
