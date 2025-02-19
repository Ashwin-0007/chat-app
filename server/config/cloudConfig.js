const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secrect: process.env.CLOUD_API_SECRET_KEY,
});

const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params:{
        folder: "Demo", // Folder name,
        alllowedFormat: async(req, res) => ['png', 'jpg', 'jpeg', 'mp4', 'mov', 'avi'],
        resource_type: 'auto',
    },
});

module.exports = { storage, cloudinary }