"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TripsPage;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("../../lib/axios");
const link_1 = require("next/link");
const Table_1 = require("../../components/Table");
function TripsPage() {
    const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : '';
    const { data, isLoading } = (0, react_query_1.useQuery)(['trips', companyId], async () => {
        const res = await axios_1.default.get(`/trips?companyId=${companyId}`);
        return res.data;
    });
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trajets</h2>
        <link_1.default href="/trips/create" className="bg-blue-600 text-white px-3 py-2 rounded">Nouveau trajet</link_1.default>
      </div>

      <Table_1.default>
        <thead>
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Pickup</th>
            <th className="p-2 text-left">Dropoff</th>
            <th className="p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((t) => (<tr key={t.id} className="border-t">
              <td className="p-2">{new Date(t.date).toLocaleString()}</td>
              <td className="p-2">{t.pickup}</td>
              <td className="p-2">{t.dropoff}</td>
              <td className="p-2">{t.price} {t.currency}</td>
            </tr>))}
        </tbody>
      </Table_1.default>
    </div>);
}
//# sourceMappingURL=page.js.map