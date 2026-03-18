"use client";

export default function AmbientGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply opacity-80"
      aria-hidden="true"
    >
      {/* Rich dark olive orb */}
      <div
        className="absolute -left-[10%] -top-[10%] h-[800px] w-[800px]"
        style={{
          background: "radial-gradient(circle, rgba(44, 46, 32, 0.7) 0%, rgba(44, 46, 32, 0) 70%)"
        }}
      />

      {/* Lighter olive/gray orb */}
      <div
        className="absolute -right-[10%] top-[20%] h-[900px] w-[900px]"
        style={{
          background: "radial-gradient(circle, rgba(107, 109, 99, 0.6) 0%, rgba(107, 109, 99, 0) 70%)"
        }}
      />

      {/* Deepest olive orb */}
      <div
        className="absolute -bottom-[15%] left-[15%] h-[1000px] w-[1000px]"
        style={{
          background: "radial-gradient(circle, rgba(35, 37, 26, 0.6) 0%, rgba(35, 37, 26, 0) 70%)"
        }}
      />
    </div>
  );
}