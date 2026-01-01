"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuotesPage;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("../../lib/axios");
const link_1 = require("next/link");
const Table_1 = require("../../components/Table");
function QuotesPage() {
    const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : '';
    const { data, isLoading } = (0, react_query_1.useQuery)(['quotes', companyId], async () => {
        const res = await axios_1.default.get(`/quotes?companyId=${companyId}`);
        return res.data;
    });
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Devis</h2>
        <link_1.default href="/quotes/create" className="bg-blue-600 text-white px-3 py-2 rounded">Nouveau devis</link_1.default>
      </div>

      <Table_1.default>
        <thead>
          <tr>
            <th className="p-2 text-left">Montant</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((q) => (<tr key={q.id} className="border-t">
              <td className="p-2">{q.amount} {q.currency}</td>
              <td className="p-2">{q.status}</td>
              <td className="p-2">{new Date(q.createdAt).toLocaleDateString()}</td>
            </tr>))}
        </tbody>
      </Table_1.default>
    </div>);
}
//# sourceMappingURL=page.js.map