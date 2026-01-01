import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCompanyDto } from './dto/create-company.dto'

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCompanyDto) {
    return this.prisma.company.create({ data })
  }

  findAll() {
    return this.prisma.company.findMany()
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({ where: { id } })
  }

  update(id: string, data: Partial<CreateCompanyDto>) {
    return this.prisma.company.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.company.delete({ where: { id } })
  }
}
