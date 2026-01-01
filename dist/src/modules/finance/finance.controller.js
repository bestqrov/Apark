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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const company_guard_1 = require("../../common/guards/company.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let FinanceController = class FinanceController {
    constructor(svc) {
        this.svc = svc;
    }
    async quotePdf(id, res) {
        const buf = await this.svc.generateQuotePdfBuffer(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="devis-${id}.pdf"`);
        res.send(buf);
    }
    async invoicePdf(id, res) {
        const buf = await this.svc.generateInvoicePdfBuffer(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="facture-${id}.pdf"`);
        res.send(buf);
    }
    createCharge(companyId, body) {
        return this.svc.createCharge(companyId, body);
    }
    convertQuote(id, body, req) {
        return this.svc.convertQuoteToInvoice(id, { markAccepted: body?.markAccepted });
    }
    async stats(companyId, start, end) {
        const s = start ? new Date(start) : undefined;
        const e = end ? new Date(end) : undefined;
        return this.svc.getDashboardStats(companyId, { start: s, end: e });
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)('quotes/:id/pdf'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "quotePdf", null);
__decorate([
    (0, common_1.Get)('invoices/:id/pdf'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "invoicePdf", null);
__decorate([
    (0, common_1.Post)('charges'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Query)('companyId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createCharge", null);
__decorate([
    (0, common_1.Post)('quotes/:id/convert'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "convertQuote", null);
__decorate([
    (0, common_1.Get)('/dashboard/stats'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Query)('companyId')),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "stats", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)('finance'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard, company_guard_1.CompanyGuard),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map