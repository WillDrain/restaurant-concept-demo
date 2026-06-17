import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ReservationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .email("Valid email required")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .min(7, "Phone is required")
    .max(20, "Phone is too long"),
  partySize: z.number().int().positive().max(20),
  date: z.coerce.date().refine((d) => d >= new Date(), {
    message: "Reservation date can't be in the past",
  }),
  notes: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const parsed = ReservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({ data: parsed.data });
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
