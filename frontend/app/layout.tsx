"use client"
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { AuthProvider } from '../lib/auth'
import { usePathname } from 'next/navigation'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideShell = pathname === '/login' || pathname === '/forgot-password' || pathname === '/reset-password'

  return (
    <html lang="fr">
      <head>
        <title>ArwaPark</title>
        <meta name="description" content="ArwaPark - Gestion de parc automobile" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {hideShell ? (
              <main className="p-4">{children}</main>
            ) : (
              <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 w-full md:w-auto">
                  <Topbar />
                  <main className="p-4 md:p-6">{children}</main>
                </div>
              </div>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
