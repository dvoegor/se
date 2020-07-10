var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

/* GET home page. */
router.get('/', async (req, res) => {
    if (session.admin) {
        const promisePool = pool.promise();
        // console.log(req.session.userId)
        const sum = [rows] = await promisePool.query(`SELECT SUM(allPrice)
FROM orders;`);
        // console.log(sum[0][0]["SUM(allPrice)"])
        res.render('admin', { sum: sum[0][0]["SUM(allPrice)"] })
    } else {
        res.redirect('/')
    }
})

module.exports = router;
