import { PageShell } from "@/components/page-shell";

type ContentPageProps = {
  title: string;
  intro: string;
  children?: React.ReactNode;
};

export function ContentPage({ title, intro, children }: ContentPageProps) {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-brand-teal/20 bg-brand-sand p-8 shadow-sm sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-navy/80 sm:text-lg">
            {intro}
          </p>
          {children}
        </div>
      </section>
    </PageShell>
  );
}
