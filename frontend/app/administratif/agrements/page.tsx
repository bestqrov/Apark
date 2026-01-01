"use client"

import { useEffect, useState } from 'react'
import FormSection from '../../../components/FormSection'

export default function AgrementsForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [vehicleId, setVehicleId] = useState('')
  const [number, setNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.ok ? r.json() : [])
      .then(d => setVehicles(d))
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
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/agrements', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Agrément enregistré')
      setNumber('')
      setStartDate('')
      setEndDate('')
      setAttachment(null)
      setComment('')
      setVehicleId('')
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-t-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">✅</span>
          Agréments
        </h1>
        <p className="text-indigo-100 text-sm mt-2">Gérez les agréments des véhicules</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg">
        <div className="p-6 space-y-6">
          <FormSection title="Véhicule" icon="🚗" color="blue">
            <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Choisir un véhicule</option>
              {vehicles.map(v => <option key={v.id} value={v.id}>{v.registration || v.name || v.id}</option>)}
            </select>
          </FormSection>

          <FormSection title="Informations générales" icon="📋" color="green">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro</label>
              <input value={number} onChange={e => setNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="AGR-2026-001" />
            </div>
          </FormSection>

          <FormSection title="Période de validité" icon="📅" color="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date début</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date fin</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Documents & Commentaires" icon="📎" color="orange">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachement</label>
                <input type="file" onChange={e => setAttachment(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('succès') || message.includes('enregistré') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50">
              <span>✅</span>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
