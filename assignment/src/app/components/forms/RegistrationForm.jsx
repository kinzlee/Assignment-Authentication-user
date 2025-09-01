'use client'

import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button, Input, Alert } from '../ui'
import { validateRegistrationForm } from '../../services'

export default function RegisterForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateRegistrationForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    onSubmit(formData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        icon={<User className="w-5 h-5" />}
        placeholder="Enter your full name"
        disabled={loading}
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        icon={<Mail className="w-5 h-5" />}
        placeholder="Enter your email"
        disabled={loading}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          disabled={loading}
          className="form-input"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <Input
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        icon={<Lock className="w-5 h-5" />}
        placeholder="Create a password"
        disabled={loading}
        required
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        icon={<Lock className="w-5 h-5" />}
        placeholder="Confirm your password"
        disabled={loading}
        required
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
      />

      {error && <Alert type="error">{error}</Alert>}

      <Button
        type="submit"
        loading={loading}
        variant="primary"
        className="w-full"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  )
}