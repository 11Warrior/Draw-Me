import { Button } from "@repo/ui/button"

export const Tools = ({ setToolType }: { setToolType: (tool: string) => void }) => {
    //logic flow =>
    //ui => canvas + tool(at top) user selects tools(shapes) state saved here and sent to canvas for drawing state(tools -> canvas) context(canvas -> tools) when clear button hit clearing the context
    return (
        <div className='absolute top-0 left-0 w-full'>
            <div className='flex justify-center gap-5 w-full py-3 bg-black/30 backdrop-blur-md'>
                <Button variant='primary' onClick={() => setToolType('Rectangle')}>Rectangle</Button>
                <Button variant='primary' onClick={() => setToolType('Circle')}>Circle</Button>
                <Button variant='primary' onClick={() => setToolType('Line')}>Line</Button>
                <Button variant='primary' onClick={() => setToolType('Arrow')}>Arrow</Button>
                <Button variant='primary' onClick={() => setToolType('ClearBtn')}>Clear Board</Button>
            </div>
        </div>
    )
}
