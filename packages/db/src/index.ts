import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
// import { dependencies } from '@repo/backend-common/backend-common';
// import path from "path";
// const { dotenv } = dependencies


// dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

const adapter = new PrismaPg({
    connectionString,
})
// const accelerateUrl = process.env.DATABASE_ACCELERATE_URL!;

// console.log("ACCEL URL:", accelerateUrl);
// console.log(" URL:", connectionString);

export const prisma: PrismaClient = new PrismaClient({
    // accelerateUrl: process.env.DATABASE_ACCELERATE_URL!,
    adapter,
    log: ["error", "warn"]
});