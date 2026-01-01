import Link from 'next/link'
import { useAuth } from '../lib/auth'
import { useState } from 'react'

export default function Sidebar() {
  const { user } = useAuth()

  const role = user?.role || 'STAFF'

  const show = {
    dashboard: role === 'ADMIN' || role === 'STAFF',
    trips: role === 'ADMIN' || role === 'STAFF' || role === 'DRIVER',
    quotes: role === 'ADMIN' || role === 'STAFF',
    invoices: role === 'ADMIN' || role === 'STAFF',
    charges: role === 'ADMIN' || role === 'STAFF',
    contracts: role === 'ADMIN' || role === 'STAFF',
    drivers: role === 'ADMIN' || role === 'STAFF',
    vehicles: role === 'ADMIN' || role === 'STAFF',
    settings: role === 'ADMIN',
  }

  const itemClass = 'flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 text-sm text-white'
  const menuGroups = [
    {
      title: null,
      items: [
        { href: '/dashboard', label: 'TABLEAU DE BORD', icon: '🏠', show: show.dashboard },
      ],
    },
    {
      title: 'OPÉRATIONS',
      items: [
        { href: '/trips', label: 'Trajets', icon: '📅', show: show.trips },
        { href: '/drivers', label: 'Chauffeurs', icon: '👥', show: show.drivers },
        { href: '/vehicles', label: 'Véhicules', icon: '🚚', show: show.vehicles },
        { href: '/contracts', label: 'Contrats', icon: '📜', show: show.contracts },
      ],
    },
    {
      title: 'COMMERCIAL',
      items: [
        { href: '/quotes', label: 'Devis', icon: '📝', show: show.quotes },
        { href: '/invoices', label: 'Factures', icon: '📄', show: show.invoices },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { href: '/charges', label: 'Charges', icon: '💳', show: show.charges },
      ],
    },
    {
      title: 'PARAMÈTRES',
      items: [
        { href: '/settings', label: 'Paramètres', icon: '⚙️', show: show.settings },
      ],
    },
  ]

  const [openGroup, setOpenGroup] = useState<string | null>(null)

  // when no group is open show compact headers only; when one is open show its items only
  return (
    <>
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity"
        onClick={() => {
          const sidebar = document.querySelector('aside');
          if (sidebar) sidebar.classList.add('-translate-x-full');
        }}
        style={{ display: 'none' }}
      />
      
      <aside className="-translate-x-full md:translate-x-0 w-64 bg-blue-900 dark:bg-gray-800 border-r border-blue-800 dark:border-gray-700 fixed md:static inset-y-0 left-0 transform transition-transform duration-300 z-30 h-screen overflow-y-auto">
        <div className="p-4 text-base sm:text-lg font-bold text-white flex items-center justify-between">
          <span>ArwaPark</span>
          {/* Close button for mobile */}
          <button 
            className="md:hidden text-white hover:bg-blue-800 dark:hover:bg-gray-700 p-1 rounded"
            onClick={() => {
              const sidebar = document.querySelector('aside');
              if (sidebar) sidebar.classList.add('-translate-x-full');
            }}
          >
            ✕
          </button>
        </div>
      <nav className="p-4">
        {openGroup === null ? (
          // compact headers view (Administratif placed second)
          <div className="space-y-2">
            {(() => {
              const visible = menuGroups.filter(g => g.items.some(i => i.show))
              if (visible.length === 0) return null
              return (
                <>
                  {/* Dashboard as direct link */}
                  {visible.slice(0, 1).map((g, idx) => {
                    const item = g.items.find(i => i.show)
                    if (!item) return null
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 dark:hover:bg-gray-700 text-sm text-white transition-colors"
                      >
                        <span className="w-4 inline-block">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}

                  {/* Administratif placed second */}
                  <button onClick={() => setOpenGroup('administratif')} className="w-full flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 dark:hover:bg-gray-700 text-sm text-white transition-colors">
                    <span className="w-4 inline-block">📁</span>
                    <span className="flex-1 text-left">ADMINISTRATIF</span>
                    <span>▸</span>
                  </button>

                  {/* Consommation placed after Administratif */}
                  <button onClick={() => setOpenGroup('consommation')} className="w-full flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 dark:hover:bg-gray-700 text-sm text-white transition-colors">
                    <span className="w-4 inline-block">⛽</span>
                    <span className="flex-1 text-left">CONSOMMATION</span>
                    <span>▸</span>
                  </button>

                  {/* remaining groups */}
                  {visible.slice(1).map((g, i) => {
                    // If it's PARAMÈTRES (last group), render as direct link
                    if (g.title === 'PARAMÈTRES') {
                      const item = g.items.find(it => it.show)
                      if (!item) return null
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 dark:hover:bg-gray-700 text-sm text-white transition-colors"
                        >
                          <span className="w-4 inline-block">{item.icon}</span>
                          <span>{g.title}</span>
                        </Link>
                      )
                    }
                    // Otherwise render as expandable button
                    return (
                      <button
                        key={`g${i + 1}`}
                        onClick={() => setOpenGroup(`g${i + 1}`)}
                        className="w-full flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-700 dark:hover:bg-gray-700 text-sm text-white transition-colors"
                      >
                        <span className="w-4 inline-block">{g.items.find(it => it.show)?.icon}</span>
                        <span className="flex-1 text-left">{g.title ?? g.items.find(it => it.show)?.label}</span>
                        <span>▸</span>
                      </button>
                    )
                  })}
                </>
              )
            })()}
          </div>
        ) : (
          // expanded group view
          <div>
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setOpenGroup(null)} className="text-sm text-slate-200 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors">← Retour</button>
              <button onClick={() => setOpenGroup(null)} className="text-sm text-slate-200 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors">Fermer</button>
            </div>

            {openGroup === 'administratif' ? (
              <AdministratifLinks expanded />
            ) : openGroup === 'consommation' ? (
              <ConsommationLinks expanded />
            ) : (
              (() => {
                const visible = menuGroups.filter(g => g.items.some(i => i.show))
                if (!openGroup || !openGroup.startsWith('g')) return null
                const idx = Number(openGroup.slice(1))
                const g = visible[idx]
                if (!g) return null
                return (
                  <div>
                    {g.title ? <div className="px-3 text-xs text-sky-200 font-medium mb-1">{g.title}</div> : null}
                    <div className="space-y-1">
                      {g.items.filter(i => i.show).map(i => (
                        <Link key={i.href} className={itemClass} href={i.href}>
                          <span className="w-4 inline-block">{i.icon}</span>
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })()
            )}
          </div>
        )}
      </nav>
    </aside>
    </>
  )
}

function AdministratifLinks() {
  const [open, setOpen] = useState(true)
  const items = [
    { href: '/administratif/cartes-grises', label: 'Cartes grises' },
    { href: '/administratif/assurances', label: 'Assurances' },
    { href: '/administratif/vignettes', label: 'Vignettes' },
    { href: '/administratif/taxes', label: 'Taxes' },
    { href: '/administratif/visites-techniques', label: 'Visites techniques' },
    { href: '/administratif/autorisations-circulation', label: 'Autorisation de circulation' },
    { href: '/administratif/agrements', label: 'Agréments' },
    { href: '/administratif/carnets-metrologiques', label: 'Carnets métrologiques' },
    { href: '/administratif/extincteurs', label: 'Extincteurs' },
    { href: '/administratif/permis-circulation', label: 'Permis de circulation' },
    { href: '/administratif/assurances-internationales', label: 'Assurances Internationales' },
  ]
  const sorted = items.slice().sort((a, b) => a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' }))

  return (
    <div className="mt-4 text-slate-200 dark:text-gray-300">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-700 text-sm text-white transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-4 inline-block">📁</span>
          <span className="font-semibold">ADMINISTRATIF</span>
        </div>
        <span className={`transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-1 px-2 pt-2">
          {sorted.map(i => (
            <Link key={i.href} className="block ml-2 text-sm text-slate-200 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors" href={i.href}>{i.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}

function ConsommationLinks() {
  const [open, setOpen] = useState(true)
  const items = [
    { href: '/consommation/carburant', label: 'Carburant' },
    { href: '/consommation/cartes', label: 'Cartes' },
    { href: '/consommation/recharges-cartes', label: 'Recharges des cartes' },
    { href: '/consommation/citernes', label: 'Citernes' },
    { href: '/consommation/recharges-citernes', label: 'Recharges des citernes' },
    { href: '/consommation/services', label: 'Services' },
    { href: '/consommation/autoroutes', label: 'Autoroutes' },
    { href: '/consommation/depenses', label: 'Dépenses' },
    { href: '/consommation/frais-generaux', label: 'Frais généraux' },
  ]

  const sorted = items.slice().sort((a, b) => a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' }))

  return (
    <div className="mt-4 text-slate-200 dark:text-gray-300">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-blue-800 dark:hover:bg-gray-700 text-sm text-white transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-4 inline-block">⛽</span>
          <span className="font-semibold">CONSOMMATION</span>
        </div>
        <span className={`transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-1 px-2 pt-2">
          {sorted.map(i => (
            <Link key={i.href} className="block ml-2 text-sm text-slate-200 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors" href={i.href}>{i.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}
