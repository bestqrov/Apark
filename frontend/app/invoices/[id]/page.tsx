"use client"
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import axios from '../../../lib/axios'
import Card from '../../../components/Card'
import PdfDownloadButton from '../../../components/PdfDownloadButton'

export default function InvoiceDetail() {
  const params = useParams()
  const id = (params as any)?.id
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const res = await axios.get(`/invoices/${id}`)
      return res.data
    },
    enabled: !!id
  })

  async function remove() {
    if (!confirm('Supprimer cette facture ?')) return
    try {
      await axios.delete(`/invoices/${id}`)
      router.push('/invoices')
    } catch (err:any) { alert(err.message || 'Erreur') }
  }

  if (isLoading) return <div>Chargement...</div>
  if (!data) return <div>Introuvable</div>

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Détails de la facture</h2>
        <div className="space-x-2">
          <a className="text-sm text-blue-600" href={`/invoices/${id}/edit`}>Modifier</a>
          <button onClick={remove} className="text-sm text-red-600">Supprimer</button>
          <a className="text-sm text-blue-600" href={void 0}><PdfDownloadButton id={id} type="invoice" /></a>
        </div>
      </div>

      <Card title="Infos">
        <div>Montant: {data.amount} {data.currency}</div>
        <div>TVA: {data.tva ? 'Oui' : 'Non'}</div>
      </Card>
    </div>
  )
}
