import { CanvasStateType } from "../types/drawme.types";

type DrawingFunction = (args: CanvasStateType) => void

function baseCondition(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "white"
    ctx.lineWidth = 1;
}

const strategy: Record<string, DrawingFunction> = {
    //NOTE : clearing logic needs to be added where the function is called
    'Rectangle': (args) => {
        //method imp like strokeRect ...
        const { ctx, startX, startY, width, height } = args
        ctx.strokeRect(Number(startX), Number(startY), Number(width), Number(height));
    },

    'Circle': (args) => {
        const { ctx, startX, startY, endX, endY } = args
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(Number(endX) - Number(startX), 2) + Math.pow(Number(endY) - Number(startY), 2)) //radius pythagoras theorem
        ctx.arc(Number(startX), Number(startY), radius, 0, 2 * Math.PI);
        ctx.stroke();
    },

    'Line': (args) => {
        const { ctx, startX, startY, endX, endY } = args  // const { ctx, startX, startY, endX, endY } = args
        ctx.beginPath();
        ctx.moveTo(startX as number, startY as number);
        ctx.lineTo(endX as number, endY as number);
        ctx.stroke();
    },

    // 'Arrow': (args) => {

    // }
}

export function Action(args: CanvasStateType) {
    const { ctx } = args;
    baseCondition(ctx);
    const Function = strategy[args?.type]
    if (!Function) {
        console.error("Invalid tool selected...");
        return;
    }

    Function(args);
}