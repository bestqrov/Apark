"use client"

import { useEffect, useState } from 'react'

export default function ExtincteursForm() {
  const [fleets, setFleets] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])

  const [number, setNumber] = useState('')
  const [volume, setVolume] = useState('')
  const [kg, setKg] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('2025-12-31')
  const [fleetId, setFleetId] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/fleets')
      .then(r => r.ok ? r.json() : [])
      .then(d => setFleets(d))
      .catch(() => setFleets([]))

    fetch('/api/suppliers')
      .then(r => r.ok ? r.json() : [])
      .then(d => setSuppliers(d))
      .catch(() => setSuppliers([]))
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const fd = new FormData()
    fd.append('number', number)
    fd.append('volume', volume)
    fd.append('kg', kg)
    fd.append('purchaseDate', purchaseDate)
    fd.append('fleetId', fleetId)
    fd.append('supplierId', supplierId)
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/extincteurs', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Extincteur enregistré')
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Extincteur</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Numéro</label>
          <input value={number} onChange={e => setNumber(e.target.value)} className="w-full p-2 rounded border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
            <input value={volume} onChange={e => setVolume(e.target.value)} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">KG</label>
            <input value={kg} onChange={e => setKg(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'achat</label>
            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="w-full p-2 rounded border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flotte</label>
            <select value={fleetId} onChange={e => setFleetId(e.target.value)} className="w-full p-2 rounded border">
              <option value="">Choisir</option>
              {fleets.map(f => <option key={f.id} value={f.id}>{f.name || f.id}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Choisir</option>
            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name || s.id}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachement</label>
          <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full p-2 rounded border" rows={4} />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-green-600">{message}</div>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Envoi...' : 'Enregistrer'}</button>
        </div>
      </form>
    </div>
  )
}
