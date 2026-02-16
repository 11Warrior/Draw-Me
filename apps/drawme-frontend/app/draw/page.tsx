"use client"
import React, { useEffect, useRef } from 'react'

const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseDown = useRef<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      let startX = 0, startY = 0;

      if (ctx === null) return;

      const initializeCanvas = () => {
        const rect = canvas.getBoundingClientRect();

        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.setTransform(1, 0, 0, 1, 0, 0);//reseting the scaling overlays to prevent multiplication of dpr while rescaling in loop
        ctx.scale(dpr, dpr);
      }

      initializeCanvas();

      const handleMouseDown = (dets: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseDown.current = true;

        startX = dets.clientX - rect.left;
        startY = dets.clientY - rect.top;
      }

      const handleMouseUp = () => {
        mouseDown.current = false;
      }

      const handleMouseMove = (dets: MouseEvent) => {
        if (mouseDown.current) {
          const rect = canvas.getBoundingClientRect();

          const currX = dets.clientX - rect.left;
          const currY = dets.clientY - rect.top;

          const width = currX - startX;
          const height = currY - startY;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "white"
          ctx.lineWidth = 1;
          ctx.strokeRect(startX, startY, width, height);
        }
      }

      window.addEventListener('resize', () => initializeCanvas());
      canvas.addEventListener('pointerdown', (dets) => (handleMouseDown(dets)))
      canvas.addEventListener('pointerup', () => (handleMouseUp()))
      canvas.addEventListener('pointermove', (dets) => (handleMouseMove(dets)))

      return () => {
        window.removeEventListener('resize', () => initializeCanvas());
        canvas.removeEventListener('pointerdown', (e) => { })
        canvas.removeEventListener('pointerup', (e) => { })
        canvas.removeEventListener('pointermove', (e) => { })
      }
    }

  }, [])

  return (
    <div className='w-full h-full'>
      {/* TODO: toggle scrolling action and non scrolling action remove touch-none for scrolling actions */}
      <canvas ref={canvasRef} className='w-full h-full touch-none' />
    </div>
  )
}

export default Draw