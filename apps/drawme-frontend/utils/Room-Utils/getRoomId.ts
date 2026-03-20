import axios from 'axios'

export async function getRoomIdFromSlug(slug: string) {
    try {
        console.log(slug);

        const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room`, {
            params: {
                slug
            },
            withCredentials: true
        })
        const data = await result.data;
        
        console.log(data)
        return data.roomId;

    } catch (error) {
        console.error("Error getting roomId", error)
    }
}