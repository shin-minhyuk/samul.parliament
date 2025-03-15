import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-nature-leaf font-title hover:bg-nature-spring rounded-full px-4 py-2 text-white transition-all hover:font-bold",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
