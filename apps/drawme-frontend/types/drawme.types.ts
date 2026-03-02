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