import { z } from "zod"

export const signupSchema = z.object({
    username: z.string().min(6).max(20),
    password: z.string().min(6),
    email: z.email()
})

export const signinSchema = z.object({
    username: z.string().min(6).max(20),
    password: z.string().min(6),
})

export const roomSchema = z.object({
    roomName: z.string().min(6).max(15),
    roomId: z.string(),
})