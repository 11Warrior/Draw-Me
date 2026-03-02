"use client"
import { useParams } from 'next/navigation';
import DrawBoard from '../../../draw-utils/DrawBoard';
import { Tools } from '../../../draw-utils/Tools';
import {  useState } from 'react';

const Draw = () => {
  const { slug } = useParams()
  const [toolType, setToolType] = useState<string>('')

  return (
    <div className='relative w-screen h-dvh '>
      {/* TODO: toggle scrolling action and non scrolling action remove touch-none for scrolling actions */}
      <Tools setToolType={setToolType} />
      <DrawBoard props={{ slug: slug as string, tool: toolType }} />
    </div>
  )
}

export default Draw