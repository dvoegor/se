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
        res.status(200).render("login.hbs", {
            title: "Авторизация"
        })
    }
})

router.post('/', (req, res) => {
    // res.session.operator = 0
    // console.log(req.body)
    pool.query(
        `SELECT * FROM users
             WHERE email='${req.body.email}'
             AND password='${req.body.password}'
            `,
        function (err, data) {
            console.log(data.length)
            if (err || !data.length) {
                req.session.success = false;
                res.status(500).render('error',{message: 'Ошибка авторизации', status: 'error'})
            } else {
                // console.log(data[0].is_operator)
                req.session.success = true;
                req.session.name = data[0].name
                req.session.userId = data[0].id
                session.operator = data[0].is_operator
                session.admin = data[0].is_admin
                res.status(200).redirect("/")
            }
        });
})

module.exports = router;
