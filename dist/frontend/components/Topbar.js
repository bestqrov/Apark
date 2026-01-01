"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Topbar;
const react_1 = require("react");
const auth_1 = require("../lib/auth");
const lucide_react_1 = require("lucide-react");
function Topbar() {
    const { user, logout } = (0, auth_1.useAuth)();
    return (<header className="flex items-center justify-between border-b bg-white p-4">
      <div className="text-sm font-medium">{user?.companyId || 'Demo Company'}</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600"><lucide_react_1.User size={16}/>{user?.email || 'Invité'}</div>
        <button onClick={() => logout()} className="flex items-center gap-2 text-sm text-red-600"><lucide_react_1.LogOut size={16}/>Se déconnecter</button>
      </div>
    </header>);
}
//# sourceMappingURL=Topbar.js.map