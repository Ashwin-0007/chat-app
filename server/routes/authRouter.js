const express = require("express"); 
const { handleLogin, handleGoogleLogin, handleSignup } = require("../controller/authCotroller");
const router = express.Router();

router.post('/login', handleLogin);
router.post ('/google-login', handleGoogleLogin);
router.post ('/signup', handleSignup);

module.exports = router;