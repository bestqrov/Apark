"use client"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../../lib/axios'
import FormInput from '../../../components/FormInput'

export default function CreateContractPage() {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [collaborators, setCollaborators] = useState<any[]>([])
  const [contractTypes, setContractTypes] = useState<any[]>([])
  const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : ''

  useEffect(() => {
    if (!companyId) return
    axios.get(`/contracts/metadata?companyId=${companyId}`).then(res => {
      setCollaborators(res.data.collaborators || [])
      setContractTypes(res.data.contractTypes || [])
    }).catch(() => {})
  }, [companyId])

  async function onSubmit(vals: any) {
    try {
      setLoading(true)
      const form = new FormData()
      // append all fields
      Object.keys(vals).forEach(key => {
        const v = (vals as any)[key]
        if (v instanceof FileList) {
          if (v.length > 0) form.append(key, v[0])
        } else if (Array.isArray(v)) {
          v.forEach((it: any) => form.append(key, it))
        } else if (v !== undefined && v !== null) {
          form.append(key, String(v))
        }
      })

      await axios.post('/contracts', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      window.location.href = '/contracts'
    } catch (err) {
      alert('Erreur lors de la création du contrat')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📜</span>
          Nouveau contrat
        </h1>
        <p className="text-blue-100 text-sm mt-1">Créez un nouveau contrat</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-b-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left - Collaborateur */}
          <div className="col-span-1">
              <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Collaborateur</h3>
              <select {...register('collaboratorId')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option value="">Choisir</option>
                {collaborators.map(c => (
                  <option key={c.id} value={c.id}>{c.name || c.email}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right - Informations générales */}
          <div className="col-span-2">
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-4">Informations générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput label="Numéro" {...register('number')} />
                <label className="block">
                  <div className="text-xs text-slate-600 mb-1">Type contrat</div>
                  <div className="flex gap-2">
                    <select {...register('contractTypeId')} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm">
                      <option value="">Choisir</option>
                      {contractTypes.map((t: any) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                    <button type="button" className="px-3 rounded border bg-white text-sm">+</button>
                  </div>
                </label>

                <label>
                  <div className="text-xs text-slate-600 mb-1">Date entrée</div>
                  <input type="date" {...register('startDate')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>
                <label>
                  <div className="text-xs text-slate-600 mb-1">Date embauche</div>
                  <input type="date" {...register('hireDate')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>

                <label>
                  <div className="text-xs text-slate-600 mb-1">Date fin prévue</div>
                  <input type="date" {...register('endDatePlanned')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>
                <label>
                  <div className="text-xs text-slate-600 mb-1">Durée prévue (mois)</div>
                  <input type="number" step="1" {...register('durationPlanned')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>

                <label>
                  <div className="text-xs text-slate-600 mb-1">Date fin réelle</div>
                  <input type="date" {...register('endDateReal')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>
                <label>
                  <div className="text-xs text-slate-600 mb-1">Durée réelle (mois)</div>
                  <input type="number" step="1" {...register('durationReal')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>

                <label>
                  <div className="text-xs text-slate-600 mb-1">Période essai (mois)</div>
                  <input type="number" step="1" {...register('probationPeriod')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>
                <label>
                  <div className="text-xs text-slate-600 mb-1">Nombre heures de travail</div>
                  <input type="number" step="0.01" {...register('hours')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>

                <label className="md:col-span-2">
                  <div className="text-xs text-slate-600 mb-1">Attachment</div>
                  <input type="file" {...register('attachment')} className="w-full text-sm text-slate-500" />
                </label>

                <label className="md:col-span-2">
                  <div className="text-xs text-slate-600 mb-1">Commentaire</div>
                  <textarea {...register('comment')} rows={4} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium text-sm" type="submit" disabled={loading}>
            {loading ? 'Création…' : 'Créer le contrat'}
          </button>
        </div>
      </form>
    </div>
  )
}
