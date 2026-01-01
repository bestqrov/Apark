"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
function middleware(req) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/login') {
        return server_1.NextResponse.next();
    }
    const token = req.cookies.get('access_token')?.value;
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return server_1.NextResponse.redirect(url);
    }
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
//# sourceMappingURL=middleware.js.map