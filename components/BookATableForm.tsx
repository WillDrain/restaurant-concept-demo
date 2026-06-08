"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Record<string, string[] | undefined>;

type ApiErrorResponse = {
  error?: string;
  issues?: {
    formErrors?: string[];
    fieldErrors?: FieldErrors;
  };
};

function readErrorMessage(data: ApiErrorResponse): string {
  const fieldMessages = data.issues?.fieldErrors
    ? Object.values(data.issues.fieldErrors)
        .flat()
        .filter((message): message is string => Boolean(message))
    : [];

  if (fieldMessages.length > 0) return fieldMessages.join(" ");
  if (data.issues?.formErrors && data.issues.formErrors.length > 0) {
    return data.issues.formErrors.join(" ");
  }
  return data.error ?? "Something went wrong. Please try again.";
}

const inputClasses =
  "mt-1 w-full rounded-md border border-brand-teal/25 bg-white px-3 py-2 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-sun focus:outline-none focus:ring-1 focus:ring-brand-sun/50 disabled:opacity-60";

const labelClasses = "block font-display text-sm font-medium text-brand-navy";

export function BookATableForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function resetFields() {
    setName("");
    setEmail("");
    setPhone("");
    setPartySize("2");
    setDate("");
    setNotes("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    const payload = {
      name,
      email,
      phone,
      partySize: Number(partySize),
      date,
      notes: notes.trim() ? notes : undefined,
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: unknown = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Thank you! Your table request has been received — we'll be in touch to confirm."
        );
        resetFields();
        return;
      }

      setStatus("error");
      setMessage(readErrorMessage((data ?? {}) as ApiErrorResponse));
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-brand-teal/20 bg-brand-cream p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSubmitting}
              placeholder="Your full name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={isSubmitting}
              placeholder="(555) 248-0199"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="partySize" className={labelClasses}>
              Party size
            </label>
            <input
              id="partySize"
              name="partySize"
              type="number"
              min={1}
              max={20}
              required
              value={partySize}
              onChange={(event) => setPartySize(event.target.value)}
              disabled={isSubmitting}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="date" className={labelClasses}>
            Date &amp; time
          </label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="notes" className={labelClasses}>
            Notes <span className="text-brand-navy/50">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={500}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={isSubmitting}
            placeholder="Allergies, seating preferences, celebrations…"
            className={`${inputClasses} resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-sm border border-brand-teal bg-brand-teal px-5 py-2.5 font-display text-sm font-semibold tracking-wide text-brand-cream shadow-sm transition-colors hover:border-brand-sun hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Booking…" : "Book a Table"}
        </button>

        {status === "success" && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-md border border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-sm text-brand-navy"
          >
            {message}
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-md border border-brand-ember/40 bg-brand-ember/10 px-4 py-3 text-sm text-brand-ember"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
