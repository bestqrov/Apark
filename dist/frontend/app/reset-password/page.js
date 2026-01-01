"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPage;
const react_1 = require("react");
const axios_1 = require("../../lib/axios");
const navigation_1 = require("next/navigation");
function ResetPage() {
    const [password, setPassword] = (0, react_1.useState)('');
    const [info, setInfo] = (0, react_1.useState)(null);
    const search = (0, navigation_1.useSearchParams)();
    const router = (0, navigation_1.useRouter)();
    const token = search.get('token');
    async function submit(e) {
        e.preventDefault();
        try {
            await axios_1.default.post('/auth/reset-password', { token, password });
            setInfo('Mot de passe réinitialisé');
            setTimeout(() => router.push('/login'), 1200);
        }
        catch (e) {
            setInfo('Erreur');
        }
    }
    return (<div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Réinitialiser le mot de passe</h2>
        {info ? <div className="mb-2">{info}</div> : null}
        <label className="block mb-4">
          <div className="text-sm">Nouveau mot de passe</div>
          <input type="password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Réinitialiser</button>
      </form>
    </div>);
}
//# sourceMappingURL=page.js.map