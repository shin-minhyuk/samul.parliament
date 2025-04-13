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
        "bg-ocean-blue font-title hover:bg-primary-500 rounded-full px-4 py-2 font-semibold text-white transition-all",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
