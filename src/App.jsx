import React, { useState, useEffect } from 'react';
import {
  Phone,
  ShieldCheck,
  MapPin,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Zap,
  Clock,
  ChevronDown,
  AlertCircle,
  Loader2,
  Award,
  Mail,
  Calendar,
  MessageSquare,
  User,
  Send,
  Star,
  ArrowLeft,
  Snowflake,
  Flame,
  Droplets,
  Wind
} from 'lucide-react';

// --- Configuration & Copy ---
const COMPANY = {
  name: "Solutions Electronics LLC",
  phone: "(609) 288-7665",
  email: "service@solutionselectronics.com",
  address: "55 West Hampton St, Pemberton, NJ 08068",
  hours: "Mon–Fri: 8:00 AM – 6:00 PM",
  weekendHours: "Sat–Sun: Closed (Emergency Dispatch Available)",
  serviceArea: "Cape May to New Brunswick, NJ",
  yearsInService: "20+",
  techCount: 4
};

const BRANDS = [
  { name: "Miele", domain: "miele.com", image: "/logos/miele.svg" },
  { name: "Thermador", domain: "thermador.com" },
  { name: "Gaggenau", domain: "gaggenau.com" },
  { name: "Electrolux", domain: "electrolux.com", image: "/logos/electrolux.svg" },
  { name: "Frigidaire", domain: "frigidaire.com", image: "/logos/frigidaire.svg" },
  { name: "Samsung", domain: "samsung.com", image: "/logos/samsung.svg" },
  { name: "LG", domain: "lg.com", image: "/logos/lg.svg" },
  { name: "Whirlpool", domain: "whirlpoolcorp.com", image: "/logos/whirlpool.svg" },
  { name: "Sub-Zero", domain: "subzero-wolf.com", image: "/logos/sub-zero.svg" },
  { name: "Liebherr", domain: "liebherr.com" },
  { name: "Viking", domain: "vikingrange.com", image: "/logos/viking.svg" },
  { name: "ZLINE", domain: "zlinekitchen.com" },
  { name: "Thor", domain: "thorkitchen.com" },
  { name: "Fisher & Paykel", domain: "fisherpaykel.com", image: "/logos/fisherpaykel.svg" },
  { name: "Bertazzoni", domain: "bertazzoni.com" },
  { name: "Dacor", domain: "dacor.com" },
  { name: "Summit", domain: "summitappliance.com" },
  { name: "Panasonic", domain: "panasonic.com", image: "/logos/panasonic.svg" },
  { name: "ILVE", domain: "ilveusa.com" },
  { name: "Sharp", domain: "sharpusa.com", image: "/logos/sharp.svg" }
];

const PARTNERS = [
  "New Leaf", "AIG", "EFG Home Services", "Guardsman", "Assurant", "American Service Plan"
];

const SERVICES = [
  { title: "Refrigeration", desc: "Sub-Zero, Viking, Liebherr, Whirlpool, Samsung, LG, and more." },
  { title: "Cooking Appliances", desc: "Ranges, ovens, cooktops (Thermador, Gaggenau, Bertazzoni)." },
  { title: "Dishwashers & Laundry", desc: "Miele, Bosch, Frigidaire, Electrolux, Samsung." },
  { title: "HVAC & Commercial Units", desc: "Authorized for multiple systems. Fast and reliable support for businesses." }
];

