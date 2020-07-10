var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const orders = [rows] = await promisePool.query(`SELECT * FROM orders order by id desc`);
        res.render('operator', { orders: orders[0] })
    } else {
        res.redirect('/')
    }
})

router.post('/close/:id', (req, res) => {
    const id = req.params.id
    pool.query(
        `UPDATE orders SET is_closed = 1 WHERE id = ${id}`,
        function (err, data) {
            // console.log(data.length)
            res.status(200).redirect("/operator")
        });
})

router.get('/products', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`SELECT * FROM products`);
        res.render('oper-products', { products: products[0] })
    } else {
        res.redirect('/')
    }
})

router.get('/products/create', async (req, res) => {
    if (session.operator) {
        res.render('oper-products-create')
    } else {
        res.redirect('/')
    }
})

router.post('/products/create', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`INSERT INTO products (image,name,description,composition,kcal,proteins,fats,carbohydrates,price,category_id)
                VALUES (
                '${req.body.image}',
                '${req.body.name}',
                '${req.body.description}',
                '${req.body.composition}',
                '${req.body.kcal}',
                '${req.body.proteins}',
                '${req.body.fats}',
                '${req.body.carbohydrates}',
                '${req.body.price}',
                1)
                `);
        res.redirect('/operator/products')
    } else {
        res.redirect('/')
    }
})

router.get('/products/edit/:id', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`SELECT * FROM products WHERE id=${req.params.id}`);
        res.render('oper-products-edit', { products: products[0] })
    } else {
        res.redirect('/')
    }
})

// '${req.body.image}',
//     '${req.body.name}',
//     '${req.body.description}',
//     '${req.body.composition}',
//     '${req.body.kcal}',
//     '${req.body.proteins}',
//     '${req.body.fats}',
//     '${req.body.carbohydrates}',
//     '${req.body.price}')
// `);

router.post('/products/edit/:id', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`UPDATE products 
SET image='${req.body.image}', 
name='${req.body.name}', 
description='${req.body.description}', 
composition='${req.body.composition}', 
kcal='${req.body.kcal}',
proteins='${req.body.proteins}', 
fats='${req.body.fats}', 
carbohydrates='${req.body.carbohydrates}', 
price='${req.body.price}'
WHERE id=${req.params.id}`);
        res.redirect('/operator/products')
    } else {
        res.redirect('/')
    }
})

router.get('/products/delete/:id', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`SELECT * FROM products WHERE id = ${req.params.id}`);
        res.render('oper-products-delete', { products: products[0] })
    } else {
        res.redirect('/')
    }
})

router.post('/products/delete/:id', async (req, res) => {
    if (session.operator) {
        const promisePool = pool.promise();
        console.log(req.session.userId)
        const products = [rows] = await promisePool.query(`DELETE FROM products WHERE id=${req.params.id}`);
        res.redirect('/operator/products')
    } else {
        res.redirect('/')
    }
})

module.exports = router;
