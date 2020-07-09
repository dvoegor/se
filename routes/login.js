var express = require('express');
var router = express.Router();
const pool = require('../pool/pool');

/* GET home page. */
router.get('/', async (req, res) => {
    const promisePool = pool.promise();
    const persons = [rows] = await promisePool.query("SELECT id FROM personnel");
    const profiles = [rows] = await promisePool.query("SELECT id FROM profiles");
    console.log([persons[0], profiles[0]])
    res.render('login', { persons: persons[0], profiles: profiles[0] })
})

module.exports = router;
