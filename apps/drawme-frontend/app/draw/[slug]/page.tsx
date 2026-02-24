"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CanvasStateType } from '../../../types/drawme.types';
import { useParams } from 'next/navigation';
import { useGetRoomId } from '../../../hooks/useGetRoomId';

const Draw = () => {
  const roomId = useRef<number | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasState = useRef<CanvasStateType[]>([]);
  const redrawFunc = useRef(() => { })
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const lastDim = useRef<{ lastWidth: number, lastHeight: number }>({
    lastWidth: 0,
    lastHeight: 0
  });
  const mouseDown = useRef<boolean>(false)

  const { slug } = useParams()
  
  // console.log(slug);
  useEffect(() => {
    //when slug changes new WebSocket server and new events
    if (!slug) return;
    // console.log(slug);
    async function actions() {
      const roomID = await useGetRoomId(slug as string);
      // console.log(roomID);
      if (!roomID) setIsConnected(false);

      roomId.current = roomID;

      console.log(roomId.current);

      const socketClient = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbHowaDEwNDAwMDBhamlqZ2JoZ2FpNXYiLCJ1c2VyTmFtZSI6InRlc3RfMTgiLCJpYXQiOjE3NzE5MjI5ODIsImV4cCI6MTc3MjA5NTc4Mn0.1A6n17UqP1FTIav3EQw4tI0LSCDf1CuFHTO6F_iQfX0`);

      socket.current = socketClient;

      socket.current.onopen = () => {
        console.log("Connected to ws..");
        if (!socket.current) return;

        socket.current.send(JSON.stringify({
          type: "join_room",
          roomId: roomId.current
        }))

        setIsConnected(true);

        socket.current.onmessage = (event) => {


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

      redrawFunc.current = () => {
        const rect = canvas?.getBoundingClientRect();
        const ctx = canvas?.getContext("2d");

        if (!ctx) return;

        ctx.clearRect(0, 0, rect.width, rect.height);
        const savedDrawings = canvasState.current;
        // console.log(savedDrawings);
        savedDrawings.forEach((state: CanvasStateType) => {
          ctx.strokeStyle = "white"
          ctx.lineWidth = 1;
          ctx.strokeRect(state.startX, state.startY, state.width, state.height);
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

      const handleMouseUp = () => {

        const last = lastDim.current;
        const data = { startX, startY, width: last.lastWidth, height: last.lastHeight }
        canvasState.current.push(data);

        localStorage.setItem('canvas-state', JSON.stringify(canvasState.current))

        if (!socket.current) return;

        //we have to send message to each connected user
        socket.current.send(JSON.stringify({
          type: "send_message",
          roomId: roomId.current,
          message: JSON.stringify(data)
        }))

        redrawFunc.current();

        mouseDown.current = false;
      }

      const handleMouseMove = (dets: MouseEvent) => {
        if (mouseDown.current) {
          const rect = canvas.getBoundingClientRect();

          const currX = dets.clientX - rect.left;
          const currY = dets.clientY - rect.top;

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
          ctx.strokeRect(startX, startY, width, height);
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
  }, [])



  return (
    <div className='relative w-full h-dvh '>
      {/* TODO: toggle scrolling action and non scrolling action remove touch-none for scrolling actions */}
      <canvas ref={canvasRef} className='w-full h-full touch-none' />
      {
        !isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg">
            Loading...
          </div>
        )
      }
    </div>
  )
}

export default Draw