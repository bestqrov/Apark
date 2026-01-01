"use client"

import { useEffect, useState } from 'react'
import FormSection from '../../../components/FormSection'

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🛡️</span>
          Assurance
        </h1>
        <p className="text-blue-100 text-sm mt-2">Gérez les assurances des véhicules</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type assurance</label>
                <select value={assuranceType} onChange={e => setAssuranceType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Choisir</option>
                  <option value="rc">Responsabilité civile</option>
                  <option value="tous-risques">Tous risques</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date début</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Attestation & Police" icon="📜" color="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro attestation</label>
                <input value={attestationNumber} onChange={e => setAttestationNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date fin</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro police</label>
                <input value={policyNumber} onChange={e => setPolicyNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée (Jours)</label>
                <input type="number" value={durationDays as any} onChange={e => setDurationDays(e.target.value === '' ? '' : Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Compagnie & Intermédiaire" icon="🏢" color="orange">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compagnie d'assurance</label>
                <select value={companyId} onChange={e => setCompanyId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Choisir</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intermédiaire assurance</label>
                <select value={intermediaryId} onChange={e => setIntermediaryId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Choisir</option>
                  {intermediaries.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection title="Montants & Frais" icon="💰" color="pink">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant HT (DH)</label>
                <input value={amountHT} onChange={e => setAmountHT(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frais timbre (DH)</label>
                <input value={stampFee} onChange={e => setStampFee(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frais contrat (DH)</label>
                <input value={contractFee} onChange={e => setContractFee(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Document" icon="📎" color="blue">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachement</label>
              <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
          </FormSection>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('succès') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
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

