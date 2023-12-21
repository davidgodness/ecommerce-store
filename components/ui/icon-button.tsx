import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  icon: React.ReactElement;
}

export default function IconButton({
  onClick,
  className,
  icon,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-full flex items-center justify-center bg-white border
         p-2 shadow-md transition hover:scale-110`,
        className
      )}
    >
      {icon}
    </button>
  );
}
