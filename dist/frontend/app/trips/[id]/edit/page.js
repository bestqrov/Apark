"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditTripPage;
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("../../../../lib/schemas");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const axios_1 = require("../../../../lib/axios");
const FormInput_1 = require("../../../../components/FormInput");
const react_1 = require("react");
function EditTripPage() {
    const params = (0, navigation_1.useParams)();
    const id = params?.id;
    const router = (0, navigation_1.useRouter)();
    const qc = (0, react_query_1.useQueryClient)();
    const { data, isLoading } = (0, react_query_1.useQuery)(['trip', id], async () => {
        const res = await axios_1.default.get(`/trips/${id}`);
        return res.data;
    }, { enabled: !!id });
    const { register, handleSubmit, reset, formState: { errors } } = (0, react_hook_form_1.useForm)({ resolver: (0, zod_1.zodResolver)(schemas_1.tripSchema) });
    (0, react_1.useEffect)(() => { if (data)
        reset({ date: new Date(data.date).toISOString().slice(0, 16), pickup: data.pickup, dropoff: data.dropoff, tripType: data.tripType, price: data.price }); }, [data, reset]);
    const mutation = (0, react_query_1.useMutation)((payload) => axios_1.default.put(`/trips/${id}`, payload), { onSuccess() { qc.invalidateQueries(['trips']); qc.invalidateQueries(['trip', id]); router.push(`/trips/${id}`); } });
    function onSubmit(vals) { mutation.mutate({ ...vals, price: Number(vals.price) }); }
    if (isLoading)
        return <div>Chargement...</div>;
    return (<div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Modifier le trajet</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput_1.default label="Date & heure" type="datetime-local" {...register('date')} error={errors.date?.message}/>
        <FormInput_1.default label="Pickup" {...register('pickup')} error={errors.pickup?.message}/>
        <FormInput_1.default label="Dropoff" {...register('dropoff')} error={errors.dropoff?.message}/>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">Type</div>
          <select className="w-full border p-2 rounded" {...register('tripType')}>
            <option value="AIRPORT">Aéroport</option>
            <option value="EXCURSION">Excursion</option>
            <option value="CITY_TOUR">City tour</option>
          </select>
        </label>
        <FormInput_1.default label="Prix" type="number" step="0.01" {...register('price')} error={errors.price?.message}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Enregistrer</button>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map