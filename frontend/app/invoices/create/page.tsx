"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { invoiceSchema, InvoiceInput } from '../../../lib/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import FormInput from '../../../components/FormInput'
import FormSection from '../../../components/FormSection'

export default function CreateInvoicePage() {
  const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : ''
  const qc = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm<InvoiceInput>({ resolver: zodResolver(invoiceSchema) })

  const mutation = useMutation({
    mutationFn: (payload: any) => axios.post(`/invoices?companyId=${companyId}`, payload),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['invoices', companyId] });
      window.location.href = '/invoices'
    }
  })

  function onSubmit(data: any) { mutation.mutate({ ...data }) }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📄</span>
          Nouvelle facture
        </h1>
        <p className="text-blue-100 text-sm mt-1">Générez une facture</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-b-lg shadow-lg">
        <FormSection title="Informations financières" icon="💰" color="green">
          <FormInput
            label="Montant"
            type="number"
            step="0.01"
            icon="💵"
            {...register('amount' as any)}
            error={errors.amount?.message as any}
          />
        </FormSection>

        <FormSection title="Configuration fiscale" icon="🏛️" color="orange">
          <label className="block mb-3">
            <div className="text-sm text-slate-600 mb-1 flex items-center gap-2">
              <span className="text-lg">📊</span>
              TVA applicable
            </div>
            <select className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" {...register('tva' as any)}>
              <option value={false as any}>❌ Non - TVA non applicable</option>
              <option value={true as any}>✅ Oui - TVA applicable</option>
            </select>
          </label>
        </FormSection>

        <div className="flex justify-end pt-3 border-t mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm" type="submit">
            <span>✅</span>
            Créer
          </button>
        </div>
      </form>
    </div>
  )
}
