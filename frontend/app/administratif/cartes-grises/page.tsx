"use client"

import { useEffect, useState } from 'react'

export default function CartesGrisesForm() {
  const [vehicles, setVehicles] = useState<Array<any>>([])
  const [vehicleId, setVehicleId] = useState<string>('')
  const [number, setNumber] = useState('')
  const [startDate, setStartDate] = useState('2025-12-31')
  const [endDate, setEndDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // try to load vehicles if backend exposes them
    fetch('/api/vehicles')
      .then(r => r.ok ? r.json() : Promise.reject('no'))
      .then(data => setVehicles(data))
      .catch(() => setVehicles([]))
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('number', number)
    fd.append('startDate', startDate)
    fd.append('endDate', endDate)
    if (file) fd.append('attachment', file)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/cartes-grises', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Carte grise enregistrée avec succès')
      setVehicleId('')
      setNumber('')
      setStartDate('2025-12-31')
      setEndDate('')
      setFile(null)
      setComment('')
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Cartes grises</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Véhicule</label>
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">-- Sélectionner un véhicule --</option>
            {vehicles.length === 0 ? (
              <option value="">Aucun véhicule disponible</option>
            ) : (
              vehicles.map((v: any) => <option key={v.id} value={v.id}>{v.registration || v.name || v.id}</option>)
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Informations générales — Numéro</label>
          <input value={number} onChange={e => setNumber(e.target.value)} className="w-full p-2 rounded border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachement</label>
          <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full" />
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
