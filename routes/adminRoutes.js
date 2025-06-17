const express = require('express');
const router = express.Router();
const multer = require('multer');

const {AdminLogin,Ad,getAd,editAd, deleteAd,}=require('../controller/adminAuthController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });
router.post('/admin-login', AdminLogin );
router.post('/ad', upload.single('photo'), Ad); // 'photo' matches frontend field
router.get('/getAd', getAd );
router.delete('/getAd/:id', deleteAd);
router.put('/getAd/:id',editAd);



module.exports = router;
