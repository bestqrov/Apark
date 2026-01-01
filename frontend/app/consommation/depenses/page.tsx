"use client"
import React, { useState } from 'react'

export default function DepensesPage() {
  const [date, setDate] = useState('2025-12-31')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [tva, setTva] = useState<number>(0)
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('date', date)
    fd.append('category', category)
    fd.append('amount', String(amount))
    fd.append('tva', String(tva))
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)
    await fetch('/api/consommation/depenses', { method: 'POST', body: fd })
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Dépenses</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <label>
            <div className="text-sm text-slate-600">Date</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>
          <label>
            <div className="text-sm text-slate-600">Catégorie</div>
            <input value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <label>
            <div className="text-sm text-slate-600">Montant</div>
            <input type="number" step="0.01" value={amount} onChange={e => setAmount(Number(e.target.value))} className="mt-1 w-full p-2 border rounded" />
          </label>
          <label>
            <div className="text-sm text-slate-600">TVA (%)</div>
            <input type="number" value={tva} onChange={e => setTva(Number(e.target.value))} className="mt-1 w-full p-2 border rounded" />
          </label>
          <label>
            <div className="text-sm text-slate-600">Attachement</div>
            <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="mt-1 w-full" />
          </label>
        </div>
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
