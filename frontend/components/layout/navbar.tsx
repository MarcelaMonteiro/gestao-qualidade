import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold text-text">
          Gestão da Qualidade
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
