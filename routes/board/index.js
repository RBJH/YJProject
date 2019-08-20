var express = require('express');
const path = require('path');
const router = express.Router();


const boardRouter = require('./board');
const readRouter = require('./read');

router.use('/', boardRouter);
router.use('/read', readRouter);

router.use(express.static(path.join(__dirname, '../../public')));


module.exports = router