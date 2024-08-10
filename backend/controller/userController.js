const asyncHandler = require('../utils/asyncHandler')

// register user

export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register user' })
})

// login user

export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Login user' })
})

// update user profile

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'update user' })
})
