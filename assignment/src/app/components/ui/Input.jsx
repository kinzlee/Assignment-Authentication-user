import { useState } from 'react'

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  rightIcon,
  placeholder,
  disabled = false,
  required = false,
  className = ''
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            form-input 
            ${icon ? 'pl-10' : 'pl-4'} 
            ${rightIcon ? 'pr-12' : 'pr-4'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${focused ? 'ring-2' : ''}
          `}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}