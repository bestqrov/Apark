"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratifModule = void 0;
const common_1 = require("@nestjs/common");
const administratif_controller_1 = require("./administratif.controller");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const companies_module_1 = require("../companies/companies.module");
let AdministratifModule = class AdministratifModule {
};
exports.AdministratifModule = AdministratifModule;
exports.AdministratifModule = AdministratifModule = __decorate([
    (0, common_1.Module)({
        imports: [vehicles_module_1.VehiclesModule, companies_module_1.CompaniesModule],
        controllers: [administratif_controller_1.AdministratifController],
    })
], AdministratifModule);
//# sourceMappingURL=administratif.module.js.map