import { config } from "dotenv";

config();

console.log("At global backend package", process.env.JWT_SECRET!);
export const JWT_SECRET = process.env.JWT_SECRET!; 