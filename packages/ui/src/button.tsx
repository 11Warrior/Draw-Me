"use client";

import { JSX, ReactNode } from "react";


type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: ReactNode;
  variant: Variant,
  height?: string,
  width?: string,
  onClick?: (args?: any) => void
}

const property = {
  'primary': 'bg-blue-400 px-8 py-1 cursor-pointer rounded-lg font-medium',
  'secondary': 'bg-white/70 backdrop-blur-md  px-3 py-1 cursor-pointer  rounded-lg',
  'ghost': '',
}

export const Button = ({ children, variant, height, width, onClick }: ButtonProps): JSX.Element => {
  function getProperty(variant: Variant): string {
    return property[variant]
  }

  return (
    <button
      className={getProperty(variant)}
      style={{
        height: height ? `${height}px` : undefined,
        width: width ? `${width}px` : undefined,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};   
