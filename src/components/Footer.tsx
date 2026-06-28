import { Mail, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-gold-light">Saad Habib Services</h3>
            <p className="mt-3 max-w-xs text-sm text-cream/80">
              Reliable freelance data and e-commerce services for busy businesses and entrepreneurs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gold-light">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-cream/80 hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cream/80 hover:text-gold">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 hover:text-gold">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gold-light">Contact</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+923002019194"
                  className="inline-flex items-center gap-2 text-cream/80 hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  +92 300 201 9194
                </a>
              </li>
              <li>
                <a
                  href="mailto:saadhabibwebsite@gmail.com"
                  className="inline-flex items-center gap-2 text-cream/80 hover:text-gold"
                >
                  <Mail className="h-4 w-4" />
                  saadhabibwebsite@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-sm text-cream/60">
          © {currentYear} Saad Habib Freelancing Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
