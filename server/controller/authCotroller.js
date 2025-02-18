require("dotenv").config();
const User = require("../db/models/user");
const { OAuth2Client } = require("google-auth-library");
const AppError = require("../utils/AppError");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google Token
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const handleGoogleLogin = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
      return next(new AppError("Token is required", 400));
    }

    // Verify the Google token
    const googleUser = await verifyGoogleToken(token);

    // Check if the user already exists in the database
    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId: googleUser.sub,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        name: googleUser.name,
        email: googleUser.email,
        profilePicture: googleUser.picture,
        provider: 'google',
      });
      await user.save();
    }

    const userToken = generateToken({
      id: user.id,
    });

    return res.json({
      status: "succes",
      userToken,
    });
};

const handleSignup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let user = await User.findOne({ where: {email} });

  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Save the new user
  await user.save();

  // Check if user was successfully saved
  if (!user) {
    return next(new AppError("Failed to create new user", 400));
  }
  const result = user.toJSON();
  result.token = generateToken({
    id: user.id,
  });

  return res.status(201).json({
    status: "success",
    data: result,
  });
};

const handleLogin = async(req, res, next) => {
  const {email, password} = req.body;

  if(!email || !password){
    return next(new AppError("Please provide valid email and passowrd", 400));
  }

  const result = await User.findOne({where: {email}});

  if (!result || !result.password) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // Compare the password
  const isPasswordMatch = await bcrypt.compare(password, result.password);
  if (!isPasswordMatch) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  result.password = undefined;

  return res.json({
    status: "succes",
    token,
  });
}

module.exports = { handleGoogleLogin, handleSignup, handleLogin};
