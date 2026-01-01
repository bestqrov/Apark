"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
require("./globals.css");
const react_query_1 = require("@tanstack/react-query");
const Sidebar_1 = require("../components/Sidebar");
const Topbar_1 = require("../components/Topbar");
const auth_1 = require("../lib/auth");
const navigation_1 = require("next/navigation");
const queryClient = new react_query_1.QueryClient();
function RootLayout({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    const hideShell = pathname === '/login' || pathname === '/forgot-password' || pathname === '/reset-password';
    return (<html lang="fr">
      <body>
        <react_query_1.QueryClientProvider client={queryClient}>
          <auth_1.AuthProvider>
            {hideShell ? (<main className="p-4">{children}</main>) : (<div className="flex min-h-screen bg-gray-50">
                <Sidebar_1.default />
                <div className="flex-1">
                  <Topbar_1.default />
                  <main className="p-4">{children}</main>
                </div>
              </div>)}
          </auth_1.AuthProvider>
        </react_query_1.QueryClientProvider>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map