const TRIAGE_DATA = {
  "Refrigeration": {
    brands: ["Sub-Zero", "Viking", "Liebherr", "Whirlpool", "Samsung", "LG", "Thermador", "Miele", "Gaggenau"],
    symptoms: {
      "Not cooling at all": "A total lack of cooling often indicates a failed compressor, a significant sealed-system leak, or a faulty main control board.",
      "Leaking water": "Water leaks typically point to a clogged defrost drain, a cracked water inlet valve, or an ice maker assembly issue.",
      "Ice maker not working": "Ice maker failures are usually caused by a bad water inlet valve, a frozen fill tube, or a defective ice maker module.",
      "Strange/loud noises": "Unusual noises generally stem from a failing condenser fan motor, an obstructed evaporator fan, or a noisy compressor.",
      "Freezing food in fridge": "This is often due to a faulty thermistor, a stuck damper control assembly, or a malfunctioning temperature control board."
    }
  },
  "Cooking Appliances": {
    brands: ["Thermador", "Gaggenau", "Bertazzoni", "Viking", "ZLINE", "Thor", "Dacor", "ILVE", "Miele", "Samsung", "LG"],
    symptoms: {
      "Won't heat or ignite": "Failure to heat or ignite is commonly caused by a burnt-out bake element, a faulty igniter, or a defective control board.",
      "Temperature is inaccurate": "Inaccurate temperatures usually point to a failing oven sensor, a weak bake igniter, or a control board requiring calibration.",
      "Control panel unresponsive": "An unresponsive panel typically indicates a faulty membrane switch, a blown thermal fuse, or a damaged main control board.",
      "Door won't close/seal": "Door issues are almost always caused by worn hinges, a torn door seal, or a misaligned door frame."
    }
  },
  "Dishwashers": {
    brands: ["Miele", "Bosch", "Frigidaire", "Electrolux", "Samsung", "LG", "Whirlpool", "Thermador"],
    symptoms: {
      "Won't drain": "Drainage failures are usually caused by a clogged drain pump, a blocked garbage disposal connection, or a blocked filter.",
      "Dishes come out dirty": "Poor cleaning often results from a clogged wash arm, a failing circulation pump, or a defective water inlet valve.",
      "Leaking water": "Leaks are typically due to a torn door seal, a cracked wash arm assembly, or a faulty water inlet valve.",
      "Won't start / no power": "A failure to start is commonly related to a faulty door latch switch, a blown thermal fuse, or a defective control board."
    }
  },
  "Laundry": {
    brands: ["Miele", "Electrolux", "Samsung", "LG", "Whirlpool", "Frigidaire"],
    symptoms: {
      "Won't spin or drain (Washer)": "Spin and drain failures often point to a worn drive belt, a broken motor coupling, or a faulty lid switch/door lock.",
      "Not heating (Dryer)": "Lack of heat is typically caused by a blown thermal fuse, a burnt-out heating element, or a faulty gas valve coil.",
      "Leaking water (Washer)": "Leaks are usually due to a torn door boot seal, a cracked drain pump, or a loose internal hose.",
      "Violent shaking/noise": "Excessive shaking or noise almost always indicates worn shock absorbers, broken suspension springs, or failing tub bearings."
    }
  },
  "HVAC & Commercial": {
    brands: ["Carrier", "Trane", "Lennox", "Goodman", "Rheem", "Commercial Brand"],
    symptoms: {
      "No cold air": "A lack of cold air usually points to low refrigerant levels (a leak), a dirty condenser coil, or a failing capacitor.",
      "No heat": "Heating failures are commonly caused by a dirty flame sensor, a faulty igniter, or a broken sequencer.",
      "Thermostat unresponsive": "An unresponsive thermostat typically indicates dead batteries, a blown fuse on the control board, or faulty wiring.",
      "System leaking water": "Water leaks are almost always due to a clogged condensate drain line or a frozen evaporator coil."
    }
  }
};

