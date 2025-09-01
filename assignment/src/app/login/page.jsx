'use client'

import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { AuthLayout } from '../components/layout'
import { LoginForm } from '../components/forms'
import { useAuth } from '../contexts'
import { useAuthOperations } from '../hooks'

export default function LoginPage() {
  const router = useRouter()
  const auth = useAuth()
  const { login, loading, error } = useAuthOperations(auth)

  const handleLogin = async (formData) => {
    try {
      await login(formData)
      router.push('/profile')
    } catch (err) {
      // Error handler
    }
  }

  const handleNavigateToRegister = () => {
    router.push('/register')
  }

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account"
      variant="green"
    >
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <LoginForm 
        onSubmit={handleLogin} 
        loading={loading} 
        error={error}
      />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleNavigateToRegister}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Create one
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}