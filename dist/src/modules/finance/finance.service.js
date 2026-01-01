"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FinanceService = class FinanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateQuotePdfBuffer(quoteId) {
        const quote = await this.prisma.quote.findUnique({ where: { id: quoteId }, include: { trip: true, company: true } });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => null);
        doc.fontSize(20).text(quote.company?.name || 'Company', { align: 'left' });
        doc.moveDown();
        doc.fontSize(14).text(`Devis #${quote.id}`);
        doc.moveDown();
        doc.fontSize(12).text(`Client: ${quote.trip?.clientName || '—'}`);
        doc.text(`Montant: ${quote.amount} ${quote.currency}`);
        doc.text(`Status: ${quote.status}`);
        doc.moveDown();
        if (quote.trip) {
            doc.text('Trip details:');
            doc.text(`Pickup: ${quote.trip.pickup || '—'}`);
            doc.text(`Dropoff: ${quote.trip.dropoff || '—'}`);
            doc.text(`Date: ${quote.trip.date?.toISOString() || '—'}`);
        }
        doc.end();
        await new Promise((res) => doc.on('end', res));
        return Buffer.concat(chunks);
    }
    async generateInvoicePdfBuffer(invoiceId) {
        const invoice = await this.prisma.invoice.findUnique({ where: { id: invoiceId }, include: { trip: true, company: true } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => null);
        doc.fontSize(20).text(invoice.company?.name || 'Company', { align: 'left' });
        doc.moveDown();
        doc.fontSize(14).text(`Facture #${invoice.id}`);
        doc.moveDown();
        doc.fontSize(12).text(`Client: ${invoice.trip?.clientName || '—'}`);
        doc.text(`Montant: ${invoice.amount} ${invoice.currency}`);
        doc.text(`TVA: ${invoice.tva ? 'Yes' : 'No'}`);
        doc.text(`Status: ${invoice.status}`);
        doc.moveDown();
        if (invoice.trip) {
            doc.text('Trip details:');
            doc.text(`Pickup: ${invoice.trip.pickup || '—'}`);
            doc.text(`Dropoff: ${invoice.trip.dropoff || '—'}`);
            doc.text(`Date: ${invoice.trip.date?.toISOString() || '—'}`);
        }
        doc.end();
        await new Promise((res) => doc.on('end', res));
        return Buffer.concat(chunks);
    }
    async createCharge(companyId, data) {
        const d = { ...data };
        d.company = { connect: { id: companyId } };
        if (d.tripId) {
            d.trip = { connect: { id: d.tripId } };
            delete d.tripId;
        }
        delete d.companyId;
        return this.prisma.charge.create({ data: d });
    }
    async convertQuoteToInvoice(quoteId, options) {
        const quote = await this.prisma.quote.findUnique({ where: { id: quoteId }, include: { trip: true } });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        const invoice = await this.prisma.invoice.create({ data: {
                company: { connect: { id: quote.companyId } },
                trip: quote.tripId ? { connect: { id: quote.tripId } } : undefined,
                amount: quote.amount,
                currency: quote.currency,
                tva: false,
                status: 'DRAFT',
            } });
        if (options?.markAccepted) {
            await this.prisma.quote.update({ where: { id: quoteId }, data: { status: 'ACCEPTED' } });
        }
        return invoice;
    }
    async getDashboardStats(companyId, opts) {
        const start = opts?.start || new Date(new Date().getFullYear(), 0, 1);
        const end = opts?.end || new Date();
        const revenueResult = await this.prisma.$queryRaw `
      SELECT date_trunc('month', "createdAt") as month, SUM(amount)::float as total
      FROM "Invoice"
      WHERE "companyId" = ${companyId} AND "createdAt" BETWEEN ${start} AND ${end}
      GROUP BY month ORDER BY month
    `;
        const chargesResult = await this.prisma.$queryRaw `
      SELECT date_trunc('month', "createdAt") as month, SUM(amount)::float as total
      FROM "Charge"
      WHERE "companyId" = ${companyId} AND "createdAt" BETWEEN ${start} AND ${end}
      GROUP BY month ORDER BY month
    `;
        const totalRevenueRow = await this.prisma.invoice.aggregate({ _sum: { amount: true }, where: { companyId, createdAt: { gte: start, lte: end } } });
        const totalChargesRow = await this.prisma.charge.aggregate({ _sum: { amount: true }, where: { companyId, createdAt: { gte: start, lte: end } } });
        const tripsByStatus = await this.prisma.trip.groupBy({ by: ['status'], _count: { status: true }, where: { companyId } });
        const monthlyRevenue = revenueResult.map((r) => ({ month: r.month, total: parseFloat(r.total) }));
        const monthlyCharges = chargesResult.map((r) => ({ month: r.month, total: parseFloat(r.total) }));
        const totalRevenue = totalRevenueRow._sum.amount || 0;
        const totalCharges = totalChargesRow._sum.amount || 0;
        const totalProfit = totalRevenue - totalCharges;
        return { totalRevenue, totalCharges, totalProfit, monthlyRevenue, monthlyCharges, tripsByStatus };
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map