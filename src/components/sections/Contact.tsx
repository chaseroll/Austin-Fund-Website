import Link from "next/link";
import Logo from "../Logo";
import BuildInvitation from "./BuildInvitation";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <>
      <BuildInvitation />
      <footer className="fund-footer">
        <Link className="fund-footer-wordmark" href="/" aria-label="Austin Fund home">
          <Logo variant="wordmark" />
          <span className="fund-footer-tagline">Backing UATX founders</span>
        </Link>
        <div className="fund-footer-meta">
          <span>Fund I · Raising</span>
          <span>© {year} Austin Fund</span>
        </div>
      </footer>
    </>
  );
}
