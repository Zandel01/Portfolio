/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Twitter, Instagram, Menu, X } from 'lucide-react';

const ROLES = ["i'm a student", "i luv color blue", "i luv watching anime"];

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setDisplayText((prev) => 
          isDeleting 
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative font-sans text-white">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fire-sparks-and-embers-in-the-dark-40018-large.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Texture Layer (Additive) */}
      <div className="fixed inset-0 bg-smoke pointer-events-none z-[1] opacity-30" />
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-16 lg:px-24">
        <div className="text-xl md:text-2xl font-bold tracking-tight text-brand-red">
          Alex
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {['Home', 'Services', 'Skills', 'Education', 'Experience', 'Contact'].map((item, i) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium tracking-wide transition-all ${i === 0 ? 'text-brand-red border-b border-brand-red pb-1' : 'text-zinc-400 hover:text-white'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-zinc-400 hover:text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button 
              className="absolute top-8 right-6 text-zinc-400 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {['Home', 'Services', 'Skills', 'Education', 'Experience', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold tracking-tight text-white hover:text-brand-red transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main id="home" className="relative z-10 w-full min-h-screen flex items-center pt-32 pb-20 lg:pt-0 lg:pb-0 px-6 md:px-16 lg:px-24 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
          
          {/* Portrait Container */}
          <div className="relative group flex-shrink-0 lg:w-[45%] flex justify-center lg:justify-start">
            {/* The Red Moon/Circle behind */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-red-600 rounded-full blur-[40px] md:blur-[80px] opacity-20 mix-blend-screen"
            />
            
            {/* The Portrait Circular Mask */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] border border-white/5 shadow-[0_0_100px_rgba(218,47,47,0.15)] overflow-hidden bg-zinc-950 rounded-full aspect-square"
            >
              <div 
                className="w-full h-full bg-cover bg-center grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 transform lg:group-hover:scale-105"
                style={{ 
                   backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=600&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80" />
            </motion.div>
          </div>

          {/* Text/Content Area */}
          <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left max-w-xl lg:pl-10">
            <div className="space-y-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white"
              >
                Hi, It's <span className="text-white">Alex</span>
              </motion.h2>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
              >
                I'm a <span className="text-brand-red"> {displayText}</span>
                <span className="inline-block w-[2px] h-[0.8em] bg-zinc-600 ml-2 align-middle animate-pulse" />
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed font-normal max-w-lg mx-auto lg:mx-0"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-red/15 border-l-4 border-brand-red text-zinc-200 shadow-[0_0_20px_rgba(218,47,47,0.1)] rounded-r-sm">
                this btvted- elext 3c
              </span>
            </motion.p>


            {/* Social Icons row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 pt-2"
            >
              {[Linkedin, Github, Twitter, Instagram].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-brand-red hover:border-brand-red/50 transition-all hover:bg-brand-red/5"
                >
                  <Icon size={18} className="md:w-5 md:h-5" />
                </a>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-4 lg:pt-8"
            >
              <button className="w-full sm:w-auto px-10 py-4 bg-transparent border border-zinc-800 text-zinc-200 font-bold rounded-full hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-300 text-sm tracking-widest active:scale-95 uppercase">
                Hire me
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <h2 className="text-brand-red uppercase tracking-[0.3em] text-sm font-bold">Services</h2>
            <h3 className="text-3xl md:text-5xl font-bold">What I Do Best</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Web Design', desc: 'Crafting pixel-perfect, visually stunning interfaces.' },
              { title: 'Development', desc: 'Building responsive, high-performance web applications.' },
              { title: 'AI Integration', desc: 'Implementing smart features and LLM solutions.' }
            ].map((service, i) => (
              <div key={i} className="group p-8 border border-zinc-900 bg-black/40 rounded-2xl hover:border-brand-red/30 transition-all duration-500">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg mb-6 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-zinc-500 leading-relaxed text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-brand-red uppercase tracking-[0.3em] text-sm font-bold">My Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">Elevating Experiences Through Code</h3>
            <p className="text-zinc-400 max-w-md">
              Specialized in modern web technologies and user-centric design principles to build products that stand out.
            </p>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            {['React', 'TypeScript', 'Tailwind', 'Motion', 'Node.js', 'Firebase'].map((skill, i) => (
              <div key={i} className="flex items-center gap-4 p-5 border border-zinc-900 rounded-xl hover:bg-zinc-900/50 transition-colors">
                <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span className="font-medium text-zinc-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <h2 className="text-brand-red uppercase tracking-[0.3em] text-sm font-bold">Timeline</h2>
            <h3 className="text-3xl md:text-5xl font-bold">Experience & Education</h3>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { year: '2024 - Present', role: 'Full Stack Student', org: 'Tech University' },
              { year: '2023 - 2024', role: 'UI/UX Designer', org: 'Freelance' },
              { year: '2022 - 2023', role: 'Frontend Intern', org: 'Creative Agency' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 p-8 border border-zinc-900 rounded-2xl group hover:border-zinc-700 transition-all">
                <div className="text-brand-red font-mono text-sm uppercase tracking-wider md:w-32">{item.year}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold group-hover:text-brand-red transition-colors">{item.role}</h4>
                  <p className="text-zinc-500 font-medium text-sm">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="relative z-10 py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-bold tracking-tight text-brand-red">Alex</div>
          <div className="text-zinc-600 text-sm">© 2026 Alex. Build for performance.</div>
          <div className="flex gap-6">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-zinc-600 hover:text-white transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Vertical Decorative Branding */}
      <div className="fixed right-6 bottom-12 vertical-text text-[9px] tracking-[0.6em] font-mono text-zinc-800 uppercase pointer-events-none select-none z-20 hidden md:block">
        Personal Narrative // 2026
      </div>
    </div>
  );
}
