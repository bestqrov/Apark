"use client"
import React, { useState, useEffect } from 'react'

export default function AutoroutesPage() {
  const [vehicle, setVehicle] = useState('')
  const [collaborator, setCollaborator] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('2025-12-31')
  const [time, setTime] = useState('22:51')
  const [peageDepart, setPeageDepart] = useState('')
  const [peageArrivee, setPeageArrivee] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)

  const [montantHT, setMontantHT] = useState<number | ''>('')
  const [tva, setTva] = useState<number>(20)
  const [montantTTC, setMontantTTC] = useState<number>(0)

  useEffect(() => {
    const ht = Number(montantHT || 0)
    const ttc = ht * (1 + (tva || 0) / 100)
    setMontantTTC(Number(ttc.toFixed(2)))
  }, [montantHT, tva])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('vehicle', vehicle)
    fd.append('collaborator', collaborator)
    fd.append('number', number)
    fd.append('date', date)
    fd.append('time', time)
    fd.append('peageDepart', peageDepart)
    fd.append('peageArrivee', peageArrivee)
    fd.append('paymentType', paymentType)
    fd.append('montantHT', String(montantHT || 0))
    fd.append('tva', String(tva))
    fd.append('montantTTC', String(montantTTC))
    if (attachment) fd.append('attachment', attachment)

    await fetch('/api/consommation/autoroutes', { method: 'POST', body: fd })
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Autoroute</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="border rounded p-4 bg-white mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-slate-600">Véhicule</label>
                  <select value={vehicle} onChange={e => setVehicle(e.target.value)} className="mt-1 w-full p-2 border rounded">
                    <option value="">Choisir</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Collaborateur</label>
                  <select value={collaborator} onChange={e => setCollaborator(e.target.value)} className="mt-1 w-full p-2 border rounded">
                    <option value="">Choisir</option>
                  </select>
                </div>
              </div>

              <h2 className="font-semibold mb-3">Désignation</h2>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-sm text-slate-600">Numéro</label>
                  <input value={number} onChange={e => setNumber(e.target.value)} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Date</label>
                  <div className="flex gap-2">
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 p-2 border rounded w-full" />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 p-2 border rounded w-28" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-sm text-slate-600">Péage départ</label>
                  <div className="mt-1 flex gap-2">
                    <select value={peageDepart} onChange={e => setPeageDepart(e.target.value)} className="flex-1 p-2 border rounded">
                      <option value="">Choisir</option>
                    </select>
                    <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600">Péage arrivée</label>
                  <div className="mt-1 flex gap-2">
                    <select value={peageArrivee} onChange={e => setPeageArrivee(e.target.value)} className="flex-1 p-2 border rounded">
                      <option value="">Choisir</option>
                    </select>
                    <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-sm text-slate-600">Type de paiement</label>
                  <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="mt-1 w-full p-2 border rounded">
                    <option value="">Choisir</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Attachement</label>
                  <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="mt-1 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="border rounded p-4 bg-white">
              <h2 className="font-semibold mb-3">Montant</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-600">Montant HT</label>
                  <div className="mt-1 flex">
                    <input type="number" step="0.01" value={montantHT as any} onChange={e => setMontantHT(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border rounded-l" />
                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">DH</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600">TVA</label>
                  <div className="mt-1 flex">
                    <input type="number" step="0.01" value={tva} onChange={e => setTva(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600">Montant TTC</label>
                  <div className="mt-1 p-2 border rounded bg-slate-50">{montantTTC.toFixed(2)} DH</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 border rounded">Annuler</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
          <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Enregistrer & Ajouter</button>
        </div>
      </form>
    </div>
  )
}
