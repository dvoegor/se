var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

/* GET home page. */
router.get('/', (req, res) => {
    if (req.session.success) {
        res.status(200).redirect("/")
    } else {
        req.session.success = false;
        res.status(200).render("register.hbs", {
            title: "Авторизация"
        })
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    // res.redirect('/')
    // const promisePool = pool.promise();
    // const orders = [rows] = await promisePool.query(`INSERT INTO users (email,password,name,tel)
    //             VALUES (
    //             '${req.body.email}',
    //             '${req.body.password}',
    //             '${req.body.name}',
    //             '${req.body.tel}')
    //             `);
    pool.query(
        `INSERT INTO users (email,password,name,tel,is_operator,is_admin)
                VALUES (
                '${req.body.email}',
                '${req.body.password}',
                '${req.body.name}',
                '${req.body.tel}',
                0,
                0)
                `,
        function (err, data) {
            console.log(data.length)
            if (err || !data.length) {
                req.session.success = false;
                res.status(500).render('error',{message: 'Ошибка авторизации', status: 'error'})
            } else {
                req.session.success = true;
                res.status(200).redirect("/")
            }
        });
})

module.exports = router;
