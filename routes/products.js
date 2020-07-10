var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

/* GET home page. */
router.get('/', async (req, res) => {
    const promisePool = pool.promise();
    const products = [err, rows] = await promisePool.query("SELECT * FROM products");
    const categories = [err, rows] = await promisePool.query(`SELECT * FROM categories`);
    // console.log([products[0]])
    res.render('products', { products: products[0], categories: categories[0] })
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const promisePool = pool.promise();
    const products = [err, rows] = await promisePool.query(`SELECT * FROM products WHERE category_id = ${req.body.category}`);
    const categories = [err, rows] = await promisePool.query(`SELECT * FROM categories`);
    // console.log([products[0]])
    res.render('products', { products: products[0], categories: categories[0] })
})

module.exports = router;
