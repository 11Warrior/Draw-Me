"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { CanvasStateType } from "../../types/drawme.types";
import { Action } from "../../strategy/toolAction";
import { RoomContext } from "../../context/RoomContext";

interface DrawPropType {
    slug: string,
    tool: string
}

export default function DrawBoard({ props }: { props: DrawPropType }) {
    const { slug, tool } = props;
    const roomId = useRef<number | null>(null);
    // const socket = useRef<WebSocket | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasState = useRef<CanvasStateType[]>([]);
    const redrawFunc = useRef(() => { })
    const lastDim = useRef<{ lastWidth: number, lastHeight: number }>({
        lastWidth: 0,
        lastHeight: 0
    });
    const mouseDown = useRef<boolean>(false)

    const roomContext = useContext(RoomContext);

    if (!roomContext) return;

    const { socket, getRoomId, sendMessage, isConnected } = roomContext;

    if (!socket) return;

    useEffect(() => {
        //when slug changes new WebSocket server and new events
        if (!slug) return;
        // console.log(slug);
        async function actions() {
            const roomID = await getRoomId(slug);
            // console.log(roomID);

            roomId.current = roomID;

            // console.log(roomId.current);

            // const socketClient = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
            // socket.current = socketClient;

            socket.current!.onopen = () => {
                console.log("Connected to ws..");

                // joinRoom(roomID.current)

                //receiving message
                socket.current!.onmessage = (event) => {
                    let dimensions = JSON.parse(event.data);
                    //process the types
                    //in  message I get the dimenstions to render in this canvas so better add the canvas state 
                    // console.log("WS RECEIVED:", dimensions);
                    if (dimensions.type === 'message') {
                        // console.log(dimensions.message);
                        const actualDim = JSON.parse(dimensions.message)
                        // console.log(actualDim);
                        canvasState.current.push(actualDim)
                        redrawFunc.current();
                    }
                }
            }
        }
        actions();

    }, [slug])

    // console.log(roomId);
    useEffect(() => {
        const savedState = localStorage.getItem('canvas-state')

        if (savedState) {
            canvasState.current = JSON.parse(savedState);
        }
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');

            let startX = 0, startY = 0;

            if (ctx === null) return;
            if (tool === 'ClearBtn') {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                localStorage.clear();
                canvasState.current.length = 0;
            }

            redrawFunc.current = () => {
                const rect = canvas?.getBoundingClientRect();
                const ctx = canvas?.getContext("2d");

                if (!ctx) return;

                ctx.clearRect(0, 0, rect.width, rect.height);
                const savedDrawings = canvasState.current;
                // console.log(savedDrawings);
                ctx.strokeStyle = "white"
                ctx.lineWidth = 1;

                savedDrawings.forEach((state: CanvasStateType) => {
                    Action({ type: state.type, ctx, startX: state.startX, startY: state.startY, width: state.width, height: state.height, endX: state.endX, endY: state.endY });
                })
            }

            const initCanvas = () => {

                const ctx = canvas.getContext("2d")

                const rect = canvas.getBoundingClientRect();

                if (!ctx) return;

                const dpr = window.devicePixelRatio || 1;

                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                ctx.setTransform(1, 0, 0, 1, 0, 0);//reseting the scaling overlays to prevent multiplication of dpr while rescaling in loop
                ctx.scale(dpr, dpr);

                redrawFunc.current();
            }

            const handleMouseDown = (dets: MouseEvent) => {
                const rect = canvas.getBoundingClientRect();

                startX = dets.clientX - rect.left;
                startY = dets.clientY - rect.top;
                mouseDown.current = true;

            }

            const handleMouseUp = (dets: MouseEvent) => {
                const last = lastDim.current;

                const data = { type: tool, ctx, startX, startY, width: last.lastWidth, height: last.lastHeight, endX: dets.offsetX, endY: dets.offsetY }
                canvasState.current.push(data);

                localStorage.setItem('canvas-state', JSON.stringify(canvasState.current))

                // if (!socket.current) return;

                // //we have to send message to each connected user
                // socket.current.send(JSON.stringify({
                //     type: "send_message",
                //     roomId: roomId.current,
                //     message: JSON.stringify(data)
                // }))

                sendMessage(roomId.current as number, JSON.stringify(data));

                redrawFunc.current();

                mouseDown.current = false;
            }

            const handleMouseMove = (dets: MouseEvent) => {
                if (mouseDown.current) {
                    const rect = canvas.getBoundingClientRect();

                    const currX = dets.clientX - rect.left;
                    const currY = dets.clientY - rect.top;
                    const currEndX = dets.offsetX
                    const currEndY = dets.offsetY

                    const width = currX - startX;
                    const height = currY - startY;

                    ctx.strokeStyle = "white"
                    ctx.lineWidth = 1;

                    lastDim.current = {
                        lastWidth: width,
                        lastHeight: height
                    }
                    // ctx.clearRect(0, 0, rect.width, rect.height);
                    redrawFunc.current();
                    Action({ type: tool, ctx, startX, startY, width, height, endX: currEndX, endY: currEndY });
                }
            }

            window.addEventListener('resize', initCanvas)
            canvas.addEventListener('pointerdown', handleMouseDown)
            canvas.addEventListener('pointerup', handleMouseUp)
            canvas.addEventListener('pointermove', handleMouseMove)

            initCanvas();

            return () => {
                window.removeEventListener('resize', initCanvas)
                canvas.removeEventListener('pointerdown', handleMouseDown)
                canvas.removeEventListener('pointerup', handleMouseUp)
                canvas.removeEventListener('pointermove', handleMouseMove)
            }
        }
    }, [tool])

    return (
        <>
            <canvas ref={canvasRef} className='w-full h-full touch-none' />
            {
                isConnected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg">
                        Loading...
                    </div>
                )
            }
        </>
    );
}