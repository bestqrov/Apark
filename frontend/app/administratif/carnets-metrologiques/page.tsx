"use client"

import { useEffect, useState } from 'react'
import FormSection from '../../../components/FormSection'

export default function CarnetMetrologiqueForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [garages, setGarages] = useState<any[]>([])

  const [vehicleId, setVehicleId] = useState('')
  const [number, setNumber] = useState('')
  const [amountHt, setAmountHt] = useState('0.00')
  const [tva, setTva] = useState('0')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [garageId, setGarageId] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.ok ? r.json() : [])
      .then(d => setVehicles(d))
      .catch(() => setVehicles([]))

    fetch('/api/garages')
      .then(r => r.ok ? r.json() : [])
      .then(d => setGarages(d))
      .catch(() => setGarages([]))
  }, [])

  function parseAmount(v: string) {
    const n = parseFloat(v.toString().replace(/,/g, '.'))
    return isNaN(n) ? 0 : n
  }

  const montantTtc = (
    parseAmount(amountHt) * (1 + (parseFloat(tva || '0') / 100))
  ).toFixed(2)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('number', number)
    fd.append('amountHt', amountHt)
    fd.append('tva', tva)
    fd.append('startDate', startDate)
    fd.append('endDate', endDate)
    fd.append('montantTtc', montantTtc)
    fd.append('garageId', garageId)
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/carnets-metrologiques', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Carnet métrologique enregistré')
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-t-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Carnet métrologique
        </h1>
        <p className="text-teal-100 text-sm mt-2">Gérez les carnets métrologiques des véhicules</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg">
        <div className="p-6 space-y-6">
          <FormSection title="Véhicule" icon="🚗" color="blue">
            <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Choisir</option>
              {vehicles.map(v => <option key={v.id} value={v.id}>{v.registration || v.name || v.id}</option>)}
            </select>
          </FormSection>

          <FormSection title="Informations générales" icon="📋" color="green">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro</label>
              <input value={number} onChange={e => setNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="CM-2026-001" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date début</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date fin</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Garage" icon="🔧" color="purple">
            <select value={garageId} onChange={e => setGarageId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">Choisir</option>
              {garages.map(g => <option key={g.id} value={g.id}>{g.name || g.id}</option>)}
            </select>
          </FormSection>

          <FormSection title="Montants" icon="💰" color="orange">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant HT (DH)</label>
                <input value={amountHt} onChange={e => setAmountHt(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TVA (%)</label>
                <input value={tva} onChange={e => setTva(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Montant TTC:</span>
                <span className="text-xl font-bold text-orange-700">{montantTtc} DH</span>
              </div>
            </div>
          </FormSection>

          <FormSection title="Documents & Commentaires" icon="📎" color="pink">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachement</label>
                <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('enregistré') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50">
              <span>✅</span>
              {loading ? 'Envoi...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

