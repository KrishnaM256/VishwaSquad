import React, { useEffect, useState } from 'react'
import './sign.css'
import { indianStates, indianCities } from '../../data'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearErrors,clearSuccess } from '../../slices/userSlice'

const Register = () => {
    
  const dispatch = useDispatch()

  const {  error, success } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    emergencyContacts: [{ phone: '', email: '' }],
    address: '',
    city: '',
    state: '',
    password: '',
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
  }, [error, success])
  const addField = () => {
    setFormData({
      ...formData,
      emergencyContacts: [
        ...formData.emergencyContacts,
        { phone: '', email: '' },
      ],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'emergencyContacts') {
      const { field } = e.target.dataset
      const index = parseInt(e.target.dataset.index, 10)
      const updatedContacts = [...formData.emergencyContacts]
      updatedContacts[index] = { ...updatedContacts[index], [field]: value }
      setFormData({
        ...formData,
        emergencyContacts: updatedContacts,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="form">
        <div className="containerForIps">
          <div className="ipContainer" style={{ marginRight: '1rem' }}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="containerForIps">
          <div className="ipContainer" style={{ marginRight: '1rem' }}>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        {formData.emergencyContacts.map((contact, index) => (
          <div className="containerForIps" key={`emergency-${index}`}>
            <div className="ipContainer" style={{ marginRight: '1rem' }}>
              <label htmlFor={`emergencyContactsPhone${index}`}>
                Emergency Phone {index + 1}:
              </label>
              <input
                type="text"
                name="emergencyContacts"
                data-index={index}
                data-field="phone"
                value={contact.phone}
                onChange={handleChange}
              />
            </div>
            <div className="ipContainer" style={{ marginRight: '1rem' }}>
              <label htmlFor={`emergencyContactsEmail${index}`}>
                Emergency Email {index + 1}:
              </label>
              <input
                type="text"
                name="emergencyContacts"
                data-index={index}
                data-field="email"
                value={contact.email}
                onChange={handleChange}
              />
            </div>
            {index === formData.emergencyContacts.length - 1 && (
              <div key={`plus-${index}`} style={{ marginTop: '2rem' }}>
                <button type="button" className="plus" onClick={addField}>
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="ipContainer">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="containerForIps">
          <div className="ipContainer">
            <label htmlFor="city">City:</label>
            <select
              name="city"
              className="selectField ipContainer1"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Select a city</option>
              {indianCities.map((city, i) => (
                <option key={`city-${i}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="ipContainer">
            <label htmlFor="state">State:</label>
            <select
              name="state"
              className="selectField"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select a state</option>
              {indianStates.map((state, i) => (
                <option key={`state-${i}`} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
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
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Register
