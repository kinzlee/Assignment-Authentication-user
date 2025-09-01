'use client'

import { createContext, useState, useEffect, useContext } from 'react'


const AuthContext = createContext(null)



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = sessionStorage.getItem('user')
          console.log('Loading stored user:', storedUser) 
          
          if (storedUser && storedUser !== 'null') {
            const parsedUser = JSON.parse(storedUser)
            console.log('Parsed user:', parsedUser)
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error('Error loading user from sessionStorage:', error)
      
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('user')
        }
      } finally {
        setLoading(false)
        setIsInitialized(true)
      }
    }

  
    const timer = setTimeout(initializeAuth, 150)
    return () => clearTimeout(timer)
  }, [])

  const login = (userData) => {
    console.log('Login called with:', userData) 
    
    if (!userData) {
      console.error('Login called with invalid userData')
      return
    }

    setUser(userData)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('user', JSON.stringify(userData))
        console.log('User saved to sessionStorage') 
      } catch (error) {
        console.error('Error saving user to sessionStorage:', error)
      }
    }
  }

  const logout = () => {
    console.log('Logout called') 
    setUser(null)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('user')
      } catch (error) {
        console.error('Error removing user from sessionStorage:', error)
      }
    }
  }

  const register = (userData) => {
    console.log('Register called with:', userData) 
    
    if (!userData) {
      console.error('Register called with invalid userData')
      return
    }

    setUser(userData)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('user', JSON.stringify(userData))
        console.log('User registered and saved to sessionStorage') 
      } catch (error) {
        console.error('Error saving user to sessionStorage:', error)
      }
    }
  }

  const contextValue = {
    user,
    login,
    logout,
    register,
    loading,
    isInitialized,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext)
  
  
  if (context === undefined) {
    console.warn('useAuth called outside of AuthProvider')
    return {
      user: null,
      login: () => {},
      logout: () => {},
      register: () => {},
      loading: false,
      isInitialized: false,
      isAuthenticated: false
    }
  }
  
  return context
}


const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { ...notification, id }])
    
  
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  
  if (context === undefined) {
    console.warn('useApp called outside of AppProvider')
    return {
      theme: 'light',
      setTheme: () => {},
      notifications: [],
      addNotification: () => {},
      removeNotification: () => {}
    }
  }
  
  return context
}