import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: any) {
    const d: any = { ...data }
    d.company = { connect: { id: companyId } }
    if (d.tripId) {
      d.trip = { connect: { id: d.tripId } }
      delete d.tripId
    }
    delete d.companyId
    return this.prisma.invoice.create({ data: d })
  }

  findAll(companyId: string) {
    return this.prisma.invoice.findMany({ where: { companyId } })
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({ where: { id } })
  }

  remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } })
  }
}
