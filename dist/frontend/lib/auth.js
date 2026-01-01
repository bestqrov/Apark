"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
exports.useRequireRole = useRequireRole;
const react_1 = require("react");
const jwt_1 = require("./jwt");
const navigation_1 = require("next/navigation");
const AuthContext = (0, react_1.createContext)({ user: null, setToken: () => { }, logout: () => { } });
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token) {
            const payload = (0, jwt_1.decodeToken)(token);
            if (payload)
                setUser({ id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId });
        }
    }, []);
    function setToken(token) {
        if (token) {
            localStorage.setItem('access_token', token);
            const payload = (0, jwt_1.decodeToken)(token);
            if (payload) {
                const u = { id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId };
                localStorage.setItem('user', JSON.stringify(u));
                if (u.companyId)
                    localStorage.setItem('companyId', u.companyId);
                try {
                    document.cookie = `access_token=${token}; path=/`;
                }
                catch (e) { }
                setUser(u);
            }
        }
        else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('companyId');
            try {
                document.cookie = 'access_token=; Max-Age=0; path=/';
            }
            catch (e) { }
            setUser(null);
        }
    }
    function logout() {
        setToken(null);
        const router = (typeof window !== 'undefined') ? window.location = '/login' : undefined;
    }
    return <AuthContext.Provider value={{ user, setToken, logout }}>{children}</AuthContext.Provider>;
}
function useAuth() {
    return (0, react_1.useContext)(AuthContext);
}
function useRequireRole(allowed = []) {
    const { user } = useAuth();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!user)
            return;
        if (allowed.length === 0)
            return;
        if (!allowed.includes(user.role || ''))
            router.push('/dashboard');
    }, [user, allowed, router]);
}
//# sourceMappingURL=auth.js.map