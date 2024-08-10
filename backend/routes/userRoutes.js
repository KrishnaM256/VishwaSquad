const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require('../controller/userController')

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/updateUserProfile').post(updateUserProfile)

module.exports = router
