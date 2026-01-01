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
exports.AdministratifController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const companies_service_1 = require("../companies/companies.service");
const fs = require("fs");
let AdministratifController = class AdministratifController {
    constructor(vehiclesSvc, companiesSvc) {
        this.vehiclesSvc = vehiclesSvc;
        this.companiesSvc = companiesSvc;
    }
    async vehicles(companyId) {
        return this.vehiclesSvc.findAll(companyId);
    }
    async insuranceCompanies() {
        return this.companiesSvc.findAll();
    }
    async fleets() {
        return this.vehiclesSvc.findAll(undefined);
    }
    garages() {
        return [];
    }
    suppliers() {
        return [];
    }
    centers() {
        return [];
    }
    async create(resource, body, file) {
        const path = file ? file.path.replace(/\\/g, '/') : undefined;
        return { ok: true, resource, body, attachment: path };
    }
};
exports.AdministratifController = AdministratifController;
__decorate([
    (0, common_1.Get)('vehicles'),
    __param(0, (0, common_1.Query)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdministratifController.prototype, "vehicles", null);
__decorate([
    (0, common_1.Get)('insurance-companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministratifController.prototype, "insuranceCompanies", null);
__decorate([
    (0, common_1.Get)('fleets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministratifController.prototype, "fleets", null);
__decorate([
    (0, common_1.Get)('garages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdministratifController.prototype, "garages", null);
__decorate([
    (0, common_1.Get)('suppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdministratifController.prototype, "suppliers", null);
__decorate([
    (0, common_1.Get)('centers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdministratifController.prototype, "centers", null);
__decorate([
    (0, common_1.Post)('administratif/:resource'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, _file, cb) => {
                const resource = req.params?.resource || 'misc';
                const dest = `./uploads/administratif/${resource}`;
                try {
                    fs.mkdirSync(dest, { recursive: true });
                }
                catch (e) {
                }
                cb(null, dest);
            },
            filename: (_req, file, cb) => {
                const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8);
                cb(null, name + (0, path_1.extname)(file.originalname));
            }
        })
    })),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdministratifController.prototype, "create", null);
exports.AdministratifController = AdministratifController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService, companies_service_1.CompaniesService])
], AdministratifController);
//# sourceMappingURL=administratif.controller.js.map