import { ReactNode, type JSX } from "react";

const defaultClass = 'w-[420px] h-[460px] rounded-lg p-4 bg-blue-500/25 border border-black'

interface CardProps {
  // variant: Variant,
  className?: string,
  children?: ReactNode,
  height?: string,
  width?: string,
  onClick?: (args?: any) => any
}

export function Card({ className, children, width, height, onClick }: CardProps): JSX.Element {

  return (
    <div
      className={(className === undefined) || null ? defaultClass : className + ' rounded-lg p-4 overflow-hidden'}
      style={{
        width: width + 'px',
        height: height + 'px'
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
