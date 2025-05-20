interface Props {
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  className = "",
  size = "md",
  disabled = false,
  placeholder = "Placeholder",
  value,
  onChange,
}: Props) {
  const baseStyles =
    "border border-gray-300 rounded focus:outline-none focus:ring-blue-500 placeholder-gray-400";

  const sizeStyles = {
    sm: "px-4 py-1 text-sm  focus:ring-1 ",
    md: "px-4 py-2 focus:ring-2 ",
    lg: "px-4 py-3 text-lg focus:ring",
  };

  return (
    <input
      type="text"
      id="user-input"
      value={value}
      className={`${baseStyles} ${disabled ? "cursor-not-allowed" : ""}  ${
        sizeStyles[size]
      } ${className}`}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
