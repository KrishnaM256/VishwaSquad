const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
} = require('../controller/userController')

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/logoutUser').post(logoutUser)
router.route('/forgotPassword').post(forgotPassword)

module.exports = router
