export default function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.9))] shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}