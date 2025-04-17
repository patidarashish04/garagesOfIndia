const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const { sendOTP } = require('../utils/twilioClient');
const generateOTP = require('../utils/generateOTP');


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true, //can't be accessed or modified by browser
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //send cookie only on HTTPS conn.

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined; // Remove password field from created User

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'Name, email, and password are required.',
  //   });
  // }
  // Check if user with the given email already exists
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   return res.status(409).json({
  //     status: 'fail',
  //     message: 'Email already exists.',
  //   });
  // }
  // const user =Object.keys(req.body).filter(field=>field!=='role');
  const newUser = await User.create({
    name: req.body.name,
    // email: req.body.email,
    phone: req.body.phone,
    // gender: req.body.gender,
    // dob: req.body.dob,
    // photo: req.body.photo,
    // occupation: req.body.occupation,
    // address: req.body.address,
    // password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  // if (!email || !password) {
  //   return next(new AppError('Please provide email and password!', 400));
  // }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Send JWT to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 24 * 1000 * 60),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token from headers
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }
         
  // 2) Token Verification - payload & expiry
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes('admin') && userRole === 'admin') {
      next(); //need to pass admin doc filter
    } else if (req.method === 'POST' && userRole === roles[0]) {
      req.docFilter = { [userRole]: req.user.id };
      return next();
    }
    if (roles.includes(userRole)) {
      req.docFilter = { [userRole]: req.user.id };
      return next();
    }
    return next(new AppError('You do not have permission to perform this action', 403));
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`No user found with email ${req.body.email}`, 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request before 10 minutes with your New password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  console.warn('message:-', message);

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token ⚠️',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordReset = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!'), 500);
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');
// console.log(user)
// 2) Check if POSTed current password is correct
if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
  return next(new AppError('Your current password is wrong.', 401));
}

// 3) Update password
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
// console.log('==',user)
  // 4) Send JWT to client
  createSendToken(user, 200, res);
});


exports.requestOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + process.env.OTP_EXPIRY * 60000); // OTP expires in X minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    const twilioResponse = await sendOTP(phone, otp);
    if (!twilioResponse.success) {
      return res.status(500).json({ message: "OTP sending failed", error: twilioResponse.error });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2️⃣ Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};