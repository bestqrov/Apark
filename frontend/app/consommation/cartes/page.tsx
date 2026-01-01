"use client"
import React, { useState } from 'react'

export default function CartesPage() {
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('2025-12-31')
  const [endDate, setEndDate] = useState('')
  const [initialBalance, setInitialBalance] = useState<number>(0)
  const [plafondCarburant, setPlafondCarburant] = useState<number>(0)
  const [plafondService, setPlafondService] = useState<number>(0)
  const [tagJawaz, setTagJawaz] = useState('')
  const [quota, setQuota] = useState('')
  const [pin, setPin] = useState('')
  const [comment, setComment] = useState('')

  const [fournisseur, setFournisseur] = useState('')
  const [activite, setActivite] = useState('')
  const [typeCarte, setTypeCarte] = useState('')
  const [typeAffectation, setTypeAffectation] = useState('')
  const [statutActive, setStatutActive] = useState(true)

  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('number', number)
      fd.append('name', name)
      fd.append('startDate', startDate)
      fd.append('endDate', endDate)
      fd.append('initialBalance', String(initialBalance))
      fd.append('plafondCarburant', String(plafondCarburant))
      fd.append('plafondService', String(plafondService))
      fd.append('tagJawaz', tagJawaz)
      fd.append('quota', quota)
      fd.append('pin', pin)
      fd.append('comment', comment)
      fd.append('fournisseur', fournisseur)
      fd.append('activite', activite)
      fd.append('typeCarte', typeCarte)
      fd.append('typeAffectation', typeAffectation)
      fd.append('statutActive', String(statutActive))

      const res = await fetch('/api/consommation/cartes', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Server error')
      setStatus('ok')
      setNumber('')
      setName('')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Carte</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Left card */}
        <div className="col-span-2 border rounded p-4 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-600">Numéro</label>
              <input value={number} onChange={e => setNumber(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Nom</label>
              <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Date début</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Date fin</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-slate-600">Solde initial</label>
              <div className="mt-1 flex">
                <input type="number" step="0.01" value={initialBalance} onChange={e => setInitialBalance(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">DH</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600">Plafond carburant</label>
              <div className="mt-1 flex">
                <input type="number" step="0.01" value={plafondCarburant} onChange={e => setPlafondCarburant(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">DH</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-slate-600">Plafond service</label>
              <div className="mt-1 flex">
                <input type="number" step="0.01" value={plafondService} onChange={e => setPlafondService(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">DH</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600">Tag jawaz</label>
              <input value={tagJawaz} onChange={e => setTagJawaz(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-slate-600">Quota</label>
              <input value={quota} onChange={e => setQuota(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Code pin</label>
              <input value={pin} onChange={e => setPin(e.target.value)} className="mt-1 w-full p-2 border rounded" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-slate-600">Commentaire</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="mt-1 w-full p-2 border rounded h-28" />
          </div>
        </div>

        {/* Right card */}
        <div className="col-span-1 border rounded p-4 bg-white">
          <h2 className="font-semibold mb-4">Caractéristiques</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-600">Flotte</label>
              <div className="mt-1 flex gap-2">
                <select value={''} onChange={() => {}} className="flex-1 p-2 border rounded">
                  <option>Choisir</option>
                </select>
                <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Fournisseur</label>
              <div className="mt-1 flex gap-2">
                <select value={fournisseur} onChange={e => setFournisseur(e.target.value)} className="flex-1 p-2 border rounded">
                  <option>Choisir</option>
                </select>
                <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Activité</label>
              <div className="mt-1 flex gap-2">
                <select value={activite} onChange={e => setActivite(e.target.value)} className="flex-1 p-2 border rounded">
                  <option>Choisir</option>
                </select>
                <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Type carte</label>
              <select value={typeCarte} onChange={e => setTypeCarte(e.target.value)} className="mt-1 w-full p-2 border rounded">
                <option>Choisir</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-600">Type affectation</label>
              <select value={typeAffectation} onChange={e => setTypeAffectation(e.target.value)} className="mt-1 w-full p-2 border rounded">
                <option>Choisir</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-600">Statut</label>
              <select value={statutActive ? 'active' : 'inactive'} onChange={e => setStatutActive(e.target.value === 'active')} className="mt-1 w-full p-2 border rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-3 mt-4">
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
            {status === 'sending' && <div className="text-sm">Envoi...</div>}
            {status === 'ok' && <div className="text-sm text-green-600">Enregistré</div>}
            {status === 'error' && <div className="text-sm text-red-600">Erreur</div>}
          </div>
        </div>
      </form>
    </div>
  )
}
