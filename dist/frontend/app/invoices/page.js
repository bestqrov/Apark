"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvoicesPage;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("../../lib/axios");
const link_1 = require("next/link");
const Table_1 = require("../../components/Table");
function InvoicesPage() {
    const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : '';
    const { data, isLoading } = (0, react_query_1.useQuery)(['invoices', companyId], async () => {
        const res = await axios_1.default.get(`/invoices?companyId=${companyId}`);
        return res.data;
    });
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Factures</h2>
        <link_1.default href="/invoices/create" className="bg-blue-600 text-white px-3 py-2 rounded">Nouvelle facture</link_1.default>
      </div>

      <Table_1.default>
        <thead>
          <tr>
            <th className="p-2 text-left">Montant</th>
            <th className="p-2 text-left">TVA</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((f) => (<tr key={f.id} className="border-t">
              <td className="p-2">{f.amount} {f.currency}</td>
              <td className="p-2">{f.tva ? 'Oui' : 'Non'}</td>
              <td className="p-2">{new Date(f.createdAt).toLocaleDateString()}</td>
            </tr>))}
        </tbody>
      </Table_1.default>
    </div>);
}
//# sourceMappingURL=page.js.map