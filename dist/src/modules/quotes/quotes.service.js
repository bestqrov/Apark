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
exports.QuotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let QuotesService = class QuotesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(companyId, data) {
        const d = { ...data };
        d.company = { connect: { id: companyId } };
        if (d.tripId) {
            d.trip = { connect: { id: d.tripId } };
            delete d.tripId;
        }
        delete d.companyId;
        return this.prisma.quote.create({ data: d });
    }
    findAll(companyId) {
        return this.prisma.quote.findMany({ where: { companyId } });
    }
    findOne(id) {
        return this.prisma.quote.findUnique({ where: { id } });
    }
    async convertToTrip(quoteId) {
        const q = await this.findOne(quoteId);
        if (!q || !q.tripId) {
            throw new Error('Quote has no trip to convert');
        }
        return this.prisma.trip.findUnique({ where: { id: q.tripId } });
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuotesService);
//# sourceMappingURL=quotes.service.js.map