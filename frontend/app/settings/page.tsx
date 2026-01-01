"use client"

import { useState } from 'react'
import Link from 'next/link'

const Section = ({ title, children, open, onToggle }: any) => (
  <div className="border rounded bg-white/5 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 bg-transparent text-left text-gray-100 hover:bg-white/5"
    >
      <span className="font-medium">{title}</span>
      <span>{open ? '▾' : '▸'}</span>
    </button>
    {open ? <div className="p-4 text-sm text-gray-200 bg-white/3">{children}</div> : null}
  </div>
)

export default function SettingsPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>

        <Section
          title="Thème"
          open={open === 'theme'}
          onToggle={() => setOpen(open === 'theme' ? null : 'theme')}
        >
          <p className="mb-3">Choisissez le thème de l'interface.</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-slate-700 text-white">Sombre</button>
            <button className="px-3 py-1 rounded bg-white text-slate-800">Clair</button>
            <button className="px-3 py-1 rounded bg-slate-700/50 text-white">Système</button>
          </div>
        </Section>

        <Section
          title="Backups"
          open={open === 'backups'}
          onToggle={() => setOpen(open === 'backups' ? null : 'backups')}
        >
          <p className="mb-3">Planification et restauration des sauvegardes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Fréquence</label>
              <select className="w-full p-2 rounded bg-slate-800 text-white">
                <option>Quotidien</option>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Stockage</label>
              <select className="w-full p-2 rounded bg-slate-800 text-white">
                <option>Local</option>
                <option>Amazon S3</option>
                <option>Google Cloud</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 rounded bg-green-600 text-white">Sauvegarder maintenant</button>
            <button className="px-3 py-1 rounded bg-slate-700 text-white">Restaurer</button>
          </div>
        </Section>

        <Section
          title="Sécurité"
          open={open === 'securite'}
          onToggle={() => setOpen(open === 'securite' ? null : 'securite')}
        >
          <p className="mb-3">Paramètres de sécurité et accès.</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Authentification à deux facteurs</div>
                <div className="text-xs text-gray-300">Activer la 2FA pour tous les comptes administrateurs.</div>
              </div>
              <button className="px-3 py-1 rounded bg-slate-700 text-white">Configurer</button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Politiques de mot de passe</div>
                <div className="text-xs text-gray-300">Exiger longueur minimale, complexité et rotation.</div>
              </div>
              <button className="px-3 py-1 rounded bg-slate-700 text-white">Modifier</button>
            </div>
          </div>
        </Section>

        <Section
          title="Mises à jour"
          open={open === 'updates'}
          onToggle={() => setOpen(open === 'updates' ? null : 'updates')}
        >
          <p className="mb-3">Gérer les mises à jour de l'application.</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-blue-600 text-white">Vérifier les mises à jour</button>
            <button className="px-3 py-1 rounded bg-slate-700 text-white">Appliquer maintenant</button>
          </div>
        </Section>

        <div className="pt-4 text-sm text-gray-400">
          <Link href="/dashboard">← Retour au tableau de bord</Link>
        </div>
      </div>
    </div>
  )
}
