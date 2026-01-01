"use client"

import { useEffect, useState } from 'react'

export default function AssurancesInternationalesForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])

  const [vehicleId, setVehicleId] = useState('')
  const [number, setNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [amountHT, setAmountHT] = useState('')
  const [tvaAmount, setTvaAmount] = useState('')
  const [montantTTC, setMontantTTC] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.ok ? r.json() : []).then(d => setVehicles(d)).catch(() => setVehicles([]))
    fetch('/api/insurance-companies').then(r => r.ok ? r.json() : []).then(d => setCompanies(d)).catch(() => setCompanies([]))
  }, [])

  // keep montantTTC in sync if user edits amounts
  useEffect(() => {
    const ht = parseFloat((amountHT || '0').toString().replace(/,/g, '.'))
    const tva = parseFloat((tvaAmount || '0').toString().replace(/,/g, '.'))
    if (!isNaN(ht) && !isNaN(tva)) {
      setMontantTTC((ht + tva).toFixed(2))
    }
  }, [amountHT, tvaAmount])

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('number', number)
    fd.append('startDate', startDate)
    fd.append('endDate', endDate)
    fd.append('amountHT', amountHT)
    fd.append('tvaAmount', tvaAmount)
    fd.append('montantTTC', montantTTC)
    fd.append('companyId', companyId)
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/assurances-internationales', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Assurance internationale enregistrée')
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Assurance internationale</h1>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant HT (DH)</label>
            <input value={amountHT} onChange={e => setAmountHT(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TVA (DH)</label>
            <input value={tvaAmount} onChange={e => setTvaAmount(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant TTC (DH)</label>
            <div className="w-full p-2 rounded border text-right font-semibold">{montantTTC} DH</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compagnie d'assurance</label>
          <select value={companyId} onChange={e => setCompanyId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Choisir</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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

