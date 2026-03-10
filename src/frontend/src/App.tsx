import { Toaster } from "@/components/ui/sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  Apple,
  CheckCircle,
  ChevronRight,
  Dumbbell,
  Facebook,
  Instagram,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MembershipPlan } from "./backend";
import { useActor } from "./hooks/useActor";

// ==================== HOOKS ====================
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right",
    );
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

function useCounterAnimation(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

// ==================== PARTICLES ====================
const PARTICLES = [
  {
    id: 0,
    left: "3%",
    size: 3,
    duration: 12,
    delay: 0,
    color: "#00d4ff",
    opacity: 0.5,
  },
  {
    id: 1,
    left: "8%",
    size: 2,
    duration: 18,
    delay: 2,
    color: "#ff00ff",
    opacity: 0.4,
  },
  {
    id: 2,
    left: "15%",
    size: 4,
    duration: 10,
    delay: 5,
    color: "#00ff88",
    opacity: 0.6,
  },
  {
    id: 3,
    left: "22%",
    size: 2,
    duration: 14,
    delay: 1,
    color: "#00d4ff",
    opacity: 0.3,
  },
  {
    id: 4,
    left: "29%",
    size: 3,
    duration: 16,
    delay: 7,
    color: "#ff00ff",
    opacity: 0.5,
  },
  {
    id: 5,
    left: "35%",
    size: 5,
    duration: 11,
    delay: 3,
    color: "#00d4ff",
    opacity: 0.4,
  },
  {
    id: 6,
    left: "42%",
    size: 2,
    duration: 20,
    delay: 9,
    color: "#00ff88",
    opacity: 0.35,
  },
  {
    id: 7,
    left: "49%",
    size: 3,
    duration: 13,
    delay: 4,
    color: "#ff00ff",
    opacity: 0.5,
  },
  {
    id: 8,
    left: "56%",
    size: 4,
    duration: 17,
    delay: 6,
    color: "#00d4ff",
    opacity: 0.45,
  },
  {
    id: 9,
    left: "63%",
    size: 2,
    duration: 15,
    delay: 2,
    color: "#00ff88",
    opacity: 0.6,
  },
  {
    id: 10,
    left: "70%",
    size: 3,
    duration: 12,
    delay: 8,
    color: "#ff00ff",
    opacity: 0.4,
  },
  {
    id: 11,
    left: "77%",
    size: 5,
    duration: 19,
    delay: 1,
    color: "#00d4ff",
    opacity: 0.3,
  },
  {
    id: 12,
    left: "84%",
    size: 2,
    duration: 14,
    delay: 5,
    color: "#00ff88",
    opacity: 0.5,
  },
  {
    id: 13,
    left: "91%",
    size: 3,
    duration: 11,
    delay: 3,
    color: "#ff00ff",
    opacity: 0.45,
  },
  {
    id: 14,
    left: "97%",
    size: 4,
    duration: 16,
    delay: 7,
    color: "#00d4ff",
    opacity: 0.35,
  },
  {
    id: 15,
    left: "12%",
    size: 2,
    duration: 22,
    delay: 10,
    color: "#ff00ff",
    opacity: 0.4,
  },
  {
    id: 16,
    left: "25%",
    size: 3,
    duration: 9,
    delay: 4,
    color: "#00ff88",
    opacity: 0.55,
  },
  {
    id: 17,
    left: "38%",
    size: 2,
    duration: 18,
    delay: 6,
    color: "#00d4ff",
    opacity: 0.3,
  },
  {
    id: 18,
    left: "51%",
    size: 4,
    duration: 13,
    delay: 0,
    color: "#ff00ff",
    opacity: 0.5,
  },
  {
    id: 19,
    left: "65%",
    size: 3,
    duration: 15,
    delay: 2,
    color: "#00d4ff",
    opacity: 0.4,
  },
  {
    id: 20,
    left: "72%",
    size: 2,
    duration: 21,
    delay: 8,
    color: "#00ff88",
    opacity: 0.6,
  },
  {
    id: 21,
    left: "80%",
    size: 5,
    duration: 10,
    delay: 3,
    color: "#ff00ff",
    opacity: 0.35,
  },
  {
    id: 22,
    left: "88%",
    size: 2,
    duration: 17,
    delay: 5,
    color: "#00d4ff",
    opacity: 0.45,
  },
  {
    id: 23,
    left: "94%",
    size: 3,
    duration: 14,
    delay: 1,
    color: "#00ff88",
    opacity: 0.5,
  },
];

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ==================== NAVIGATION ====================
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Facilities", id: "facilities" },
    { label: "Membership", id: "membership" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 flex items-center justify-center font-heading font-black text-lg"
              style={{
                border: "1px solid #00d4ff",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
                background: "rgba(0, 212, 255, 0.08)",
                clipPath:
                  "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
              }}
            >
              CF
            </div>
            <span className="font-heading font-black text-white text-lg tracking-wider hidden sm:block">
              CYBER<span className="neon-text-blue">FIT</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className="text-gray-300 hover:text-[#00d4ff] font-body font-medium text-sm tracking-widest uppercase transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="nav.join.button"
              onClick={() => scrollTo("join")}
              className="btn-neon-blue hidden sm:block px-5 py-2 text-sm font-heading font-bold tracking-widest rounded-sm"
            >
              Join Now
            </button>
            <button
              type="button"
              data-ocid="nav.mobile_menu.button"
              className="lg:hidden text-[#00d4ff] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 px-4 pb-4 border-t border-[rgba(0,212,255,0.15)]">
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid={`nav.mobile.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className="text-left text-gray-300 hover:text-[#00d4ff] font-body font-medium py-2 px-4 text-sm tracking-widest uppercase transition-colors duration-200 border-l-2 border-transparent hover:border-[#00d4ff]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.mobile.join.button"
              onClick={() => scrollTo("join")}
              className="btn-neon-blue mt-2 px-5 py-2 text-sm font-heading font-bold tracking-widest rounded-sm w-full"
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ==================== HERO ====================
function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: "Active Members", value: "120+", icon: Users },
    { label: "Trainers", value: "6", icon: Shield },
    { label: "Equipment", value: "45", icon: Dumbbell },
    { label: "Years Experience", value: "5", icon: TrendingUp },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-gym.dim_1920x1080.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.95) 100%)",
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-60" />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="ring-1" />
        <div className="ring-2" />
        <div className="ring-3" />
      </div>

      {/* Particles */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24">
        {/* Label */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-body tracking-[0.3em] uppercase"
          style={{
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff",
            background: "rgba(0,212,255,0.05)",
          }}
        >
          <Zap size={12} />
          Next Generation Fitness
        </div>

        {/* Main heading */}
        <h1
          className="font-heading font-black text-white uppercase mb-6 leading-none"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "-0.02em",
          }}
        >
          BUILD YOUR{" "}
          <span className="neon-text-blue block sm:inline">FUTURE</span>{" "}
          <span className="neon-text-pink">BODY</span>
        </h1>

        {/* Subheading */}
        <p
          className="font-body text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          Train harder. Become stronger. Transform yourself at{" "}
          <span style={{ color: "#00d4ff" }}>CyberFit Gym</span>.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          data-ocid="hero.primary_button"
          onClick={() => scrollTo("join")}
          className="btn-neon-blue px-10 py-4 text-base font-heading font-black tracking-widest rounded-sm inline-flex items-center gap-3"
        >
          Join the Gym
          <ChevronRight size={18} />
        </button>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-6 px-4 flex flex-col items-center"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(0,212,255,0.12)"
                    : undefined,
              }}
            >
              <stat.icon
                size={20}
                className="mb-2"
                style={{ color: "#00d4ff" }}
              />
              <span className="font-heading font-black text-2xl neon-text-blue">
                {stat.value}
              </span>
              <span className="font-body text-xs text-gray-400 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span
          className="font-body text-xs tracking-widest uppercase"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ==================== ABOUT ====================
function AboutSection() {
  const features = [
    { icon: Zap, text: "World-class equipment & facilities" },
    { icon: Users, text: "Expert certified trainers" },
    { icon: Activity, text: "High-energy fitness environment" },
    { icon: TrendingUp, text: "Personalized transformation plans" },
  ];

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #0d0019 50%, #0a0a0f 100%)",
      }}
    >
      <div className="absolute inset-0 cyber-grid-pink opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="scroll-reveal-left relative">
            <div
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow:
                  "0 0 40px rgba(0,212,255,0.15), -10px 10px 0 rgba(0,212,255,0.1)",
              }}
            >
              <img
                src="/assets/generated/about-gym.dim_800x600.jpg"
                alt="CyberFit Gym Interior"
                className="w-full h-auto block"
                style={{ filter: "saturate(1.2) contrast(1.05)" }}
              />
              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-8 h-8"
                style={{
                  borderTop: "2px solid #00d4ff",
                  borderLeft: "2px solid #00d4ff",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8"
                style={{
                  borderBottom: "2px solid #ff00ff",
                  borderRight: "2px solid #ff00ff",
                }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-5 px-6 py-4 font-heading"
              style={{
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(0,255,136,0.4)",
                boxShadow: "0 0 20px rgba(0,255,136,0.2)",
              }}
            >
              <div className="text-3xl font-black neon-text-green">5+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                Years Strong
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="scroll-reveal-right">
            <div
              className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
              style={{ color: "#ff00ff" }}
            >
              About CyberFit
            </div>
            <h2 className="section-heading section-heading-underline mb-8 text-white">
              ABOUT <span className="neon-text-blue">CYBERFIT</span> GYM
            </h2>
            <div
              className="space-y-4 text-gray-300 font-body leading-relaxed"
              style={{ fontSize: "1.05rem" }}
            >
              <p>
                CyberFit Gym is a futuristic fitness center built for people who
                want to become stronger, healthier, and more confident. Our gym
                provides world-class equipment, expert trainers, and a
                high-energy environment designed to push your limits.
              </p>
              <p>
                Whether you are a beginner or a professional athlete, CyberFit
                Gym provides the perfect environment to build your dream body.
              </p>
              <p>
                Our mission is to help people transform their lives through
                discipline, strength, and fitness.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-3 py-3 px-4"
                  style={{
                    background: "rgba(0,212,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  <f.icon
                    size={16}
                    style={{ color: "#00d4ff", flexShrink: 0 }}
                  />
                  <span className="text-gray-300 font-body text-sm">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FACILITIES ====================
const FACILITIES = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    desc: "Modern weightlifting equipment and machines for every muscle group.",
    color: "#00d4ff",
    rgb: "0,212,255",
  },
  {
    icon: Activity,
    title: "Cardio Zone",
    desc: "Advanced treadmills, bikes, and cutting-edge cardio machines.",
    color: "#ff00ff",
    rgb: "255,0,255",
  },
  {
    icon: Users,
    title: "Personal Trainers",
    desc: "Certified trainers to guide and elevate your fitness journey.",
    color: "#00ff88",
    rgb: "0,255,136",
  },
  {
    icon: Lock,
    title: "Locker Rooms",
    desc: "Clean, secure, and spacious locker rooms with modern amenities.",
    color: "#7b2fff",
    rgb: "123,47,255",
  },
  {
    icon: Apple,
    title: "Nutrition Advice",
    desc: "Expert guidance for healthy eating, meal plans, and muscle gain.",
    color: "#ff6600",
    rgb: "255,102,0",
  },
  {
    icon: Package,
    title: "Supplement Store",
    desc: "Wide range of premium supplements and fitness products on-site.",
    color: "#00d4ff",
    rgb: "0,212,255",
  },
];

function FacilitiesSection() {
  return (
    <section
      id="facilities"
      className="relative py-24 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            What We Offer
          </div>
          <h2 className="section-heading text-white">
            OUR <span className="neon-text-pink">FACILITIES</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((fac, i) => (
            <div
              key={fac.title}
              data-ocid={`facilities.item.${i + 1}`}
              className={`cyber-card p-6 scroll-reveal scroll-reveal-delay-${i + 1}`}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-4"
                style={{
                  background: `rgba(${fac.rgb}, 0.1)`,
                  border: `1px solid ${fac.color}44`,
                  boxShadow: `0 0 15px ${fac.color}22`,
                }}
              >
                <fac.icon size={22} style={{ color: fac.color }} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-2 uppercase tracking-wide">
                {fac.title}
              </h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                {fac.desc}
              </p>
              <div
                className="mt-4 h-px"
                style={{
                  background: `linear-gradient(90deg, ${fac.color}44, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== MEMBERSHIP ====================
function MembershipSection({
  onSelectPlan,
}: { onSelectPlan: (plan: string) => void }) {
  const regularFeatures = [
    "Access to all gym equipment",
    "Workout access for 2 hours/day",
    "Basic trainer guidance",
    "Locker room access",
  ];

  const premiumFeatures = [
    "Unlimited gym access — anytime",
    "Spend unlimited time in gym",
    "Dedicated personal trainer support",
    "Priority equipment access",
    "Nutrition & supplement consultation",
    "VIP locker room access",
  ];

  const scrollToJoin = (plan: string) => {
    onSelectPlan(plan);
    const el = document.getElementById("join");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="membership"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #0d0019 100%)",
      }}
    >
      <div className="absolute inset-0 cyber-grid-pink opacity-20" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#ff00ff" }}
          >
            Choose Your Path
          </div>
          <h2 className="section-heading text-white">
            MEMBERSHIP <span className="neon-text-blue">PLANS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Regular Plan */}
          <div
            data-ocid="membership.item.1"
            className="cyber-card p-8 scroll-reveal-left"
          >
            <div className="mb-6">
              <div className="font-body text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">
                Standard
              </div>
              <h3 className="font-heading font-black text-white text-2xl uppercase">
                Regular Plan
              </h3>
              <div className="flex items-end gap-1 mt-4">
                <span className="font-heading font-black text-5xl neon-text-blue">
                  ₹500
                </span>
                <span className="text-gray-400 font-body text-sm mb-2">
                  /month
                </span>
              </div>
            </div>
            <div
              className="h-px mb-6"
              style={{ background: "rgba(0,212,255,0.2)" }}
            />
            <ul className="space-y-3 mb-8">
              {regularFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#00d4ff" }}
                  />
                  <span className="text-gray-300 font-body text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              data-ocid="membership.regular_button"
              onClick={() => scrollToJoin("Regular")}
              className="btn-neon-blue w-full py-3 text-sm font-heading font-bold tracking-widest rounded-sm"
            >
              Join Regular Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div
            data-ocid="membership.item.2"
            className="cyber-card-premium p-8 scroll-reveal-right relative"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            {/* Recommended badge */}
            <div
              className="absolute -top-px left-6 px-3 py-1 font-heading font-black text-xs tracking-widest uppercase"
              style={{ background: "#ff00ff", color: "#000" }}
            >
              ⚡ Recommended
            </div>
            <div className="mb-6 mt-2">
              <div
                className="font-body text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: "#ff00ff" }}
              >
                Elite
              </div>
              <h3 className="font-heading font-black text-white text-2xl uppercase">
                Premium Plan
              </h3>
              <div className="flex items-end gap-1 mt-4">
                <span className="font-heading font-black text-5xl neon-text-pink">
                  ₹1500
                </span>
                <span className="text-gray-400 font-body text-sm mb-2">
                  /month
                </span>
              </div>
            </div>
            <div
              className="h-px mb-6"
              style={{ background: "rgba(255,0,255,0.2)" }}
            />
            <ul className="space-y-3 mb-8">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#ff00ff" }}
                  />
                  <span className="text-gray-300 font-body text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              data-ocid="membership.premium_button"
              onClick={() => scrollToJoin("Premium")}
              className="btn-neon-pink w-full py-3 text-sm font-heading font-bold tracking-widest rounded-sm"
            >
              Join Premium Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== MEMBER COUNTER ====================
function MemberCounterSection() {
  const { actor, isFetching } = useActor();
  const [counterStarted, setCounterStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { data: memberCount } = useQuery({
    queryKey: ["memberCount"],
    queryFn: async () => {
      if (!actor) return BigInt(128);
      const count = await actor.getMemberCount();
      return count;
    },
    enabled: !!actor && !isFetching,
    initialData: BigInt(128),
  });

  const count = useCounterAnimation(
    memberCount ? Number(memberCount) : 128,
    2500,
    counterStarted,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setCounterStarted(true);
      },
      { threshold: 0.5 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden text-center"
      style={{ background: "#0a0a0f" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-50" />
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div
          className="mb-4 font-body text-xs tracking-[0.4em] uppercase"
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          Live Statistics
        </div>
        <div className="mb-2 font-body text-sm tracking-[0.3em] uppercase text-gray-400">
          Total Gym Members
        </div>
        <div className="counter-number">{counterStarted ? count : 0}</div>
        <div className="font-body text-lg text-gray-400 mt-2 tracking-widest uppercase">
          Members and Growing
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{
                width: i === 2 ? "2rem" : "0.5rem",
                background: i === 2 ? "#00d4ff" : "rgba(0,212,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== GALLERY ====================
const GALLERY_IMAGES = [
  {
    src: "/assets/generated/gallery-1.dim_600x400.jpg",
    alt: "Athlete Deadlifting",
  },
  { src: "/assets/generated/gallery-2.dim_600x400.jpg", alt: "Cardio Zone" },
  {
    src: "/assets/generated/gallery-3.dim_600x400.jpg",
    alt: "Personal Training",
  },
  { src: "/assets/generated/gallery-4.dim_600x400.jpg", alt: "Gym Interior" },
  { src: "/assets/generated/gallery-5.dim_600x400.jpg", alt: "Bench Press" },
  { src: "/assets/generated/gallery-6.dim_600x400.jpg", alt: "Pull-Ups" },
];

function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #0d0019 100%)",
      }}
    >
      <div className="absolute inset-0 cyber-grid-pink opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#00ff88" }}
          >
            Visual Tour
          </div>
          <h2 className="section-heading text-white">
            GYM <span className="neon-text-green">GALLERY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              data-ocid={`gallery.item.${i + 1}`}
              className={`gallery-img-wrap scroll-reveal scroll-reveal-delay-${i + 1}`}
              style={{
                height: "220px",
                clipPath:
                  i % 3 === 1
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                    : "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== TESTIMONIALS ====================
const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Bodybuilder",
    quote:
      "This gym completely changed my lifestyle. The equipment and trainers are absolutely amazing. Best investment I made!",
    initials: "RS",
    color: "#00d4ff",
  },
  {
    name: "Aman Verma",
    role: "CrossFit Athlete",
    quote:
      "I love the cyberpunk theme and the energy here. Best gym experience I have ever had. Highly recommended!",
    initials: "AV",
    color: "#ff00ff",
  },
  {
    name: "Riya Singh",
    role: "Fitness Model",
    quote:
      "Great trainers and a fantastic environment. The personal training sessions pushed me beyond my limits!",
    initials: "RS2",
    color: "#00ff88",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#ff00ff" }}
          >
            Member Reviews
          </div>
          <h2 className="section-heading text-white">
            WHAT MEMBERS <span className="neon-text-pink">SAY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-ocid={`testimonials.item.${i + 1}`}
              className={`cyber-card p-6 scroll-reveal scroll-reveal-delay-${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star key={j} size={14} className="star-gold fill-current" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-gray-300 font-body text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm flex-shrink-0"
                  style={{
                    border: `1px solid ${t.color}`,
                    color: t.color,
                    background: `${t.color}15`,
                    boxShadow: `0 0 10px ${t.color}33`,
                  }}
                >
                  {t.initials.startsWith("RS") && t.initials.length === 3
                    ? "RS"
                    : t.initials}
                </div>
                <div>
                  <div className="font-heading font-bold text-white text-sm uppercase tracking-wide">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-gray-500">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== JOIN FORM ====================
function JoinSection({
  selectedPlan,
  onCountRefresh,
}: {
  selectedPlan: string;
  onCountRefresh: () => void;
}) {
  const { actor, isFetching } = useActor();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    plan: selectedPlan || "Regular",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync plan when selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError("Connecting to backend... please try again.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const plan =
        formData.plan === "Premium"
          ? MembershipPlan.Premium
          : MembershipPlan.Regular;
      await actor.submitMembership(
        formData.fullName,
        formData.phone,
        formData.email,
        plan,
      );
      await actor.incrementMemberCount();
      setSubmitted(true);
      onCountRefresh();
      toast.success("Welcome to CyberFit Gym!");
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="join"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0019 0%, #0a0a0f 100%)",
      }}
    >
      <div className="absolute inset-0 cyber-grid-pink opacity-30" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            Enroll Now
          </div>
          <h2 className="section-heading text-white">
            JOIN <span className="neon-text-blue">CYBERFIT</span> GYM
          </h2>
        </div>

        <div
          className="cyber-card p-8 scroll-reveal"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          {submitted ? (
            <div data-ocid="join.success_state" className="text-center py-12">
              <div
                className="w-20 h-20 mx-auto flex items-center justify-center mb-6 rounded-full"
                style={{
                  border: "2px solid #00ff88",
                  boxShadow: "0 0 30px rgba(0,255,136,0.3)",
                }}
              >
                <CheckCircle size={40} style={{ color: "#00ff88" }} />
              </div>
              <h3 className="font-heading font-black text-white text-2xl uppercase mb-4">
                Welcome to CyberFit!
              </h3>
              <p className="text-gray-300 font-body">
                Your membership request has been received. We will contact you
                shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-neon-green mt-6 px-6 py-2 text-sm rounded-sm"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="join-fullname"
                  className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="join-fullname"
                  data-ocid="join.input"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body"
                />
              </div>
              <div>
                <label
                  htmlFor="join-phone"
                  className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="join-phone"
                  data-ocid="join.phone_input"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body"
                />
              </div>
              <div>
                <label
                  htmlFor="join-email"
                  className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="join-email"
                  data-ocid="join.email_input"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body"
                />
              </div>
              <div>
                <label
                  htmlFor="join-plan"
                  className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                >
                  Select Plan *
                </label>
                <select
                  id="join-plan"
                  data-ocid="join.select"
                  required
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, plan: e.target.value }))
                  }
                  className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300d4ff' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="Regular" style={{ background: "#0a0a0f" }}>
                    Regular Membership — ₹500/month
                  </option>
                  <option value="Premium" style={{ background: "#0a0a0f" }}>
                    Premium Membership — ₹1500/month
                  </option>
                </select>
              </div>

              {error && (
                <div
                  data-ocid="join.error_state"
                  className="text-sm font-body py-3 px-4"
                  style={{
                    color: "#ff6600",
                    border: "1px solid rgba(255,102,0,0.3)",
                    background: "rgba(255,102,0,0.05)",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                data-ocid="join.submit_button"
                type="submit"
                disabled={isLoading || isFetching}
                className="btn-neon-blue w-full py-4 text-sm font-heading font-black tracking-widest rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Join Membership <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ==================== CONTACT ====================
function ContactSection() {
  const { actor, isFetching } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError("Connecting... please try again.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await actor.submitContactMessage(
        formData.name,
        formData.email,
        formData.message,
      );
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      setError("Failed to send message. Please try again.");
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "123 Fitness Street, Agwar City, India",
      color: "#00d4ff",
    },
    { icon: Phone, label: "Phone", value: "+91 9876543210", color: "#ff00ff" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+91 9876543210",
      color: "#00ff88",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@cyberfitgym.com",
      color: "#7b2fff",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div
            className="mb-3 font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            Get in Touch
          </div>
          <h2 className="section-heading text-white">
            CONTACT <span className="neon-text-blue">US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="scroll-reveal-left">
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-4"
                  style={{
                    background: "rgba(0,212,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.1)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `1px solid ${info.color}44`,
                      background: `${info.color}10`,
                    }}
                  >
                    <info.icon size={18} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="font-body text-xs uppercase tracking-widest text-gray-500 mb-1">
                      {info.label}
                    </div>
                    <div className="font-body text-gray-200 text-sm">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="h-48 flex flex-col items-center justify-center gap-3"
              style={{
                border: "1px solid rgba(0,212,255,0.2)",
                background: "rgba(0,212,255,0.03)",
                boxShadow: "0 0 20px rgba(0,212,255,0.05)",
              }}
            >
              <MapPin size={32} style={{ color: "#00d4ff" }} />
              <div className="font-heading font-bold text-white text-sm uppercase tracking-widest">
                📍 Find Us Here
              </div>
              <div className="text-gray-500 font-body text-xs text-center">
                123 Fitness Street, Agwar City, India
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="scroll-reveal-right">
            <div
              className="cyber-card p-8"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="text-center py-10"
                >
                  <CheckCircle
                    size={48}
                    className="mx-auto mb-4"
                    style={{ color: "#00ff88" }}
                  />
                  <h3 className="font-heading font-black text-white text-xl uppercase mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400 font-body text-sm">
                    We will get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-neon-blue mt-4 px-6 py-2 text-sm rounded-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      data-ocid="contact.input"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      data-ocid="contact.email_input"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-body text-xs uppercase tracking-widest text-gray-400 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      required
                      rows={4}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="cyber-input w-full px-4 py-3 text-sm rounded-sm font-body resize-none"
                    />
                  </div>

                  {error && (
                    <div
                      data-ocid="contact.error_state"
                      className="text-sm font-body py-2 px-4"
                      style={{
                        color: "#ff6600",
                        border: "1px solid rgba(255,102,0,0.3)",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    data-ocid="contact.submit_button"
                    type="submit"
                    disabled={isLoading || isFetching}
                    className="btn-neon-blue w-full py-4 text-sm font-heading font-black tracking-widest rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
const SOCIAL_LINKS = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Membership", id: "membership" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #000005 100%)",
        borderTop: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center font-heading font-black text-lg"
                style={{
                  border: "1px solid #00d4ff",
                  color: "#00d4ff",
                  boxShadow: "0 0 15px rgba(0,212,255,0.4)",
                  background: "rgba(0,212,255,0.08)",
                  clipPath:
                    "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                }}
              >
                CF
              </div>
              <span className="font-heading font-black text-white text-xl tracking-wider">
                CYBER<span className="neon-text-blue">FIT</span>
              </span>
            </div>
            <p className="font-body text-sm text-gray-400 italic mb-5">
              Train Hard. Stay Strong.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1px solid rgba(0,212,255,0.25)",
                    color: "rgba(0,212,255,0.7)",
                    background: "rgba(0,212,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#00d4ff";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 12px rgba(0,212,255,0.5)";
                    (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,212,255,0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(0,212,255,0.7)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-heading font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#00d4ff" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.id}.link`}
                    onClick={() => scrollTo(link.id)}
                    className="font-body text-sm text-gray-400 hover:text-[#00d4ff] transition-colors duration-200 flex items-center gap-2"
                  >
                    <ChevronRight
                      size={12}
                      style={{ color: "rgba(0,212,255,0.4)" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4
              className="font-heading font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#ff00ff" }}
            >
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 font-body text-sm">
                <Phone size={14} style={{ color: "#ff00ff", flexShrink: 0 }} />
                +91 9876543210
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-body text-sm">
                <Mail size={14} style={{ color: "#ff00ff", flexShrink: 0 }} />
                info@cyberfitgym.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-body text-sm">
                <MessageCircle
                  size={14}
                  style={{ color: "#ff00ff", flexShrink: 0 }}
                />
                +91 9876543210 (WhatsApp)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          <p className="font-body text-xs text-gray-500">
            © {year} CyberFit Gym. All Rights Reserved.
          </p>
          <p className="font-body text-xs text-gray-600">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff] transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== APP ====================
export default function App() {
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState("Regular");

  useScrollReveal();

  const handleCountRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["memberCount"] });
  }, [queryClient]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0f", fontFamily: "Outfit, sans-serif" }}
    >
      <Toaster theme="dark" position="top-right" />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <FacilitiesSection />
        <MembershipSection onSelectPlan={setSelectedPlan} />
        <MemberCounterSection />
        <GallerySection />
        <TestimonialsSection />
        <JoinSection
          selectedPlan={selectedPlan}
          onCountRefresh={handleCountRefresh}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
