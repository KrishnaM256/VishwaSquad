const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/userModel')
const { ApiError } = require('../utils/ApiError')
const { ApiResponse } = require('../utils/ApiResponse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// register user

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, address, city, state, password } =
    req.body
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !address ||
    !city ||
    !state ||
    !password
  ) {
    return res.status(500).json(new ApiError(500, 'All fields are mandatory'))
  }
  const oldUser = await User.findOne({ email })
  if (oldUser) {
    return res.status(500).json(new ApiError(500, 'User already exist'))
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_PRIVATEKEY, {
    expiresIn: '5d',
  })
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  })
  res
    .status(200)
    .json(new ApiResponse(200, newUser, 'Registered successfully!'))
})

// login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATEKEY, {
      expiresIn: '5d',
    })
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    })
    res.status(200).json(new ApiResponse(200, user, 'Login successfully!'))
  } else
    res
      .status(500)
      .json(new ApiResponse(500, {}, 'Email or Password is invalid'))
})

//log out user

const logoutUser = asyncHandler(async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).send({ message: 'Please login' })
  }
  res.cookie('token', null, { httpOnly: true, expires: new Date(Date.now()) })
  res.status(200).json(new ApiResponse(200, {}, 'Log out successfully!'))
})

//forgot password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: 'Please enter email' })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' })
  }
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`
  const subject = 'Password Reset Request'
  const message = `Dear ${user.firstName},\n\nWe received a request to reset your password. You can reset your password by clicking the link below:\n\n${resetURL}\n\nIf you did not request a password reset, please disregard this email.\n\nThank you,\nSahaya`
  try {
    sendMail({ email, subject, message })
    res.status(200).json(new ApiResponse(200, {}, 'Email sent successfully!'))
  } catch (e) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save({ validateBeforeSave: false })
    res.status(400).json(new ApiResponse(200, {}, 'Failed to send mail'))
  }
})
// update user profile

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'update user' })
})

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
}
