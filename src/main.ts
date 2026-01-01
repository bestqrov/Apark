import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.use(cookieParser())
  app.enableCors({ origin: true, credentials: true })
  
  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })
  
  // tenant middleware: populate req.companyId from query or user
  const { tenantMiddleware } = await import('./common/middleware/tenant.middleware')
  app.use(tenantMiddleware)
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
  await app.listen(port)
  console.log(`Backend listening on http://localhost:${port}/api`)
}

bootstrap()
