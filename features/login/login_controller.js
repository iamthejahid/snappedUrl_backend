const UserLoginInformation = require('../../model/user_model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const loginUserSchema = require('./schema/login_schema');

exports.loginUser = async (req, res) => {

  const { error, value } = loginUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


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

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: expirationInSeconds,
    });

    if (!user.is_verified) {
      return res.status(201).json({
        "otp_verified": false,
        message: `Please verify first!`,
        data: {
          "user_id": user.user_id,
        }
      });
    }



    return res.status(201).json({
      message: `Login successful`,
      data: {
        token: token,
        "user_info": {
          "user_id": user.user_id,
          "email": user.email,
        }
      }
    });
  } catch (error) {
    console.error('Error while checking version:', error);
    return res.status(500).json({ message: error });
  }
};
