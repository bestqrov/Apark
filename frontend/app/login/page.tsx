"use client"
import { useState } from 'react'
import axios from '../../lib/axios'
import { safeFetchJson } from '../../lib/safeFetch'
import { Truck, Lock, Mail, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function submit(e: any) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:3001/api'
      const data = await safeFetchJson(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const token = data.access
      localStorage.setItem('access_token', token)
      // decode token and set user/company
      try {
        const { decodeToken } = await import('../../lib/jwt')
        const payload = decodeToken(token)
        if (payload) {
          localStorage.setItem('user', JSON.stringify({ id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId }))
          if (payload.companyId) localStorage.setItem('companyId', payload.companyId)
        }
      } catch (e) {}
      try { document.cookie = `access_token=${token}; path=/` } catch (e) {}
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(formatError(err))
      setIsLoading(false)
    }
  }

  async function quickLogin(role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'DRIVER') {
    setIsLoading(true)
    const creds: Record<string, { email: string; password: string }> = {
      SUPER_ADMIN: { email: 'super@demo.com', password: 'password' },
      ADMIN: { email: 'admin@demo.com', password: 'password' },
      STAFF: { email: 'staff@demo.com', password: 'password' },
      DRIVER: { email: 'driver@demo.com', password: 'password' },
    }
    const c = creds[role]
    setEmail(c.email)
    setPassword(c.password)
    // attempt direct login using same flow as submit
    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:3001/api'
      try {
        const data = await safeFetchJson(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: c.email, password: c.password }),
        })
        const token = data.access
        localStorage.setItem('access_token', token)
        try {
          const { decodeToken } = await import('../../lib/jwt')
          const payload = decodeToken(token)
          if (payload) {
            localStorage.setItem('user', JSON.stringify({ id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId }))
            if (payload.companyId) localStorage.setItem('companyId', payload.companyId)
          }
        } catch (e) {}
        try { document.cookie = `access_token=${token}; path=/` } catch (e) {}
        window.location.href = '/dashboard'
        return
      } catch (err: any) {
        setError(err?.message || err?.error || 'Login failed')
        setIsLoading(false)
        return
      }
      
    } catch (err: any) {
      setError(formatError(err))
      setIsLoading(false)
    }
  }

  function formatError(err: any) {
    if (!err) return 'Erreur'
    if (typeof err === 'string') {
      const s = err.trim()
      if (s.startsWith('<')) return 'Réponse inattendue du serveur'
      return s
    }
    if (err instanceof Error) {
      const m = String(err.message || '')
      if (m.trim().startsWith('<')) return 'Réponse inattendue du serveur'
      return m || 'Erreur'
    }
    // Try common shapes
    if (err?.response?.data?.message) return String(err.response.data.message)
    if (err?.message) {
      const m = String(err.message)
      if (m.trim().startsWith('<')) return 'Réponse inattendue du serveur'
      return m
    }
    if (err?.error) return String(err.error)
    return 'Erreur'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg">
                <Truck className="w-10 h-10 text-blue-600 dark:text-blue-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">ArwaPark</h1>
            <p className="text-center text-blue-100 dark:text-blue-200 text-sm">Gestion de Transport Professionnel</p>
          </div>

          {/* Form Section */}
          <form onSubmit={submit} className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Bienvenue</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Connectez-vous à votre compte</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                <div className="text-red-600 dark:text-red-400 text-sm flex-1">{error}</div>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Mot de passe oublié?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Quick Login Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">Connexion rapide (Demo)</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin('SUPER_ADMIN')}
                  disabled={isLoading}
                  className="px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('ADMIN')}
                  disabled={isLoading}
                  className="px-3 py-2 bg-indigo-600 dark:bg-indigo-700 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('STAFF')}
                  disabled={isLoading}
                  className="px-3 py-2 bg-yellow-500 dark:bg-yellow-600 text-white text-xs font-medium rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors disabled:opacity-50"
                >
                  Staff
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('DRIVER')}
                  disabled={isLoading}
                  className="px-3 py-2 bg-green-600 dark:bg-green-700 text-white text-xs font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  Chauffeur
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              © 2026 ArwaPark. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
