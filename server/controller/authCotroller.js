require("dotenv").config();
const User = require("../db/models/user");
const { OAuth2Client } = require("google-auth-library");
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

const handleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
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
      });
      await user.save();
    }
    // For now, just return the user info
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleLogin };
