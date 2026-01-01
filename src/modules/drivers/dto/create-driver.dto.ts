import { IsString, IsOptional, IsBoolean, IsArray, IsEmail } from 'class-validator'

export class CreateDriverDto {
  @IsString()
  name: string

  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  whatsapp?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  cinNumber?: string

  @IsOptional()
  @IsArray()
  languages?: string[]

  @IsOptional()
  @IsBoolean()
  available?: boolean

  @IsOptional()
  @IsString()
  driverPhoto?: string

  @IsOptional()
  @IsString()
  driverLicense?: string

  @IsOptional()
  @IsString()
  cin?: string

  @IsOptional()
  @IsString()
  cv?: string
}
