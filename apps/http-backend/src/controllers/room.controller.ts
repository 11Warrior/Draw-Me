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
            return res.status(401).json({ message: "Please enter new room name.." })
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

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { userId, roomId } = req.body;

        const messages = await prisma.user.findUnique({
            where: {
                userId,
            },
            include: {
                rooms:
                {
                    where: {
                        roomId
                    },
                    select: {
                        messages: {
                            orderBy: {
                                createdAt: "desc"
                            },
                            take: 50
                        }
                    }
                }
            }
        })

        if (!messages) {
            return res.status(401).json({ message: "User is not in the room / No room / User has not sent any messages " })
        }

        return res.status(200).json({
            "recent 50 messages": messages
        })

    } catch (error) {
        return res.status(500).json({ message: "Server Error while gettting the messages..", error })
    }
}

export const getRoomId = async (req: Request, res: Response) => {
    try {
        const { userId } = req;

        //should check if this user has joined this room before this call
        const { slug } = req.query;

        const userInRoom = await prisma.user.findUnique({
            where: {
                userId
            }
        })

        if (!userInRoom) return res.status(400).json({ message: "User does not exist.." })

        const room = await prisma.room.findUnique({
            where: {
                slug : slug?.toString(),
            },
        })

        if (!room) return res.status(400).json({ message: "Room not found.." })

        return res.json({ roomId: room?.roomId })

    } catch (error) {
        console.log("Errot in getRoomId", error)
        return res.status(500).json({ message: "Server Error while gettting the roomid..", error })
    }
}