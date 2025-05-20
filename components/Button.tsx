interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<Props> = ({
  children,
  className = "",
  size = "md",
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    "rounded text-white font-semibold focus:outline-none transition-colors";

  const sizeStyles = {
    sm: "px-4 py-1 text-sm",
    md: "px-5 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${
        disabled
          ? "bg-primary-200 cursor-not-allowed"
          : "bg-primary hover:bg-primary-700"
      }  ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
