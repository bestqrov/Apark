import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateDriverDto } from './dto/create-driver.dto'

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: CreateDriverDto) {
    const d: any = { ...data }
    d.company = { connect: { id: companyId } }
    delete d.companyId
    return this.prisma.driver.create({ data: d })
  }

  findAll(companyId: string) {
    return this.prisma.driver.findMany({ where: { companyId } })
  }

  findOne(id: string) {
    return this.prisma.driver.findUnique({ where: { id } })
  }

  update(id: string, data: Partial<CreateDriverDto>) {
    return this.prisma.driver.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.driver.delete({ where: { id } })
  }
}
