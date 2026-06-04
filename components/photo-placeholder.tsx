type PhotoPlaceholderProps = {
  label: string;
  caption?: string;
  aspect?: "square" | "video" | "wide" | "portrait";
  className?: string;
};

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
};

export function PhotoPlaceholder({
  label,
  caption,
  aspect = "video",
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`flex ${aspectClasses[aspect]} flex-col items-center justify-center rounded-md border border-dashed border-brand-teal/30 bg-brand-sand/50 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_8px_rgba(14,44,78,0.06)] ${className}`}
    >
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-teal/80">
        Photo coming soon
      </span>
      <p className="mt-2 font-display text-base text-brand-navy">{label}</p>
      {caption && (
        <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-brand-navy/55">
          {caption}
        </p>
      )}
    </div>
  );
}
