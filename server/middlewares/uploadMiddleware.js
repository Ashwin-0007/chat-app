const multer = require('multer');
const {storage} = require('../config/cloudConfig');

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
});

const uploadSingleFile = (fieldName) => upload.single(fieldName);
module.exports = {uploadSingleFile};