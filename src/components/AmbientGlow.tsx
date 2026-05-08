"use client";

export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute left-[20%] top-[15%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(180, 170, 140, 0.18) 0%, rgba(180, 170, 140, 0) 70%)",
        }}
      />
      <div
        className="absolute right-[10%] bottom-[10%] h-[520px] w-[520px] translate-x-1/3 translate-y-1/3"
        style={{
          background:
            "radial-gradient(circle, rgba(13, 14, 10, 0.05) 0%, rgba(13, 14, 10, 0) 70%)",
        }}
      />
    </div>
  );
}
