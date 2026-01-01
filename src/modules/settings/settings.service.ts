import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCompanyProfileDto, UpdateAppearanceDto, UpdateBackupDto, UpdateSecurityDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  // Company Profile
  async getCompanyProfile(companyId: string) {
    const profile = await this.prisma.companyProfile.findUnique({
      where: { companyId },
    });

    return {
      data: profile || {
        logo: '',
        name: '',
        tagline: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        country: '',
      },
      message: 'Company profile retrieved successfully',
    };
  }

  async updateCompanyProfile(companyId: string, dto: UpdateCompanyProfileDto, file?: Express.Multer.File) {
    const logoPath = file ? `/uploads/${file.filename}` : dto.logo;

    const profile = await this.prisma.companyProfile.upsert({
      where: { companyId },
      update: {
        logo: logoPath,
        name: dto.name,
        tagline: dto.tagline,
        phone: dto.phone,
        email: dto.email,
        website: dto.website,
        address: dto.address,
        country: dto.country,
      },
      create: {
        companyId,
        logo: logoPath,
        name: dto.name,
        tagline: dto.tagline,
        phone: dto.phone,
        email: dto.email,
        website: dto.website,
        address: dto.address,
        country: dto.country,
      },
    });

    return {
      data: profile,
      message: 'Company profile updated successfully',
    };
  }

  // Appearance Settings
  async getAppearance() {
    return {
      data: {
        theme: 'light',
      },
      message: 'Appearance settings retrieved successfully',
    };
  }

  async updateAppearance(dto: UpdateAppearanceDto) {
    return {
      data: dto,
      message: 'Appearance settings updated successfully',
    };
  }

  // Backup Settings
  async getBackup() {
    return {
      data: {
        frequency: 'daily',
        storage: 'local',
      },
      message: 'Backup settings retrieved successfully',
    };
  }

  async updateBackup(dto: UpdateBackupDto) {
    return {
      data: dto,
      message: 'Backup settings updated successfully',
    };
  }

  // Security Settings
  async getSecurity() {
    return {
      data: {
        twoFactorEnabled: false,
        passwordPolicy: 'medium',
      },
      message: 'Security settings retrieved successfully',
    };
  }

  async updateSecurity(dto: UpdateSecurityDto) {
    return {
      data: dto,
      message: 'Security settings updated successfully',
    };
  }

  // System Info
  async getSystemInfo() {
    return {
      data: {
        version: '1.0.0',
        lastUpdate: new Date().toISOString(),
        updateAvailable: false,
      },
      message: 'System info retrieved successfully',
    };
  }
}
