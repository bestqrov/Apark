"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = decodeToken;
function decodeToken(token) {
    if (!token)
        return null;
    try {
        const parts = token.split('.');
        if (parts.length < 2)
            return null;
        const payload = parts[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decodeURIComponent(escape(decoded)));
    }
    catch (e) {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
        }
        catch (err) {
            return null;
        }
    }
}
//# sourceMappingURL=jwt.js.map