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
  X
} from "lucide-react";
import { useState, FormEvent } from "react";

const FORMSPREE_ID = "rickydepp11@gmail.com"; // Replace with your Formspree ID after signing up at formspree.io

const services = [
  {
    title: "Interior Detail",
    description: "Deep steam cleaning, leather conditioning, and thorough vacuuming to restore your cabin to showroom condition.",
    icon: <Sparkles className="w-6 h-6" />,
    price: "Coupes & Sedans: $110\nSmall SUVs & Trucks: $150\nLarge SUVs: $200"
  },
  {
    title: "Exterior Detail",
    description: "Multi-stage hand wash and high-quality wax application for a mirror-like finish.",
    icon: <Droplets className="w-6 h-6" />,
    price: "Coupes & Sedans: $75\nSmall SUVs: $90\nTrucks & Big SUVs: $125"
  },
  {
    title: "Full Detail (Interior & Exterior)",
    description: "The ultimate rejuvenation. Combining our premium interior and exterior detailing for a complete vehicle transformation.",
    icon: <ShieldCheck className="w-6 h-6" />,
    price: "Coupes & Sedans: $175\nSmall SUVs: $225\nTrucks & Big SUVs: $275"
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setStatus({ type: "loading", message: "Sending your request..." });

    try {
      // Formspree allows using an email as an endpoint, but it's better to use a hash if available.
      // For now, we'll use the email provided.
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Booking request sent! We'll contact you soon to confirm your appointment." });
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
          <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-widest font-medium">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="px-6 py-2 gold-gradient text-ink font-bold rounded-full hover:opacity-90 transition-opacity">
              Book Now
            </a>
          </div>

          <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <a href="#contact" className="gold-text-gradient font-bold" onClick={() => setIsMenuOpen(false)}>Book Now</a>
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
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <a href="#services" className="px-10 py-4 gold-gradient text-ink font-bold rounded-full text-lg hover:scale-105 transition-transform">
              Explore Services
            </a>
            <a href="#contact" className="px-10 py-4 border border-gold text-gold font-bold rounded-full text-lg hover:bg-gold hover:text-ink transition-all">
              Schedule Appointment
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
      <section id="services" className="py-24 px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Premium <span className="gold-text-gradient">Services</span></h2>
            <p className="text-paper/60 max-w-2xl mx-auto">We offer a range of specialized detailing packages designed to protect and enhance your vehicle's appearance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-3xl group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center text-ink mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-paper/60 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="text-gold font-bold whitespace-pre-line text-sm mt-auto">{service.price}</div>
              </motion.div>
            ))}
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Ready to <span className="gold-text-gradient">Shine?</span></h2>
            <p className="text-paper/60 mb-12 text-lg">Book your appointment today and give your vehicle the treatment it deserves.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Mobile Service</h4>
                  <p className="text-paper/60 text-sm">Based in Rehoboth, Massachusetts<br />Serving the Bristol County area</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-paper/60 text-sm">774-300-2853</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Working Hours</h4>
                  <p className="text-paper/60 text-sm">Mon - Sun: 8:00 AM - 8:00 PM<br />By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/40">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/40">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/40">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" 
                    placeholder="(555) 000-0000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-paper/40">Service Type</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-ink">Select a service</option>
                    <option value="Interior Detail" className="bg-ink">Interior Detail</option>
                    <option value="Exterior Detail" className="bg-ink">Exterior Detail</option>
                    <option value="Full Detail" className="bg-ink">Full Detail (Interior & Exterior)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-paper/40">Message</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors resize-none" 
                  placeholder="Tell us about your vehicle..."
                ></textarea>
              </div>
              
              {status.message && (
                <div className={`p-4 rounded-xl text-sm font-bold ${
                  status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                  status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                  'bg-gold/10 text-gold border border-gold/20'
                }`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-4 gold-gradient text-ink font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/deppischdetailing/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Ricky-Deppisch-Detailing/61577562788192/" 
              target="_blank" 
              rel="noopener noreferrer"
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

