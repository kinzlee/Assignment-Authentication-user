'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { useAuth } from '../contexts'
import { apiService } from '../services'
import { LoadingSpinner, Card, Badge, Alert } from '../components/ui'

export default function ProfilePage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
  const auth = useAuth()
  const router = useRouter()

  
  const user = auth?.user || null
  const logout = auth?.logout || (() => {})
  const authLoading = auth?.loading || false
  const isInitialized = auth?.isInitialized || false

  useEffect(() => {
    console.log('Profile page - Auth state:', { 
      user: !!user, 
      authLoading, 
      isInitialized,
      hasCheckedAuth 
    })

    
    if (isInitialized && !authLoading && !hasCheckedAuth) {
      setHasCheckedAuth(true)
      
      if (!user) {
        console.log('No user found on profile page, redirecting to login')
  
        window.location.href = '/login'
        return
      }
    }

    
    if (user && isInitialized && loading) {
      console.log('User found, fetching users list')
      const fetchUsers = async () => {
        try {
          const userData = await apiService.getUsers()
          console.log('Users fetched:', userData.length)
          setUsers(userData.slice(0, 12))
        } catch (err) {
          console.error('Error fetching users:', err)
          setError('Failed to fetch user data')
        } finally {
          setLoading(false)
        }
      }

      fetchUsers()
    }
  }, [user, authLoading, isInitialized, hasCheckedAuth, loading])

  const handleLogout = () => {
    console.log('Logout button clicked')
    logout()
    
    window.location.href = '/login'
  }

  
  if (!isInitialized || authLoading) {
    return <LoadingSpinner text="Checking authentication..." />
  }

  
  if (!hasCheckedAuth) {
    return <LoadingSpinner text="Verifying access..." />
  }

  
  if (!user) {
    return <LoadingSpinner text="Redirecting to login..." />
  }

  
  if (loading) {
    return (
      <div className="gradient-bg-purple">
        <div className="container mx-auto px-4 py-8">
          
          <Card className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-purple-600">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {user?.name || 'User'}!
                  </h1>
                  <p className="text-gray-600">{user?.email || 'No email'}</p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="capitalize">{user?.status || 'Unknown'}</span> • 
                    Gender: <span className="capitalize">{user?.gender || 'Unknown'}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner text="Loading users..." overlay={false} />
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="gradient-bg-purple">
      <div className="container mx-auto px-4 py-8">
        {/* User Header Card */}
        <Card className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-purple-600">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">{user?.email || 'No email'}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className="capitalize">{user?.status || 'Unknown'}</span> • 
                  Gender: <span className="capitalize">{user?.gender || 'Unknown'}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </Card>

        {/* Users Directory Card */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">User Directory</h2>
            <Badge variant="success">{users.length} Users</Badge>
          </div>
          
          {error && <Alert type="error" className="mb-6">{error}</Alert>}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((userData, index) => (
              <div 
                key={userData?.id || `user-${index}`} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {userData?.name || 'Unknown User'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {userData?.email || 'No email'}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 capitalize">
                    {userData?.gender === 'male' ? '👨' : userData?.gender === 'female' ? '👩' : '👤'} {userData?.gender || 'Unknown'}
                  </span>
                  <Badge 
                    variant={userData?.status === 'active' ? 'success' : 'default'}
                    className="capitalize"
                  >
                    {userData?.status || 'Unknown'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && !error && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}