import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, Instagram, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "strength-training", label: "Strength Training / Weight Gain" },
  { value: "flexibility-rehab", label: "Flexibility & Rehabilitation" },
  { value: "nutrition-coaching", label: "Nutrition Coaching" },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.status === "success") {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-white mb-6">
              Start Your
              <br />
              <span className="text-primary">Transformation</span>
            </h2>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
              Ready to take the first step towards a healthier, stronger you?
              Fill out the form and I'll get back to you within 24 hours to
              discuss your fitness goals and create a personalized plan just for
              you.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Email</p>
                  <p className="text-white">contact@premrishi.fitness</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Phone</p>
                  <p className="text-white">Available upon request</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Instagram</p>
                  <p className="text-white">@premrishi.fitness</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl p-8 md:p-10">
              <h3 className="font-heading text-2xl md:text-3xl uppercase text-white mb-6">
                Book a Free Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="contact-name-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-zinc-900/50 border-white/10 focus:border-primary focus:ring-primary/20 text-white placeholder:text-zinc-500 h-14 rounded-lg"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="contact-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-zinc-900/50 border-white/10 focus:border-primary focus:ring-primary/20 text-white placeholder:text-zinc-500 h-14 rounded-lg"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    data-testid="contact-phone-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="bg-zinc-900/50 border-white/10 focus:border-primary focus:ring-primary/20 text-white placeholder:text-zinc-500 h-14 rounded-lg"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-zinc-300">
                    Service Interested In *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={handleServiceChange}
                    required
                  >
                    <SelectTrigger
                      data-testid="contact-service-select"
                      className="bg-zinc-900/50 border-white/10 focus:border-primary focus:ring-primary/20 text-white h-14 rounded-lg"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      {services.map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                          data-testid={`service-option-${service.value}`}
                          className="text-white hover:bg-primary/20 focus:bg-primary/20"
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    data-testid="contact-message-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your fitness goals..."
                    rows={4}
                    className="bg-zinc-900/50 border-white/10 focus:border-primary focus:ring-primary/20 text-white placeholder:text-zinc-500 rounded-lg resize-none"
                  />
                </div>

                {/* Submit Status */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-red-700 transition-all duration-300 uppercase tracking-widest font-bold px-8 py-6 rounded-full neon-glow-hover text-base hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
