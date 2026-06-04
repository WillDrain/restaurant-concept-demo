"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const OPENING_MESSAGE =
  "Hi! I'm here to help with anything about Oves — hours, menu, donuts, rentals, parties. What can I get you?";

// TODO: replace getCannedReply() with a fetch to /api/chat once the Anthropic API is wired up.
function getCannedReply(input: string): string {
  const message = input.toLowerCase();

  if (message.includes("hour") || message.includes("open")) {
    return "We're open daily 7am–8:30pm during the season, mid-May through mid-September. Stop by for breakfast, lunch, or dinner on the boardwalk!";
  }

  if (message.includes("donut")) {
    return "Our apple cider donuts are made fresh daily at Oves — a boardwalk favorite! Come grab one (or a dozen) when you visit.";
  }

  if (message.includes("menu")) {
    return "We serve breakfast (7am–12pm), lunch (12pm–5pm), and dinner (5pm–8:30pm). Check our Menus page for the full lineup of shore favorites.";
  }

  if (
    message.includes("park") ||
    message.includes("rent") ||
    message.includes("bike") ||
    message.includes("beach")
  ) {
    return "We offer bike rentals and beach surrey rentals right on the boardwalk — perfect for a family ride along Ocean City. Ask us at the restaurant for availability!";
  }

  if (
    message.includes("phone") ||
    message.includes("call") ||
    message.includes("reservation")
  ) {
    return "Give us a call at (609) 398-3712 — we'd love to help with reservations, private parties, or any questions!";
  }

  return "Great question! For that one, give us a call at (609) 398-3712 and we'll help you out.";
}

function JohnAvatar({
  size = "button",
  alt = "John from Oves Restaurant",
}: {
  size?: "button" | "header";
  alt?: string;
}) {
  const dimensions =
    size === "button"
      ? "h-16 w-16 border-2 border-oves-sun/60 shadow-md"
      : "h-10 w-10 border border-oves-sun/40";

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full bg-oves-teal/20 ${dimensions}`}
    >
      <Image
        src="/images/john-chat.png"
        alt={alt}
        width={64}
        height={64}
        unoptimized
        className="h-full w-full object-cover object-[center_20%]"
      />
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: OPENING_MESSAGE },
  ]);
  const nextId = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || typing) return;

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const reply: Message = {
        id: nextId.current++,
        role: "assistant",
        text: getCannedReply(trimmed),
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 600);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="rounded-full border border-oves-sun/40 bg-oves-cream px-4 py-2 font-display text-sm font-semibold text-oves-navy shadow-md sm:text-base">
            Ask Oves
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-controls="oves-chat-panel"
            aria-label="Open chat with Oves"
            className="rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-oves-sun focus-visible:ring-offset-2"
          >
            <JohnAvatar />
          </button>
        </div>
      )}

      <div
        id="oves-chat-panel"
        role="dialog"
        aria-label="Oves Restaurant chat"
        aria-hidden={!open}
        className={`fixed z-50 flex max-h-[70vh] flex-col overflow-hidden border border-oves-sun/25 bg-oves-cream shadow-[0_12px_40px_rgba(14,44,78,0.22)] transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0 max-sm:translate-y-full"
        } inset-x-0 bottom-0 rounded-t-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-w-[calc(100vw-3rem)] sm:rounded-2xl`}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 bg-oves-navy px-4 py-3 text-oves-cream">
          <div className="flex min-w-0 items-center gap-3">
            <JohnAvatar size="header" alt="" />
            <div className="min-w-0">
              <p className="font-display text-base font-semibold leading-tight">
                Oves Restaurant
              </p>
              <p className="text-xs text-oves-sand">Ask us anything!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="shrink-0 rounded-sm p-1 text-oves-sand transition-colors hover:text-oves-sun"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col bg-oves-cream">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-oves-teal text-oves-cream"
                      : "bg-oves-sand text-oves-navy"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-oves-sand px-3.5 py-2.5 text-sm text-oves-navy/70">
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">•</span>
                    <span className="animate-pulse [animation-delay:150ms]">•</span>
                    <span className="animate-pulse [animation-delay:300ms]">•</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="shrink-0 border-t border-oves-teal/15 bg-oves-cream p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about hours, menu, donuts..."
                disabled={typing}
                className="min-w-0 flex-1 rounded-md border border-oves-teal/25 bg-white px-3 py-2 text-sm text-oves-navy placeholder:text-oves-navy/40 focus:border-oves-sun focus:outline-none focus:ring-1 focus:ring-oves-sun/50 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="shrink-0 rounded-md border border-oves-sun/50 bg-oves-teal px-4 py-2 font-display text-sm font-semibold text-oves-cream transition-colors hover:border-oves-sun hover:bg-oves-navy disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
