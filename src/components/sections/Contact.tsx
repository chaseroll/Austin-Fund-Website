export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] text-[#EAEAEA]">
      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <div className="border-t border-[var(--color-hair-dark)] pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <span className="eyebrow text-[var(--color-mute-dark-2)]">
              © {year} Austin Fund
            </span>
            <span className="eyebrow inline-flex items-center gap-2 text-[var(--color-mute-dark-2)]">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EAEAEA]/30" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-[#EAEAEA]/55" />
              </span>
              Fund I · Raising
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
