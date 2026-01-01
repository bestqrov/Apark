"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditQuotePage;
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("../../../../lib/schemas");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const axios_1 = require("../../../../lib/axios");
const FormInput_1 = require("../../../../components/FormInput");
const react_1 = require("react");
function EditQuotePage() {
    const params = (0, navigation_1.useParams)();
    const id = params?.id;
    const router = (0, navigation_1.useRouter)();
    const qc = (0, react_query_1.useQueryClient)();
    const { data, isLoading } = (0, react_query_1.useQuery)(['quote', id], async () => {
        const res = await axios_1.default.get(`/quotes/${id}`);
        return res.data;
    }, { enabled: !!id });
    const { register, handleSubmit, reset, formState: { errors } } = (0, react_hook_form_1.useForm)({ resolver: (0, zod_1.zodResolver)(schemas_1.quoteSchema) });
    (0, react_1.useEffect)(() => { if (data)
        reset({ amount: data.amount, currency: data.currency, status: data.status }); }, [data, reset]);
    const mutation = (0, react_query_1.useMutation)((payload) => axios_1.default.put(`/quotes/${id}`, payload), { onSuccess() { qc.invalidateQueries(['quotes']); qc.invalidateQueries(['quote', id]); router.push(`/quotes/${id}`); } });
    function onSubmit(vals) { mutation.mutate({ ...vals }); }
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Modifier le devis</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput_1.default label="Montant" type="number" step="0.01" {...register('amount')} error={errors.amount?.message}/>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">Devise</div>
          <select className="w-full border p-2 rounded" {...register('currency')}>
            <option value="MAD">MAD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">Statut</div>
          <input className="w-full border p-2 rounded" {...register('status')}/>
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Enregistrer</button>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map