import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { InvoiceStatus, Currency } from '@prisma/client'

export class CreateInvoiceDto {
  @IsOptional()
  @IsString()
  tripId?: string

  @IsNumber()
  amount: number

  @IsEnum(Currency)
  currency: Currency

  @IsBoolean()
  tva: boolean

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus
}
