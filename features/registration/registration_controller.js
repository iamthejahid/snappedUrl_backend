
const bcrypt = require("bcryptjs");
const otpService = require('../../services/otp_controller');
const UserLoginInformation = require('../../model/user_model');



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
      user = new UserLoginInformation({
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

      res.status(200).json({
        message: `User created with id: ${user.id}`
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
        message: `OTP resend to your email`
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
      email,
      otp
    } = req.body;

    let user = await UserLoginInformation.findOne({
      email
    });

    if (user != null) {

      if (user.otp == otp) {
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