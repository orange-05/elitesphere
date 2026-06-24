import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Award, 
  Globe, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  Rocket, 
  Building, 
  HeartPulse, 
  ShoppingBag, 
  Utensils, 
  Shield, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  Upload, 
  Download, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash, 
  Menu, 
  X, 
  MessageSquare, 
  Star, 
  Compass, 
  Zap, 
  FileText, 
  Check, 
  ExternalLink,
  Instagram,
  Linkedin
} from "lucide-react";

// Components & Data
import ClientPortal from "./components/ClientPortal";
import BlogSection from "./components/BlogSection";
import { ElitesphereLogo } from "./components/ElitesphereLogo";
import { SERVICES_DATA, INDUSTRIES_DATA } from "./data/servicesData";
import { addInquiry } from "./utils/storage";

export default function App() {
  // Navigation Section Selector (Virtual Navigation Router)
  const [currentPage, setCurrentPage] = useState<
    "home" | "about" | "services" | "industries" | "insights" | "founder" | "contact" | "portal"
  >("home");

  // Mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll position to activate sticky shadow
  const [scrolled, setScrolled] = useState(false);

  // Interactive selected Service Detail ID (Modal/Section helper)
  const [activeServiceId, setActiveServiceId] = useState<string>("digital-marketing");
  
  // Interactive selected Industry Detail ID
  const [activeIndustryId, setActiveIndustryId] = useState<string>("educational-institutions");

  // Active step highlighter in Section 5 Process
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  // Floating WhatsApp Simulation menu
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState("");

  // Contact Form Inputs
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceInterestedIn, setServiceInterestedIn] = useState("Digital Marketing");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const processSteps = [
    { number: "01", title: "Discover", desc: "Formulate baseline parameters, gather institutional historical logs, perform audience surveys, and execute competitive peer metrics analysis." },
    { number: "02", title: "Strategize", desc: "Construct primary brand claims, develop structured channels targeting student pipeline funnels, or design custom CRM schemas." },
    { number: "03", title: "Execute", desc: "Develop clean high-converting websites, roll out advertising models, launch target campaigns, and produce elite graphic systems." },
    { number: "04", title: "Optimize", desc: "Routinely evaluate live student retention, track campaign CPC coordinates, run digital content audits, and deploy search improvements." },
    { number: "05", title: "Grow", desc: "Realize predictable scaling matrices, unlock subsequent service extensions, and establish long-term advisory SLA structures." }
  ];

  // Monitor Scroll for Sticky Nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to page utility with auto scroll to top
  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!fullName || !emailAddress || !message) {
      setFormError("Requested fields [Full Name, Email Address, and Message] are critical.");
      return;
    }

    addInquiry({
      fullName: fullName.trim(),
      companyName: companyName.trim() ||"N/A",
      emailAddress: emailAddress.trim(),
      phoneNumber: phoneNumber.trim() || "N/A",
      serviceInterestedIn,
      message: message.trim()
    });

    setFormSuccess(true);
    // Clear form inputs
    setFullName("");
    setCompanyName("");
    setEmailAddress("");
    setPhoneNumber("");
    setMessage("");

    // Scroll to success message elegantly
    const el = document.getElementById("contact-feedback");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Quick Action: Book consultation helper
  const handleBookClick = () => {
    navigateTo("contact");
    setServiceInterestedIn("Business Consulting & Growth Advisory");
  };

  // Utility to locate service icons based on string names
  const getServiceIconComponent = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "Award":
        return <Award className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Briefcase":
        return <Briefcase className={className} />;
      case "BookOpen":
        return <BookOpen className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  // Utility to locate industry icons based on string names
  const getIndustryIconComponent = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className={className} />;
      case "Rocket":
        return <Rocket className={className} />;
      case "Building":
        return <Building className={className} />;
      case "HeartPulse":
        return <HeartPulse className={className} />;
      case "ShoppingBag":
        return <ShoppingBag className={className} />;
      case "Utensils":
        return <Utensils className={className} />;
      case "Shield":
        return <Shield className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-white">
      
      {/* 1. TOP SECURE PRE-HEADER STRIP */}
      <div className="bg-[#071A3D] text-white py-2 px-4 border-b border-[#D4A038]/20 select-none text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Mail className="w-3.5 h-3.5 text-[#D4A038]" /> info@elitesphereconsultancy.com
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#D4A038]" /> 
              <a href="tel:+919482537335" className="hover:text-[#D4A038] transition-colors">+91 94825 37335</a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo("portal")}
              className="flex items-center gap-1 bg-[#D4A038] text-[#071A3D] font-bold px-2 py-0.5 rounded text-[10px] uppercase hover:bg-white transition-colors"
            >
              <Lock className="w-2.5 h-2.5" /> Client Portal Login
            </button>
            <span className="text-[#D4A038]/50">|</span>
            <span className="text-gray-400 font-mono">ESTD 2026</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY HEADER & NAVBAR */}
      <header 
        id="navbar-sticky"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur shadow-md py-3.5 border-b border-gray-200" 
            : "bg-white py-5"
        }`}
      >
        <div 
          className="max-w-7xl mx-auto px-4 flex items-center justify-between font-bold italic"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          
          {/* Logo Brand Frame */}
          <button 
            onClick={() => navigateTo("home")} 
            className="flex items-center gap-2 group text-left"
          >
            <ElitesphereLogo className="w-11 h-11" />
            <div>
              <span className="font-extrabold text-lg tracking-wider text-[#071A3D] block leading-none">
                ELITESPHERE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-gray-500 block mt-1">
                CONSULTANCY
              </span>
            </div>
          </button>

          {/* Large Desktop Link Matrix */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
            <button 
              onClick={() => navigateTo("home")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "home" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("about")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "about" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              About Us
            </button>
            <button 
              onClick={() => navigateTo("services")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "services" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Services
            </button>
            <button 
              onClick={() => navigateTo("industries")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "industries" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Industries
            </button>
            <button 
              onClick={() => navigateTo("insights")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "insights" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Insights
            </button>
            <button 
              onClick={() => navigateTo("founder")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "founder" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Founder's Message
            </button>
            <button 
              onClick={() => navigateTo("contact")}
              className={`hover:text-[#D4A038] transition-colors ${currentPage === "contact" ? "text-[#D4A038] border-b-2 border-[#D4A038] pb-1" : "text-gray-700"}`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Header Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleBookClick}
              className="bg-[#071A3D] text-white hover:bg-[#D4A038] hover:text-[#071A3D] px-4.5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow border border-transparent hover:border-[#071A3D]"
            >
              Book a Consultation
            </button>
          </div>

          {/* Hamburger control for responsive mobile view */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown menu list */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 shadow-xl space-y-3 font-semibold text-sm">
            <button 
              onClick={() => navigateTo("home")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "home" ? "text-[#D4A038]" : ""}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("about")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "about" ? "text-[#D4A038]" : ""}`}
            >
              About Us
            </button>
            <button 
              onClick={() => navigateTo("services")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "services" ? "text-[#D4A038]" : ""}`}
            >
              Services
            </button>
            <button 
              onClick={() => navigateTo("industries")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "industries" ? "text-[#D4A038]" : ""}`}
            >
              Industries We Serve
            </button>
            <button 
              onClick={() => navigateTo("insights")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "insights" ? "text-[#D4A038]" : ""}`}
            >
              Insights (Blog)
            </button>
            <button 
              onClick={() => navigateTo("founder")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "founder" ? "text-[#D4A038]" : ""}`}
            >
              Founder's Message
            </button>
            <button 
              onClick={() => navigateTo("contact")}
              className={`block w-full text-left py-2 border-b border-gray-50 uppercase tracking-wider ${currentPage === "contact" ? "text-[#D4A038]" : ""}`}
            >
              Contact Us
            </button>
            <button 
              onClick={() => navigateTo("portal")}
              className={`block w-full text-left py-2 uppercase tracking-wider text-[#D4A038]`}
            >
              🔐 Secure Portal Workspace
            </button>
            
            <button
              onClick={handleBookClick}
              className="w-full bg-[#071A3D] text-white py-3 rounded text-center uppercase text-xs tracking-wider font-bold block"
            >
              Book a Consultation
            </button>
          </div>
        )}
      </header>

      {/* 3. VIRTUAL PAGE CONTENT INJECTOR */}
      <main className="flex-grow">
        
        {/* ==========================================
           PAGE: HOME VIEW 
           ========================================== */}
        {currentPage === "home" && (
          <div>
            {/* Section 1 - Hero Banner */}
            <section className="relative bg-[#071A3D] text-white py-20 lg:py-32 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay abstract tech map pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Decorative side spotlight blur */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4A038]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Tagline */}
                  <div className="inline-flex items-center gap-2 bg-[#D4A038]/10 text-[#D4A038] px-3.5 py-1.5 rounded-full border border-[#D4A038]/25 text-xs font-mono uppercase tracking-widest leading-none">
                    <Star className="w-3.5 h-3.5 fill-[#D4A038]" /> Built for Growth. Designed for Excellence.
                  </div>

                  <h1 className="text-4xl lg:text-6xl font-heading font-black tracking-tight leading-tight">
                    Helping Businesses <br />
                    <span className="text-[#D4A038] select-none">Grow Beyond</span> <br />
                    Boundaries
                  </h1>

                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed font-light max-w-xl">
                    Elitesphere Consultancy delivers strategic consulting, digital marketing, branding, and technology solutions that help organizations achieve sustainable growth.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={handleBookClick}
                      className="bg-[#D4A038] text-[#071A3D] hover:bg-white hover:text-[#071A3D] font-bold py-3.5 px-8 rounded text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-1.5"
                    >
                      Book a Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => navigateTo("services")}
                      className="bg-transparent text-white border border-gray-400 hover:border-[#D4A038] hover:text-[#D4A038] font-bold py-3.5 px-8 rounded text-xs uppercase tracking-wider transition-all duration-300"
                    >
                      Explore Services
                    </button>
                  </div>
                </motion.div>

                {/* Simulated Corporate Hero Device Layout */}
                <motion.div 
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-[#D4A038] rounded-2xl blur-xl opacity-15" />
                  
                  <div className="relative bg-[#0b224e] rounded-xl border border-[#D4A038]/30 shadow-2xl overflow-hidden p-6 text-left">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-gray-400 text-[10px] font-mono font-medium">ELITESPHERE SECURE PORTAL</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">Target Academic Client:</span>
                        <span className="text-[#D4A038] font-semibold">Apex International Group</span>
                      </div>
                      
                      <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[#D4A038] text-[10px] font-bold uppercase tracking-wider">Admissions Growth Funnel</span>
                          <span className="text-white font-mono text-[10px]">68% Processed</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="w-[68%] h-full bg-[#D4A038] rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-green-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Brand Identity Guidelines Audit Completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Clock className="w-4 h-4 text-[#D4A038] shrink-0 animate-pulse" />
                          <span>Setup High-Conversion Landing Engine (In Progress)</span>
                        </div>
                      </div>

                      {/* Interactive Button */}
                      <button 
                        onClick={() => navigateTo("portal")}
                        className="w-full bg-slate-900 hover:bg-[#D4A038] text-white hover:text-[#071A3D] border border-[#D4A038]/30 font-bold py-2 px-4 rounded text-[10px] uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        Launch Live Client Workspace Demo <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Section 2 – About Elitesphere */}
            <section className="py-20 px-4 bg-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Left Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="lg:col-span-5 relative"
                >
                  <div className="absolute top-4 left-4 w-full h-full bg-[#071A3D] rounded-lg -z-10" />
                  <div className="bg-[#F5F7FA] border-2 border-[#D4A038] p-8 rounded-lg relative overflow-hidden">
                    <span className="text-xs font-mono font-bold text-[#D4A038] uppercase tracking-widest block mb-1">
                      Who We Represent
                    </span>
                    <h3 className="text-2xl font-heading font-black text-[#071A3D] leading-tight mb-4 uppercase">
                      Sustainable Growth, Decided Strategically.
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">
                      We avoid the standard marketing agency format. Instead, we are dedicated growth experts constructing tailored, high-fidelity operations platforms, solid brand assets, and conversions.
                    </p>
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="border-t border-gray-200 pt-4 flex gap-6 mt-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <span className="font-heading font-black text-3xl text-[#071A3D] block">94%</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Client Retention</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                      >
                        <span className="font-heading font-black text-3xl text-[#071A3D] block">15M+</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-bold">Ad impressions</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="lg:col-span-7 space-y-6"
                >
                  <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                    FOUNDED EXCELLENCE
                  </span>
                  
                  <h2 className="text-3xl font-heading font-black text-[#071A3D] uppercase tracking-wide">
                    Your Trusted Growth Partner
                  </h2>

                  <div className="text-gray-600 text-xs sm:text-sm space-y-4 leading-relaxed font-light">
                    <p>
                      Elitesphere Consultancy is a growth-focused consulting firm dedicated to helping businesses, startups, and educational institutions achieve their goals through innovative strategies and practical solutions.
                    </p>
                    <p className="font-semibold text-gray-800">
                      We believe growth is built through strategic planning, effective execution, and continuous improvement.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => navigateTo("about")}
                      className="bg-[#071A3D] text-white hover:bg-[#D4A038] hover:text-[#071A3D] text-xs font-bold uppercase tracking-wider py-3 px-6 rounded transition-all duration-300"
                    >
                      Our Company Profile
                    </button>
                  </div>
                </motion.div>

              </div>
            </section>

            {/* Section 3 – Services Overview */}
            <section className="py-20 px-4 bg-[#F5F7FA] border-y border-gray-200">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-2xl mx-auto mb-16 space-y-2"
                >
                  <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                    Core Services Matrix
                  </span>
                  <h2 className="text-3xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                    Our Specialized Offerings
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Select a service vertical to learn how we execute growth initiatives across business sectors.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES_DATA.map((service, index) => (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Icon Slot */}
                        <div className="w-12 h-12 bg-[#071A3D]/5 text-[#071A3D] rounded border border-slate-200 flex items-center justify-center mb-5">
                          {getServiceIconComponent(service.iconName, "w-6 h-6 text-[#D4A038]")}
                        </div>

                        <h3 className="text-lg font-heading font-bold text-[#071A3D] uppercase tracking-wide mb-2">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 text-xs leading-relaxed mb-4">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <button 
                          onClick={() => {
                            setActiveServiceId(service.id);
                            navigateTo("services");
                          }}
                          className="text-[#071A3D] hover:text-[#D4A038] text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
                        >
                          Learn More <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] text-gray-400 font-mono">
                          0{SERVICES_DATA.findIndex(s => s.id === service.id) + 1}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4 – Why Choose Elitesphere */}
            <section className="py-20 px-4 bg-white">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-2xl mx-auto mb-16 space-y-2"
                >
                  <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                    Strategic Advantage
                  </span>
                  <h2 className="text-3xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                    Why Choose Elitesphere
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    We combine high-level consultancy experience with hands-on technical validation and design.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  
                  {/* Card 1: Strategic Thinking */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
                    className="bg-[#F5F7FA] border border-gray-200 p-6 rounded-md hover:border-[#D4A038] hover:bg-white transition-all duration-300"
                  >
                    <span className="text-[#D4A038] font-heading font-black text-2xl mb-3 block">01</span>
                    <h4 className="font-heading font-bold text-[#071A3D] text-xs uppercase mb-2">Strategic Thinking</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      We dissect high-level market variables before designing marketing funnels or CRM structures.
                    </p>
                  </motion.div>

                  {/* Card 2: Customized Solutions */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="bg-[#F5F7FA] border border-gray-200 p-6 rounded-md hover:border-[#D4A038] hover:bg-white transition-all duration-300"
                  >
                    <span className="text-[#D4A038] font-heading font-black text-2xl mb-3 block">02</span>
                    <h4 className="font-heading font-bold text-[#071A3D] text-xs uppercase mb-2">Customized Solutions</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      Zero duplicate templates. Your educational institution or seed round startup receives customized code and branding.
                    </p>
                  </motion.div>

                  {/* Card 3: Professional Excellence */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="bg-[#F5F7FA] border border-gray-200 p-6 rounded-md hover:border-[#D4A038] hover:bg-white transition-all duration-300"
                  >
                    <span className="text-[#D4A038] font-heading font-black text-2xl mb-3 block">03</span>
                    <h4 className="font-heading font-bold text-[#071A3D] text-xs uppercase mb-2">Professional Excellence</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      All deliverables follow strict corporate standards, beautiful typography paired, and optimized layouts.
                    </p>
                  </motion.div>

                  {/* Card 4: End-to-End Support */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    className="bg-[#F5F7FA] border border-gray-200 p-6 rounded-md hover:border-[#D4A038] hover:bg-white transition-all duration-300"
                  >
                    <span className="text-[#D4A038] font-heading font-black text-2xl mb-3 block">04</span>
                    <h4 className="font-heading font-bold text-[#071A3D] text-xs uppercase mb-2">End-to-End Support</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      From audit discovery phases down to launch tracking, web updates, and database monitoring.
                    </p>
                  </motion.div>

                  {/* Card 5: Results-Oriented Approach */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    className="bg-[#F5F7FA] border border-gray-200 p-6 rounded-md hover:border-[#D4A038] hover:bg-white transition-all duration-300"
                  >
                    <span className="text-[#D4A038] font-heading font-black text-2xl mb-3 block">05</span>
                    <h4 className="font-heading font-bold text-[#071A3D] text-xs uppercase mb-2">Results-Oriented</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      We measure success by client enrollment metrics, conversion counts, and asset valuation metrics.
                    </p>
                  </motion.div>

                </div>
              </div>
            </section>

            {/* Section 5 – Our Process */}
            <section className="py-20 px-4 bg-[#071A3D] text-white">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-2xl mx-auto mb-16 space-y-2"
                >
                  <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                    THE PATH TO EXCELLENCE
                  </span>
                  <h2 className="text-3xl font-heading font-black uppercase tracking-wider text-white">
                    Our 5-Step Process Timeline
                  </h2>
                  <p className="text-slate-300 text-xs">
                    Hover or click the timeline checkpoints below to decode how we execute your custom growth path.
                  </p>
                </motion.div>

                {/* Horizontal Timeline Process Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                  {/* Central connector bar */}
                  <div className="hidden md:block absolute top-[44px] left-8 right-8 h-0.5 bg-slate-700/60 -z-0" />

                  {processSteps.map((step, idx) => (
                    <motion.button 
                      key={step.number}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                      onClick={() => setActiveProcessStep(idx)}
                      onMouseEnter={() => setActiveProcessStep(idx)}
                      className="text-left focus:outline-none relative z-10 group"
                    >
                      <div className="flex flex-col items-center md:items-start">
                        {/* Process index circle */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                          activeProcessStep === idx 
                            ? "bg-[#D4A038] text-[#071A3D] border-[#D4A038] scale-110 shadow-lg" 
                            : "bg-[#071A3D] text-gray-300 border-slate-700 hover:border-white"
                        }`}>
                          <span className="font-mono font-bold text-xs">{step.number}</span>
                        </div>

                        <div className="mt-4 text-center md:text-left">
                          <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white group-hover:text-[#D4A038] transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed md:block max-w-xs">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Active step readout display banner */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 bg-slate-900/40 border border-slate-700/40 p-6 rounded-lg text-xs md:text-sm"
                >
                  <p className="font-bold text-[#D4A038] uppercase tracking-widest mb-1">
                    Selected Phase Details: {processSteps[activeProcessStep].title}
                  </p>
                  <p className="text-slate-300 font-light leading-relaxed">
                    {processSteps[activeProcessStep].desc}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Section 6 – Industries We Serve */}
            <section className="py-20 px-4 bg-white">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-2xl mx-auto mb-16 space-y-2"
                >
                  <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                    TARGET DOMAINS
                  </span>
                  <h2 className="text-3xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                    Industries We Serve
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Deploying specialized expertise across traditional systems and modern digital platforms.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {INDUSTRIES_DATA.map((ind, index) => (
                    <motion.div 
                      key={ind.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      className="border border-gray-200 bg-[#F5F7FA] rounded-md p-6 hover:border-[#D4A038] hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[#071A3D] mb-4">
                          {getIndustryIconComponent(ind.iconName, "w-6 h-6 text-[#D4A038]")}
                        </div>
                        <h4 className="font-heading font-bold text-xs uppercase text-[#071A3D] mb-2">
                          {ind.name}
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {ind.description}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveIndustryId(ind.id);
                          navigateTo("industries");
                        }}
                        className="text-[11px] text-[#071A3D] hover:text-[#D4A038] font-bold uppercase tracking-widest block mt-4 text-left"
                      >
                        Explore Industry Matrix ➔
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 7 – Call To Action */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#071A3D] to-[#04112c] text-white border-t border-[#D4A038]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.97, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-4xl mx-auto text-center space-y-6 relative z-10"
              >
                <span className="text-[#D4A038] text-xs font-mono font-bold uppercase tracking-[0.2em] block">
                  ACTION MANDATE
                </span>
                <h2 className="text-3xl lg:text-4xl font-heading font-black uppercase tracking-wider text-white">
                  Ready to Accelerate Your Growth?
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
                  Let's discuss your goals and explore how Elitesphere Consultancy can help your organization grow.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={handleBookClick}
                    className="bg-[#D4A038] hover:bg-white text-[#071A3D] hover:text-[#071A3D] font-bold py-3.5 px-8 rounded text-sm uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
                  >
                    Schedule a Consultation
                  </button>
                </div>
              </motion.div>
            </section>
          </div>
        )}

        {/* ==========================================
           PAGE: ABOUT US 
           ========================================== */}
        {currentPage === "about" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Company Profile
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                We Engineer Strategic Growth
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                About Elitesphere Consultancy objective, mission, and professional values.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light"
              >
                <h3 className="font-heading font-bold text-lg text-[#071A3D] uppercase tracking-wide">
                  Company Introduction
                </h3>
                <p>
                  Elitesphere Consultancy was established as a premium alternative to high-overhead corporate advisory boards. We deliver direct, clean strategic expertise directly coupled with code integration and beautiful brand design systems.
                </p>
                <p>
                  We collaborate with forward-thinking leaders inside competitive startups, family business spheres, and prestigious private academic colleges. Our systems turn digital channels into repeatable conversion grids.
                </p>
                
                <div className="bg-[#F5F7FA] p-5 rounded-lg border border-gray-200 mt-6 relative">
                  <span className="font-mono text-xs text-[#D4A038] font-bold uppercase tracking-widest block mb-2">
                    Our Vision State
                  </span>
                  <p className="italic text-[#071A3D] font-semibold text-xs leading-relaxed">
                    "To become a trusted consultancy empowering organizations to achieve excellence through innovative strategies and sustainable growth."
                  </p>
                </div>
              </motion.div>

              {/* Graphic container with text indicators */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#071A3D] text-white p-8 rounded-lg border border-[#D4A038]/30 space-y-6"
              >
                <h3 className="font-heading font-bold text-base uppercase text-[#D4A038] tracking-widest">
                  Our Mission Directives
                </h3>

                <ul className="space-y-4 text-xs">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4A038] shrink-0" />
                    <div>
                      <strong className="block text-white uppercase tracking-wider font-semibold">Deliver Impactful Solutions</strong>
                      <span className="text-gray-300">Formulating specific operational guidelines that produce definitive local market advantages.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4A038] shrink-0" />
                    <div>
                      <strong className="block text-white uppercase tracking-wider font-semibold">Drive Measurable Growth</strong>
                      <span className="text-gray-300">Focusing strictly on pipeline coordinates, cost of candidate acquisition, and retention metrics.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4A038] shrink-0" />
                    <div>
                      <strong className="block text-white uppercase tracking-wider font-semibold">Foster Continuous Innovation</strong>
                      <span className="text-gray-300">Infusing standard practices with artificial intelligence research, search cluster graphs, and clean custom code.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4A038] shrink-0" />
                    <div>
                      <strong className="block text-white uppercase tracking-wider font-semibold">Build Long-term Partnerships</strong>
                      <span className="text-gray-300">Aligning with client executive teams for multiple quarters through dedicated support SLAs.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Core Values Section */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-[#F5F7FA] border border-gray-200 rounded-lg p-8"
            >
              <h3 className="font-heading font-bold text-center text-lg text-[#071A3D] uppercase tracking-wider mb-8">
                Our Primary Core Values
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-center">
                <div className="bg-white p-5 rounded border border-gray-100 shadow-sm">
                  <Zap className="w-8 h-8 text-[#D4A038] mx-auto mb-3" />
                  <h4 className="font-heading font-extrabold text-[#071A3D] text-xs uppercase tracking-wider mb-1">Excellence</h4>
                  <p className="text-gray-500 text-[11px]">Uncompromising visual standards.</p>
                </div>

                <div className="bg-white p-5 rounded border border-gray-100 shadow-sm">
                  <Shield className="w-8 h-8 text-[#D4A038] mx-auto mb-3" />
                  <h4 className="font-heading font-extrabold text-[#071A3D] text-xs uppercase tracking-wider mb-1">Integrity</h4>
                  <p className="text-gray-500 text-[11px]">Honest metrics audit parameters.</p>
                </div>

                <div className="bg-white p-5 rounded border border-gray-100 shadow-sm">
                  <Compass className="w-8 h-8 text-[#D4A038] mx-auto mb-3" />
                  <h4 className="font-heading font-extrabold text-[#071A3D] text-xs uppercase tracking-wider mb-1">Innovation</h4>
                  <p className="text-gray-500 text-[11px]">Advanced diagnostic cluster techniques.</p>
                </div>

                <div className="bg-white p-5 rounded border border-gray-100 shadow-sm">
                  <Building className="w-8 h-8 text-[#D4A038] mx-auto mb-3" />
                  <h4 className="font-heading font-extrabold text-[#071A3D] text-xs uppercase tracking-wider mb-1">Collaboration</h4>
                  <p className="text-gray-500 text-[11px]">Active coordination via portal access.</p>
                </div>

                <div className="bg-white p-5 rounded border border-gray-100 shadow-sm">
                  <TrendingUp className="w-8 h-8 text-[#D4A038] mx-auto mb-3" />
                  <h4 className="font-heading font-extrabold text-[#071A3D] text-xs uppercase tracking-wider mb-1">Growth</h4>
                  <p className="text-gray-500 text-[11px]">Continuous scaling mandates.</p>
                </div>
              </div>
            </motion.div>

            {/* Quick action button to trigger founder statement */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 text-center"
            >
              <button 
                onClick={() => navigateTo("founder")}
                className="bg-[#071A3D] text-white hover:bg-[#D4A038] hover:text-[#071A3D] text-xs font-bold uppercase tracking-wider py-3 px-8 rounded transition-all inline-flex items-center gap-1.5"
              >
                Read Message from the Founder <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}

        {/* ==========================================
           PAGE: SERVICES DETAIL
           ========================================== */}
        {currentPage === "services" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Expertise Matrix
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                Services Rendered
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Explore detailed listings of our core specialties. Click through service brackets below.
              </p>
            </motion.div>

            {/* Horizontal Tabs switcher */}
            <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-gray-200 pb-6">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                    activeServiceId === srv.id 
                      ? "bg-[#071A3D] text-[#D4A038] border border-[#D4A038]/50 shadow" 
                      : "bg-[#F5F7FA] text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {srv.title}
                </button>
              ))}
            </div>

            {/* Active Service presentation panel */}
            {(() => {
              const activeSrv = SERVICES_DATA.find(s => s.id === activeServiceId) || SERVICES_DATA[0];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#F5F7FA] border border-gray-200 rounded-lg p-8 items-start">
                  
                  {/* Left segment - overview */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="w-12 h-12 bg-[#071A3D] text-[#D4A038] rounded flex items-center justify-center border border-[#D4A038]/30">
                      {getServiceIconComponent(activeSrv.iconName, "w-6 h-6")}
                    </div>
                    
                    <h2 className="text-2xl font-heading font-black text-[#071A3D] uppercase tracking-wide">
                      {activeSrv.title}
                    </h2>

                    <p className="text-gray-700 text-xs sm:text-sm font-light leading-relaxed">
                      {activeSrv.fullDetails}
                    </p>

                    <button 
                      onClick={() => {
                        navigateTo("contact");
                        setServiceInterestedIn(activeSrv.title);
                      }}
                      className="bg-[#D4A038] text-[#071A3D] hover:bg-[#071A3D] hover:text-white font-bold text-xs py-3 px-6 rounded uppercase tracking-wider transition-all duration-300 inline-block text-center shadow-sm"
                    >
                      Inquire on {activeSrv.title}
                    </button>
                  </div>

                  {/* Right segment - precise sub service listings */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-[#D4A038] uppercase tracking-widest block border-b border-gray-200 pb-2 mb-4">
                      Tailored Competency Breakdown
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeSrv.subServices.map((sub, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-md border border-gray-200 hover:border-slate-300 transition-colors flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#D4A038] shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-[#071A3D] tracking-wide">{sub}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-white/70 border border-slate-200 rounded text-xs text-gray-500 leading-relaxed italic">
                      *We support full workspace transparency. Upon ordering any of these packages, clients receive an encryption-enforced client portal workspace allowing files sharing, real-time checklist audits, and scheduled timelines tracking.
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>
        )}

        {/* ==========================================
           PAGE: INDUSTRIES 
           ========================================== */}
        {currentPage === "industries" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Target Landscapes
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                Industries We Serve
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Tailoring strategic methodologies to align with sector constraints and audience cycles.
              </p>
            </motion.div>

            {/* Industrial selector matrix tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-gray-200 pb-6">
              {INDUSTRIES_DATA.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                    activeIndustryId === ind.id 
                      ? "bg-[#071A3D] text-[#D4A038] border border-[#D4A038]/50 shadow" 
                      : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            {/* Industrial active dashboard screen */}
            {(() => {
              const activeInd = INDUSTRIES_DATA.find(i => i.id === activeIndustryId) || INDUSTRIES_DATA[0];
              return (
                <div className="bg-[#071A3D] text-white rounded-lg p-8 border border-[#D4A038]/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4A038]/10 to-transparent pointer-events-none" />
                  
                  <div className="max-w-3xl space-y-5 relative z-10">
                    <div className="text-[#D4A038]">
                      {getIndustryIconComponent(activeInd.iconName, "w-10 h-10")}
                    </div>

                    <h2 className="text-2xl font-heading font-black uppercase text-[#D4A038] tracking-wide">
                      {activeInd.name} Optimization
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {activeInd.description}
                    </p>

                    <div className="p-4 bg-slate-900/40 rounded border border-slate-700 text-xs space-y-2">
                      <span className="font-bold text-[#D4A038] uppercase tracking-widest text-[9px] block">Sector Deployment Audit Outline</span>
                      <p className="text-slate-200 leading-relaxed">
                        {activeInd.details}
                      </p>
                    </div>

                    <button 
                      onClick={() => navigateTo("contact")}
                      className="bg-[#D4A038] text-[#071A3D] hover:bg-white hover:text-[#071A3D] font-bold text-xs py-3 px-6 rounded uppercase tracking-wider transition-all duration-300 inline-block text-center"
                    >
                      Request Sector Assessment
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ==========================================
           PAGE: INSIGHTS BLOG SECTION
           ========================================== */}
        {currentPage === "insights" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Intel digest
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                Elitesphere Insights
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Strategic research, corporate frameworks, and educational admissions optimization blueprints.
              </p>
            </motion.div>

            <BlogSection />
          </div>
        )}

        {/* ==========================================
           PAGE: FOUNDER'S MESSAGE
           ========================================== */}
        {currentPage === "founder" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Executive Desk
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                Founder's Message
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Uncompromising commitment to continuous institutional and business acceleration.
              </p>
            </motion.div>

            {/* Layout Box: Photo left, letter right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#F5F7FA] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              
              {/* Founder Photo Panel (Left) */}
              <div className="lg:col-span-5 relative h-96 lg:h-full min-h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  alt="Ashish Janapareddi, Founder of Elitesphere Consultancy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Embedded absolute signature board */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#071A3D] text-white p-4 rounded border border-[#D4A038]/30">
                  <p className="text-xs font-mono font-bold text-[#D4A038] uppercase tracking-widest">
                    Ashish Janapareddi
                  </p>
                  <p className="text-[10px] text-gray-300">
                    Founder & Managing Director, Elitesphere Consultancy
                  </p>
                </div>
              </div>

              {/* Founder Letter Panel (Right) */}
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
                <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block font-mono">
                  A MESSAGE FROM THE FOUNDER
                </span>

                <div className="text-gray-700 text-xs sm:text-sm space-y-4 leading-relaxed font-light">
                  <p className="font-bold text-[#071A3D] uppercase text-sm">
                    Welcome to Elitesphere Consultancy.
                  </p>
                  
                  <p>
                    Elitesphere was founded on the belief that every organization has the potential to achieve extraordinary growth when supported by the right strategy, systems, and execution.
                  </p>
                  
                  <p>
                    Our goal is not simply to provide services but to become a trusted growth partner for businesses and educational institutions.
                  </p>
                  
                  <p>
                    Through strategic thinking, creativity, and practical implementation, we help organizations unlock opportunities and build sustainable success.
                  </p>
                  
                  <p>
                    Thank you for visiting Elitesphere Consultancy. We look forward to being part of your growth journey.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-8 space-y-1">
                  <p className="text-gray-400 text-xs italic">Warm Regards,</p>
                  <p className="font-heading font-extrabold text-sm text-[#071A3D] uppercase tracking-wider">
                    Ashish Janapareddi
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Founder & Managing Director
                  </p>
                  <p className="text-[10px] text-[#D4A038] uppercase tracking-widest font-bold">
                    Elitesphere Consultancy
                  </p>
                  <p className="text-[9px] text-gray-400 mt-2 font-mono italic">
                    "Built for Growth. Designed for Excellence."
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==========================================
           PAGE: CONTACT US & APPOINTMENT LEADS
           ========================================== */}
        {currentPage === "contact" && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-2"
            >
              <span className="text-[#D4A038] text-xs font-bold uppercase tracking-widest block">
                Connect Matrix
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#071A3D] uppercase tracking-wider">
                Initiate Strategic Advisory
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Submit an inquiry below. The data automatically logs into our secure administrative dashboard workspace.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Traditional Address info */}
              <div className="lg:col-span-5 space-y-8">
                
                <div className="bg-[#071A3D] text-white p-8 rounded-lg border border-[#D4A038]/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A038]/5 rounded-bl-full pointer-events-none" />
                  
                  <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider mb-5">
                    Contact Information
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="flex gap-4">
                      <Mail className="w-5 h-5 text-[#D4A038] shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase tracking-widest text-[9px]">Business email</span>
                        <a href="mailto:info@elitesphereconsultancy.com" className="font-bold text-white hover:underline text-xs">
                          info@elitesphereconsultancy.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Phone className="w-5 h-5 text-[#D4A038] shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase tracking-widest text-[9px]">Telephone coordinate</span>
                        <a href="tel:+919482537335" className="font-bold text-white hover:underline text-xs">
                          +91 94825 37335
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-[#D4A038] shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase tracking-widest text-[9px]">Corporate Office Address</span>
                        <p className="font-bold text-white text-xs leading-relaxed">
                          Level 5, Elite Tower, Financial District, <br />
                          Gachibowli, Hyderabad, TS, 500032, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Simulator */}
                <div className="bg-[#F5F7FA] border border-gray-200 rounded-lg p-5">
                  <span className="text-gray-400 block uppercase tracking-widest text-[9px] mb-3">Google Map Integration (Interactive Simulation)</span>
                  
                  <div className="bg-slate-200 h-48 rounded border border-gray-300 relative overflow-hidden flex items-center justify-center">
                    {/* Retro-styled vector grid map overlay */}
                    <div className="absolute inset-0 bg-[#071A3D]/5 opacity-60 bg-[size:10px_10px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#071A3D] text-[#D4A038] border-2 border-[#D4A038] flex items-center justify-center shadow-lg animate-bounce duration-1000">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="bg-[#071A3D] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 mt-2 rounded border border-[#D4A038]/30">
                        Elitesphere Tower
                      </span>
                    </div>
                    <span className="absolute bottom-2 left-2 text-[10px] text-gray-500 font-mono">17.4483° N, 78.3741° E</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-base font-heading font-black text-[#071A3D] uppercase tracking-wider border-b border-gray-100 pb-3 mb-6">
                  Submit Growth Inquiry Circular
                </h3>

                {formSuccess ? (
                  <div id="contact-feedback" className="bg-green-50 border-l-4 border-green-500 text-green-800 p-5 rounded-md text-xs space-y-3">
                    <p className="font-bold text-sm uppercase">✓ Inquiry Dispatched Successfully</p>
                    <p>
                      Your growth inquiry parameters have been registered inside the Elitesphere admin lead metrics system and assigned to Consultant Ashish Janapareddi.
                    </p>
                    <p className="font-semibold">
                      To review this live inquiry, sign in to the Client Portal using the Admin login credential (<code className="bg-green-150 p-1 rounded">admin@elitesphere.com</code> / <code className="bg-green-150 p-1 rounded">admin123</code>).
                    </p>
                    <button
                      onClick={() => setFormSuccess(false)}
                      className="text-white bg-[#071A3D] px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider mt-2 hover:bg-[#D4A038] hover:text-[#071A3D] transition-colors"
                    >
                      Fill out another query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                    
                    {formError && (
                      <p className="text-red-500 font-semibold mb-2">{formError}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Representative Name"
                          className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] border border-gray-200 text-gray-800 focus:outline-none focus:border-[#D4A038]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase mb-1">
                          Company / Institution Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Organization"
                          className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] border border-gray-200 text-gray-800 focus:outline-none focus:border-[#D4A038]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="e.g. director@academy.edu"
                          className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] border border-gray-200 text-gray-800 focus:outline-none focus:border-[#D4A038]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. +91 XXXXX XXXXX"
                          className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] border border-gray-200 text-gray-800 focus:outline-none focus:border-[#D4A038]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase mb-1">
                        Service Interested In
                      </label>
                      <select
                        value={serviceInterestedIn}
                        onChange={(e) => setServiceInterestedIn(e.target.value)}
                        className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] text-gray-700 border border-gray-200 focus:outline-none focus:border-[#D4A038] text-xs"
                      >
                        <option value="Educational Institution Consulting">Educational Institution Consulting</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Branding & Creative Design">Branding & Creative Design</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Business Consulting">Business Consulting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase mb-1">
                        Message Content *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="State your strategic coordinates..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded bg-[#F5F7FA] border border-gray-200 text-gray-800 focus:outline-none focus:border-[#D4A038]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#071A3D] hover:bg-[#D4A038] text-white hover:text-[#071A3D] font-bold py-3 uppercase tracking-wider text-xs rounded transition-all shadow"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}

              </div>

            </div>
          </div>
        )}

        {/* ==========================================
           PAGE: CLIENT PORTAL ENTRY POINT
           ========================================== */}
        {currentPage === "portal" && (
          <div className="py-16 px-4 bg-slate-50/50 min-h-[60vh]">
            <ClientPortal onBookConsultation={handleBookClick} />
          </div>
        )}

      </main>

      {/* 4. FOOTER ALL PAGES */}
      <footer className="bg-[#071A3D] text-white pt-16 pb-12 px-4 border-t-2 border-[#D4A038]/40 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
          
          {/* Col 1 Brand Header & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FAF9F6]">
              <ElitesphereLogo className="w-9 h-9" light={true} />
              <span 
                className="font-extrabold tracking-widest text-[#D4A038] text-base uppercase drop-shadow-[0_1px_2px_rgba(212,160,56,0.3)]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                ELITESPHERE
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Helping businesses and educational institutions achieve sustainable growth through strategy, branding, digital marketing, website development, and consulting solutions.
            </p>

            <p className="text-[10px] text-[#D4A038] uppercase tracking-widest font-bold">
              Built for Growth. Designed for Excellence.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-4">
            <h4 
              className="font-bold italic text-base text-[#F3C45B] tracking-wide transition-colors duration-300 hover:text-white drop-shadow-[0_1px_2px_rgba(212,160,56,0.3)]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Quick Links
            </h4>
            
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo("home")} className="text-gray-300 hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("about")} className="text-gray-300 hover:text-white transition-colors">
                  About Us Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("services")} className="text-gray-300 hover:text-white transition-colors">
                  Services List
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("industries")} className="text-gray-300 hover:text-white transition-colors">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("insights")} className="text-gray-300 hover:text-white transition-colors">
                  Insights & Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("portal")} className="text-[#D4A038] font-bold hover:underline">
                  🔐 Secure Client Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Services index shortcuts */}
          <div className="space-y-4">
            <h4 
              className="font-bold italic text-base text-[#F3C45B] tracking-wide transition-colors duration-300 hover:text-white drop-shadow-[0_1px_2px_rgba(212,160,56,0.3)]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Services Verticals
            </h4>
            
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => { setActiveServiceId("digital-marketing"); navigateTo("services"); }} className="text-gray-300 hover:text-white transition-colors">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveServiceId("branding-design"); navigateTo("services"); }} className="text-gray-300 hover:text-white transition-colors">
                  Branding & Asset Design
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveServiceId("website-development"); navigateTo("services"); }} className="text-gray-300 hover:text-white transition-colors">
                  Website Development
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveServiceId("business-consulting"); navigateTo("services"); }} className="text-gray-300 hover:text-white transition-colors">
                  Business Consulting
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveServiceId("educational-consulting"); navigateTo("services"); }} className="text-gray-300 hover:text-white transition-colors">
                  Educational Institution Consulting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 Contact & Network links */}
          <div className="space-y-4">
            <h4 
              className="font-bold italic text-base text-[#F3C45B] tracking-wide transition-colors duration-300 hover:text-white drop-shadow-[0_1px_2px_rgba(212,160,56,0.3)]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Contact & Socials
            </h4>
            
            <ul className="space-y-3.5 text-xs">
              <li>
                <a 
                  href="tel:+919482537335" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A038] transition-colors group"
                  title="Call Elitesphere Consultancy"
                >
                  <Phone className="w-4 h-4 text-[#D4A038] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-gray-200 group-hover:text-[#D4A038] transition-colors font-mono">+91 94825 37335</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@elitesphereconsultancy.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A038] transition-colors group"
                  title="Email Elitesphere Consultancy"
                >
                  <Mail className="w-4 h-4 text-[#D4A038] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-gray-200 group-hover:text-[#D4A038] transition-colors break-all">info@elitesphereconsultancy.com</span>
                </a>
              </li>
              
              <li className="h-px bg-slate-800 my-2" />

              <li>
                <a 
                  href="https://www.linkedin.com/company/elitesphere-consultancy/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A038] transition-colors group"
                  title="Connect with Elitesphere on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#D4A038] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-gray-200 group-hover:text-[#D4A038] transition-colors">LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/elitesphere.consultancy" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4A038] transition-colors group"
                  title="Follow Elitesphere on Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#D4A038] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-gray-200 group-hover:text-[#D4A038] transition-colors">Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://chat.whatsapp.com/JsxiZBFDFQP683idPPMB37?mode=gi_t" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-start gap-3 text-gray-300 hover:text-[#D4A038] transition-colors group"
                  title="Join Elitesphere WhatsApp Group"
                >
                  <svg className="w-4 h-4 text-[#D4A038] group-hover:scale-110 transition-transform shrink-0 fill-current mt-0.5" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.117.957 11.53.957c-5.442 0-9.867 4.372-9.87 9.802 0 1.63.43 3.22 1.245 4.634L1.87 21.5l6.34-1.642a9.79 9.79 0 0 0 4.437 1.078h.001zm11.332-7.72c-.29-.145-1.716-.848-1.981-.944-.265-.096-.457-.145-.65.145-.19.29-.738.944-.906 1.137-.168.19-.336.213-.626.069-.29-.145-1.226-.452-2.333-1.444-.862-.769-1.443-1.717-1.612-2.007-.168-.29-.018-.445.13-.591.135-.13.29-.337.435-.506.145-.168.19-.29.29-.482.096-.19.047-.361-.024-.506-.07-.145-.65-1.566-.891-2.145-.236-.57-.474-.49-.65-.499-.17-.008-.36-.01-.555-.01a1.07 1.07 0 0 0-.771.361c-.265.29-1.012.988-1.012 2.41 0 1.42 1.036 2.795 1.18 2.99.145.19 2.039 3.114 4.939 4.364.69.298 1.229.476 1.648.61.693.22 1.324.19 1.823.11.556-.09 1.717-.7 1.958-1.374.24-.674.24-1.253.168-1.374-.07-.12-.265-.19-.555-.337z"/>
                  </svg>
                  <span className="font-medium text-gray-200 group-hover:text-[#D4A038] transition-colors leading-tight">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copywrite notice & layout stamp */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-gray-400 text-[10px] space-y-2">
          <p>© 2026 Elitesphere Consultancy. All Rights Reserved.</p>
          <p className="text-[9px] tracking-wider text-slate-500">
            SSL Validation Active • Encrypted Shared Tables Matrix • Designed for Excellence.
          </p>
        </div>
      </footer>

      {/* 5. FLOATING WHATSAPP CHAT BUTTON (Technical Requirement Section 12) */}
      <div className="fixed bottom-6 right-6 z-50">
        {whatsAppOpen ? (
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 overflow-hidden mb-4 animate-fade-in text-xs text-brand-dark">
            {/* Header */}
            <div className="bg-[#071A3D] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <span className="font-bold block leading-none">WhatsApp Advisory</span>
                  <span className="text-[9px] text-gray-400">Response time: &lt; 1 hour</span>
                </div>
              </div>
              <button onClick={() => setWhatsAppOpen(false)} title="Close chat selector">
                <X className="w-4 h-4 text-white hover:text-[#D4A038]" />
              </button>
            </div>
            {/* Body */}
            <div className="p-4 bg-slate-50 space-y-4">
              {/* WhatsApp Group Quick Join */}
              <div className="bg-white p-3.5 rounded border border-green-200 shadow-sm space-y-2">
                <span className="font-heading font-extrabold text-[10px] text-green-700 uppercase tracking-wider block">
                  Official WhatsApp Group
                </span>
                <p className="text-gray-500 text-[10px] leading-relaxed">
                  Join our official network group to receive live updates, strategic growth reports, and ecosystem insights.
                </p>
                <a
                  href="https://chat.whatsapp.com/JsxiZBFDFQP683idPPMB37?mode=gi_t"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setWhatsAppOpen(false)}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd53] text-white font-extrabold py-2 px-3 rounded text-center block uppercase tracking-wider text-[10px] transition-colors"
                >
                  Join WhatsApp Group
                </a>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200 animate-pulse"></div>
                <span className="flex-shrink mx-3 text-gray-400 text-[9px] uppercase font-bold tracking-widest">OR</span>
                <div className="flex-grow border-t border-gray-200 animate-pulse"></div>
              </div>

              {/* Direct Advisor Chat */}
              <div className="bg-white p-3.5 rounded border border-gray-100 shadow-sm space-y-2">
                <span className="font-heading font-extrabold text-[10px] text-[#071A3D] uppercase tracking-wider block">
                  Direct Advisor Chat
                </span>
                <p className="text-gray-500 text-[10px] leading-relaxed">
                  Send a private message to Managing Director Ashish Janapareddi at <span className="font-mono text-gray-700 font-semibold">+91 94825 37335</span>.
                </p>
                <textarea 
                  value={whatsAppMessage}
                  onChange={(e) => setWhatsAppMessage(e.target.value)}
                  placeholder="Describe your project scaling target..."
                  rows={2}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-[11px] focus:outline-none focus:border-[#D4A038] bg-white text-gray-800 placeholder-gray-400"
                />
                <button
                  onClick={() => {
                    try {
                      const encoded = encodeURIComponent(whatsAppMessage || "Hello Elitesphere, I am interested in growth advisory services.");
                      window.open(`https://wa.me/919482537335?text=${encoded}`, "_blank");
                    } catch (err) {
                      console.error("Popup was blocked or window.open is restricted in this sandboxed preview iframe:", err);
                    }
                    setWhatsAppOpen(false);
                    setWhatsAppMessage("");
                  }}
                  className="w-full bg-[#071A3D] hover:bg-[#D4A038] hover:text-[#071A3D] text-white font-extrabold py-2 px-3 rounded text-center block uppercase tracking-wider text-[10px] transition-colors"
                >
                  Start Private Chat
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setWhatsAppOpen(true)}
            className="bg-[#25D366] text-white rounded-full p-4 hover:scale-105 transition-all shadow-xl flex items-center justify-center relative group"
            title="Open WhatsApp Consultation Link"
          >
            <span className="absolute -left-36 top-1/2 -translate-y-1/2 bg-[#071A3D] text-[#D4A038] text-[9.5px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded shadow border border-[#D4A038]/30 hidden group-hover:block transition-all">
              Consult on WhatsApp
            </span>
            <MessageSquare className="w-6 h-6 stroke-2" />
          </button>
        )}
      </div>

    </div>
  );
}
