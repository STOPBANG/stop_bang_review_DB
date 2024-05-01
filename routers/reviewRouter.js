const express = require('express')
const router = express.Router();
const reviewModel = require('../models/reviewModel.js');

router.post('/create', reviewModel.create);
router.post('/update', reviewModel.update);
router.post('/delete', reviewModel.delete);
router.get('/findAllByReviewId/:rv_id', reviewModel.findAllByReviewId);
router.get('/findAllByUserId/:user_id', reviewModel.findAllByUserId);
router.get('/findAllByRegno/:ra_regno', reviewModel.findAllByRegno);


module.exports = router