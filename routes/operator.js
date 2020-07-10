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

module.exports = router;
