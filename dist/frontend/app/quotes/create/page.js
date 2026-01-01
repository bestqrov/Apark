"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateQuotePage;
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("../../../lib/schemas");
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("../../../lib/axios");
const FormInput_1 = require("../../../components/FormInput");
function CreateQuotePage() {
    const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : '';
    const qc = (0, react_query_1.useQueryClient)();
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({ resolver: (0, zod_1.zodResolver)(schemas_1.quoteSchema) });
    const mutation = (0, react_query_1.useMutation)((payload) => axios_1.default.post(`/quotes?companyId=${companyId}`, payload), { onSuccess() { qc.invalidateQueries(['quotes', companyId]); window.location.href = '/quotes'; } });
    function onSubmit(data) { mutation.mutate({ ...data }); }
    return (<div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Créer un devis</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput_1.default label="Montant" type="number" step="0.01" {...register('amount')} error={errors.amount?.message}/>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">Devise</div>
          <select className="w-full border p-2 rounded" {...register('currency')}>
            <option value="MAD">MAD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Créer</button>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map