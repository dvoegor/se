var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');
const session = require('express-session');

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

router.post('/', async (req, res) => {
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
    const promisePool = pool.promise();
    const newUser = [rows] = await promisePool.query(`INSERT INTO users (email,password,name,tel,is_operator,is_admin)
                VALUES (
                '${req.body.email}',
                '${req.body.password}',
                '${req.body.name}',
                '${req.body.tel}',
                0,
                0)
                `);
    console.log(newUser[0].insertId)
    pool.query(
        `SELECT * FROM users where id = ${newUser[0].insertId}`,
        function (err, data) {
            console.log(data[0])
            req.session.success = true;
            req.session.name = data[0].name
            req.session.userId = data[0].id
            session.operator = data[0].is_operator
            session.admin = data[0].is_admin
            res.status(200).redirect("/")
        });
})

module.exports = router;
