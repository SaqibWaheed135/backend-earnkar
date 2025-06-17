const multer = require('multer');
const path = require('path');

// Set storage location and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/ads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed!'));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
