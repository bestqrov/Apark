import { Module } from '@nestjs/common'
import { AdministratifController } from './administratif.controller'
import { VehiclesModule } from '../vehicles/vehicles.module'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  imports: [VehiclesModule, CompaniesModule],
  controllers: [AdministratifController],
})
export class AdministratifModule {}
