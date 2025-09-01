'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserCheck } from 'lucide-react'
import { AuthLayout } from '../components/layout'
import { RegisterForm } from '../components/forms'
import { useAuth } from '../contexts'
import { useAuthOperations } from '../hooks'

export default function RegisterPage() {
  const router = useRouter()
  const auth = useAuth()
  const { register, loading, error } = useAuthOperations(auth)
  const [isRegistering, setIsRegistering] = useState(false)

  
  const user = auth?.user || null
  const authLoading = auth?.loading || false
  const isInitialized = auth?.isInitialized || false

  
  useEffect(() => {
    if (isInitialized && user && !isRegistering) {
      console.log('User already authenticated, redirecting to profile')
      router.replace('/profile')
    }
  }, [isInitialized, user, isRegistering, router])

  const handleRegister = async (formData) => {
    setIsRegistering(true)
    try {
      console.log('Starting registration with:', formData)
      const userData = await register(formData)
      console.log('Registration successful:', userData)
      
      
      console.log('Manually navigating to profile')
      window.location.href = '/profile'
    } catch (err) {
      console.error('Registration failed:', err)
      setIsRegistering(false)
    }
  }

  const handleNavigateToLogin = () => {
    router.replace('/login')
  }

  
  if (!isInitialized || authLoading) {
    return (
      <AuthLayout variant="blue">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </AuthLayout>
    )
  }

  
  if (user && !isRegistering) {
    return (
      <AuthLayout variant="blue">
        <div className="text-center py-8">
          <p className="text-gray-600">Redirecting to profile...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join us today and get started"
      variant="blue"
    >
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <UserCheck className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      <RegisterForm 
        onSubmit={handleRegister} 
        loading={loading || isRegistering} 
        error={error}
      />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={handleNavigateToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}