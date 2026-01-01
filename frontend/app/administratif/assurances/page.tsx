"use client"

import { useEffect, useState } from 'react'

export default function AssurancesForm() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [intermediaries, setIntermediaries] = useState<any[]>([])

  const [vehicleId, setVehicleId] = useState('')
  const [assuranceType, setAssuranceType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [attestationNumber, setAttestationNumber] = useState('')
  const [endDate, setEndDate] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [durationDays, setDurationDays] = useState<number | ''>('')
  const [companyId, setCompanyId] = useState('')
  const [amountHT, setAmountHT] = useState('')
  const [intermediaryId, setIntermediaryId] = useState('')
  const [stampFee, setStampFee] = useState('')
  const [contractFee, setContractFee] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.ok ? r.json() : []).then(d => setVehicles(d)).catch(() => setVehicles([]))
    fetch('/api/insurance-companies').then(r => r.ok ? r.json() : []).then(d => setCompanies(d)).catch(() => setCompanies([]))
    fetch('/api/intermediaries').then(r => r.ok ? r.json() : []).then(d => setIntermediaries(d)).catch(() => setIntermediaries([]))
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const fd = new FormData()
    fd.append('vehicleId', vehicleId)
    fd.append('assuranceType', assuranceType)
    fd.append('startDate', startDate)
    fd.append('attestationNumber', attestationNumber)
    fd.append('endDate', endDate)
    fd.append('policyNumber', policyNumber)
    fd.append('durationDays', String(durationDays))
    fd.append('companyId', companyId)
    fd.append('amountHT', amountHT)
    fd.append('intermediaryId', intermediaryId)
    fd.append('stampFee', stampFee)
    fd.append('contractFee', contractFee)
    if (file) fd.append('attachment', file)

    try {
      const res = await fetch('/api/administratif/assurances', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Erreur')
      setMessage('Assurance enregistrée avec succès')
    } catch (err) {
      setMessage('Échec de l enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Assurance</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Véhicule</label>
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Choisir</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.registration || v.name || v.id}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type assurance</label>
            <select value={assuranceType} onChange={e => setAssuranceType(e.target.value)} className="w-full p-2 rounded border">
              <option value="">Choisir</option>
              <option value="rc">Responsabilité civile</option>
              <option value="tous-risques">Tous risques</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro attestation</label>
            <input value={attestationNumber} onChange={e => setAttestationNumber(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro police</label>
            <input value={policyNumber} onChange={e => setPolicyNumber(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (Jours)</label>
            <input type="number" value={durationDays as any} onChange={e => setDurationDays(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compagnie d'assurance</label>
          <select value={companyId} onChange={e => setCompanyId(e.target.value)} className="w-full p-2 rounded border">
            <option value="">Choisir</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant HT (DH)</label>
            <input value={amountHT} onChange={e => setAmountHT(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intermédiaire assurance</label>
            <select value={intermediaryId} onChange={e => setIntermediaryId(e.target.value)} className="w-full p-2 rounded border">
              <option value="">Choisir</option>
              {intermediaries.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frais timbre (DH)</label>
            <input value={stampFee} onChange={e => setStampFee(e.target.value)} className="w-full p-2 rounded border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frais contrat (DH)</label>
            <input value={contractFee} onChange={e => setContractFee(e.target.value)} className="w-full p-2 rounded border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachement</label>
          <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-green-600">{message}</div>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Envoi...' : 'Enregistrer'}</button>
        </div>
      </form>
    </div>
  )
}

