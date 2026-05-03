import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sun, Moon, Menu, X } from "lucide-react";
import logoPath from "@/assets/logo.png";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <img
              src={logoPath}
              alt="Jaysawal Jee Digital Services Logo"
              className="h-10 w-10 object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-primary leading-none">Jaysawal Jee</span>
              <span className="text-xs font-medium text-muted-foreground leading-none">Digital Services</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-all pulse-glow"
              data-testid="button-cta-nav"
            >
              Contact Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-all"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold text-center mt-2"
              data-testid="button-cta-mobile"
            >
              Contact Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
