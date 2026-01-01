"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedRoute;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_1 = require("../lib/auth");
function ProtectedRoute({ children, roles = [] }) {
    const { user } = (0, auth_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (user === null) {
            router.push('/login');
            return;
        }
        if (roles.length > 0 && user && !roles.includes(user.role || '')) {
            router.push('/dashboard');
            return;
        }
    }, [user, roles, router]);
    if (user === null)
        return <div>Redirecting...</div>;
    if (roles.length > 0 && user && !roles.includes(user.role || ''))
        return <div>Not authorized</div>;
    return <>{children}</>;
}
//# sourceMappingURL=ProtectedRoute.js.map