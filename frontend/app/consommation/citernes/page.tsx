"use client"
import React, { useState } from 'react'

export default function CiternesPage() {
  const [vehicle, setVehicle] = useState('')
  const [date, setDate] = useState('2025-12-31')
  const [volume, setVolume] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [provider, setProvider] = useState('')
  const [comment, setComment] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('vehicle', vehicle)
    fd.append('date', date)
    fd.append('volume', String(volume))
    fd.append('amount', String(amount))
    fd.append('provider', provider)
    fd.append('comment', comment)
    await fetch('/api/consommation/citernes', { method: 'POST', body: fd })
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Citernes</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <label>
            <div className="text-sm text-slate-600">Véhicule</div>
            <input value={vehicle} onChange={e => setVehicle(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>
          <label>
            <div className="text-sm text-slate-600">Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label>
            <div className="text-sm text-slate-600">Volume (L)</div>
            <input type="number" step="0.01" value={volume} onChange={e => setVolume(Number(e.target.value))} className="mt-1 w-full p-2 border rounded" />
          </label>
          <label>
            <div className="text-sm text-slate-600">Montant</div>
            <input type="number" step="0.01" value={amount} onChange={e => setAmount(Number(e.target.value))} className="mt-1 w-full p-2 border rounded" />
          </label>
        </div>
        <label>
          <div className="text-sm text-slate-600">Fournisseur</div>
          <input value={provider} onChange={e => setProvider(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        <label>
          <div className="text-sm text-slate-600">Commentaire</div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  )
}
