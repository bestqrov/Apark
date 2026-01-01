"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditInvoicePage;
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("../../../../lib/schemas");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const axios_1 = require("../../../../lib/axios");
const FormInput_1 = require("../../../../components/FormInput");
const react_1 = require("react");
function EditInvoicePage() {
    const params = (0, navigation_1.useParams)();
    const id = params?.id;
    const router = (0, navigation_1.useRouter)();
    const qc = (0, react_query_1.useQueryClient)();
    const { data, isLoading } = (0, react_query_1.useQuery)(['invoice', id], async () => {
        const res = await axios_1.default.get(`/invoices/${id}`);
        return res.data;
    }, { enabled: !!id });
    const { register, handleSubmit, reset, formState: { errors } } = (0, react_hook_form_1.useForm)({ resolver: (0, zod_1.zodResolver)(schemas_1.invoiceSchema) });
    (0, react_1.useEffect)(() => { if (data)
        reset({ amount: data.amount, currency: data.currency, tva: data.tva }); }, [data, reset]);
    const mutation = (0, react_query_1.useMutation)((payload) => axios_1.default.put(`/invoices/${id}`, payload), { onSuccess() { qc.invalidateQueries(['invoices']); qc.invalidateQueries(['invoice', id]); router.push(`/invoices/${id}`); } });
    function onSubmit(vals) { mutation.mutate({ ...vals }); }
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Modifier la facture</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput_1.default label="Montant" type="number" step="0.01" {...register('amount')} error={errors.amount?.message}/>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">TVA</div>
          <select className="w-full border p-2 rounded" {...register('tva')}>
            <option value={false}>Non</option>
            <option value={true}>Oui</option>
          </select>
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Enregistrer</button>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map