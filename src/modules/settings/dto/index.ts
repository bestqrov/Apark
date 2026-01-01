import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export class UpdateCompanyProfileDto {
  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class UpdateAppearanceDto {
  @IsEnum(['light', 'dark', 'system'])
  @IsOptional()
  theme?: string;
}

export class UpdateBackupDto {
  @IsEnum(['daily', 'weekly', 'monthly'])
  @IsOptional()
  frequency?: string;

  @IsEnum(['local', 'cloud'])
  @IsOptional()
  storage?: string;
}

export class UpdateSecurityDto {
  @IsBoolean()
  @IsOptional()
  twoFactorEnabled?: boolean;

  @IsEnum(['low', 'medium', 'high'])
  @IsOptional()
  passwordPolicy?: string;
}
