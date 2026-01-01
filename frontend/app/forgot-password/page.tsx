"use client"
import { useState } from 'react'
import axios from '../../lib/axios'

export default function ForgotPage() {
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState<string | null>(null)

  async function submit(e:any) {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/forgot-password', { email })
      setInfo('Si le mail existe, un lien de réinitialisation a été envoyé (dev: '+(res.data.link||'')+')')
    } catch (e:any) { setInfo('Erreur') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Mot de passe oublié</h2>
        {info ? <div className="mb-2">{info}</div> : null}
        <label className="block mb-4">
          <div className="text-sm">Email</div>
          <input className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Envoyer</button>
      </form>
    </div>
  )
}
