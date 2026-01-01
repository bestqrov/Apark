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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TripsService = class TripsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(companyId, data) {
        const d = { ...data };
        d.company = { connect: { id: companyId } };
        delete d.companyId;
        return this.prisma.trip.create({ data: d });
    }
    findAll(companyId) {
        return this.prisma.trip.findMany({ where: { companyId }, include: { charges: true, invoice: true } });
    }
    findOne(id) {
        return this.prisma.trip.findUnique({ where: { id }, include: { charges: true, invoice: true } });
    }
    async profitForTrip(id) {
        const trip = await this.findOne(id);
        if (!trip)
            return null;
        const charges = trip.charges || [];
        const totalCharges = charges.reduce((s, c) => s + c.amount, 0);
        const invoiceAmount = trip.invoice ? trip.invoice.amount : trip.price;
        const profit = invoiceAmount - totalCharges;
        return { tripId: id, invoiceAmount, totalCharges, profit };
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsService);
//# sourceMappingURL=trips.service.js.map