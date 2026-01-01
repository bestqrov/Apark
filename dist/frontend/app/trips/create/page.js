"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateTripPage;
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const schemas_1 = require("../../../lib/schemas");
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("../../../lib/axios");
const FormInput_1 = require("../../../components/FormInput");
function CreateTripPage() {
    const companyId = typeof window !== 'undefined' ? localStorage.getItem('companyId') || '' : '';
    const qc = (0, react_query_1.useQueryClient)();
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({ resolver: (0, zod_1.zodResolver)(schemas_1.tripSchema) });
    const mutation = (0, react_query_1.useMutation)((payload) => axios_1.default.post(`/trips?companyId=${companyId}`, payload), {
        onSuccess() { qc.invalidateQueries(['trips', companyId]); window.location.href = '/trips'; }
    });
    function onSubmit(data) { mutation.mutate({ ...data, price: Number(data.price) }); }
    return (<div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Créer un trajet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white p-4 rounded-md border">
        <FormInput_1.default label="Date & heure" type="datetime-local" {...register('date')} error={errors.date?.message}/>
        <FormInput_1.default label="Pickup" {...register('pickup')} error={errors.pickup?.message}/>
        <FormInput_1.default label="Dropoff" {...register('dropoff')} error={errors.dropoff?.message}/>
        <label className="block mb-3">
          <div className="text-sm text-slate-600 mb-1">Type</div>
          <select className="w-full rounded-md border p-2" {...register('tripType')}>
            <option value="AIRPORT">Aéroport</option>
            <option value="EXCURSION">Excursion</option>
            <option value="CITY_TOUR">City tour</option>
          </select>
        </label>
        <FormInput_1.default label="Prix" type="number" step="0.01" {...register('price')} error={errors.price?.message}/>
        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Créer</button>
        </div>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map