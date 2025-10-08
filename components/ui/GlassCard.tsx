export default function GlassCard({
  children,
  className = "",
  header,
  actions,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className={`glass relative ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      {(header || actions) && (
        <div className="flex items-center justify-between px-4 md:px-5 pt-4">
          {header && <div className="text-sm font-medium text-slate-200">{header}</div>}
          {actions}
        </div>
      )}
      <div className="px-4 md:px-5 py-4">{children}</div>
    </div>
  );
}