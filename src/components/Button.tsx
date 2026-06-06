import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary"  | "outline"
type Size = "xs" | "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  iconSize?: number;
  labelClassName?: string;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
  outline:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
};

const sizeStyles: Record<Size, string> = {
  xs: "px-2 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};

const defaultIconSize: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
};

export default function Button({
  label,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  iconSize,
  labelClassName,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const resolvedIconSize = iconSize ?? defaultIconSize[size];

  const iconEl = icon ? (
    <span
      className="shrink-0 flex items-center"
      style={{ fontSize: resolvedIconSize, width: resolvedIconSize, height: resolvedIconSize }}
    >
      {icon}
    </span>
  ) : null;

  const labelEl =
    label || children ? (
      <span className={labelClassName}>{label ?? children}</span>
    ) : null;

  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded font-medium transition-colors",
        "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {iconPosition === "left" && iconEl}
      {labelEl}
      {iconPosition === "right" && iconEl}
    </button>
  );
}
