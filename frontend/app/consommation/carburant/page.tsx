"use client"
import React, { useEffect, useState } from 'react'

export default function CarburantPage() {
  const [vehicle, setVehicle] = useState('')
  const [collaborator, setCollaborator] = useState('')

  const [number, setNumber] = useState('')
  const [date, setDate] = useState('2025-12-31')
  const [time, setTime] = useState('22:35')
  const [fuelType, setFuelType] = useState('')
  const [station, setStation] = useState('')

  const [paymentMode, setPaymentMode] = useState('')
  const [quantity, setQuantity] = useState<number>(0)
  const [unitPrice, setUnitPrice] = useState<number>(0)
  const [amountHT, setAmountHT] = useState<number>(0)
  const [tva, setTva] = useState<number>(20)
  const [amountTTC, setAmountTTC] = useState<number>(0)
  const [plein, setPlein] = useState(false)

  const [kilometrage, setKilometrage] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)
  const [percentConso, setPercentConso] = useState<number>(0)
  const [indexHoraire, setIndexHoraire] = useState<number>(0)

  const [attachment, setAttachment] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const ht = Number((quantity || 0) * (unitPrice || 0))
    setAmountHT(Number(ht.toFixed(2)))
    const ttc = ht * (1 + (tva || 0) / 100)
    setAmountTTC(Number(ttc.toFixed(2)))
  }, [quantity, unitPrice, tva])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('vehicle', vehicle)
      fd.append('collaborator', collaborator)
      fd.append('number', number)
      fd.append('date', date)
      fd.append('time', time)
      fd.append('fuelType', fuelType)
      fd.append('station', station)
      fd.append('paymentMode', paymentMode)
      fd.append('quantity', String(quantity))
      fd.append('unitPrice', String(unitPrice))
      fd.append('amountHT', String(amountHT))
      fd.append('tva', String(tva))
      fd.append('amountTTC', String(amountTTC))
      fd.append('plein', String(plein))
      fd.append('kilometrage', String(kilometrage))
      fd.append('distance', String(distance))
      fd.append('percentConso', String(percentConso))
      fd.append('indexHoraire', String(indexHoraire))
      fd.append('comment', comment)
      if (attachment) fd.append('attachment', attachment)

      const res = await fetch('/api/consommation/carburant', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Server error')
      setStatus('ok')
      // reset numeric fields
      setQuantity(0)
      setUnitPrice(0)
      setAttachment(null)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Carburant</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top: vehicle + collaborator */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Middle: designation (left) and costs (right) */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 border rounded p-4 bg-white">
            <h2 className="font-semibold mb-3">Désignation</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Numéro</label>
                <input value={number} onChange={e => setNumber(e.target.value)} className="mt-1 w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Date</label>
                <div className="flex gap-2">
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 w-32 p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Type carburant</label>
                <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="mt-1 w-full p-2 border rounded">
                  <option value="">Choisir</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Station</label>
                <div className="flex gap-2 mt-1">
                  <select value={station} onChange={e => setStation(e.target.value)} className="flex-1 p-2 border rounded">
                    <option value="">Choisir</option>
                  </select>
                  <button type="button" className="px-3 bg-green-500 text-white rounded">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 border rounded p-4 bg-white">
            <h2 className="font-semibold mb-3">Coûts</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Mode de paiement</label>
                <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)} className="mt-1 w-full p-2 border rounded">
                  <option value="">Choisir</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-slate-600">Quantité</label>
                  <div className="mt-1 flex">
                    <input type="number" step="0.01" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">L</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Prix unitaire</label>
                  <div className="mt-1 flex">
                    <input type="number" step="0.01" value={unitPrice} onChange={e => setUnitPrice(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">DH</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-slate-600">Montant HT</label>
                  <div className="mt-1 p-2 border rounded bg-slate-50">{amountHT.toFixed(2)} DH</div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Montant TTC</label>
                  <div className="mt-1 p-2 border rounded bg-slate-50">{amountTTC.toFixed(2)} DH</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <label className="text-sm text-slate-600">TVA</label>
                  <div className="mt-1 flex">
                    <input type="number" value={tva} onChange={e => setTva(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                    <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600">Plein</label>
                  <input type="checkbox" checked={plein} onChange={e => setPlein(e.target.checked)} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower: % conso and Divers */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 border rounded p-4 bg-white">
            <h2 className="font-semibold mb-3">% conso</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Kilométrage</label>
                <div className="mt-1 flex">
                  <input type="number" step="0.01" value={kilometrage} onChange={e => setKilometrage(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                  <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">KM</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Distance parcourue</label>
                <div className="mt-1 flex">
                  <input type="number" step="0.01" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                  <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">KM</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">% conso</label>
                <div className="mt-1 flex">
                  <input type="number" step="0.01" value={percentConso} onChange={e => setPercentConso(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                  <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Indexe horaire</label>
                <div className="mt-1 flex">
                  <input type="number" step="0.01" value={indexHoraire} onChange={e => setIndexHoraire(Number(e.target.value))} className="w-full p-2 border rounded-l" />
                  <span className="inline-flex items-center px-3 border border-l-0 rounded-r bg-slate-50">H</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 border rounded p-4 bg-white">
            <h2 className="font-semibold mb-3">Divers</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Attachement</label>
                <input type="file" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} className="mt-1 w-full" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Commentaire</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} className="mt-1 w-full p-2 border rounded h-28" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 border rounded">Annuler</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
          <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Enregistrer & Ajouter</button>
        </div>
      </form>
    </div>
  )
}
