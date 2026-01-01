import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CartesService } from './cartes.service';
import { CreateCarteDto, UpdateCarteDto } from './dto';

@Controller('cartes')
@UseGuards(JwtGuard)
export class CartesController {
  constructor(private readonly cartesService: CartesService) {}

  @Post()
  async create(@Body() dto: CreateCarteDto) {
    return this.cartesService.create(dto);
  }

  @Get()
  async findAll() {
    return this.cartesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cartesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCarteDto) {
    return this.cartesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartesService.remove(id);
  }

  @Put(':id/activate')
  async activate(@Param('id') id: string) {
    return this.cartesService.activate(id);
  }

  @Put(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.cartesService.deactivate(id);
  }
}
