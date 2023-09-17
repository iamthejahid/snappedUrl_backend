const UserLoginInforamtion = require('./login_model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.loginUser = async (req, res) => {
  try {
    const {
      fcm_token,
      email,
      password,
    } = req.body;

    let user = await UserLoginInforamtion.findOne({
      email
    });

    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });

    user.last_login_time = Date.now();
    user.fcm_token = fcm_token;

    // await loginUser.save();
    await user.save();

    const expirationInSeconds = 90 * 24 * 60 * 60; // 90 days * 24 hours * 60 minutes * 60 seconds

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: expirationInSeconds,
    });



    res.status(200).json({
      message: `Login successful`,
      token : token,
    });
  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error });
  }
};
