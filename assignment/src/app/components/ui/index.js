export { default as Button } from './Button'
export { default as Input } from './Input'
export { default as LoadingSpinner } from './LoadingSpinner'


export const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
)

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700'
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export const Alert = ({ children, type = 'info', className = '' }) => {
  const types = {
    info: 'bg-blue-50 border-blue-200 text-blue-600',
    success: 'bg-green-50 border-green-200 text-green-600',
    error: 'bg-red-50 border-red-200 text-red-600',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  }

  return (
    <div className={`border px-4 py-3 rounded-lg ${types[type]} ${className}`}>
      {children}
    </div>
  )
}

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}