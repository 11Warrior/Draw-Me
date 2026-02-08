import { prisma } from "@repo/db/client";
import { roomSchema } from "@repo/global-package/global";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const parsedData = roomSchema.safeParse(req.body);
        const userId = req.userId;


        if (!parsedData.success) {
            return res.status(401).json({ message: 'Error while parsing the body', error: parsedData.error })
        }

        const roomExists = await prisma.room.findUnique({
            where: {
                slug: parsedData.data.roomName
            }
        })

        if (roomExists) {
            return res.status(401).json({message: "Please enter new room name.."})
        }

        const newRoom = await prisma.room.create({
            data: {
                slug: parsedData.data.roomName,
                roomAdminUser: userId!,
            }
        })


        return res.status(200).json({ message: "Room created sucessfully" + newRoom })

    } catch (error) {
        return res.status(500).json({ message: "Server Error while creating the room..", error })
    }
}