const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/userModel')
// register user

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register user' })
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
