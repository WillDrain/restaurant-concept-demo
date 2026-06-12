import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Clearly fake demo bookings (example.com emails, 555-01xx fictional numbers).
const demoBookings = [
  {
    name: "Marina DelMar",
    email: "marina@example.com",
    phone: "555-0100",
    partySize: 2,
    date: new Date("2026-07-02T18:30:00Z"),
    status: "confirmed",
    notes: "Window table for an anniversary.",
  },
  {
    name: "Reef Sandoval",
    email: "reef@example.com",
    phone: "555-0111",
    partySize: 4,
    date: new Date("2026-07-03T19:00:00Z"),
    status: "pending",
    notes: null,
  },
  {
    name: "Sandy Shores",
    email: "sandy@example.com",
    phone: "555-0122",
    partySize: 6,
    date: new Date("2026-07-04T17:45:00Z"),
    status: "confirmed",
    notes: "High chair needed.",
  },
  {
    name: "Finn Harbor",
    email: "finn@example.com",
    phone: "555-0133",
    partySize: 3,
    date: new Date("2026-07-05T20:15:00Z"),
    status: "pending",
    notes: "Gluten-friendly options, please.",
  },
  {
    name: "Coral Bayview",
    email: "coral@example.com",
    phone: "555-0144",
    partySize: 8,
    date: new Date("2026-07-06T18:00:00Z"),
    status: "cancelled",
    notes: "Large party — may reschedule.",
  },
];

async function main() {
  const deleted = await prisma.reservation.deleteMany({});
  console.log(`Deleted ${deleted.count} existing reservation(s).`);

  for (const booking of demoBookings) {
    await prisma.reservation.create({ data: booking });
  }

  const total = await prisma.reservation.count();
  console.log(`Inserted ${demoBookings.length} demo bookings. Total now: ${total}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
