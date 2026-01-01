"use client"
import { useState } from 'react'
import axios from '../../lib/axios'
import { safeFetchJson } from '../../lib/safeFetch'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: any) {
    e.preventDefault()
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
    }
  }

  async function quickLogin(role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'DRIVER') {
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
        return
      }
      
    } catch (err: any) {
      setError(formatError(err))
    }
  }

  function formatError(err: any) {
    if (!err) return 'Erreur'
    if (typeof err === 'string') {
      const s = err.trim()
      if (s.startsWith('<')) return 'Unexpected HTML response from server'
      return s
    }
    if (err instanceof Error) {
      const m = String(err.message || '')
      if (m.trim().startsWith('<')) return 'Unexpected HTML response from server'
      return m || 'Erreur'
    }
    // Try common shapes
    if (err?.response?.data?.message) return String(err.response.data.message)
    if (err?.message) {
      const m = String(err.message)
      if (m.trim().startsWith('<')) return 'Unexpected HTML response from server'
      return m
    }
    if (err?.error) return String(err.error)
    return 'Erreur'
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Connexion</h2>
        {error ? <div className="text-red-600 mb-2">{error}</div> : null}
        <label className="block mb-2">
          <div className="text-sm">Email</div>
          <input className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">
          <div className="text-sm">Mot de passe</div>
          <input type="password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
          <div className="space-x-2">
            <button type="button" onClick={() => quickLogin('SUPER_ADMIN')} className="bg-gray-800 text-white px-2 py-1 rounded text-xs">Super</button>
            <button type="button" onClick={() => quickLogin('ADMIN')} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">Admin</button>
            <button type="button" onClick={() => quickLogin('STAFF')} className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Staff</button>
            <button type="button" onClick={() => quickLogin('DRIVER')} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Driver</button>
          </div>
        </div>
      </form>
    </div>
  )
}
