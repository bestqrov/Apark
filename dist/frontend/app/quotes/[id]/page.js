"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuoteDetail;
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const axios_1 = require("../../../lib/axios");
const Card_1 = require("../../../components/Card");
function QuoteDetail() {
    const params = (0, navigation_1.useParams)();
    const id = params?.id;
    const router = (0, navigation_1.useRouter)();
    const { data, isLoading } = (0, react_query_1.useQuery)(['quote', id], async () => {
        const res = await axios_1.default.get(`/quotes/${id}`);
        return res.data;
    }, { enabled: !!id });
    async function remove() {
        if (!confirm('Supprimer ce devis ?'))
            return;
        try {
            await axios_1.default.delete(`/quotes/${id}`);
            router.push('/quotes');
        }
        catch (err) {
            alert(err.message || 'Erreur');
        }
    }
    if (isLoading)
        return <div>Chargement...</div>;
    if (!data)
        return <div>Introuvable</div>;
    return (<div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Détails du devis</h2>
        <div className="space-x-2">
          <a className="text-sm text-blue-600" href={`/quotes/${id}/edit`}>Modifier</a>
          <button onClick={remove} className="text-sm text-red-600">Supprimer</button>
        </div>
      </div>

      <Card_1.default title="Infos">
        <div>Montant: {data.amount} {data.currency}</div>
        <div>Statut: {data.status}</div>
      </Card_1.default>
    </div>);
}
//# sourceMappingURL=page.js.map