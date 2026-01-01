import { Module } from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { VehiclesController } from './vehicles.controller'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
	providers: [VehiclesService, PrismaService],
	controllers: [VehiclesController],
	exports: [VehiclesService],
})
export class VehiclesModule {}
