"use client"
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from '../../../../lib/axios'
import { useEffect, useState } from 'react'

export default function InvoicePrintPage() {
  const params = useParams()
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
        const res = await axios.get('/api/settings/company-profile')
        setCompanyProfile(res.data?.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    if (invoice && companyProfile) {
      // Auto-print when data is loaded
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [invoice, companyProfile])

  if (isLoading) return <div className="p-6">Chargement...</div>
  if (!invoice) return <div className="p-6">Facture introuvable</div>

  const montantTVA = invoice.amount * ((invoice.tva || 20) / 100)
  const montantTTC = invoice.amount + montantTVA

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 20mm;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>

      <div className="max-w-[210mm] mx-auto bg-white p-8">
        {/* Print Button - Hidden when printing */}
        <div className="no-print mb-4 flex justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            🖨️ Imprimer
          </button>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            ✖️ Fermer
          </button>
        </div>

        {/* Invoice Content */}
        <div className="border-2 border-gray-200 p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-4 border-purple-600">
            <div>
              {companyProfile?.logo ? (
                <img 
                  src={`http://localhost:3001${companyProfile.logo}`} 
                  alt="Logo" 
                  className="h-20 mb-4"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {companyProfile?.name?.[0] || 'A'}
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-800">{companyProfile?.name || 'ArwaPark'}</h2>
              <p className="text-gray-600 mt-1">{companyProfile?.tagline}</p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                {companyProfile?.address && <p>📍 {companyProfile.address}</p>}
                {companyProfile?.phone && <p>📞 {companyProfile.phone}</p>}
                {companyProfile?.email && <p>✉️ {companyProfile.email}</p>}
                {companyProfile?.website && <p>🌐 {companyProfile.website}</p>}
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold text-purple-600 mb-3">FACTURE</h1>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">N° FAC-{invoice.id.slice(0, 8).toUpperCase()}</p>
                <p className="text-gray-600 mt-2">Date: {new Date(invoice.createdAt).toLocaleDateString('fr-FR', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Facturé à:</h3>
            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-purple-600">
              <p className="font-bold text-lg text-gray-800">{invoice.clientName || 'Client'}</p>
              {invoice.clientAddress && <p className="text-gray-600 mt-1">{invoice.clientAddress}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="text-left p-4 font-semibold">Désignation</th>
                  <th className="text-center p-4 font-semibold w-24">Qté</th>
                  <th className="text-right p-4 font-semibold w-32">P.U. HT</th>
                  <th className="text-right p-4 font-semibold w-32">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-800">{invoice.description || 'Prestation de service'}</td>
                  <td className="text-center p-4 text-gray-700">1</td>
                  <td className="text-right p-4 text-gray-700">{invoice.amount.toFixed(2)} DH</td>
                  <td className="text-right p-4 font-semibold text-gray-900">{invoice.amount.toFixed(2)} DH</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
                  <span className="text-gray-700">Sous-total HT:</span>
                  <span className="font-semibold text-gray-900">{invoice.amount.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
                  <span className="text-gray-700">TVA ({invoice.tva || 20}%):</span>
                  <span className="font-semibold text-gray-900">{montantTVA.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-4 px-4 bg-purple-600 text-white rounded-lg text-xl">
                  <span className="font-bold">TOTAL TTC:</span>
                  <span className="font-bold">{montantTTC.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Informations de paiement:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• Mode de règlement: Virement bancaire / Chèque / Espèces</p>
              <p>• Délai de paiement: 30 jours à compter de la date de facturation</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 pt-6 text-center">
            <p className="text-gray-600 font-medium">Merci pour votre confiance !</p>
            <p className="text-sm text-gray-500 mt-2">
              Cette facture est établie conformément aux réglementations en vigueur
            </p>
            {companyProfile?.website && (
              <p className="text-sm text-purple-600 mt-3 font-medium">{companyProfile.website}</p>
            )}
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}</p>
        </div>
      </div>
    </>
  )
}
