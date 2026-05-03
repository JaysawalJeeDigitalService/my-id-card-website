import { Link } from "wouter";
import { SiInstagram, SiYoutube, SiWhatsapp } from "react-icons/si";
import logoPath from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logoPath} alt="Logo" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-bold text-primary text-sm">Jaysawal Jee</div>
                <div className="text-xs text-muted-foreground">Digital Services</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional digital services for your brand — ID cards, logos, and video editing.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-youtube"
                className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all"
              >
                <SiYoutube size={16} />
              </a>
              <a
                href="https://wa.me/916284731558"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-whatsapp-footer"
                className="p-2 rounded-full bg-muted hover:bg-green-500/20 hover:text-green-500 transition-all"
              >
                <SiWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 overflow-hidden transition-all text-primary">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-default">ID Card Design & Printing</li>
              <li className="hover:text-primary transition-colors cursor-default">Logo Design</li>
              <li className="hover:text-primary transition-colors cursor-default">Short Video Editing</li>
              <li className="hover:text-primary transition-colors cursor-default">Reels & YouTube Shorts</li>
              <li className="hover:text-primary transition-colors cursor-default">Instagram Content</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jaysawal Jee Digital Services. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Made with passion for digital excellence</p>
        </div>
      </div>
    </footer>
  );
}
