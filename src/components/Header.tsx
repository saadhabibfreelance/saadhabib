import { Link, useMatch } from "@tanstack/react-router";

export function Header() {
  const homeMatch = useMatch({ from: "/", shouldThrow: false });
  const servicesMatch = useMatch({ from: "/services", shouldThrow: false });
  const aboutMatch = useMatch({ from: "/about", shouldThrow: false });

  const isActive = (match: ReturnType<typeof useMatch>) => !!match;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            SH
          </span>
          <span className="hidden sm:inline">Saad Habib</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive(homeMatch)
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive(servicesMatch)
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive(aboutMatch)
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            About
          </Link>
          <a
            href="mailto:saadhabibwebsite@gmail.com"
            className="ml-2 hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
