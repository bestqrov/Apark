import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'

@Controller('vehicles')
export class VehiclesController {
  constructor(private svc: VehiclesService) {}

  @Post()
  create(@Query('companyId') companyId: string, @Body() body: CreateVehicleDto) {
    return this.svc.create(companyId, body)
  }

  @Get()
  findAll(@Query('companyId') companyId: string) {
    return this.svc.findAll(companyId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id)
  }
}
