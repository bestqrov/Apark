"use client"
import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import FormSection from '../../../components/FormSection'

export default function CreateInvoicePage() {
  const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : ''
  const qc = useQueryClient()
  
  const [numero, setNumero] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [clientId, setClientId] = useState('')
  const [montantHT, setMontantHT] = useState('0.00')
  const [tva, setTva] = useState('0.00')
  const [numeroAttestation, setNumeroAttestation] = useState('')
  const [dateDelivrance, setDateDelivrance] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [periodeFacturation, setPeriodeFacturation] = useState('')
  const [lines, setLines] = useState([{ designation: '', quantite: '1', puHT: '0.00', montantHT: '0.00' }])

  const { data: clients } = useQuery({
    queryKey: ['clients', companyId],
    queryFn: async () => {
      const res = await axios.get(`/companies`)
      return res.data
    }
  })

  const montantTTC = (parseFloat(montantHT) + parseFloat(tva)).toFixed(2)

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const fd = new FormData()
      Object.keys(payload).forEach(k => {
        if (k === 'attachment' && payload[k]) fd.append(k, payload[k])
        else if (k === 'lines') fd.append(k, JSON.stringify(payload[k]))
        else fd.append(k, payload[k])
      })
      return axios.post(`/invoices?companyId=${companyId}`, fd)
    },
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['invoices', companyId] })
      window.location.href = '/invoices'
    }
  })

  function addLine() {
    setLines([...lines, { designation: '', quantite: '1', puHT: '0.00', montantHT: '0.00' }])
  }

  function removeLine(idx: number) {
    setLines(lines.filter((_, i) => i !== idx))
  }

  function updateLine(idx: number, field: string, value: string) {
    const updated = [...lines]
    updated[idx] = { ...updated[idx], [field]: value }
    if (field === 'quantite' || field === 'puHT') {
      const q = parseFloat(updated[idx].quantite) || 0
      const p = parseFloat(updated[idx].puHT) || 0
      updated[idx].montantHT = (q * p).toFixed(2)
    }
    setLines(updated)
  }

  function onSubmit(e: any) {
    e.preventDefault()
    mutation.mutate({
      numero, date, clientId, montantHT, tva, numeroAttestation, dateDelivrance, periodeFacturation, attachment, lines
    })
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">📄</span>
          Nouvelle Facture
        </h1>
        <p className="text-blue-100 text-sm mt-2">Créez une facture détaillée avec toutes les informations nécessaires</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-b-lg shadow-lg">
        <div className="p-6 space-y-6">
          {/* Informations générales */}
          <FormSection title="Informations générales" icon="📋" color="blue">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro</label>
                <input value={numero} onChange={e => setNumero(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="FAC-2026-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <select value={clientId} onChange={e => setClientId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Choisir un client</option>
                  {clients?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </FormSection>

          {/* Montants */}
          <FormSection title="Montants" icon="💰" color="green">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant HT</label>
                <div className="relative">
                  <input type="number" step="0.01" value={montantHT} onChange={e => setMontantHT(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  <span className="absolute right-3 top-2 text-gray-500 text-sm">DH</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TVA</label>
                <div className="relative">
                  <input type="number" step="0.01" value={tva} onChange={e => setTva(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  <span className="absolute right-3 top-2 text-gray-500 text-sm">DH</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Montant TTC</label>
                <div className="relative">
                  <input type="text" value={montantTTC} readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-semibold text-green-700" />
                  <span className="absolute right-3 top-2 text-gray-500 text-sm">DH</span>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Attestation & Attachement */}
          <FormSection title="Attestation et Documents" icon="📎" color="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Numéro attestation</label>
                <input value={numeroAttestation} onChange={e => setNumeroAttestation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="ATT-2026-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date délivrance</label>
                <input type="date" value={dateDelivrance} onChange={e => setDateDelivrance(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachement</label>
                <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Période facturation</label>
                <input value={periodeFacturation} onChange={e => setPeriodeFacturation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Janvier 2026" />
              </div>
            </div>
          </FormSection>

          {/* Détails */}
          <FormSection title="Détails" icon="📝" color="orange">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b-2 border-orange-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Désignation *</th>
                    <th className="text-left p-3 font-semibold text-gray-700 w-24">Quantité</th>
                    <th className="text-left p-3 font-semibold text-gray-700 w-32">PU HT</th>
                    <th className="text-left p-3 font-semibold text-gray-700 w-32">Montant HT</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <input value={line.designation} onChange={e => updateLine(idx, 'designation', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500" placeholder="Description" />
                      </td>
                      <td className="p-2">
                        <input type="number" step="1" value={line.quantite} onChange={e => updateLine(idx, 'quantite', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500" />
                      </td>
                      <td className="p-2">
                        <input type="number" step="0.01" value={line.puHT} onChange={e => updateLine(idx, 'puHT', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500" />
                      </td>
                      <td className="p-2">
                        <input type="text" value={line.montantHT} readOnly className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded font-medium" />
                      </td>
                      <td className="p-2 text-center">
                        {lines.length > 1 && <button type="button" onClick={() => removeLine(idx)} className="text-red-600 hover:text-red-800 font-bold">×</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={addLine} className="mt-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium">
                + Ajouter une ligne
              </button>
            </div>
          </FormSection>
        </div>

        <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t rounded-b-lg">
          <a href="/invoices" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
            Annuler
          </a>
          <button type="submit" disabled={mutation.isPending} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors text-sm font-medium shadow-md disabled:opacity-50">
            {mutation.isPending ? 'Création...' : 'Créer la facture'}
          </button>
        </div>
      </form>
    </div>
  )
}
