import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCarteDto, UpdateCarteDto } from './dto';

@Injectable()
export class CartesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCarteDto) {
    return {
      data: dto,
      message: 'Carte created successfully',
    };
  }

  async findAll() {
    return {
      data: [],
      message: 'Cartes retrieved successfully',
    };
  }

  async findOne(id: string) {
    return {
      data: { id },
      message: 'Carte retrieved successfully',
    };
  }

  async update(id: string, dto: UpdateCarteDto) {
    return {
      data: { id, ...dto },
      message: 'Carte updated successfully',
    };
  }

  async remove(id: string) {
    return {
      message: 'Carte deleted successfully',
    };
  }

  async activate(id: string) {
    return {
      data: { id, status: 'active' },
      message: 'Carte activated successfully',
    };
  }

  async deactivate(id: string) {
    return {
      data: { id, status: 'inactive' },
      message: 'Carte deactivated successfully',
    };
  }
}
