import express from 'express';
const router = express.Router();
import db from '../mildware/db-conn.js';

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    await db.authenticate();
    res.json({message: 'Connection has been established successfully.'});
  }catch(err){
    res.status(500).json({message: 'Unable to connect to the database:', error: err});
  }
});

export default router;
