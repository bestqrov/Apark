"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDashboard = useDashboard;
exports.useDownloadInvoicePdf = useDownloadInvoicePdf;
exports.useDownloadQuotePdf = useDownloadQuotePdf;
exports.useTripProfit = useTripProfit;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("./axios");
function useDashboard(companyId, start, end) {
    return (0, react_query_1.useQuery)(['dashboard', companyId, start, end], async () => {
        const res = await axios_1.default.get('/finance/dashboard/stats', { params: { companyId, start, end } });
        return res.data;
    });
}
function useDownloadInvoicePdf() {
    return (0, react_query_1.useMutation)(async (id) => {
        const res = await axios_1.default.get(`/finance/invoices/${id}/pdf`, { responseType: 'blob' });
        return res.data;
    });
}
function useDownloadQuotePdf() {
    return (0, react_query_1.useMutation)(async (id) => {
        const res = await axios_1.default.get(`/finance/quotes/${id}/pdf`, { responseType: 'blob' });
        return res.data;
    });
}
function useTripProfit(id) {
    return (0, react_query_1.useQuery)(['trip', 'profit', id], async () => {
        if (!id)
            return null;
        const res = await axios_1.default.get(`/trips/${id}/profit`);
        return res.data;
    }, { enabled: !!id });
}
//# sourceMappingURL=hooks.js.map