"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PdfDownloadButton;
const react_1 = require("react");
const hooks_1 = require("../lib/hooks");
function PdfDownloadButton({ id, type = 'invoice' }) {
    const downloadInvoice = (0, hooks_1.useDownloadInvoicePdf)();
    const downloadQuote = (0, hooks_1.useDownloadQuotePdf)();
    async function handle() {
        try {
            const blob = type === 'invoice' ? await downloadInvoice.mutateAsync(id) : await downloadQuote.mutateAsync(id);
            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
            window.open(url, '_blank');
        }
        catch (e) {
            alert(e?.message || 'Erreur téléchargement PDF');
        }
    }
    return (<button onClick={handle} className="text-sm text-blue-600">Télécharger PDF</button>);
}
//# sourceMappingURL=PdfDownloadButton.js.map