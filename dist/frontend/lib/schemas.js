"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargeSchema = exports.invoiceSchema = exports.quoteSchema = exports.tripSchema = void 0;
const zod_1 = require("zod");
exports.tripSchema = zod_1.z.object({
    date: zod_1.z.string().min(1, { message: 'Date et heure sont obligatoires' }),
    pickup: zod_1.z.string().min(1, { message: 'Lieu de prise en charge obligatoire' }),
    dropoff: zod_1.z.string().min(1, { message: 'Lieu de dépôt obligatoire' }),
    tripType: zod_1.z.enum(['AIRPORT', 'EXCURSION', 'CITY_TOUR']),
    vehicleId: zod_1.z.string().optional(),
    driverId: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, { message: 'Le prix doit être positif' }),
});
exports.quoteSchema = zod_1.z.object({
    amount: zod_1.z.number().min(0, { message: 'Montant invalide' }),
    currency: zod_1.z.enum(['MAD', 'EUR']).optional(),
    pdfUrl: zod_1.z.string().url().optional(),
    status: zod_1.z.string().optional(),
    tripId: zod_1.z.string().optional(),
});
exports.invoiceSchema = zod_1.z.object({
    amount: zod_1.z.number().min(0, { message: 'Montant invalide' }),
    currency: zod_1.z.enum(['MAD', 'EUR']).optional(),
    tva: zod_1.z.boolean().optional(),
    tripId: zod_1.z.string().optional(),
    pdfUrl: zod_1.z.string().url().optional(),
});
exports.chargeSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Type obligatoire' }),
    description: zod_1.z.string().optional(),
    amount: zod_1.z.number().min(0, { message: 'Montant invalide' }),
    currency: zod_1.z.enum(['MAD', 'EUR']).optional(),
    tripId: zod_1.z.string().optional(),
});
//# sourceMappingURL=schemas.js.map