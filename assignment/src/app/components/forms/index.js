export { default as RegisterForm } from '../forms/RegistrationForm'
export { default as LoginForm } from './SigninForm'


export const FormWrapper = ({ children, title, subtitle, icon }) => (
  <div className="text-center mb-8">
    {icon && (
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
    )}
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    <div className="mt-8">
      {children}
    </div>
  </div>
)


export const FormField = ({ children, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {children}
  </div>
)

export const FormDivider = ({ text = 'or' }) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">{text}</span>
    </div>
  </div>
)