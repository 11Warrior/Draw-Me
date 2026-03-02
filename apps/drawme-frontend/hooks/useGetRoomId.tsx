"use client"
import axios from 'axios'

export async function useGetRoomId(slug: string) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room`, {
            params: {
                slug
            },
            headers: {
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbHowaDEwNDAwMDBhamlqZ2JoZ2FpNXYiLCJ1c2VyTmFtZSI6InRlc3RfMTgiLCJpYXQiOjE3NzI0NDAzOTQsImV4cCI6MTc3MjYxMzE5NH0.g57ZoJNryQU4D2dEH_Nk1VAFYqKmO0spq_Sw2_O86OM'
            }
        })
        const roomId = result.data.roomId;		
        // console.log(roomId)
        return roomId;
    } catch (error) {
        console.error("Error getting roomId", error)
    }
}
