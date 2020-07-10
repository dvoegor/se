var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    const promisePool = pool.promise();
    const id = session.products
    // console.log(id.length === 0)
    if (id.length === 0) {
        res.render('cart', { alert: 'В вашей корзине нет товаров' })
    } else {
        console.log(req.session.userId)
        const products = [err, rows] = await promisePool.query(`SELECT * FROM products WHERE products.id in (${id})`);
        let user;
        if (req.session.userId) {
            user = [rows] = await promisePool.query(`SELECT * FROM users WHERE id = ${req.session.userId}`);
        }
        // const ids = [err, rows] = await promisePool.query(`SELECT id FROM products WHERE products.id in (${id})`);
        let productsCounts = products[0];
        // session.prodCounts.push({id: req.body.id, count: count + 1})
        // console.log(session.prodCounts[0][0].count == undefined)
        session.prodCounts = productsCounts.map(item => [{
            id: item.id,
            // image: item.image,
            name: item.name,
            // description: item.description,
            // composition: item.composition,
            // kcal: item.kcal,
            // proteins: item.proteins,
            // fats: item.fats,
            // carbohydrates: item.carbohydrates,
            price: item.price,
            newPrice: session.item === undefined ? item.price : session.prodCounts[item.id - 1][0].newPrice,
            // category_id: item.category_id,
            // count: 1
            count: session.item === undefined ? 1 : session.prodCounts[item.id - 1][0].count
        }]);
        session.allPrice = 0;
        // console.log(session.prodCounts.length)
        for (let i = 0; i < session.prodCounts.length; i++) {
            session.allPrice += session.prodCounts[i][0].newPrice
        }
        // console.log(user[0][0].name)
        if (req.session.userId) {
            res.render('cart', { products: session.prodCounts, allPrice: session.allPrice, user: user[0][0], success: req.session.success, userName: req.session.name })
        } else {
            res.render('cart', { products: session.prodCounts, allPrice: session.allPrice, success: req.session.success })
        }

    }
})

router.post('/add/:id', (req, res) => {
    const id = req.body.id
    session.prodCounts[req.body.id - 1][0].count = session.prodCounts[req.body.id - 1][0].count + 1;
    session.prodCounts[req.body.id - 1][0].newPrice = session.prodCounts[req.body.id - 1][0].price * session.prodCounts[req.body.id - 1][0].count;
    session.item = true
    // console.log(session.prodCounts[req.body.id - 1][0].newPrice)
    res.redirect('/cart')

})

router.post('/minus/:id', (req, res) => {
    const id = req.body.id
    if (session.prodCounts[req.body.id - 1][0].count !== 1) {
        session.prodCounts[req.body.id - 1][0].count = session.prodCounts[req.body.id - 1][0].count - 1;
        session.prodCounts[req.body.id - 1][0].newPrice = session.prodCounts[req.body.id - 1][0].price * session.prodCounts[req.body.id - 1][0].count;
    } else {
        session.prodCounts[req.body.id - 1][0].count = 1;
        session.prodCounts[req.body.id - 1][0].newPrice = session.prodCounts[req.body.id - 1][0].price * session.prodCounts[req.body.id - 1][0].count;
    }
    session.item = true
    // console.log(session.prodCounts[req.body.id - 1][0].newPrice)
    res.redirect('/cart')

})

router.post('/delete/:id', (req, res) => {
    session.products = session.products.filter(function(value, index, arr){ return value !== req.body.id;});
    res.redirect('/cart')

})

router.post('/order', async (req, res) => {
    const promisePool = pool.promise();
    const orders = [rows] = await promisePool.query(`INSERT INTO orders (name,tel,street,home,flat,allPrice,is_closed)
                VALUES (
                '${req.body.name}',
                '${req.body.tel}',
                '${req.body.street}',
                '${req.body.home}',
                '${req.body.flat}',
                '${req.body.allPrice}',
                '0')
                `);
    console.log(orders[0].insertId)
    for (let i = 0; i < session.prodCounts.length; i++) {
        await promisePool.query(`INSERT INTO order_part (order_id,product_id,count)
                VALUES (
                '${orders[0].insertId}',
                '${session.prodCounts[i][0].id}',
                '${session.prodCounts[i][0].count}')
                `);
        // session.allPrice += session.prodCounts[i][0].newPrice
    }
    // console.log(req.body)
    // console.log(session.prodCounts)
    // console.log(session.allPrice)
    res.render('ordered', {
        products: session.prodCounts,
        // allPrice: session.allPrice,
        name: req.body.name,
        tel: req.body.tel,
        street: req.body.street,
        home: req.body.home,
        flat: req.body.flat,
        allPrice: req.body.allPrice
    })
    session.prodCounts = [{}]
    session.allPrice = 0
    session.products = []
    session.item = undefined
})

module.exports = router;
