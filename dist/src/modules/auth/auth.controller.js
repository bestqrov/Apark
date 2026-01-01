"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const client_1 = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
function cookieOptions() {
    const secure = process.env.NODE_ENV === 'production';
    return { httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 };
}
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body, res) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user)
            throw new common_1.UnauthorizedException();
        const tokens = await this.authService.createTokensForUser(user);
        const expiresAt = new Date(Date.now() + (parseInt(process.env.JWT_REFRESH_EXPIRES_MS || String(7 * 24 * 60 * 60 * 1000))));
        await prisma.refreshToken.create({ data: { token: tokens.refresh, userId: user.id, expiresAt } });
        res.cookie('refresh_token', tokens.refresh, cookieOptions());
        return res.json({ access: tokens.access });
    }
    async refresh(req, res) {
        const token = req.cookies?.refresh_token;
        if (!token)
            throw new common_1.UnauthorizedException('Missing refresh token');
        try {
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refreshchangeme');
            const r = await prisma.refreshToken.findUnique({ where: { token } });
            if (!r)
                throw new common_1.UnauthorizedException('Invalid refresh token');
            if (new Date(r.expiresAt) < new Date()) {
                await prisma.refreshToken.deleteMany({ where: { token } });
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            await prisma.refreshToken.deleteMany({ where: { token } });
            const newTokens = await this.authService.createTokensForUser({ id: payload.sub, email: payload.email, role: payload.role, companyId: payload.companyId });
            const expiresAt = new Date(Date.now() + (parseInt(process.env.JWT_REFRESH_EXPIRES_MS || String(7 * 24 * 60 * 60 * 1000))));
            await prisma.refreshToken.create({ data: { token: newTokens.refresh, userId: payload.sub, expiresAt } });
            res.cookie('refresh_token', newTokens.refresh, cookieOptions());
            return res.json({ access: newTokens.access });
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(req, res) {
        const token = req.cookies?.refresh_token;
        if (token) {
            await prisma.refreshToken.deleteMany({ where: { token } });
        }
        res.clearCookie('refresh_token', { path: '/' });
        return res.json({ ok: true });
    }
    async forgot(body) {
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user)
            return { ok: true };
        const token = require('crypto').randomBytes(24).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
        await prisma.passwordReset.create({ data: { token, userId: user.id, expiresAt } });
        const link = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
        console.log('Password reset link:', link);
        return { ok: true, link };
    }
    async reset(body) {
        const r = await prisma.passwordReset.findUnique({ where: { token: body.token }, include: { user: true } });
        if (!r)
            throw new common_1.UnauthorizedException('Invalid or expired token');
        if (r.used)
            throw new common_1.UnauthorizedException('Token already used');
        if (new Date(r.expiresAt) < new Date())
            throw new common_1.UnauthorizedException('Token expired');
        const bcrypt = require('bcrypt');
        const hash = await bcrypt.hash(body.password, 10);
        await prisma.user.update({ where: { id: r.userId }, data: { password: hash } });
        await prisma.passwordReset.update({ where: { id: r.id }, data: { used: true } });
        return { ok: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgot", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map