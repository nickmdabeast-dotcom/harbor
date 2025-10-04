"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiquidGlassCard } from '@/components/ui/liquid-glass-card';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className = "" }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={cn("text-black hover:text-red-600 transition-colors duration-200 font-medium", className)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-red-600/20" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 bg-charcoal/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-cream/20"
            whileHover={{ scale: 1.05 }}
          >
            <Utensils className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-black">Harbor Grill</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8 bg-charcoal/30 backdrop-blur-md rounded-2xl px-6 py-3 border border-cream/20">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#menu">Menu</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="hidden md:block">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-cream"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve Table
            </Button>
          </div>

          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-red-600/20"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                <NavLink href="#home" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</NavLink>
                <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-cream w-full mt-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Reserve Table
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2070&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <LiquidGlassCard
          blurIntensity="xl"
          shadowIntensity="lg"
          borderRadius="48px"
          className="mb-8"
        >
          <motion.div
            className="px-8 py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6">
              Welcome to <span className="text-red-600">Harbor Grill</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cream/90 leading-relaxed">
              Where culinary excellence meets coastal charm. Experience fresh seafood and premium steaks in an elegant waterfront setting.
            </p>
          </motion.div>
        </LiquidGlassCard>
        
        <LiquidGlassCard
          blurIntensity="lg"
          shadowIntensity="md"
          borderRadius="32px"
          className="inline-block"
        >
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              className="bg-red-600 hover:bg-red-700 text-cream px-8 py-3 text-lg"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </Button>
            <Button 
              variant="outline"
              className="border-cream text-cream hover:bg-cream hover:text-charcoal px-8 py-3 text-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Make Reservation
            </Button>
          </motion.div>
        </LiquidGlassCard>
      </div>
    </section>
  );
};

const MenuSection: React.FC = () => {
  const menuItems = {
    appetizers: [
      { name: "Oysters Rockefeller", description: "Fresh oysters with spinach, herbs, and hollandaise", price: "$18" },
      { name: "Lobster Bisque", description: "Rich and creamy with fresh lobster meat", price: "$14" },
      { name: "Seared Scallops", description: "Pan-seared with cauliflower puree and pancetta", price: "$22" },
      { name: "Tuna Tartare", description: "Yellowfin tuna with avocado and citrus", price: "$19" }
    ],
    entrees: [
      { name: "Grilled Salmon", description: "Atlantic salmon with lemon herb butter and seasonal vegetables", price: "$32" },
      { name: "Ribeye Steak", description: "28-day aged ribeye with garlic mashed potatoes", price: "$48" },
      { name: "Lobster Thermidor", description: "Whole lobster with cognac cream sauce", price: "$52" },
      { name: "Seafood Paella", description: "Traditional Spanish rice with mixed seafood", price: "$38" },
      { name: "Lamb Rack", description: "Herb-crusted with rosemary jus and roasted vegetables", price: "$42" },
      { name: "Halibut", description: "Pan-roasted with wild mushroom risotto", price: "$36" }
    ],
    desserts: [
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with vanilla ice cream", price: "$12" },
      { name: "Crème Brûlée", description: "Classic vanilla custard with caramelized sugar", price: "$10" },
      { name: "Key Lime Pie", description: "Florida key lime with graham cracker crust", price: "$9" },
      { name: "Tiramisu", description: "Traditional Italian coffee-flavored dessert", price: "$11" }
    ]
  } as const;

  return (
    <section id="menu" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Our Menu</h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
            Discover our carefully crafted dishes featuring the finest ingredients and bold flavors
          </p>
        </motion.div>

        <Tabs defaultValue="appetizers" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="appetizers" className="text-lg">Appetizers</TabsTrigger>
            <TabsTrigger value="entrees" className="text-lg">Entrées</TabsTrigger>
            <TabsTrigger value="desserts" className="text-lg">Desserts</TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-start p-6 bg-white rounded-lg shadow-sm border border-charcoal/10"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-charcoal mb-2">{item.name}</h3>
                      <p className="text-charcoal/70">{item.description}</p>
                    </div>
                    <span className="text-xl font-bold text-red-600 ml-4">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-charcoal text-cream">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Founded in 1987 by Chef Marina Rodriguez, Harbor Grill began as a small family restaurant with a simple mission: to serve the freshest seafood and finest steaks in an atmosphere that feels like home.
              </p>
              <p>
                What started as a 20-seat establishment has grown into one of the city’s most beloved dining destinations, but we’ve never forgotten our roots. Every dish is still prepared with the same passion and attention to detail that Marina brought to her first kitchen.
              </p>
              <p>
                Today, under the guidance of her daughter Sofia, Harbor Grill continues to evolve while honoring the traditions that made us who we are. We source our seafood daily from local fishermen and age our steaks to perfection, ensuring every meal is an unforgettable experience.
              </p>
            </div>
            <div className="flex items-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">35+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">50k+</div>
                <div className="text-sm">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">15</div>
                <div className="text-sm">Awards Won</div>
              </div>
            </div>
          </motion.div>
          
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80"
                alt="Harbor Grill Restaurant Interior"
                width={1000}
                height={667}
                className="rounded-lg shadow-2xl"
                priority
              />
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-cream p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">Michelin Recommended</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact & Reservations</h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
            Ready to dine with us? Make a reservation or get in touch
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-charcoal">Make a Reservation</CardTitle>
                <CardDescription>Book your table for an unforgettable dining experience</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Guests</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      >
                        <option value="">Select guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Date</label>
                      <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Time</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Special Requests</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requests or dietary restrictions?"
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-cream">
                    Make Reservation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-charcoal flex items-center">
                  <Phone className="h-6 w-6 text-red-600 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="text-charcoal">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-red-600" />
                  <span className="text-charcoal">info@harborgrill.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="text-charcoal">123 Harbor Drive, Coastal City, CA 90210</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-charcoal flex items-center">
                  <Clock className="h-6 w-6 text-red-600 mr-2" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal">Monday - Thursday</span>
                  <span className="text-charcoal">5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal">Friday - Saturday</span>
                  <span className="text-charcoal">5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal">Sunday</span>
                  <span className="text-charcoal">4:00 PM - 9:00 PM</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-charcoal">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center text-charcoal">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-red-600" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Harbor Drive, Coastal City, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">Harbor Grill</span>
            </div>
            <p className="text-cream/80">
              Where culinary excellence meets coastal charm. Experience unforgettable dining.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-cream/80 hover:text-red-600 transition-colors">Home</a></li>
              <li><a href="#menu" className="text-cream/80 hover:text-red-600 transition-colors">Menu</a></li>
              <li><a href="#about" className="text-cream/80 hover:text-red-600 transition-colors">About</a></li>
              <li><a href="#contact" className="text-cream/80 hover:text-red-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-cream/80">
              <li>(555) 123-4567</li>
              <li>info@harborgrill.com</li>
              <li>123 Harbor Drive<br />Coastal City, CA 90210</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/80 hover:text-red-600 transition-colors">Facebook</a>
              <a href="#" className="text-cream/80 hover:text-red-600 transition-colors">Instagram</a>
              <a href="#" className="text-cream/80 hover:text-red-600 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
          <p>&copy; 2024 Harbor Grill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const HarborGrillWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HarborGrillWebsite;
