var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

session.products = [];

/* GET home page. */
router.get('/', async (req, res) => {
    console.log(session.products)
    // const promisePool = pool.promise();
    // const persons = [rows] = await promisePool.query("SELECT id FROM personnel");
    // const profiles = [rows] = await promisePool.query("SELECT id FROM profiles");
    // // console.log([persons[0], profiles[0]])
    res.render('index', { success: req.session.success, userName: req.session.name})
})

router.post('/find', async (req, res) => {
    console.log(req.body)
    const promisePool = pool.promise();
    const findProduct = req.body.find
    const found = [rows] = await promisePool.query(`SELECT * FROM products WHERE name LIKE '%${findProduct}%'`);
    res.render('found', { found: found[0] })
})

router.post('/add', async (req, res) => {
    const items = session.products.push(req.body.id);
    res.redirect('/products');
})

module.exports = router;
