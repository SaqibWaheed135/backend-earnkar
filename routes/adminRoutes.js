const express = require('express');
const router = express.Router();

const {AdminLogin,Ad,getAd}=require('../controller/adminAuthController')

router.post('/admin-login', AdminLogin );
router.post('/ad', Ad );
router.get('/getAd', getAd );

module.exports = router;
