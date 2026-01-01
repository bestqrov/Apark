"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = tenantMiddleware;
function tenantMiddleware(req, res, next) {
    const q = req.query?.companyId;
    if (q) {
        req.companyId = q;
        return next();
    }
    if (req.user && req.user.companyId) {
        req.companyId = req.user.companyId;
    }
    return next();
}
//# sourceMappingURL=tenant.middleware.js.map