import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, loginUser } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { error, success } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: '',
  })

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
    }
  }, [error, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(formData))
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
        <button type="submit" className="submit">
          Send Email
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
