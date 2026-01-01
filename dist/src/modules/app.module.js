"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const companies_module_1 = require("./companies/companies.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const drivers_module_1 = require("./drivers/drivers.module");
const trips_module_1 = require("./trips/trips.module");
const quotes_module_1 = require("./quotes/quotes.module");
const invoices_module_1 = require("./invoices/invoices.module");
const charges_module_1 = require("./charges/charges.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const finance_module_1 = require("./finance/finance.module");
const contracts_module_1 = require("./contracts/contracts.module");
const administratif_module_1 = require("./administratif/administratif.module");
const consommation_module_1 = require("./consommation/consommation.module");
const settings_module_1 = require("./settings/settings.module");
const cartes_module_1 = require("./cartes/cartes.module");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const http_exception_filter_1 = require("../common/filters/http-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            companies_module_1.CompaniesModule,
            vehicles_module_1.VehiclesModule,
            drivers_module_1.DriversModule,
            trips_module_1.TripsModule,
            quotes_module_1.QuotesModule,
            invoices_module_1.InvoicesModule,
            charges_module_1.ChargesModule,
            dashboard_module_1.DashboardModule,
            finance_module_1.FinanceModule,
            contracts_module_1.ContractsModule,
            administratif_module_1.AdministratifModule,
            consommation_module_1.ConsommationModule,
            settings_module_1.SettingsModule,
            cartes_module_1.CartesModule,
        ],
        providers: [prisma_service_1.PrismaService, { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.AllExceptionsFilter }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map