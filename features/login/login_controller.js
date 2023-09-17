const UserLoginInformation = require('../../model/user_model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    const {
      fcm_token,
      email,
      password,
    } = req.body;

    let user = await UserLoginInformation.findOne({
      email
    });

    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(String(password), user.password);

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

    if (!user.is_verified) {
      return res.status(201).json({
        "otp_verified": false,
        message: `Please verify first!`,
        data: {
          token: token,
          "user_info": user
        }
      });
    }



    return res.status(201).json({
      message: `Login successful`,
      data: {
        token: token,
        "user_info": user

      }
    });
  } catch (error) {
    console.error('Error while checking version:', error);
    return res.status(500).json({ message: error });
  }
};
