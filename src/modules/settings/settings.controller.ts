import { Controller, Get, Put, Body, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { SettingsService } from './settings.service';
import { UpdateCompanyProfileDto, UpdateAppearanceDto, UpdateBackupDto, UpdateSecurityDto } from './dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('settings')
@UseGuards(JwtGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // Company Profile
  @Get('company-profile')
  async getCompanyProfile(@Request() req: any) {
    const companyId = req.user?.companyId;
    return this.settingsService.getCompanyProfile(companyId);
  }

  @Put('company-profile')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateCompanyProfile(@Request() req: any, @Body() dto: UpdateCompanyProfileDto, @UploadedFile() file?: Express.Multer.File) {
    const companyId = req.user?.companyId;
    return this.settingsService.updateCompanyProfile(companyId, dto, file);
  }

  // Appearance Settings
  @Get('appearance')
  async getAppearance() {
    return this.settingsService.getAppearance();
  }

  @Put('appearance')
  async updateAppearance(@Body() dto: UpdateAppearanceDto) {
    return this.settingsService.updateAppearance(dto);
  }

  // Backup Settings
  @Get('backup')
  async getBackup() {
    return this.settingsService.getBackup();
  }

  @Put('backup')
  async updateBackup(@Body() dto: UpdateBackupDto) {
    return this.settingsService.updateBackup(dto);
  }

  // Security Settings
  @Get('security')
  async getSecurity() {
    return this.settingsService.getSecurity();
  }

  @Put('security')
  async updateSecurity(@Body() dto: UpdateSecurityDto) {
    return this.settingsService.updateSecurity(dto);
  }

  // System Info
  @Get('system-info')
  async getSystemInfo() {
    return this.settingsService.getSystemInfo();
  }
}
