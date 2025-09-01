// API Configuration
const API_BASE_URL = 'https://gorest.co.in/public/v2'

// Validation Messages
const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match'
}

// Mock users database
let mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "male",
    status: "active"
  },
  {
    id: 2,
    name: "Jane Smith", 
    email: "jane.smith@example.com",
    gender: "female",
    status: "active"
  }
]

// Validation Functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRegistrationForm = (formData) => {
  const errors = {}

  if (!formData.name.trim()) {
    errors.name = VALIDATION_MESSAGES.REQUIRED
  }

  if (!formData.email.trim()) {
    errors.email = VALIDATION_MESSAGES.REQUIRED
  } else if (!validateEmail(formData.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED
  } else if (formData.password.length < 6) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_TOO_SHORT
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH
  }

  return errors
}

export const validateLoginForm = (formData) => {
  const errors = {}

  if (!formData.email.trim()) {
    errors.email = VALIDATION_MESSAGES.REQUIRED
  } else if (!validateEmail(formData.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED
  }

  return errors
}

// API Service
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async createUser(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => 
      u.email.toLowerCase() === userData.email.toLowerCase()
    )
    
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

  
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      gender: userData.gender || 'male',
      status: 'active'
    }

    // Add to mock database
    mockUsers.push(newUser)
    
    return newUser
  }

  async getUsers() {
    try {
      // fetch users from goRest API
      const response = await fetch(`${this.baseURL}/users`)
      
      if (response.ok) {
        const realUsers = await response.json()
        // Combine users with mock users
        return [...mockUsers, ...realUsers.slice(0, 8)]
      } else {
        // Fallback to mock users if API fails
        return mockUsers
      }
    } catch (error) {
      console.log('API fetch failed, using mock data:', error.message)
      return mockUsers
    }
  }

  async getUserById(id) {
    // Check mock users first
    const mockUser = mockUsers.find(u => u.id === id)
    if (mockUser) {
      return mockUser
    }

    // real API
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      return response.json()
    } catch (error) {
      throw new Error('User not found')
    }
  }
}

export const apiService = new ApiService()

// Routes Configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile'
}