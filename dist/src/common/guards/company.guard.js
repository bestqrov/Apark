"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyGuard = void 0;
const common_1 = require("@nestjs/common");
let CompanyGuard = class CompanyGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user)
            return false;
        if (user.role === 'ADMIN')
            return true;
        const companyIdFromQuery = req.query?.companyId;
        if (companyIdFromQuery && companyIdFromQuery !== user.companyId) {
            throw new common_1.ForbiddenException('Access to this company is forbidden');
        }
        return true;
    }
};
exports.CompanyGuard = CompanyGuard;
exports.CompanyGuard = CompanyGuard = __decorate([
    (0, common_1.Injectable)()
], CompanyGuard);
//# sourceMappingURL=company.guard.js.map