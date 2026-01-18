import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          data-testid="nav-logo"
          onClick={() => scrollToSection("hero")}
          className="font-heading text-2xl md:text-3xl font-bold tracking-tight uppercase"
        >
          <span className="text-white">Prem</span>
          <span className="text-primary">Rishi</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              data-testid={`nav-${link.id}`}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <Button
            data-testid="nav-cta-btn"
            onClick={() => scrollToSection("contact")}
            className="bg-primary text-white hover:bg-red-700 transition-all duration-300 uppercase tracking-widest font-bold px-6 py-2 rounded-full neon-glow-hover"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 mx-6 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  data-testid={`mobile-nav-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-base font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 py-2"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-testid="mobile-nav-cta-btn"
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white hover:bg-red-700 transition-all duration-300 uppercase tracking-widest font-bold px-6 py-3 rounded-full mt-2"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
