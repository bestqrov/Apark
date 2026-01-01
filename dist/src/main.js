"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log'],
        });
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: false
        }));
        app.use(cookieParser());
        app.enableCors({
            origin: ['http://localhost:3000', 'http://localhost:3002'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
        app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
            prefix: '/uploads/',
        });
        const { tenantMiddleware } = await Promise.resolve().then(() => require('./common/middleware/tenant.middleware'));
        app.use(tenantMiddleware);
        const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
        await app.listen(port, '0.0.0.0');
        console.log(`✅ Backend server started successfully!`);
        console.log(`🚀 API available at: http://localhost:${port}/api`);
        console.log(`📁 Uploads directory: ${(0, path_1.join)(__dirname, '..', 'uploads')}`);
    }
    catch (error) {
        console.error('❌ Failed to start the backend server:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}
bootstrap().catch((error) => {
    console.error('❌ Bootstrap failed:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map