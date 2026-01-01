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
exports.ChargesController = void 0;
const common_1 = require("@nestjs/common");
const charges_service_1 = require("./charges.service");
const create_charge_dto_1 = require("./dto/create-charge.dto");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const company_guard_1 = require("../../common/guards/company.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let ChargesController = class ChargesController {
    constructor(svc) {
        this.svc = svc;
    }
    create(companyId, body, req) {
        const cid = companyId || req.user.companyId;
        return this.svc.create(cid, body);
    }
    findAll(companyId, req) {
        const cid = companyId || req.user.companyId;
        return this.svc.findAll(cid);
    }
    findForTrip(tripId) {
        return this.svc.findForTrip(tripId);
    }
};
exports.ChargesController = ChargesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Query)('companyId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_charge_dto_1.CreateChargeDto, Object]),
    __metadata("design:returntype", void 0)
], ChargesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Query)('companyId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChargesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-trip'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STAFF', 'DRIVER'),
    __param(0, (0, common_1.Query)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChargesController.prototype, "findForTrip", null);
exports.ChargesController = ChargesController = __decorate([
    (0, common_1.Controller)('charges'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard, company_guard_1.CompanyGuard),
    __metadata("design:paramtypes", [charges_service_1.ChargesService])
], ChargesController);
//# sourceMappingURL=charges.controller.js.map