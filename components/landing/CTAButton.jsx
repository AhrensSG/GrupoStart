export function CTAButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
}) {
  const baseStyles =
    "font-bold rounded-full transition-all duration-200 flex items-center gap-2 justify-center";

  const variantStyles = {
    primary: "bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-brand-orange hover:bg-brand-orange-dark text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-light bg-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
