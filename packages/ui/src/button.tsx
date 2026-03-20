"use client";
import { JSX, ReactNode } from "react";

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: ReactNode;
  variant: Variant,
  height?: string,
  width?: string,
  onClick?: (args?: any) => any
}

const property = {
  'primary': 'bg-blue-400 px-8 py-1 cursor-pointer rounded-lg font-medium text-black',
  'secondary': 'bg-white/70 backdrop-blur-md  px-3 py-1 cursor-pointer  rounded-lg',
  'ghost': '',
}

function getProperty(variant: Variant): string {
  return property[variant]
}

export const Button = ({ children, variant, height, width, onClick }: ButtonProps): JSX.Element => {

  const property = getProperty(variant as Variant);

  return (
    <button
      className={property}
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
