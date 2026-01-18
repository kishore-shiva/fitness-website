import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1740895307943-7878df384db1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZGFyayUyMG1vb2R5JTIwbGlnaHRpbmd8ZW58MHx8fHwxNzY4Njk1NTcyfDA&ixlib=rb-4.1.0&q=85"
          alt="Fitness Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">
              NASM Certified Personal Trainer
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none mb-6">
            <span className="text-white">Transform</span>
            <br />
            <span className="text-primary">Your Body</span>
            <br />
            <span className="text-white">& Mind</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
          >
            5+ years of experience helping clients achieve their fitness goals.
            Personalized training programs for weight loss, strength training,
            flexibility, and nutrition coaching.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button
              data-testid="hero-cta-btn"
              onClick={scrollToContact}
              className="bg-primary text-white hover:bg-red-700 transition-all duration-300 uppercase tracking-widest font-bold px-8 py-6 rounded-full neon-glow neon-glow-hover text-base hover:scale-105"
            >
              Book a Free Consultation
            </Button>
            <Button
              data-testid="hero-services-btn"
              onClick={scrollToServices}
              variant="outline"
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 uppercase tracking-widest font-bold px-8 py-6 rounded-full text-base"
            >
              View Services
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        data-testid="scroll-indicator"
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};
