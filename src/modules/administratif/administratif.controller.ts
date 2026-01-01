import { Body, Controller, Get, Post, Param, UploadedFile, UseInterceptors, Query } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { VehiclesService } from '../vehicles/vehicles.service'
import { CompaniesService } from '../companies/companies.service'
import * as fs from 'fs'

@Controller()
export class AdministratifController {
  constructor(private vehiclesSvc: VehiclesService, private companiesSvc: CompaniesService) {}

  @Get('api/vehicles')
  async vehicles(@Query('companyId') companyId: string) {
    return this.vehiclesSvc.findAll(companyId)
  }

  @Get('api/insurance-companies')
  async insuranceCompanies() {
    return this.companiesSvc.findAll()
  }

  @Get('api/fleets')
  async fleets() {
    // return vehicles as a simple fleet listing placeholder
    return this.vehiclesSvc.findAll(undefined)
  }

  @Get('api/garages')
  garages() {
    return []
  }

  @Get('api/suppliers')
  suppliers() {
    return []
  }

  @Get('api/centers')
  centers() {
    return []
  }

  @Post('api/administratif/:resource')
  @UseInterceptors(FileInterceptor('attachment', {
    storage: diskStorage({
      destination: (req, _file, cb) => {
        const resource = req.params?.resource || 'misc'
        const dest = `./uploads/administratif/${resource}`
        try {
          fs.mkdirSync(dest, { recursive: true })
        } catch (e) {
          // ignore
        }
        cb(null, dest)
      },
      filename: (_req, file, cb) => {
        const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8)
        cb(null, name + extname(file.originalname))
      }
    })
  }))
  async create(@Param('resource') resource: string, @Body() body: any, @UploadedFile() file: any) {
    const path = file ? file.path.replace(/\\/g, '/') : undefined
    return { ok: true, resource, body, attachment: path }
  }
}
