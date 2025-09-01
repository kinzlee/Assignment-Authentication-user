'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../app/contexts'
import { LoadingSpinner } from './components/ui'

export default function HomePage() {
  const auth = useAuth()
  const router = useRouter()


  const user = auth?.user || null
  const loading = auth?.loading || false
  const isInitialized = auth?.isInitialized || false

  useEffect(() => {
    console.log('Home page - Auth state:', { 
      user: !!user, 
      loading, 
      isInitialized 
    })


    if (isInitialized && !loading) {
      if (user) {  
        console.log('User authenticated, go to user profile')
        router.replace('/profile')
      } else {
        console.log('No user, redirecting to login')
        router.replace('/login')
      }
    }
  }, [user, loading, isInitialized, router])

  // loader for when the app is redirecting
  if (!isInitialized || loading) {
    return <LoadingSpinner text="Loading application..." />
  }
}