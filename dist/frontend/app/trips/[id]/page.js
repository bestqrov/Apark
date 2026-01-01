"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TripDetail;
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const axios_1 = require("../../../lib/axios");
const Card_1 = require("../../../components/Card");
function TripDetail() {
    const params = (0, navigation_1.useParams)();
    const id = params?.id;
    const router = (0, navigation_1.useRouter)();
    const { data, isLoading } = (0, react_query_1.useQuery)(['trip', id], async () => {
        const res = await axios_1.default.get(`/trips/${id}`);
        return res.data;
    }, { enabled: !!id });
    async function remove() {
        if (!confirm('Supprimer ce trajet ?'))
            return;
        try {
            await axios_1.default.delete(`/trips/${id}`);
            router.push('/trips');
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
        <h2 className="text-lg font-semibold">Détails du trajet</h2>
        <div className="space-x-2">
          <a className="text-sm text-blue-600" href={`/trips/${id}/edit`}>Modifier</a>
          <button onClick={remove} className="text-sm text-red-600">Supprimer</button>
        </div>
      </div>

      <Card_1.default title="Infos">
        <div>Date: {new Date(data.date).toLocaleString()}</div>
        <div>Pickup: {data.pickup}</div>
        <div>Dropoff: {data.dropoff}</div>
        <div>Price: {data.price} {data.currency}</div>
      </Card_1.default>

      <Card_1.default title="Charges">
        {data.charges?.length ? data.charges.map((c) => (<div key={c.id} className="border-b py-2">{c.type} — {c.amount} {c.currency}</div>)) : <div>Aucune charge</div>}
      </Card_1.default>
    </div>);
}
//# sourceMappingURL=page.js.map