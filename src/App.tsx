import { motion } from "motion/react";
import { 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Droplets, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useState, FormEvent } from "react";

const FORMSPREE_ID = "mojyjdow"; // Formspree form endpoint ID

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "Interior Detail",
    title: "Interior Detail",
    badge: "Deep Rejuvenation",
    description: "Deep steam cleaning, leather conditioning, and thorough vacuuming to restore your cabin to showroom condition.",
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      "Deep steam sanitation & shampoo",
      "Leather cleaning & UV conditioning",
      "Stain extraction & pet hair removal",
      "Streak-free glass & air vent cleanse"
    ]
  },
  {
    id: "Exterior Detail",
    title: "Exterior Detail",
    badge: "Brilliant Gloss",
    description: "Multi-stage hand wash, chemical decontamination, and high-grade protective wax application for a mirror-like finish.",
    icon: <Droplets className="w-6 h-6" />,
    features: [
      "Scratch-free two-bucket hand wash",
      "Wheel, tire & wheel well deep clean",
      "Paint decontamination & clay bar",
      "High-gloss sealant & tire dressing"
    ]
  },
  {
    id: "Full Detail",
    title: "Full Detail (Interior & Exterior)",
    badge: "Most Popular",
    description: "The complete transformation. Combining our premium interior and exterior packages for total vehicle revival.",
    icon: <ShieldCheck className="w-6 h-6" />,
    features: [
      "Comprehensive interior steam & detail",
      "Complete exterior wash, clay & seal",
      "Door jambs, trim & engine bay tidy",
      "Complete 360° protection & restoration"
    ]
  }
];

