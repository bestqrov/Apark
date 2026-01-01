import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log'],
    })
    
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: false 
    }))
    app.use(cookieParser())
    
    // Enable CORS with specific configuration
    app.enableCors({ 
      origin: ['http://localhost:3000', 'http://localhost:3002'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
    
    // Serve static files from uploads directory
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    })
    
    // tenant middleware: populate req.companyId from query or user
    const { tenantMiddleware } = await import('./common/middleware/tenant.middleware')
    app.use(tenantMiddleware)
    
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
    await app.listen(port, '0.0.0.0')
    console.log(`✅ Backend server started successfully!`)
    console.log(`🚀 API available at: http://localhost:${port}/api`)
    console.log(`📁 Uploads directory: ${join(__dirname, '..', 'uploads')}`)
  } catch (error) {
    console.error('❌ Failed to start the backend server:', error)
    console.error('Error details:', error.message)
    process.exit(1)
  }
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:', error)
  process.exit(1)
})
