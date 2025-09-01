import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../app/contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auth App - Register & Login',
  description: 'A Next.js authentication application with GoRest API integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}