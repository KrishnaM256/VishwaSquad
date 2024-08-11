import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { clearErrors,clearSuccess } from '../../slices/userSlice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch()
const navigate = useNavigate()
  const { error, success } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      navigate('/')
      toast.success(success)
      dispatch(clearSuccess())

    }
  }, [error, success])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
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
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="ipContainer">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>
      </form>
      <Link to={'/register'}>New User?</Link>
      <Link to={'/forgotPassword'}>Forgot Password?</Link>
    </div>
  )
}

export default Login
