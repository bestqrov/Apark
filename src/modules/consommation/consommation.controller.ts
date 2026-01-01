import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { ConsommationService } from './consommation.service';
import { CreateCarburantDto, CreateAutoRouteDto, CreateDepenseDto, CreateServiceDto, CreateFraisGenerauxDto, CreateRechargeCarteDto } from './dto';

@Controller('consommation')
@UseGuards(JwtGuard)
export class ConsommationController {
  constructor(private readonly consommationService: ConsommationService) {}

  // Carburant endpoints
  @Post('carburant')
  @UseInterceptors(FileInterceptor('attachment'))
  async createCarburant(@Body() dto: CreateCarburantDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.createCarburant(dto, file);
  }

  @Get('carburant')
  async getAllCarburant() {
    return this.consommationService.getAllCarburant();
  }

  @Get('carburant/:id')
  async getCarburantById(@Param('id') id: string) {
    return this.consommationService.getCarburantById(id);
  }

  @Put('carburant/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateCarburant(@Param('id') id: string, @Body() dto: CreateCarburantDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.updateCarburant(id, dto, file);
  }

  @Delete('carburant/:id')
  async deleteCarburant(@Param('id') id: string) {
    return this.consommationService.deleteCarburant(id);
  }

  // Autoroutes endpoints
  @Post('autoroutes')
  @UseInterceptors(FileInterceptor('attachment'))
  async createAutoroute(@Body() dto: CreateAutoRouteDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.createAutoroute(dto, file);
  }

  @Get('autoroutes')
  async getAllAutoroutes() {
    return this.consommationService.getAllAutoroutes();
  }

  @Get('autoroutes/:id')
  async getAutorouteById(@Param('id') id: string) {
    return this.consommationService.getAutorouteById(id);
  }

  @Put('autoroutes/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateAutoroute(@Param('id') id: string, @Body() dto: CreateAutoRouteDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.updateAutoroute(id, dto, file);
  }

  @Delete('autoroutes/:id')
  async deleteAutoroute(@Param('id') id: string) {
    return this.consommationService.deleteAutoroute(id);
  }

  // Depenses endpoints
  @Post('depenses')
  @UseInterceptors(FileInterceptor('attachment'))
  async createDepense(@Body() dto: CreateDepenseDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.createDepense(dto, file);
  }

  @Get('depenses')
  async getAllDepenses() {
    return this.consommationService.getAllDepenses();
  }

  @Get('depenses/:id')
  async getDepenseById(@Param('id') id: string) {
    return this.consommationService.getDepenseById(id);
  }

  @Put('depenses/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateDepense(@Param('id') id: string, @Body() dto: CreateDepenseDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.updateDepense(id, dto, file);
  }

  @Delete('depenses/:id')
  async deleteDepense(@Param('id') id: string) {
    return this.consommationService.deleteDepense(id);
  }

  // Services endpoints
  @Post('services')
  @UseInterceptors(FileInterceptor('attachment'))
  async createService(@Body() dto: CreateServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.createService(dto, file);
  }

  @Get('services')
  async getAllServices() {
    return this.consommationService.getAllServices();
  }

  @Get('services/:id')
  async getServiceById(@Param('id') id: string) {
    return this.consommationService.getServiceById(id);
  }

  @Put('services/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateService(@Param('id') id: string, @Body() dto: CreateServiceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.updateService(id, dto, file);
  }

  @Delete('services/:id')
  async deleteService(@Param('id') id: string) {
    return this.consommationService.deleteService(id);
  }

  // Frais generaux endpoints
  @Post('frais-generaux')
  @UseInterceptors(FileInterceptor('attachment'))
  async createFraisGeneraux(@Body() dto: CreateFraisGenerauxDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.createFraisGeneraux(dto, file);
  }

  @Get('frais-generaux')
  async getAllFraisGeneraux() {
    return this.consommationService.getAllFraisGeneraux();
  }

  @Get('frais-generaux/:id')
  async getFraisGenerauxById(@Param('id') id: string) {
    return this.consommationService.getFraisGenerauxById(id);
  }

  @Put('frais-generaux/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateFraisGeneraux(@Param('id') id: string, @Body() dto: CreateFraisGenerauxDto, @UploadedFile() file?: Express.Multer.File) {
    return this.consommationService.updateFraisGeneraux(id, dto, file);
  }

  @Delete('frais-generaux/:id')
  async deleteFraisGeneraux(@Param('id') id: string) {
    return this.consommationService.deleteFraisGeneraux(id);
  }

  // Recharges cartes endpoints
  @Post('recharges-cartes')
  async createRechargeCartes(@Body() dto: CreateRechargeCarteDto) {
    return this.consommationService.createRechargeCartes(dto);
  }

  @Get('recharges-cartes')
  async getAllRechargesCartes() {
    return this.consommationService.getAllRechargesCartes();
  }

  @Get('recharges-cartes/:id')
  async getRechargeCartesById(@Param('id') id: string) {
    return this.consommationService.getRechargeCartesById(id);
  }

  @Put('recharges-cartes/:id')
  async updateRechargeCartes(@Param('id') id: string, @Body() dto: CreateRechargeCarteDto) {
    return this.consommationService.updateRechargeCartes(id, dto);
  }

  @Delete('recharges-cartes/:id')
  async deleteRechargeCartes(@Param('id') id: string) {
    return this.consommationService.deleteRechargeCartes(id);
  }

  // Cartes endpoints
  @Get('cartes')
  async getAllCartes() {
    return this.consommationService.getAllCartes();
  }
}
