"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const link_1 = require("next/link");
const auth_1 = require("../lib/auth");
function Sidebar() {
    const { user } = (0, auth_1.useAuth)();
    const role = user?.role || 'STAFF';
    const show = {
        dashboard: role === 'ADMIN' || role === 'STAFF',
        trips: role === 'ADMIN' || role === 'STAFF' || role === 'DRIVER',
        quotes: role === 'ADMIN' || role === 'STAFF',
        invoices: role === 'ADMIN' || role === 'STAFF',
        charges: role === 'ADMIN' || role === 'STAFF',
        drivers: role === 'ADMIN' || role === 'STAFF',
        vehicles: role === 'ADMIN' || role === 'STAFF',
        settings: role === 'ADMIN',
    };
    const itemClass = 'flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 text-sm';
    return (<aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 text-lg font-bold">ArwaPark</div>
      <nav className="p-4 space-y-2">
        {show.dashboard ? <link_1.default className={itemClass} href="/dashboard"><span className="w-4 inline-block">🏠</span> Tableau de bord</link_1.default> : null}
        {show.trips ? <link_1.default className={itemClass} href="/trips"><span className="w-4 inline-block">📅</span> Trajets</link_1.default> : null}
        {show.quotes ? <link_1.default className={itemClass} href="/quotes"><span className="w-4 inline-block">📝</span> Devis</link_1.default> : null}
        {show.invoices ? <link_1.default className={itemClass} href="/invoices"><span className="w-4 inline-block">📄</span> Factures</link_1.default> : null}
        {show.charges ? <link_1.default className={itemClass} href="/charges"><span className="w-4 inline-block">💳</span> Charges</link_1.default> : null}
        {show.drivers ? <link_1.default className={itemClass} href="/drivers"><span className="w-4 inline-block">👥</span> Chauffeurs</link_1.default> : null}
        {show.vehicles ? <link_1.default className={itemClass} href="/vehicles"><span className="w-4 inline-block">🚚</span> Véhicules</link_1.default> : null}
        {show.settings ? <link_1.default className={itemClass} href="/settings"><span className="w-4 inline-block">⚙️</span> Paramètres</link_1.default> : null}
      </nav>
    </aside>);
}
//# sourceMappingURL=Sidebar.js.map