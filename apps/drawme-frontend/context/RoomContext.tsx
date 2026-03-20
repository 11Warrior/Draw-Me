"use client"

import axios from 'axios';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { RoomContextType } from '../types/drawme.types';
import { getRoomIdFromSlug } from '../utils/Room-Utils/getRoomId';

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
    const socket = useRef<WebSocket>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const createRoom = async (roomName: string) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/create-room`, {
                roomName: roomName
            }, {
                withCredentials: true
            });

            const socketClient = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
            socket.current = socketClient;

            setIsConnected(true);

        } catch (error) {
            console.error("Error while creating room [CLIENT]", error)
        }
    }

    const joinRoom = (roomId: number) => {
        if (!socket.current) return;

        socket.current.send(JSON.stringify({
            type: "join_room",
            roomId
        }))
        
        setIsConnected(true);
    }

    const sendMessage = (roomId: number, message: string) => {
        if (!socket.current) return;

        socket.current.send(JSON.stringify({
            type: "send_message",
            roomId,
            message
        }))
    }

    const getRoomId = async (slug: string): Promise<number> => {
        const roomId = await getRoomIdFromSlug(slug);
        return roomId
    }

    return (
        <RoomContext.Provider value={{ socket, createRoom, joinRoom, sendMessage, getRoomId, isConnected }}>
            {children}
        </RoomContext.Provider>
    )
}