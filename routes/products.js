var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

/* GET home page. */
router.get('/', async (req, res) => {
    const promisePool = pool.promise();
    const products = [err, rows] = await promisePool.query("SELECT * FROM products");
    const profiles = [rows] = await promisePool.query("SELECT id FROM profiles");
    console.log([products[0]])
    res.render('products', { products: products[0] })
})



module.exports = router;
