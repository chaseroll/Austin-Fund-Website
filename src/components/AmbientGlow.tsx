"use client";

export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply opacity-24"
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(122, 122, 122, 0.14) 0%, rgba(122, 122, 122, 0) 74%)",
        }}
      />
    </div>
  );
}
