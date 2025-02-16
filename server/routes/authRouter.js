const express = require("express"); 
const { handleLogin } = require("../controller/authCotroller");
const router = express.Router();

router.post('/login', handleLogin);

module.exports = router;