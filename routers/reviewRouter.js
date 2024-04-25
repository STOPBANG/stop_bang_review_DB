const express = require('express')
const router = express.Router();
const reviewModel = require('../models/reviewModel.js');

router.post('/create', reviewModel.create);
router.get('/findAllByUserId/:user_id', reviewModel.findAllByUserId);
router.get('/findAllByRegno/:ra_regno', reviewModel.findAllByRegno);

module.exports = router