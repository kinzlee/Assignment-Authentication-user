export { default as Header } from './Header'
export { default as Footer } from './Footer'


export const PageLayout = ({ children, showHeader = false, showFooter = false }) => (
  <div className="min-h-screen flex flex-col">
    {showHeader && <Header />}
    <main className="flex-1">
      {children}
    </main>
    {showFooter && <Footer />}
  </div>
)


export const AuthLayout = ({ children, title, subtitle, variant = 'blue' }) => {
  const gradients = {
    blue: 'gradient-bg-blue',
    green: 'gradient-bg-green',
    purple: 'gradient-bg-purple'
  }

  return (
    <div className={gradients[variant] + ' flex items-center justify-center p-4'}>
      <div className="card w-full max-w-md">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h1 className="text-3xl font-bold text-gray-900">{title}</h1>}
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export const ProfileLayout = ({ children, user, onLogout }) => {
  
  const safeUser = user || {}
  const userName = safeUser.name || 'User'
  const userEmail = safeUser.email || 'No email'
  const userStatus = safeUser.status || 'Unknown'
  const userGender = safeUser.gender || 'Unknown'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="gradient-bg-purple">
      <div className="container mx-auto px-4 py-8">
        <div className="card mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-purple-600">
                  {userInitial}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h1>
                <p className="text-gray-600">{userEmail}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className="capitalize">{userStatus}</span> • 
                  Gender: <span className="capitalize">{userGender}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}