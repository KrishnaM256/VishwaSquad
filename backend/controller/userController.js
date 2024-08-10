const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/userModel')
const { ApiError } = require('../utils/ApiError')

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
  res.status(200).json({ message: 'Login user' })
})

// update user profile

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'update user' })
})

module.exports = { registerUser, loginUser, updateUserProfile }
