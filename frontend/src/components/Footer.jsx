import { Instagram, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-heading text-2xl font-bold tracking-tight uppercase">
            <span className="text-white">Prem</span>
            <span className="text-primary">Rishi</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/rishii._.12"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:rishimr12@gmail.com"
              data-testid="footer-email"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            © {currentYear} Prem Rishi Fitness. Made with{" "}
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
};
