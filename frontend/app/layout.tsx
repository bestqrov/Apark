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
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {hideShell ? (
              <main className="p-4">{children}</main>
            ) : (
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1">
                  <Topbar />
                  <main className="p-4">{children}</main>
                </div>
              </div>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
