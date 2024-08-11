import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAlert } from '../../slices/authoritySlice'
import { toast } from 'react-toastify'

const AddAlert = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const token = localStorage.getItem('token')
  console.log(token)

  const handleAddAlert = (e) => {
    e.preventDefault()

    if (role !== 'authorizer') {
      setError('You do not have permission to add alerts.')
      return
    }

    if (!message.trim()) {
      setError('Message cannot be empty')
      return
    }

    dispatch(addAlert({ message }))
      .unwrap()
      .then(() => {
        setSuccess('Alert added successfully!')
        setMessage('')
        setError('')
      })
      .catch(() => {
        setError('Failed to add alert')
      })
  }

  return (
    <div>
      {role !== 'authorizer' ? (
        <p>You do not have permission to add alerts.</p>
      ) : (
        <form style={{ marginTop: '10rem' }} onSubmit={handleAddAlert}>
          <input
            style={{ border: '2px solid black' }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter alert message"
          />
          <button type="submit">Add</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      )}
    </div>
  )
}

export default AddAlert
