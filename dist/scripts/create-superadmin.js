"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const pwd = await bcrypt_1.default.hash('password', 10);
    const company = await prisma.company.findFirst();
    const companyId = company ? company.id : undefined;
    const existing = await prisma.user.findUnique({ where: { email: 'super@demo.com' } });
    if (existing) {
        console.log('super@demo.com already exists');
        return;
    }
    const user = await prisma.user.create({ data: { email: 'super@demo.com', password: pwd, name: 'Super Admin', role: 'SUPERADMIN', companyId: companyId || '' } });
    console.log('Created super admin:', user.email);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
//# sourceMappingURL=create-superadmin.js.map