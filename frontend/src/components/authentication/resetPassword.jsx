import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, clearSuccess, resetPassword } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const { token } = useParams() // Get the reset token from the URL

  const { error, success } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      toast.success(success)
      dispatch(clearSuccess())
    }
  }, [error, success, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!")
      return
    }
    dispatch(resetPassword({ token, password: formData.password }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="form">
        <div className="ipContainer">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ipContainer">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
