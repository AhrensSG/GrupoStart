"use client"

export default function CTAButtonNeon({ text, onClick, className = "", size = "md", disabled = false, icon }) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-neon ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{
        fontFamily: "'Schibsted Grotesk', sans-serif",
        fontWeight: 800,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  )
}