const gallery = [
  "/portfolio-1.jpg",
  "/portfolio-3.jpg",
  "/portfolio-4.jpg",
  "/portfolio-5.jpg"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSelectService = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setStatus({ type: "loading", message: "Sending your free estimate request..." });

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New Free Estimate Request: ${formData.service} - ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus({ 
          type: "success", 
          message: "Estimate request received! We'll review your vehicle details and contact you promptly with your free custom quote." 
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const data = await response.json();
        setStatus({ type: "error", message: data.error || "Something went wrong. Please try again or call us directly." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to connect to the server. Please check your connection or call us at 774-300-2853." });
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-ink/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-serif font-bold tracking-tight text-white group-hover:text-gold transition-colors">
              DEPPISCH <span className="gold-text-gradient">DETAILING</span>
            </span>
          </a>

          <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-widest font-medium">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="px-6 py-2 gold-gradient text-ink font-bold rounded-full hover:opacity-90 transition-opacity">
              Get Free Estimate
            </a>
          </div>

          <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-ink border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-center"
          >
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
            <a href="#contact" className="gold-text-gradient font-bold" onClick={() => setIsMenuOpen(false)}>Get Free Estimate</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Luxury car interior"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-6"
          >
            The Gold Standard of Automotive Care
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">
              DEPPISCH <span className="gold-text-gradient">DETAILING</span>
            </h2>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9]"
          >
            Elegance in Every <span className="italic gold-text-gradient">Detail</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#services" className="w-full sm:w-auto px-10 py-4 border border-gold/40 text-gold hover:border-gold font-bold rounded-full text-lg hover:bg-gold/10 transition-all">
              Explore Services
            </a>
            <a href="#contact" className="w-full sm:w-auto px-10 py-4 gold-gradient text-ink font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-lg shadow-gold/20">
              Get Free Estimate
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
        >
          <ChevronRight className="rotate-90 w-8 h-8" />
        </motion.div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-ink relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-widest font-semibold mb-4">
              <span>Personalized Pricing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>100% Free Estimates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Premium <span className="gold-text-gradient">Services</span>
            </h2>
            <p className="text-paper/70 max-w-2xl mx-auto text-base">
              Every vehicle is unique in size, condition, and care requirements. Select a service below and fill out our quick form to receive a customized, no-obligation estimate.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -8 }}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-gold/40 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center text-ink group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-paper/70">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-paper/60 text-sm leading-relaxed mb-6">{service.description}</p>

                  <div className="border-t border-white/10 pt-5 mb-6 space-y-2.5 text-left">
                    <div className="text-xs uppercase tracking-wider text-gold font-bold mb-2">Package Highlights:</div>
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-paper/80">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="text-xs text-paper/50 text-center font-medium">
                    Pricing tailored to vehicle size & condition
                  </div>
                  <button
                    onClick={() => handleSelectService(service.id)}
                    className="w-full py-3 px-4 rounded-xl border border-gold text-gold font-bold text-sm hover:bg-gold hover:text-ink transition-all flex items-center justify-center gap-2 group-hover:bg-gold group-hover:text-ink"
                  >
                    <span>Request Free Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Explainer Banner */}
          <div className="mt-12 glass-card p-6 md:p-8 rounded-2xl border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-lg md:text-xl font-serif font-bold text-white mb-1">
                How It Works: Free & Simple Quotes
              </h4>
              <p className="text-paper/60 text-sm max-w-2xl">
                Fill out the form below with your vehicle's make, model, and condition. We'll promptly give you an accurate, upfront estimate with no hidden fees and zero commitment.
              </p>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-3 gold-gradient text-ink font-bold text-sm rounded-xl whitespace-nowrap hover:scale-105 transition-transform"
            >
              Get My Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">The <span className="gold-text-gradient">Gallery</span></h2>
              <p className="text-paper/60">A glimpse into the perfection we deliver to our clients.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {gallery.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square overflow-hidden rounded-2xl cursor-zoom-in"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Detailing work ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-ink relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-widest font-semibold mb-4">
              <span>Free Estimate Request</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Request Your <span className="gold-text-gradient">Free Estimate</span>
            </h2>
            <p className="text-paper/70 mb-8 text-base leading-relaxed">
              Complete the quick form with your vehicle details and service interest. We will review your vehicle specifics and reply promptly with an accurate, no-obligation estimate.
            </p>
            
            {/* Value bullets */}
            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-paper/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span><strong>100% Free & No Obligation</strong> — never any pressure or hidden fees</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-paper/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span><strong>Custom Vehicle Pricing</strong> — tailored specifically to your vehicle size and needs</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-paper/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span><strong>Fast Response</strong> — we review inquiries quickly and reach out directly</span>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Mobile Detailing Service</h4>
                  <p className="text-paper/60 text-sm">Based in Rehoboth, Massachusetts<br />Serving the Bristol County area and surroundings</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Call or Text Directly</h4>
                  <a href="tel:7743002853" className="text-gold hover:underline text-sm font-semibold">774-300-2853</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Operating Hours</h4>
                  <p className="text-paper/60 text-sm">Mon - Sun: 8:00 AM - 8:00 PM<br />By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-white">Get a Free Custom Quote</h3>
              <p className="text-paper/60 text-xs mt-1">Fill out the details below and we'll calculate your free estimate.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/60">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/60">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/60">
                    Phone Number <span className="text-gold">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                    placeholder="(774) 300-2853" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/60">
                    Service Interested In <span className="text-gold">*</span>
                  </label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="" className="bg-ink text-paper/50">Select a service package</option>
                    <option value="Interior Detail" className="bg-ink text-white">Interior Detail</option>
                    <option value="Exterior Detail" className="bg-ink text-white">Exterior Detail</option>
                    <option value="Full Detail" className="bg-ink text-white">Full Detail (Interior & Exterior)</option>
                    <option value="Custom / Multiple Vehicles" className="bg-ink text-white">Custom / Multiple Vehicles</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-paper/60">
                  Vehicle Details & Message
                </label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-colors resize-none placeholder:text-paper/30" 
                  placeholder="e.g., Year, Make & Model (e.g. 2022 Ford F-150), vehicle condition, pet hair or specific stains..."
                ></textarea>
              </div>
              
              {status.message && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${
                  status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                  status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                  'bg-gold/10 text-gold border border-gold/20'
                }`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-4 gold-gradient text-ink font-bold rounded-xl hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-gold/20 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                {status.type === 'loading' ? (
                  <span>Sending request...</span>
                ) : (
                  <>
                    <span>Submit for Free Estimate</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-paper/40 text-xs mt-3">
                No credit card required. Free, zero-obligation custom quote.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="font-serif font-bold text-white tracking-tight">
              DEPPISCH <span className="gold-text-gradient">DETAILING</span>
            </span>
            <span className="hidden sm:inline text-paper/30">|</span>
            <span className="text-paper/50 text-xs">Rehoboth, MA • Mobile Detailing</span>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/deppischdetailing/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Ricky-Deppisch-Detailing/61577562788192/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <p className="text-paper/40 text-sm">© 2026 Deppisch Detailing. All rights reserved.</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-10 right-10 text-gold hover:scale-110 transition-transform"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            <X className="w-10 h-10" />
          </button>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-5xl w-full max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Enhanced view" 
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

