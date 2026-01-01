import Link from 'next/link'

export default function AdministratifIndex() {
  const items = [
    { slug: 'cartes-grises', label: 'Cartes grises' },
    { slug: 'assurances', label: 'Assurances' },
    { slug: 'vignettes', label: 'Vignettes' },
    { slug: 'taxes', label: 'Taxes' },
    { slug: 'visites-techniques', label: 'Visites techniques' },
    { slug: 'autorisations-circulation', label: 'Autorisation de circulation' },
    { slug: 'agrements', label: 'Agréments' },
    { slug: 'carnets-metrologiques', label: 'Carnets métrologiques' },
    { slug: 'extincteurs', label: 'Extincteurs' },
    { slug: 'permis-circulation', label: 'Permis de circulation' },
    { slug: 'sinistres', label: 'Sinistres' },
    { slug: 'assurances-internationales', label: 'Assurances Internationales' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Administratif</h1>
      </div>

      <div className="bg-white p-6 rounded-b-lg shadow-lg">
        <p className="mb-4">Sélectionnez une catégorie administrative.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map(i => (
            <Link key={i.slug} href={`/administratif/${i.slug}`} className="block border rounded p-3 text-sm hover:bg-slate-50">{i.label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
