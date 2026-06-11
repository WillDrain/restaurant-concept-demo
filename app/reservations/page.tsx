import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reservations | Tide & Table",
};

// Always read live data from the database on each request.
export const dynamic = "force-dynamic";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDateTime(value: Date): string {
  return dateTimeFormatter.format(value);
}

function statusClasses(status: string): string {
  switch (status) {
    case "confirmed":
      return "border-brand-teal/40 bg-brand-teal/15 text-brand-teal";
    case "cancelled":
      return "border-brand-ember/40 bg-brand-ember/10 text-brand-ember";
    default:
      return "border-brand-sun/50 bg-brand-sun/15 text-brand-navy";
  }
}

export default async function ReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell>
      <section className="brand-section">
        <div className="brand-container">
          <div className="max-w-2xl">
            <span className="brand-badge">Admin</span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
              Reservations
            </h1>
            <div className="brand-divider mt-4" />
            <p className="mt-4 text-base leading-7 text-brand-navy/75">
              {reservations.length === 0
                ? "Incoming table requests will appear here."
                : `${reservations.length} booking${
                    reservations.length === 1 ? "" : "s"
                  }, newest first.`}
            </p>
          </div>

          {reservations.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-brand-teal/30 bg-brand-cream p-10 text-center shadow-sm">
              <p className="font-display text-lg font-semibold text-brand-navy">
                No reservations yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-brand-navy/60">
                When guests book a table through the site, their requests will
                show up right here.
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-teal/20 bg-brand-cream shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-teal/20 bg-brand-sand/50 text-brand-navy">
                    <th className="px-4 py-3 font-display font-semibold">Name</th>
                    <th className="px-4 py-3 font-display font-semibold">
                      Contact
                    </th>
                    <th className="px-4 py-3 font-display font-semibold">Party</th>
                    <th className="px-4 py-3 font-display font-semibold">
                      Date &amp; time
                    </th>
                    <th className="px-4 py-3 font-display font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 font-display font-semibold">Notes</th>
                    <th className="px-4 py-3 font-display font-semibold">
                      Requested
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="border-b border-brand-teal/10 align-top last:border-b-0 hover:bg-brand-sand/25"
                    >
                      <td className="px-4 py-3 font-semibold text-brand-navy">
                        {reservation.name}
                      </td>
                      <td className="px-4 py-3 text-brand-navy/75">
                        <div>
                          <a
                            href={`mailto:${reservation.email}`}
                            className="hover:text-brand-teal"
                          >
                            {reservation.email}
                          </a>
                        </div>
                        <div className="text-brand-navy/60">
                          <a
                            href={`tel:${reservation.phone}`}
                            className="hover:text-brand-teal"
                          >
                            {reservation.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3 tabular-nums text-brand-navy/80">
                        {reservation.partySize}
                      </td>
                      <td className="px-4 py-3 text-brand-navy/80">
                        {formatDateTime(reservation.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClasses(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="max-w-[16rem] px-4 py-3 text-brand-navy/70">
                        {reservation.notes ? (
                          reservation.notes
                        ) : (
                          <span className="text-brand-navy/40">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-brand-navy/60">
                        {formatDateTime(reservation.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
