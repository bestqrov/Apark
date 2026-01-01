"use client"

import { useEffect, useState } from 'react'

export default function VisitesTechniquesForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [centers, setCenters] = useState<any[]>([])

  const [vehicleId, setVehicleId] = useState('')
  const [number, setNumber] = useState('')
  const [amountHt, setAmountHt] = useState('0.00')
  const [startDate, setStartDate] = useState('')
  const [amountTva, setAmountTva] = useState('0.00')
  const [endDate, setEndDate] = useState('')
  const [timbres, setTimbres] = useState('0.00')
  const [typeVisite, setTypeVisite] = useState('')
  const [cnpac, setCnpac] = useState('0.00')
  const [centreId, setCentreId] = useState('')
  const [taxeCom, setTaxeCom] = useState('0.00')
  const [cneh, setCneh] = useState('0.00')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.ok ? r.json() : [])
      .then(d => setVehicles(d))
      .catch(() => setVehicles([]))

    fetch('/api/centers')
      .then(r => r.ok ? r.json() : [])
      .then(d => setCenters(d))
      .catch(() => setCenters([]))
  }, [])

  function parseAmount(v: string) {
    const n = parseFloat(v.toString().replace(/,/g, '.'))
    return isNaN(n) ? 0 : n
  }

  const total = (
    parseAmount(amountHt) +
    parseAmount(amountTva) +
    parseAmount(timbres) +
    parseAmount(cnpac) +
    parseAmount(taxeCom) +
    parseAmount(cneh)
  ).toFixed(2)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('number', number)
    fd.append('amountHt', amountHt)
    fd.append('startDate', startDate)
    fd.append('amountTva', amountTva)
    fd.append('endDate', endDate)
    fd.append('timbres', timbres)
    fd.append('typeVisite', typeVisite)
    fd.append('cnpac', cnpac)
    fd.append('centreId', centreId)
    fd.append('taxeCom', taxeCom)
    fd.append('cneh', cneh)
    fd.append('montantTotal', total)
    if (attachment) fd.append('attachment', attachment)
    fd.append('comment', comment)

    try {
      const res = await fetch('/api/administratif/visites-techniques', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Visite technique enregistrée')
      // keep values or reset as appropriate
    } catch (err) {
      setMessage("Échec de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Visite technique</h1>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant HT (DH)</label>
            <input value={amountHt} onChange={e => setAmountHt(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant TVA (DH)</label>
            <input value={amountTva} onChange={e => setAmountTva(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Timbres (DH)</label>
            <input value={timbres} onChange={e => setTimbres(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type visite technique</label>
            <select value={typeVisite} onChange={e => setTypeVisite(e.target.value)} className="w-full p-2 rounded border">
              <option value="">Choisir</option>
              <option value="periodique">Périodique</option>
              <option value="ponctuelle">Ponctuelle</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPAC (DH)</label>
            <input value={cnpac} onChange={e => setCnpac(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Centre de visite technique</label>
            <select value={centreId} onChange={e => setCentreId(e.target.value)} className="w-full p-2 rounded border">
              <option value="">Choisir</option>
              {centers.map(c => <option key={c.id} value={c.id}>{c.name || c.id}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TAXE COM (DH)</label>
            <input value={taxeCom} onChange={e => setTaxeCom(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNEH (DH)</label>
            <input value={cneh} onChange={e => setCneh(e.target.value)} className="w-full p-2 rounded border text-right" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant Total (DH)</label>
            <div className="w-full p-2 rounded border text-right font-semibold">{total} DH</div>
          </div>
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

