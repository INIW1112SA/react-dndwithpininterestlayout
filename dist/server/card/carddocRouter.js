'use strict';
const router = require('express').Router();
const cardCtrl = require('./carddocController');

router.post('/add', cardCtrl.addAnswer);

module.exports = router;
