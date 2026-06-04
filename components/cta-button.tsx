import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
};

const variants = {
  primary:
    "border-brand-teal bg-brand-teal text-brand-cream hover:border-brand-sun hover:bg-brand-navy",
  secondary:
    "border-brand-sun/40 bg-brand-cream text-brand-navy hover:border-brand-sun hover:bg-brand-sand",
  gold: "border-brand-sun bg-brand-sand text-brand-navy hover:border-brand-ember hover:bg-brand-sun/25",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel");

  const classes = `inline-flex items-center justify-center rounded-sm border px-5 py-2.5 font-display text-sm font-semibold tracking-wide shadow-sm transition-colors ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
