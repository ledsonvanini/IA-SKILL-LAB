import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "offer"
  | "lastChance"
  | "outOfStock";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  success:
    "bg-[var(--color-success-bg)] text-[var(--color-success)] dark:bg-green-900/30 dark:text-green-400",
  info:
    "bg-[var(--color-info-bg)] text-[var(--color-info)] dark:bg-blue-900/30 dark:text-blue-400",
  warning:
    "bg-[var(--color-warning-bg)] text-[var(--color-warning)] dark:bg-amber-900/30 dark:text-amber-400",
  danger:
    "bg-[var(--color-danger-bg)] text-[var(--color-danger)] dark:bg-red-900/30 dark:text-red-400",
  offer:
    "bg-[var(--color-primary)] text-white",
  lastChance:
    "bg-amber-500 text-white animate-pulse",
  outOfStock:
    "bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400",
};

function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        Badge inline-flex items-center
        px-2.5 py-0.5 rounded-full
        text-xs font-semibold
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
