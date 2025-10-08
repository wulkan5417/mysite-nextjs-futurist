export default function NeonButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`btn-glow inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.85))] px-4 py-2 font-medium text-black hover:opacity-95 active:scale-[0.99] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}