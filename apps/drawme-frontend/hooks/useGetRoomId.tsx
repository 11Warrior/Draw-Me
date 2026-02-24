"use client"
import axios from 'axios'

export async function useGetRoomId(slug: string) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room`, {
            params: {
                slug
            },
            headers: {
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbHowaDEwNDAwMDBhamlqZ2JoZ2FpNXYiLCJ1c2VyTmFtZSI6InRlc3RfMTgiLCJpYXQiOjE3NzE4NjA5NDcsImV4cCI6MTc3MjAzMzc0N30.yRXFvEa8qCEX_FM8tXN4bVcDFs0aMTICl5EYnjrv7p8'
            }
        })
        const roomId = result.data.roomId;		
        // console.log(roomId)
        return roomId;
    } catch (error) {
        console.error("Error getting roomId", error)
    }
}
