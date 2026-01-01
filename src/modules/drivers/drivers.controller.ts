import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { DriversService } from './drivers.service'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'

@Controller('drivers')
export class DriversController {
  constructor(private svc: DriversService) {}

  @Post()
  create(@Query('companyId') companyId: string, @Body() body: CreateDriverDto) {
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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateDriverDto) {
    return this.svc.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id)
  }
}
