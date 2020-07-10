var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

/* GET home page. */
router.get('/:id', async (req, res) => {
    const promisePool = pool.promise();
    const id = req.params.id
    console.log(id)
    const product = [err, rows] = await promisePool.query(`SELECT * FROM products WHERE products.id=${id}`);
    console.log([product[0]])
    res.render('product', { product: product[0] })
})



module.exports = router;
