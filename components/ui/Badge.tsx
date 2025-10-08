export default function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "green" | "purple" | "cyan" }) {
  const map = {
    default: "bg-white/5 text-slate-200 border-white/10",
    green: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    purple: "bg-purple-400/10 text-purple-300 border-purple-400/20",
    cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs ${map[tone]}`}>
      {children}
    </span>
  );
}