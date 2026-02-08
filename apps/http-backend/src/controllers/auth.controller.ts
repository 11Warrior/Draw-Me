import { Request, Response } from "express";
import { prisma } from '@repo/db/client'
import { signinSchema, signupSchema } from '@repo/global-package/global'
import { dependencies } from "@repo/backend-common/backend-common";
const { jwt } = dependencies

const JWT_SECRET = process.env.JWT_SECRET!;



export const signUp = async (req: Request, res: Response) => {
    // console.log("Sign up");
    try {

        const valid = signupSchema.safeParse(req.body);
        if (!valid.success) {
            // console.log("Invalid Format", valid.error.toString());
            return res.status(400).json({ message: "Invalid Signup credentials received.." })
        }

        const userExists = await prisma.user.findUnique({
            where: {
                userName: valid.data.username!
            }
        })

        if (userExists) {
            return res.status(409).json({ message: `Username already taken.` })
        }

        const user = await prisma.user.create({
            data: {
                userName: valid.data.username,
                email: valid.data.email!,
                password: valid.data.password,
            },
        })

        const token = jwt.sign({ id: user.userId, userName: user.userName }, JWT_SECRET, { expiresIn: '2d' })

        return res.status(200).json({ message: `User Signed Up: ${user.userId}`, token: { token } })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const valid = signinSchema.safeParse(req.body);

        if (!valid.success) {
            return res.status(401).json({ message: "Invalid sign in credentials.." })
        }

        const credentials = valid.data;

        const userExists = await prisma.user.findUnique({
            where: {
                userName: credentials.username
            }
        })

        if (!userExists) {
            return res.status(401).json({ message: "You have not signed up !" })
        }

        const token = jwt.sign({
            id: userExists.userId,
            userName: userExists.userName

        }, JWT_SECRET, { expiresIn: '2d' })

        return res.status(200).json({ message: "User Signed in", token })

    } catch (error) {
        return res.status(500).json({ message: "server error while signing in" })
    }
}