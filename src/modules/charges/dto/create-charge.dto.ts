import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { ChargeType, Currency } from '@prisma/client'

export class CreateChargeDto {
  @IsOptional()
  @IsString()
  tripId?: string

  @IsEnum(ChargeType)
  type: ChargeType

  @IsNumber()
  amount: number

  @IsEnum(Currency)
  currency: Currency

  @IsOptional()
  @IsString()
  description?: string
}
