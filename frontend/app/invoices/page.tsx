"use client"
import { useQuery } from '@tanstack/react-query'
import axios from '../../lib/axios'
import Link from 'next/link'
import Table from '../../components/Table'

export default function InvoicesPage() {
  const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : ''
  const { data, isLoading } = useQuery({
    queryKey: ['invoices', companyId],
    queryFn: async () => {
      const res = await axios.get(`/invoices?companyId=${companyId}`)
      return res.data
    }
  })

  if (isLoading) return <div>Chargement...</div>

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Factures</h2>
        <Link href="/invoices/create" className="bg-blue-600 text-white px-3 py-2 rounded">Nouvelle facture</Link>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="p-2 text-left">Montant</th>
            <th className="p-2 text-left">TVA</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((f: any) => (
            <tr key={f.id} className="border-t">
              <td className="p-2">{f.amount} {f.currency}</td>
              <td className="p-2">{f.tva ? 'Oui' : 'Non'}</td>
              <td className="p-2">{new Date(f.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
