var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    console.log(session.products);
    const promisePool = pool.promise();
    const products = [rows] = await promisePool.query("SELECT * FROM products order by id desc limit 3;");
    // const profiles = [rows] = await promisePool.query("SELECT id FROM profiles");
    // // console.log([persons[0], profiles[0]])
    res.render('index', { success: req.session.success, userName: req.session.name, products: products[0]})
})
