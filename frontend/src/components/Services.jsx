import { motion } from "framer-motion";
import { Flame, Dumbbell, Salad, Stretch } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    id: "weight-loss",
    title: "Weight Loss",
    description:
      "Science-backed fat loss programs combining cardio, strength training, and metabolic conditioning to help you shed unwanted weight and keep it off for good.",
    icon: Flame,
    image:
      "https://images.unsplash.com/photo-1693214674451-2111f7690877?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxneW0lMjB3b3Jrb3V0JTIwZGFyayUyMG1vb2R5JTIwbGlnaHRpbmd8ZW58MHx8fHwxNzY4Njk1NTcyfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7",
  },
  {
    id: "strength-training",
    title: "Strength Training",
    description:
      "Build lean muscle mass and increase your strength with progressive overload programs tailored to your fitness level and goals.",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1700784795176-7ff886439d79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxneW0lMjB3b3Jrb3V0JTIwZGFyayUyMG1vb2R5JTIwbGlnaHRpbmd8ZW58MHx8fHwxNzY4Njk1NTcyfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-5",
  },
  {
    id: "nutrition-coaching",
    title: "Nutrition Coaching",
    description:
      "Personalized meal plans and nutritional guidance in collaboration with top nutrition doctors to fuel your transformation.",
    icon: Salad,
    image:
      "https://images.unsplash.com/photo-1669490884223-ca6ca27c8766?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWwlMjBwcmVwJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzY4Njk1NTc1fDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-5",
  },
  {
    id: "flexibility-rehab",
    title: "Flexibility & Rehabilitation",
    description:
      "Mobility work, stretching routines, and rehabilitation exercises to improve flexibility, prevent injuries, and recover faster.",
    icon: Stretch,
    image:
      "https://images.unsplash.com/photo-1758599880425-7862af0a4b50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxtYW4lMjBzdHJldGNoaW5nJTIweW9nYSUyMGd5bXxlbnwwfHx8fDE3Njg2OTU1Nzh8MA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            What I Offer
          </span>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight uppercase text-white mb-4">
            Training Programs
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Customized fitness solutions designed to meet your unique goals and
            lifestyle. Each program is tailored specifically for you.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(320px,auto)]"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              data-testid={`service-card-${service.id}`}
              className={`group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-500 rounded-xl ${service.span}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* CTA */}
                <Button
                  data-testid={`service-cta-${service.id}`}
                  onClick={scrollToContact}
                  variant="ghost"
                  className="self-start text-primary hover:text-white hover:bg-primary/20 transition-all duration-300 uppercase tracking-widest text-sm font-bold px-0 group-hover:px-4"
                >
                  Get Started →
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
