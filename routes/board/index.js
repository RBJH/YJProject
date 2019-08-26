var express = require('express');
const path = require('path');
const router = express.Router();

const boardRouter = require('./board');
const readRouter = require('./read');
const writeRouter = require('./write');

router.use('/', boardRouter);
router.use('/read', readRouter);
router.use('/write', writeRouter);

router.use(express.static(path.join(__dirname, '../../public')));


module.exports = router