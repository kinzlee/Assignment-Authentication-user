export default function LoadingSpinner({ 
  size = 'medium', 
  text = 'Loading...', 
  overlay = true,
  color = 'blue' 
}) {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }

  const colors = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600'
  }

  const content = (
    <div className="text-center">
      <div className={`animate-spin rounded-full border-b-2 ${colors[color]} mx-auto mb-4 ${sizes[size]}`}></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  )

  if (overlay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}