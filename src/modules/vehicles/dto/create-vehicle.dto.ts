import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { VehicleType } from '@prisma/client'

export class CreateVehicleDto {
  @IsEnum(VehicleType)
  type: VehicleType

  @IsInt()
  @Min(1)
  seats: number

  @IsString()
  plate: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  costPerKm?: number
}
