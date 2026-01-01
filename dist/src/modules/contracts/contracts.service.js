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
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ContractsService = class ContractsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(companyId, data, attachmentPath) {
        const payload = {
            company: { connect: { id: companyId } },
            collaborator: { connect: { id: data.collaboratorId } },
            number: data.number,
            contractType: data.contractTypeId ? { connect: { id: data.contractTypeId } } : undefined,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
            endDatePlanned: data.endDatePlanned ? new Date(data.endDatePlanned) : undefined,
            durationPlanned: data.durationPlanned ? Number(data.durationPlanned) : undefined,
            endDateReal: data.endDateReal ? new Date(data.endDateReal) : undefined,
            durationReal: data.durationReal ? Number(data.durationReal) : undefined,
            probationPeriod: data.probationPeriod ? Number(data.probationPeriod) : undefined,
            hours: data.hours ? Number(data.hours) : undefined,
            comment: data.comment,
            attachment: attachmentPath,
        };
        Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);
        return this.prisma.contract.create({ data: payload });
    }
    findAll(companyId) {
        return this.prisma.contract.findMany({ where: { companyId }, include: { collaborator: true, contractType: true } });
    }
    findMetadata(companyId) {
        return Promise.all([
            this.prisma.user.findMany({ where: { companyId }, select: { id: true, name: true, email: true } }),
            this.prisma.contractType.findMany({ where: { companyId } }),
        ]).then(([collaborators, contractTypes]) => ({ collaborators, contractTypes }));
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map