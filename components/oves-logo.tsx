import Image from "next/image";

export function OvesLogo() {
  return (
    <Image
      src="/images/oves-main-logo.png"
      alt="Oves Restaurant"
      width={708}
      height={281}
      priority
      unoptimized
      sizes="(max-width: 640px) 128px, 142px"
      className="h-auto w-[min(100%,128px)] drop-shadow-sm sm:w-[min(100%,142px)]"
      style={{ imageRendering: "auto" }}
    />
  );
}
