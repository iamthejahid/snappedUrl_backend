
const bcrypt = require("bcryptjs");
const otpService = require('../../services/otp_controller');
const UserLoginInformation = require('../../model/user_model');
const Counter = require('./user_counter_model');





exports.registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      fcm_token,
      full_name,
    } = req.body;

    let user = await UserLoginInformation.findOne({
      email
    });

    if (user != null) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    } else {
      const counter = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      user = new UserLoginInformation({
        user_id: counter.sequence_value,
        email,
        password,
        fcm_token,
        full_name,
      });

      //saving password
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_COST_FACTOR));
      user.password = await bcrypt.hash(String(password), salt);


      const randomNumber = Math.floor(1000 + Math.random() * 9000);;
      user.otp = randomNumber;

      await user.save();
      otpService.sendEmailOTP(user.email, user.otp, full_name);

      res.status(201).json({
        message: `User created`,
        data: {
          "user_name": user.full_name,
          "user_id": user.user_id
        }

      });

    }

  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.otpResend = async (req, res) => {
  try {
    const {
      email
    } = req.body;

    let user = await UserLoginInformation.findOne({
      email
    });

    if (user != null) {
      otpService.sendEmailOTP(user.email, user.otp, user.full_name, true);

      res.status(201).json({
        message: `OTP resend to your email`,
        data: {
          "user_name": user.full_name,
          "user_id": user.user_id
        }
      });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }

  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error.message });
  }
}


exports.otpCheck = async (req, res) => {
  try {
    const {
      id,
      otp
    } = req.body;

    let user = await UserLoginInformation.findOne({
      id
    });

    if (user != null) {
      if (user.otp == otp) {
        user.is_verified = true;
        await user.save();
        res.status(201).json({
          message: "OTP successful",
          isVerified: true
        });

        // save in user's information too!
      } else {
        res.status(400).json({
          message: "OTP Is not correct",

        });
      }
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }

  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error.message });
  }
}