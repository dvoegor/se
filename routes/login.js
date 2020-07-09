var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

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
    console.log(req.body)
    res.redirect('/')
    // pool.query(
    //     `SELECT * FROM profiles
    //          WHERE email='${req.body.email}'
    //          AND password='${req.body.password}'
    //         `,
    //     function (err, data) {
    //         console.log(data.length)
    //         if (err || !data.length) {
    //             req.session.success = false;
    //             res.status(500).render('error',{message: 'Ошибка авторизации', status: 'error'})
    //         } else {
    //             req.session.success = true;
    //             res.status(200).redirect("/")
    //         }
    //     });
})

module.exports = router;
