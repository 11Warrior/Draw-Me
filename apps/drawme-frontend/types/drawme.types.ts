export interface CanvasStateType {
    type: string,
    ctx: CanvasRenderingContext2D,
    startX?: number,
    startY?: number,
    width?: number,
    height?: number,
    endX?: number,
    endY?: number
}

export interface GlobalContextType {
    panelState: boolean,
    setPanelState: (state: boolean) => void
}

export interface RoomContextType {
    isConnected: boolean,
    socket: React.RefObject<WebSocket | null>
    createRoom: (roomName: string) => Promise<void>
    joinRoom: (roomId: number) => void
    sendMessage: (roomId: number, message: string) => void
    getRoomId: (slug: string) => Promise<number>
}

export interface UserContextArgType {
    username: string,
    password: string,
    mode: string,
    email?: string
}

///sign up login + room 
export interface UserContextType {
    login?: boolean,
    SignInUser: ({ username, password, mode }: UserContextArgType) => void
    SignUpUser: ({ username, password, mode }: UserContextArgType) => void
    IsAuthUser: () => void
}

export type AuthModes = "signup" | "login";