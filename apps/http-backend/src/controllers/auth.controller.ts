import { Request, Response } from "express";
import { signupSchema } from '@repo/global-package/global'


export const signUp = (req: Request, res: Response) => {
    console.log("Sign up");

    const valid = signupSchema.safeParse(req.body);
    if (valid.success) {
        console.log("Valid Format", valid.data);
    } else {
        console.log("Invalid Format", valid.error.format());
    }

}

export const signIn = () => {

}