import { CanvasStateType } from "../types/drawme.types";

type DrawingFunction = (args: CanvasStateType) => void

const strategy: Record<string, DrawingFunction> = {
    //NOTE : clearing logic needs to be added where the function is called
    'Rectangle': (args) => {
        //method imp like strokeRect ...
        const { ctx, startX, startY, width, height } = args
        ctx.strokeStyle = "white"
        ctx.lineWidth = 1;
        ctx.strokeRect(startX, startY, width, height);
    },

    'Circle': (args) => {
        // const { ctx, startX, startY, endX, endY } = args
        // ctx.beginPath();
        // ctx.lineTo(startX, startY);
        // ctx.moveTo(endX, endY);
    },

    'Line': (args) => {
        const { ctx, startX, startY, endX, endY } = args  // const { ctx, startX, startY, endX, endY } = args
        // ctx.beginPath();
        // ctx.lineTo(startX, startY);
        // ctx.moveTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white"
        ctx.beginPath();
        ctx.lineTo(startX, startY);
        ctx.moveTo(endX, endY);
    },

    'Arrow': (args) => {

    }
}

export function Action(args: CanvasStateType) {
    const Function = strategy[args?.type]
    if (!Function) {
        console.error("Invalid tool selected...");
        return;
    }
    return Function(args);
}