import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, clearSuccess, forgotPassword } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { error, success } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')

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
    dispatch(forgotPassword({ email }))
  }

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="form">
        <div className="ipContainer">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
