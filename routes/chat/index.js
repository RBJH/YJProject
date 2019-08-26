const express = require('express');
const path = require('path');
const router = express.Router();

const chatRouter = require('./chat');

router.use(express.static(path.join(__dirname + "../../public")));

router.use('/', chatRouter);


module.exports = router;