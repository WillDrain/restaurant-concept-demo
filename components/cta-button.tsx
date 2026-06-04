import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
};

const variants = {
  primary:
    "border-oves-teal bg-oves-teal text-oves-cream hover:border-oves-sun hover:bg-oves-navy",
  secondary:
    "border-oves-sun/40 bg-oves-cream text-oves-navy hover:border-oves-sun hover:bg-oves-sand",
  gold: "border-oves-sun bg-oves-sand text-oves-navy hover:border-oves-ember hover:bg-oves-sun/25",
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
