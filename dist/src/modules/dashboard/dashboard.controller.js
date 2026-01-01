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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const company_guard_1 = require("../../common/guards/company.guard");
let DashboardController = class DashboardController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async totals(companyId, req) {
        const cid = companyId || req.user.companyId;
        const revenue = await this.prisma.invoice.aggregate({ where: { companyId: cid }, _sum: { amount: true } });
        const charges = await this.prisma.charge.aggregate({ where: { companyId: cid }, _sum: { amount: true } });
        const trips = await this.prisma.trip.findMany({ where: { companyId: cid }, include: { charges: true, invoice: true } });
        const profit = (revenue._sum.amount || 0) - (charges._sum.amount || 0);
        const profitPerTrip = trips.map(t => {
            const totalCharges = (t.charges || []).reduce((s, c) => s + c.amount, 0);
            const invoiceAmount = t.invoice ? t.invoice.amount : t.price;
            return { tripId: t.id, profit: invoiceAmount - totalCharges };
        });
        return {
            revenue: revenue._sum.amount || 0,
            charges: charges._sum.amount || 0,
            profit,
            profitPerTrip,
            tripsCount: trips.length,
        };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('totals'),
    __param(0, (0, common_1.Query)('companyId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "totals", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard, company_guard_1.CompanyGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map