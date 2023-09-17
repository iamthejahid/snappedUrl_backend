const UserLogin = require('./login_model');
const UserRegistration = require('../registration/registration_model');
const bcrypt = require("bcryptjs");


exports.loginUser = async (req, res) => {
  try {
    const {
      device_id,
      fcm_token,
      email,
      password,
      last_login_time,
    } = req.body;

    let user = await UserRegistration.findOne({
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



    // loginUser = new UserLogin(
    //   {
    //     device_id,
    //     fcm_token,
    //     email,
    //     password,
    //   }
    // );

    if (user.device_id !=null &&  !user.device_id.includes(device_id)) {
      user.device_id.push(device_id);
    }
    user.last_device_id = device_id;
    user.last_login_time = Date.now();

    // await loginUser.save();
    await user.save();


    res.status(200).json({
      message: `User created with id: ${user.id}`
    });
  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error });
  }
};
