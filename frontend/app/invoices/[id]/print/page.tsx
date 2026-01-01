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
        const res = await axios.get('/settings/company-profile')
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
    <div>
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />

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
        <div className="border border-gray-300 shadow-2xl rounded-lg overflow-hidden bg-white">
          {/* Modern Header with Centered Logo */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 p-8 text-white">
            <div className="flex flex-col items-center mb-6">
              {companyProfile?.logo ? (
                <div className="bg-white rounded-xl p-4 shadow-xl mb-4">
                  <img 
                    src={`http://localhost:3001${companyProfile.logo}`} 
                    alt="Logo" 
                    className="h-24 object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-3xl mb-4 shadow-xl">
                  {companyProfile?.name?.[0] || 'A'}
                </div>
              )}
              <h2 className="text-3xl font-bold">{companyProfile?.name || 'ArwaPark'}</h2>
              <p className="text-purple-100 mt-2 text-lg">{companyProfile?.tagline}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="space-y-1 text-purple-50">
                  {companyProfile?.phone && <p className="flex items-center gap-2"><span className="text-xl">📞</span> {companyProfile.phone}</p>}
                  {companyProfile?.email && <p className="flex items-center gap-2"><span className="text-xl">✉️</span> {companyProfile.email}</p>}
                  {companyProfile?.website && <p className="flex items-center gap-2"><span className="text-xl">🌐</span> {companyProfile.website}</p>}
                </div>
              </div>
              <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h1 className="text-5xl font-black mb-2">FACTURE</h1>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">N° FAC-{invoice.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-purple-100">Date: {new Date(invoice.createdAt).toLocaleDateString('fr-FR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Client Info */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-1 bg-purple-600 rounded"></span>
                Facturé à
              </h3>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-l-4 border-purple-600 shadow-md">
                <p className="font-bold text-2xl text-gray-800">{invoice.clientName || 'Client'}</p>
                {invoice.clientAddress && <p className="text-gray-600 mt-2">{invoice.clientAddress}</p>}
              </div>
            </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <th className="text-left p-4 font-bold">Désignation</th>
                  <th className="text-center p-4 font-bold w-24">Qté</th>
                  <th className="text-right p-4 font-bold w-32">P.U. HT</th>
                  <th className="text-right p-4 font-bold w-32">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50 transition-colors border-b-2 border-gray-100">
                  <td className="p-4 text-gray-800 font-medium">{invoice.description || 'Prestation de service'}</td>
                  <td className="text-center p-4 text-gray-700 font-semibold">1</td>
                  <td className="text-right p-4 text-gray-700 font-semibold">{invoice.amount.toFixed(2)} DH</td>
                  <td className="text-right p-4 font-bold text-purple-600 text-lg">{invoice.amount.toFixed(2)} DH</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-96">
              <div className="space-y-3">
                <div className="flex justify-between py-3 px-5 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Sous-total HT:</span>
                  <span className="font-bold text-gray-900 text-lg">{invoice.amount.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-3 px-5 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">TVA ({invoice.tva || 20}%):</span>
                  <span className="font-bold text-gray-900 text-lg">{montantTVA.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between py-4 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg text-xl">
                  <span className="font-bold">TOTAL TTC:</span>
                  <span className="font-black text-2xl">{montantTTC.toFixed(2)} DH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 mb-6 shadow-md">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">💳</span>
              Informations de paiement
            </h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mode de règlement: Virement bancaire / Chèque / Espèces</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Délai de paiement: 30 jours à compter de la date de facturation</span>
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center py-6 border-t-2 border-dashed border-gray-300">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
              Merci pour votre confiance !
            </p>
            <p className="text-sm text-gray-500">
              Cette facture est établie conformément aux réglementations en vigueur
            </p>
          </div>
        </div>

        {/* Modern Footer with Fiscal Information */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Side - Address */}
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Adresse
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {companyProfile?.address || 'Adresse de la société'}
              </p>
            </div>
            
            {/* Right Side - Fiscal Information */}
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Informations Légales
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                {companyProfile?.if && (
                  <p className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="font-semibold">IF:</span>
                    <span>{companyProfile.if}</span>
                  </p>
                )}
                {companyProfile?.ice && (
                  <p className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="font-semibold">ICE:</span>
                    <span>{companyProfile.ice}</span>
                  </p>
                )}
                {companyProfile?.cnss && (
                  <p className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="font-semibold">CNSS:</span>
                    <span>{companyProfile.cnss}</span>
                  </p>
                )}
                {companyProfile?.compteBancaire && (
                  <p className="flex justify-between">
                    <span className="font-semibold">RIB:</span>
                    <span>{companyProfile.compteBancaire}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Line */}
          <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
            <p>Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
