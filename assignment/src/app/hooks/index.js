'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { apiService } from '../services'


export function useForm(initialValues, validationFn) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (onSubmit) => {
    if (validationFn) {
      const validationErrors = validationFn(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }

    setIsSubmitting(true)
    setErrors({})
    
    try {
      await onSubmit(values)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setErrors
  }
}


export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = useCallback(async (apiCall) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = () => {
    setLoading(false)
    setError(null)
    setData(null)
  }

  return { loading, error, data, execute, reset }
}


export function useStorage(key, defaultValue, storageType = 'session') {
  const [storedValue, setStoredValue] = useState(defaultValue)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storage = storageType === 'local' ? localStorage : sessionStorage
        const item = storage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error(`Error reading from ${storageType}Storage:`, error)
      }
    }
  }, [key, storageType])

  const setValue = (value) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        const storage = storageType === 'local' ? localStorage : sessionStorage
        storage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error writing to ${storageType}Storage:`, error)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(defaultValue)
      if (typeof window !== 'undefined') {
        const storage = storageType === 'local' ? localStorage : sessionStorage
        storage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing from ${storageType}Storage:`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}


export function useAuthOperations(authContext) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (formData) => {
    setLoading(true)
    setError('')

    try {
      const users = await apiService.getUsers()
      const user = users.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase()
      )

      if (!user) {
        throw new Error('User not found. Please register first.')
      }

      if (authContext?.login) {
        authContext.login(user)
      }
      return user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    setLoading(true)
    setError('')

    try {
      const userData = await apiService.createUser(formData)
      if (authContext?.register) {
        authContext.register(userData)
      }
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, register, loading, error }
}


export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function usePrevious(value) {
  const ref = useRef()
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}

//  window sizing
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}