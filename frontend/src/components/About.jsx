import { motion } from "framer-motion";
import { Award, Clock, Users, Heart } from "lucide-react";
import { Button } from "./ui/button";

const stats = [
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Users, value: "200+", label: "Clients Transformed" },
  { icon: Award, value: "NASM", label: "Certified Trainer" },
  { icon: Heart, value: "100%", label: "Dedication" },
];

export const About = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1655556870982-0cd4d5854e05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMHBvcnRyYWl0JTIwbWFuJTIwY29uZmlkZW50fGVufDB8fHx8MTc2ODY5NTU4MHww&ixlib=rb-4.1.0&q=85"
                alt="Prem Rishi - Personal Trainer"
                className="w-full h-full object-cover"
              />
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-xl translate-x-4 translate-y-4 -z-10" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 glass rounded-xl p-6 neon-glow"
            >
              <p className="font-heading text-4xl md:text-5xl text-primary font-bold">
                5+
              </p>
              <p className="text-sm text-zinc-400 uppercase tracking-wide">
                Years Experience
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
              About Me
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-white mb-6">
              Meet Prem Rishi
            </h2>

            <div className="space-y-4 text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
              <p>
                As a <span className="text-white font-medium">NASM Certified Personal Trainer</span> with 
                over 5 years of experience in the fitness industry, I've dedicated my career to helping 
                individuals transform their bodies and minds.
              </p>
              <p>
                My journey as a <span className="text-white font-medium">former bodybuilder</span> has 
                given me first-hand knowledge of what it takes to achieve real, lasting results. I 
                understand the challenges, the plateaus, and the mindset needed to push through barriers.
              </p>
              <p>
                Working <span className="text-white font-medium">collaboratively with top nutrition doctors</span>, 
                I provide a holistic approach to fitness that combines effective training programs with 
                science-backed nutritional guidance.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="glass px-4 py-2 rounded-full text-sm text-zinc-300">
                NASM Certified
              </span>
              <span className="glass px-4 py-2 rounded-full text-sm text-zinc-300">
                Nutrition Partner Network
              </span>
              <span className="glass px-4 py-2 rounded-full text-sm text-zinc-300">
                Former Bodybuilder
              </span>
            </div>

            <Button
              data-testid="about-cta-btn"
              onClick={scrollToContact}
              className="bg-primary text-white hover:bg-red-700 transition-all duration-300 uppercase tracking-widest font-bold px-8 py-6 rounded-full neon-glow-hover text-base hover:scale-105"
            >
              Book a Free Consultation
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              data-testid={`stat-${index}`}
              className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl md:text-4xl text-white font-bold">
                {stat.value}
              </p>
              <p className="text-sm text-zinc-400 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
