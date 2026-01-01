"use client"
import React, { useState } from 'react'

export default function RechargesCiternesPage() {
  const [tank, setTank] = useState('')
  const [date, setDate] = useState('2025-12-31')
  const [volume, setVolume] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('tank', tank)
    fd.append('date', date)
    fd.append('volume', String(volume))
    fd.append('amount', String(amount))
    await fetch('/api/consommation/recharges-citernes', { method: 'POST', body: fd })
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Recharges des citernes</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <label>
            <div className="text-sm text-slate-600">Citerne</div>
            <input value={tank} onChange={e => setTank(e.target.value)} className="mt-1 w-full p-2 border rounded" />
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
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  )
}
