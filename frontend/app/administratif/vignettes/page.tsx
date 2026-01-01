"use client"

import { useEffect, useState } from 'react'

export default function VignettesForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [vehicleId, setVehicleId] = useState('')
  const [number, setNumber] = useState('')
  const [startDate, setStartDate] = useState('2025-12-31')
  const [endDate, setEndDate] = useState('2026-12-30')
  const [montantPrincipal, setMontantPrincipal] = useState('0.00')
  const [penalite, setPenalite] = useState('0.00')
  const [majoration, setMajoration] = useState('0.00')
  const [fraisService, setFraisService] = useState('0.00')
  const [timbre, setTimbre] = useState('0.00')
  const [tvaFraisService, setTvaFraisService] = useState('0.00')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.ok ? r.json() : []).then(d => setVehicles(d)).catch(() => setVehicles([]))
  }, [])

  const computeTotal = () => {
    const vals = [montantPrincipal, penalite, majoration, fraisService, timbre, tvaFraisService].map(v => parseFloat(v || '0'))
    return vals.reduce((a, b) => a + b, 0).toFixed(2)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('number', number)
    fd.append('startDate', startDate)
    fd.append('endDate', endDate)
    fd.append('montantPrincipal', montantPrincipal)
    fd.append('penalite', penalite)
    fd.append('majoration', majoration)
    fd.append('fraisService', fraisService)
    fd.append('timbre', timbre)
    fd.append('tvaFraisService', tvaFraisService)
    fd.append('montantTotal', computeTotal())
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/vignettes', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Vignette enregistrée')
    } catch (err) {
      setMessage('Échec de l enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Vignette</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Véhicule</label>
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Choisir</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.registration || v.name || v.id}</option>)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant principal (DH)</label>
            <input value={montantPrincipal} onChange={e => setMontantPrincipal(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pénalité (DH)</label>
            <input value={penalite} onChange={e => setPenalite(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Majoration (DH)</label>
            <input value={majoration} onChange={e => setMajoration(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frais service (DH)</label>
            <input value={fraisService} onChange={e => setFraisService(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timbre (DH)</label>
            <input value={timbre} onChange={e => setTimbre(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TVA frais service (DH)</label>
            <input value={tvaFraisService} onChange={e => setTvaFraisService(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Montant Total (DH)</label>
          <div className="p-2 rounded border text-right font-semibold">{computeTotal()}</div>
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

