"use client"

import axios from 'axios';
import { createContext, ReactNode, useRef, useState } from 'react';
import { RoomContextType } from '../types/drawme.types';
import { getRoomIdFromSlug } from '../utils/Room-Utils/getRoomId';

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
    const socket = useRef<WebSocket>(null);
    const roomId = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createNewRoom = () => {
        const socketClient = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
        socket.current = socketClient;

        setIsLoading(true);

        socketClient.onopen = () => {
            console.log("Websocket Connected...");
        }

        socketClient.onclose = () => {
            console.log("Websocket Disconnected...");
            setIsLoading(false);
        }
    }

    const createRoom = async (roomName: string) => {
        try {
            createNewRoom();


            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/create-room`, {
                roomName: roomName
            }, {
                withCredentials: true
            });

            if (!socket.current) return null;

            console.log("Joining room after creating");
            socket.current.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        } catch (error) {
            console.error("Error while creating room [CLIENT]", error)
        }
    }

    const joinRoom = (roomId: number) => {
        createNewRoom();
        console.log("Joining room in joinRooom");
        console.log(socket.current);
        if (!socket.current) return null;

        socket.current.send(JSON.stringify({
            type: "join_room",
            roomId
        }))

        setIsLoading(true);
    }

    const sendMessage = (roomId: number, message: string) => {
        if (!socket.current) return null;

        console.log("Sending message: ");
        socket.current.send(JSON.stringify({
            type: "send_message",
            roomId,
            message
        }))
    }

    const getRoomId = async (slug: string): Promise<number> => {
        const roomID = await getRoomIdFromSlug(slug);
        roomId.current = roomID;
        return roomID
    }

    return (
        <RoomContext.Provider value={{ socket, createRoom, joinRoom, sendMessage, getRoomId, roomId, isLoading }}>
            {children}
        </RoomContext.Provider>
    )
}