// Combine brands to create a seamless infinite scroll
const MARQUEE_BRANDS = [...BRANDS, ...BRANDS];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [zipStatus, setZipStatus] = useState('idle');
  const [logoError, setLogoError] = useState(false);

  // Triage Widget State
  const [triageStep, setTriageStep] = useState(1);
  const [triageAppliance, setTriageAppliance] = useState('');
  const [triageBrand, setTriageBrand] = useState('');
  const [triageSymptom, setTriageSymptom] = useState('');

  // Quote Form State
  const [quoteService, setQuoteService] = useState('');
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Handle Scroll for Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const handleZipCheck = (e) => {
    e.preventDefault();
    if (zipCode.length < 5) return;
    setZipStatus('loading');
    setTimeout(() => {
      if (zipCode.startsWith('07') || zipCode.startsWith('08')) {
        setZipStatus('success');
      } else {
        setZipStatus('fail');
      }
    }, 1200);
  };

  const NavLink = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="relative text-sm font-bold tracking-widest uppercase hover:text-[#C5A059] transition-colors group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-full"></span>
    </a>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-[#C5A059] selection:text-[#111] bg-[#F9F8F6] text-[#111] scroll-smooth">

      {/* --- Global Styles for Animations --- */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- Emergency Sticky Header --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-4 group">
            {/* Logo Logic: Tries to load original, falls back to custom UI component if path fails */}
            {!logoError ? (
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <img
                  src="https://solutionselectronics.com/wp-content/uploads/2025/09/cropped-solutions-electronics-header-logo.png"
                  alt="Solutions Electronics"
                  className="h-8 md:h-10 object-contain transition-all"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#111] rounded flex items-center justify-center text-[#C5A059] shadow-lg group-hover:bg-[#C5A059] group-hover:text-[#111] transition-colors">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className={scrolled ? 'text-[#111]' : 'text-white'}>
                  <h1 className="text-xl font-black tracking-tighter leading-none italic uppercase">Solutions</h1>
                  <p className="text-[10px] tracking-[0.25em] font-medium uppercase opacity-80 mt-0.5">Electronics LLC</p>
                </div>
              </div>
            )}
          </a>

          <nav className={`hidden lg:flex items-center gap-8 ${scrolled ? 'text-[#111]' : 'text-white'}`}>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#warranty">Warranty</NavLink>
            <NavLink href="#quote">Quote</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY.phone}`} className="hidden md:flex items-center gap-2 bg-transparent text-[#C5A059] px-4 py-2.5 font-bold text-sm hover:text-white transition-all">
              <Phone size={16} /> {COMPANY.phone}
            </a>
            <a href="#quote" className="hidden lg:flex items-center gap-2 bg-[#C5A059] text-[#111] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-all shadow-lg hover:shadow-xl uppercase tracking-widest">
              Get a Free Quote
            </a>
            <button
              className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-[#111]' : 'text-white'} hover:bg-black/10`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Overlay --- */}
      <div className={`fixed inset-0 z-[60] bg-[#111] text-white flex flex-col p-8 transition-transform duration-500 lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-end mb-12">
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#C5A059] hover:text-white transition-colors">
            <X size={36} />
          </button>
        </div>
        <div className="flex flex-col gap-8 text-3xl font-serif italic">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C5A059] transition-colors">About Us</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C5A059] transition-colors">Our Services</a>
          <a href="#warranty" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C5A059] transition-colors">Warranty Plans</a>
          <a href="#quote" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C5A059] transition-colors">Get a Quote</a>
        </div>
        <div className="mt-auto border-t border-white/10 pt-8">
          <p className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-2">24/7 Dispatch</p>
          <a href={`tel:${COMPANY.phone}`} className="text-[#C5A059] text-4xl font-bold italic mb-4 block">{COMPANY.phone}</a>
          <p className="text-gray-400 text-sm mb-1">{COMPANY.hours}</p>
          <p className="text-gray-500 text-sm">{COMPANY.address}</p>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 overflow-hidden bg-[#111]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000"
            alt="High-end Kitchen"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/60 to-[#111]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
            <Award size={16} /> Factory-Authorized Service Center
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight italic">
            Appliance Protection <br/> <span className="text-[#C5A059]">You Can Trust.</span>
          </h2>

          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            New Jersey's local experts for premium kitchens and laundry. Serving families and businesses from <span className="text-white font-medium italic underline decoration-[#C5A059] underline-offset-8">Cape May to New Brunswick</span> for over {COMPANY.yearsInService} years.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#quote" className="w-full sm:w-auto bg-[#C5A059] text-[#111] px-8 py-4 md:px-10 md:py-5 rounded font-black text-sm md:text-base hover:bg-white hover:text-[#111] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group tracking-widest uppercase">
              Request a Free Quote <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`tel:${COMPANY.phone}`} className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-white hover:text-[#111] px-8 py-4 md:px-10 md:py-5 rounded font-bold text-sm md:text-base transition-all flex items-center justify-center gap-3 tracking-widest uppercase">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* --- Zip Code Check Bar --- */}
      <div className="relative z-20 -mt-24 container mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border-b-[6px] border-[#C5A059]">
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-3xl font-serif mb-2 text-[#111] italic">Check Your Neighborhood</h4>
            <p className="text-gray-500 font-medium">Confirm your eligibility for priority routing today.</p>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" size={20} />
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  className="w-full bg-[#F9F8F6] border border-gray-200 rounded-xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all outline-none font-bold text-lg"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                  maxLength={5}
                />
              </div>
              <button
                disabled={zipCode.length < 5 || zipStatus === 'loading'}
                className="bg-[#111] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold hover:bg-[#C5A059] hover:text-[#111] transition-all flex items-center justify-center min-w-[160px]"
              >
                {zipStatus === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'VERIFY AREA'}
              </button>
            </form>
            {/* Status Messages */}
            <div className="mt-4 text-center sm:text-left min-h-[40px]">
              {zipStatus === 'success' && (
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-green-700 font-bold flex items-center gap-2 text-sm">
                    <CheckCircle2 size={18} /> Excellent! Technicians are available in your area.
                  </p>
                  <a href="#quote" className="bg-green-700 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-green-800 transition-colors shadow-md flex items-center gap-2">
                    Get Your Quote <ChevronRight size={14} />
                  </a>
                </div>
              )}
              {zipStatus === 'fail' && (
                <p className="text-amber-600 font-bold flex items-center justify-center sm:justify-start gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle size={18} /> You are outside our primary zone, but contact us to verify.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Interactive Triage Widget --- */}
      <section id="triage" className="py-20 bg-[#F9F8F6]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Widget Header */}
            <div className="bg-[#111] p-6 md:p-8 text-white text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
              <h3 className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-xs mb-3">Interactive Triage</h3>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight italic">Diagnose Your Appliance</h2>

              {/* Progress Bar */}
              <div className="mt-8 flex items-center justify-center gap-2 max-w-md mx-auto">
                {[1, 2, 3, 4].map((stepIdx) => (
                  <div key={stepIdx} className="flex-1 h-2 rounded-full transition-all duration-500" style={{ backgroundColor: triageStep >= stepIdx ? '#C5A059' : 'rgba(255,255,255,0.1)' }}></div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 font-medium uppercase tracking-widest">
                {triageStep === 1 && "Step 1: Appliance Type"}
                {triageStep === 2 && "Step 2: Brand Selection"}
                {triageStep === 3 && "Step 3: Primary Symptom"}
                {triageStep === 4 && "Diagnostic Result"}
              </p>
            </div>

            {/* Widget Body */}
            <div className="p-8 md:p-12 min-h-[350px] flex flex-col justify-center">

              {/* Step 1: Appliance */}
              {triageStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h4 className="text-xl font-bold mb-6 text-center text-[#111]">What appliance is acting up?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(TRIAGE_DATA).map((appliance) => (
                      <button
                        key={appliance}
                        onClick={() => { setTriageAppliance(appliance); setTriageStep(2); }}
                        className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C5A059] p-6 rounded-xl text-center hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3"
                      >
                        {appliance === "Refrigeration" && <Snowflake size={28} className="text-[#C5A059] group-hover:scale-110 transition-transform" />}
                        {appliance === "Cooking Appliances" && <Flame size={28} className="text-[#C5A059] group-hover:scale-110 transition-transform" />}
                        {appliance === "Dishwashers" && <Droplets size={28} className="text-[#C5A059] group-hover:scale-110 transition-transform" />}
                        {appliance === "Laundry" && <Wrench size={28} className="text-[#C5A059] group-hover:scale-110 transition-transform" />}
                        {appliance === "HVAC & Commercial" && <Wind size={28} className="text-[#C5A059] group-hover:scale-110 transition-transform" />}
                        <span className="font-bold text-sm text-[#111]">{appliance}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Brand */}
              {triageStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <button onClick={() => setTriageStep(1)} className="text-sm text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-6 hover:text-[#C5A059] transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <h4 className="text-xl font-bold mb-6 text-center text-[#111]">What brand is your {triageAppliance.toLowerCase()}?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TRIAGE_DATA[triageAppliance].brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => { setTriageBrand(brand); setTriageStep(3); }}
                        className="bg-white border border-gray-200 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white p-4 rounded-xl text-center transition-all font-bold text-sm text-[#111] shadow-sm"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Symptom */}
              {triageStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <button onClick={() => setTriageStep(2)} className="text-sm text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-6 hover:text-[#C5A059] transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <h4 className="text-xl font-bold mb-6 text-center text-[#111]">What is the primary symptom?</h4>
                  <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                    {Object.keys(TRIAGE_DATA[triageAppliance].symptoms).map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => { setTriageSymptom(symptom); setTriageStep(4); }}
                        className="bg-white border border-gray-200 hover:border-[#C5A059] p-5 rounded-xl text-left transition-all font-bold text-[#111] shadow-sm flex items-center justify-between group"
                      >
                        {symptom}
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Result */}
              {triageStep === 4 && (
                <div className="animate-in fade-in slide-in-from-right-4 max-w-3xl mx-auto text-center">
                  <div className="w-16 h-16 bg-[#C5A059]/10 text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-black italic mb-4 text-[#111]">Diagnostic complete.</h4>

                  <div className="bg-[#F9F8F6] p-6 md:p-8 rounded-2xl border border-gray-200 mb-8 text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059]"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      A <span className="font-bold text-[#111]">{triageSymptom.toLowerCase()}</span> issue with a <span className="font-bold text-[#111]">{triageBrand}</span> {triageAppliance.toLowerCase()} is something we see frequently.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                      {TRIAGE_DATA[triageAppliance].symptoms[triageSymptom]}
                    </p>
                    <p className="text-sm font-bold text-gray-500 italic mt-6 pt-4 border-t border-gray-200">
                      * Because we are factory-authorized for {triageBrand}, our EPA-certified technicians carry the proper OEM parts and diagnostic tools to fix this efficiently.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setQuoteService('repair');
                        setQuoteDetails(`Diagnosed via Triage Widget:\nAppliance: ${triageAppliance}\nBrand: ${triageBrand}\nSymptom: ${triageSymptom}`);
                        document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto bg-[#111] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#111] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Request Exact Quote <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={() => setTriageStep(1)}
                      className="text-sm text-gray-500 font-bold uppercase tracking-widest hover:text-[#111] transition-colors px-6 py-4"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Authorized Brands Ticker --- */}
      <section className="pt-10 pb-10 bg-[#F9F8F6] overflow-hidden">
        <div className="container mx-auto px-6 mb-10 text-center">
          <p className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-xs mb-3">Manufacturer Authorized</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#111] italic">Trusted By The Best</h2>
        </div>
        <div className="relative w-full flex overflow-hidden bg-white py-8 border-y border-gray-100">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee items-center">
            {MARQUEE_BRANDS.map((brand, idx) => (
              <div key={idx} className="flex items-center justify-center px-10 border-r border-gray-100 last:border-r-0 h-20">
                <img
                  src={brand.image || `https://logo.clearbit.com/${brand.domain}?size=200`}
                  alt={brand.name}
                  className="h-10 md:h-12 object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onLoad={(e) => {
                    e.target.nextSibling.style.display = 'none';
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-xl md:text-3xl font-bold text-gray-300 hover:text-[#C5A059] transition-colors cursor-default whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Warranty Plans & Partners --- */}
      <section id="warranty" className="py-24 bg-[#F9F8F6]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-xs mb-6">Financial Protection</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#111] italic">Real Coverage for Real Life</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Plans designed around the failures we see most in New Jersey homes. Save thousands versus paying out-of-pocket for premium appliance repairs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-16">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
              <div className="bg-[#111] p-6 md:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h4 className="font-bold uppercase tracking-widest text-sm italic">Potential Out-of-Pocket Scenarios</h4>
                <div className="px-4 py-1.5 bg-[#C5A059] rounded-full text-[10px] font-black tracking-widest text-[#111]">ESTIMATED COSTS</div>
              </div>
              <div className="p-2 md:p-8 flex-1 overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-gray-100 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                      <th className="pb-4 pl-4">Common Failure</th>
                      <th className="pb-4">Standard Repair</th>
                      <th className="pb-4 text-[#C5A059]">With Protection</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { item: "Premium Refrigerator Sealed-System", cost: "$800 – $1,800" },
                      { item: "High-End Wall Oven Control Board", cost: "$450 – $900" },
                      { item: "Front-Load Washer Bearings & Seal", cost: "$400 – $750" },
                      { item: "Ice Maker Assembly + Labor", cost: "$250 – $500" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#F9F8F6] transition-colors">
                        <td className="py-6 pl-4 font-bold text-gray-800 text-sm md:text-base">{row.item}</td>
                        <td className="py-6 text-gray-500 font-mono text-sm">{row.cost}</td>
                        <td className="py-6 text-[#C5A059] font-black italic flex items-center gap-2">
                          <CheckCircle2 size={16} /> Covered
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#C5A059] rounded-2xl p-8 md:p-10 flex flex-col justify-center text-[#111] relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 opacity-10">
                <ShieldCheck size={200} />
              </div>
              <h4 className="text-3xl font-serif mb-6 relative z-10 leading-tight italic">Protect Your Investment</h4>
              <p className="mb-8 font-medium leading-relaxed relative z-10 text-[#111]/80">
                Flexible options for kitchens, laundry, and whole-home packages.
              </p>
              <ul className="space-y-4 mb-10 relative z-10">
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 size={20} className="shrink-0" /> Immediate Quote Process</li>
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 size={20} className="shrink-0" /> Simple Eligibility Check</li>
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 size={20} className="shrink-0" /> Zero Deductible Options</li>
              </ul>
              <a href="#quote" className="mt-auto w-full bg-[#111] text-white py-5 rounded-xl font-black text-sm hover:bg-white hover:text-[#111] transition-all relative z-10 shadow-lg uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2">
                Get a Warranty Quote <ChevronRight size={18} />
              </a>
            </div>
          </div>

          {/* Third-Party Warranty Partners */}
          <div className="max-w-5xl mx-auto text-center border-t border-gray-200 pt-16">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Trusted Third-Party Warranty Partners</h4>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {PARTNERS.map((partner, idx) => (
                <span key={idx} className="text-lg md:text-xl font-black text-gray-300 italic uppercase">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact & Forms --- */}
      <section id="quote" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            {/* Contact Information & Trust Signals */}
            <div>
              <h3 className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-xs mb-4">Fast & Accurate Estimates</h3>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight italic text-[#111]">Request Your Free Quote</h2>
              <p className="text-gray-500 mb-10 font-light text-lg">
                Fill out the details below and our dispatch team will provide a customized quote or warranty estimate within 15 minutes.
              </p>

              {/* Social Proof Injection */}
              <div className="bg-[#F9F8F6] p-6 rounded-xl border border-gray-100 mb-10 shadow-sm relative">
                <div className="absolute -top-3 -left-3 bg-[#C5A059] text-[#111] p-2 rounded-full shadow-md">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="flex items-center gap-1 mb-2 text-[#C5A059]">
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">
                  "Solutions Electronics had my Sub-Zero fixed the same day I called. The quote was completely transparent and the technician was incredibly professional. Highly recommend."
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#111]">— Michael T., Princeton NJ</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F9F8F6] text-[#C5A059] rounded-lg"><Phone size={20} /></div>
                  <div>
                    <p className="font-bold text-gray-400 text-[10px] tracking-widest uppercase mb-1">Direct Line</p>
                    <a href={`tel:${COMPANY.phone}`} className="text-lg font-black italic hover:text-[#C5A059] transition-colors">{COMPANY.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F9F8F6] text-[#C5A059] rounded-lg"><Calendar size={20} /></div>
                  <div>
                    <p className="font-bold text-gray-400 text-[10px] tracking-widest uppercase mb-1">Dispatch Hours</p>
                    <p className="font-medium text-[#111] text-sm">{COMPANY.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Funnel Form */}
            <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#C5A059]/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

              <h3 className="text-white text-2xl font-serif italic mb-6">Get Your Estimate</h3>

              <form onSubmit={(e) => { e.preventDefault(); alert("Quote Request Submitted!"); }} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">What do you need help with?</label>
                  <select
                    value={quoteService}
                    onChange={(e) => setQuoteService(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="repair" className="text-[#111]">Appliance Repair</option>
                    <option value="warranty" className="text-[#111]">New Warranty Plan</option>
                    <option value="maintenance" className="text-[#111]">Routine Maintenance</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(555) 555-5555"
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Appliance Brand / Issue details</label>
                  <textarea
                    rows="3"
                    placeholder="e.g. My Sub-Zero refrigerator isn't cooling properly..."
                    value={quoteDetails}
                    onChange={(e) => setQuoteDetails(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-600"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-[#C5A059] text-[#111] py-4 rounded-xl font-black tracking-[0.2em] uppercase hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg mt-2">
                  Get My Quote <ChevronRight size={18} />
                </button>

                <p className="text-center text-gray-500 text-[10px] uppercase tracking-widest mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck size={12} /> Your information is secure and confidential
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#111] text-white pt-24 pb-8 border-t-[8px] border-[#C5A059]">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
            <div className="flex items-center gap-5">
              {!logoError ? (
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://solutionselectronics.com/wp-content/uploads/2025/09/cropped-solutions-electronics-header-logo.png"
                    alt="Solutions Electronics"
                    className="h-8 md:h-10 object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/20 shadow-xl">
                    <Zap size={32} fill="currentColor" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black tracking-tighter leading-none italic uppercase">Solutions</h1>
                    <p className="text-[11px] tracking-[0.3em] font-medium text-[#C5A059] uppercase mt-1">Electronics LLC</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10 text-sm font-bold tracking-widest uppercase text-gray-400">
              <a href="#about" className="hover:text-white hover:underline underline-offset-4 decoration-[#C5A059] transition-all">About</a>
              <a href="#services" className="hover:text-white hover:underline underline-offset-4 decoration-[#C5A059] transition-all">Services</a>
              <a href="#warranty" className="hover:text-white hover:underline underline-offset-4 decoration-[#C5A059] transition-all">Warranty</a>
              <a href="#quote" className="hover:text-white hover:underline underline-offset-4 decoration-[#C5A059] transition-all">Quote</a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-y border-white/10 py-16">
            <div>
              <h5 className="text-[#C5A059] font-black uppercase tracking-[0.2em] text-xs mb-6">Contact Info</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3"><MapPin size={18} className="text-[#C5A059] shrink-0 mt-0.5" /> {COMPANY.address}</li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-[#C5A059] shrink-0" /> {COMPANY.phone}</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-[#C5A059] shrink-0" /> {COMPANY.email}</li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#C5A059] font-black uppercase tracking-[0.2em] text-xs mb-6">Hours</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3"><Clock size={18} className="text-[#C5A059] shrink-0 mt-0.5" /> <span dangerouslySetInnerHTML={{ __html: COMPANY.hours.replace(': ', ':<br/>') }} /></li>
                <li className="flex items-start gap-3 opacity-60"><Calendar size={18} className="shrink-0 mt-0.5" /> <span dangerouslySetInnerHTML={{ __html: COMPANY.weekendHours.replace(': ', ':<br/>') }} /></li>
              </ul>
            </div>
            <div className="lg:col-span-2 lg:pl-10">
              <h5 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#C5A059] inline-block"></span>
                Our Commitment
              </h5>
              <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base italic">
                "Solutions Electronics has served New Jersey families for more than two decades. Our team of expert technicians provides fast, reliable, and factory-approved service. We are proud to be the trusted choice for the state's most sophisticated kitchens."
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Solutions Electronics LLC. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="hidden sm:inline text-gray-800">|</span>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile Only) */}
      <a
        href={`tel:${COMPANY.phone}`}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-[#C5A059] text-[#111] rounded-full shadow-2xl flex items-center justify-center z-50 animate-bounce-slow border-4 border-white transition-transform hover:scale-110"
        aria-label="Call Now"
      >
        <Phone size={24} fill="currentColor" />
      </a>

    </div>
  );
};

export default App;
