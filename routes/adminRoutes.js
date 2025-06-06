const express = require('express');
const router = express.Router();

const {AdminLogin}=require('../controller/adminAuthController')

router.post('/admin-login', AdminLogin );

module.exports = router;
