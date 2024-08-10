import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../slices/userSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { status, error, success } = useSelector((state) => state.user)
  const { token } = useParams()

  const handleResetPassword = () => {
    dispatch(resetPassword({ token, password }))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
    }
  }, [error, success])

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your new password"
      />
      <button onClick={handleResetPassword}>
        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
  )
}

export default ResetPassword
