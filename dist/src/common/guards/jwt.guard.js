"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let JwtGuard = class JwtGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers['authorization'] || req.cookies?.access_token;
        if (!auth)
            throw new common_1.UnauthorizedException('Missing token');
        const token = Array.isArray(auth) ? auth[0].split(' ')[1] : (auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth);
        try {
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'changeme');
            req.user = payload;
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)()
], JwtGuard);
//# sourceMappingURL=jwt.guard.js.map