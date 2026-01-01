"use client"

import { useEffect, useState } from 'react'
import FormSection from '../../../components/FormSection'

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🧯</span>
          Extincteur
        </h1>
        <p className="text-red-100 text-sm mt-2">Enregistrez les extincteurs de la flotte</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg">
        <div className="p-6 space-y-6">
          <FormSection title="Informations générales" icon="📋" color="blue">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro</label>
              <input value={number} onChange={e => setNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="EXT-2026-001" />
            </div>
          </FormSection>

          <FormSection title="Caractéristiques" icon="⚙️" color="green">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                <input value={volume} onChange={e => setVolume(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">KG</label>
                <input value={kg} onChange={e => setKg(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Achat & Affectation" icon="🏷️" color="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'achat</label>
                <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flotte</label>
                <select value={fleetId} onChange={e => setFleetId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Choisir une flotte</option>
                  {fleets.map(f => <option key={f.id} value={f.id}>{f.name || f.id}</option>)}
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection title="Fournisseur" icon="🏢" color="orange">
            <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="">Choisir un fournisseur</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name || s.id}</option>)}
            </select>
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
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
