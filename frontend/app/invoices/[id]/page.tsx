"use client"
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { useEffect, useState } from 'react'

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [companyProfile, setCompanyProfile] = useState<any>(null)

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const res = await axios.get(`/invoices/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/settings/company-profile')
        setCompanyProfile(res.data?.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [])

  if (isLoading) return <div className="p-6">Chargement...</div>
  if (!invoice) return <div className="p-6">Facture introuvable</div>

  const montantTVA = invoice.amount * ((invoice.tva || 20) / 100)
  const montantTTC = invoice.amount + montantTVA

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => window.open(`/invoices/${id}/print`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimer
            </button>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-purple-600">
            <div>
              {companyProfile?.logo ? (
                <img src={`http://localhost:3001${companyProfile.logo}`} alt="Logo" className="h-16 mb-3" />
              ) : (
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                  {companyProfile?.name?.[0] || 'A'}
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-800">{companyProfile?.name || 'ArwaPark'}</h2>
              <p className="text-sm text-gray-600">{companyProfile?.tagline}</p>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                {companyProfile?.address && <p>📍 {companyProfile.address}</p>}
                {companyProfile?.phone && <p>📞 {companyProfile.phone}</p>}
                {companyProfile?.email && <p>✉️ {companyProfile.email}</p>}
                {companyProfile?.website && <p>🌐 {companyProfile.website}</p>}
              </div>
              <div className="text-sm text-gray-700 mt-2 space-y-1 border-t pt-2">
                {companyProfile?.if && <p><span className="font-semibold">IF:</span> {companyProfile.if}</p>}
                {companyProfile?.ice && <p><span className="font-semibold">ICE:</span> {companyProfile.ice}</p>}
                {companyProfile?.cnss && <p><span className="font-semibold">CNSS:</span> {companyProfile.cnss}</p>}
                {companyProfile?.compteBancaire && <p><span className="font-semibold">RIB:</span> {companyProfile.compteBancaire}</p>}
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-purple-600 mb-2">FACTURE</h1>
              <p className="text-gray-600">N° FAC-{invoice.id.slice(0, 8).toUpperCase()}</p>
              <p className="text-gray-600 mt-2">Date: {new Date(invoice.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">FACTURÉ À:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">{invoice.clientName || 'Client'}</p>
              <p className="text-sm text-gray-600">{invoice.clientAddress || ''}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="text-left p-3">Désignation</th>
                  <th className="text-right p-3">Quantité</th>
                  <th className="text-right p-3">Prix unitaire</th>
                  <th className="text-right p-3">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">{invoice.description || 'Service'}</td>
                  <td className="text-right p-3">1</td>
                  <td className="text-right p-3">{invoice.amount.toFixed(2)} DH</td>
                  <td className="text-right p-3 font-semibold">{invoice.amount.toFixed(2)} DH</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Sous-total HT:</span>
                <span className="font-semibold">{invoice.amount.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">TVA ({invoice.tva || 20}%):</span>
                <span className="font-semibold">{montantTVA.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between py-3 bg-purple-50 px-3 rounded-lg mt-2">
                <span className="font-bold text-lg">TOTAL TTC:</span>
                <span className="font-bold text-lg text-purple-600">{montantTTC.toFixed(2)} DH</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-sm text-gray-500">
            <p>Merci pour votre confiance</p>
            {companyProfile?.website && <p className="mt-1">{companyProfile.website}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
