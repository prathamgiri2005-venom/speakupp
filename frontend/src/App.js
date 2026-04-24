import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Check, 
  Star, 
  Play, 
  Calendar, 
  Clock, 
  Mail, 
  Phone,
  Instagram, 
  Linkedin, 
  Youtube,
  Facebook,
  ChevronRight,
  Sparkles,
  Heart,
  Users,
  MessageCircle,
  ArrowRight,
  Video,
  Zap,
  Target,
  Award,
  Menu,
  X,
  MapPin,
  Send
} from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import './App.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Images - Using uploaded photos
const HERO_IMAGE = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/u5kuvpcb_a.JPEG"; // Black dress on steps
const ABOUT_IMAGE = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/e6035d2q_h.jpeg"; // Sparkly outfit at podium
const VIDEO_URL = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/5luqjwvo_video.mp4";

// Gallery photos for classes section
const GALLERY_IMAGES = [
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/xu0wqhi3_IMG_4448.JPEG", // Pink dress with paper
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/e6035d2q_h.jpeg", // Sparkly outfit
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/u5kuvpcb_a.JPEG" // Black dress
];

// Data
const benefits = [
  { icon: Zap, title: "Uncover Your Confidence", description: "Confidence isn't something you chase — it's something you uncover within" },
  { icon: MessageCircle, title: "Master Communication", description: "Transform your communication into a signature presence that commands attention" },
  { icon: Target, title: "Break Limiting Beliefs", description: "Let go of hesitation and meet the most confident version of yourself" },
  { icon: Award, title: "Real Transformation", description: "Not surface-level motivation — real, lasting change happens here" }
];

const pricingPlans = [
  {
    id: "student",
    name: "Student Plan",
    price: "₹199",
    period: "/session",
    features: [
      "Live Zoom group session",
      "Interactive Q&A",
      "Session recordings access",
      "WhatsApp community access",
      "Certificate of completion"
    ],
    popular: false,
    color: "turquoise"
  },
  {
    id: "regular",
    name: "Regular Plan",
    price: "₹299",
    period: "/session",
    features: [
      "Everything in Student Plan",
      "Priority seating in sessions",
      "1-on-1 doubt clearing",
      "Personalized feedback",
      "Exclusive resources & materials",
      "Direct mentor access"
    ],
    popular: true,
    color: "turquoise"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "College Student",
    text: "Speakupp transformed my public speaking anxiety into confidence. I now lead college presentations with ease!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1739785248579-cd43cdaac06b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzcwNTUwNDV8MA&ixlib=rb-4.1.0&q=85&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Working Professional",
    text: "The Zoom sessions fit perfectly in my busy schedule. Sandhya's guidance helped me ace my job interviews!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc3MDU1MDU0fDA&ixlib=rb-4.1.0&q=85&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Anjali Singh",
    role: "Entrepreneur",
    text: "Best investment I made for myself. My confidence in business meetings has grown tremendously.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1644335326474-544fbcf8855f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzcwNTUwNDV8MA&ixlib=rb-4.1.0&q=85&w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Vikash Kumar",
    role: "MBA Student",
    text: "The practical exercises and real-time feedback make Speakupp unique. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1764546899196-b53061b1b609?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc3MDU1MDU0fDA&ixlib=rb-4.1.0&q=85&w=150&h=150&fit=crop"
  }
];

// ===== ZOOM MEETING CONFIGURATION =====
// UPDATE THIS LINK WITH YOUR ACTUAL ZOOM MEETING LINK
const ZOOM_MEETING_LINK = "https://zoom.us/j/YOUR_MEETING_ID";
// =====================================

// Schedule data - Update these as needed
const schedule = [
  {
    id: 1,
    day: "Monday",
    time: "7:00 PM",
    duration: "60 mins",
    topic: "Confidence Building Basics",
    status: "upcoming"
  },
  {
    id: 2,
    day: "Wednesday",
    time: "7:00 PM",
    duration: "60 mins",
    topic: "Public Speaking Mastery",
    status: "upcoming"
  },
  {
    id: 3,
    day: "Friday",
    time: "7:00 PM",
    duration: "60 mins",
    topic: "Communication Skills",
    status: "upcoming"
  },
  {
    id: 4,
    day: "Saturday",
    time: "11:00 AM",
    duration: "90 mins",
    topic: "Weekend Special: Full Workshop",
    status: "popular"
  }
];

// Components
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-turquoise-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" data-testid="logo" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-turquoise-500 to-turquoise-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-text-primary">Speakupp</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" data-testid="nav-home" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">Home</a>
            <a href="#about" data-testid="nav-about" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">About</a>
            <a href="#classes" data-testid="nav-classes" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">Classes</a>
            <a href="#schedule" data-testid="nav-schedule" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">Schedule</a>
            <a href="#pricing" data-testid="nav-pricing" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">Pricing</a>
            <a href="#contact" data-testid="nav-contact" className="text-text-secondary hover:text-turquoise-600 transition-colors font-medium">Contact</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a 
              href="#pricing" 
              data-testid="header-cta"
              className="hidden sm:inline-flex btn-primary px-6 py-2.5 rounded-full font-semibold text-sm items-center gap-2"
            >
              Join Zoom Class <Video className="w-4 h-4" />
            </a>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          <button 
            className="absolute top-4 right-4 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">Home</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">About</a>
          <a href="#classes" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">Classes</a>
          <a href="#schedule" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">Schedule</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">Pricing</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-text-primary hover:text-turquoise-600">Contact</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="btn-primary px-8 py-3 rounded-full font-semibold">
            Join Zoom Class
          </a>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-br from-turquoise-50 via-white to-turquoise-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" /> Online Motivation & Coaching
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-6"
            >
              Confidence Isn't Something You Chase{' '}
              <span className="text-turquoise-600">— It's Something You Uncover</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed"
            >
              Step into SpeakUpp's exclusive, interactive Zoom sessions where real transformation happens. This is where you let go of hesitation, break limiting beliefs, and finally meet the most confident version of yourself.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing" 
                data-testid="hero-cta-primary"
                className="btn-primary px-8 py-4 rounded-full font-semibold text-center inline-flex items-center justify-center gap-2"
              >
                Join Zoom Class <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#video" 
                data-testid="hero-cta-secondary"
                className="btn-secondary px-8 py-4 rounded-full font-semibold text-center inline-flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Watch Introduction
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 mt-12">
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-turquoise-600">800+</p>
                <p className="text-sm text-text-secondary">Events Worldwide</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-turquoise-600">10+</p>
                <p className="text-sm text-text-secondary">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-turquoise-600">1000+</p>
                <p className="text-sm text-text-secondary">Lives Transformed</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-turquoise-400/30 to-turquoise-600/30 rounded-3xl blur-2xl"></div>
              <img 
                src={HERO_IMAGE}
                alt="Sandhya - Motivation Coach"
                data-testid="hero-image"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl object-contain"
              />
            </div>
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl p-4 shadow-xl border border-turquoise-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-turquoise-600" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-text-primary">Live Zoom</p>
                  <p className="text-sm text-text-secondary">Interactive Sessions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="video" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" /> Introduction
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Meet Sandhya
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Watch this short introduction to understand how SpeakUpp can help you uncover the confident version of yourself
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="video-container"
          data-testid="video-container"
        >
          <video 
            controls 
            poster={ABOUT_IMAGE}
            className="w-full rounded-2xl"
            data-testid="intro-video"
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-turquoise-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-turquoise-400/20 to-transparent rounded-3xl"></div>
            <img 
              src={ABOUT_IMAGE}
              alt="Sandhya - About"
              data-testid="about-image"
              className="relative w-full max-w-lg rounded-2xl shadow-xl object-cover aspect-[4/5]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" /> About the Mentor
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-6">
              Hi, I'm <span className="text-turquoise-600">Sandhya</span>
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              I'm a professional anchor, motivational speaker, and confidence coach with over <strong>10 years of experience</strong>. Having hosted <strong>800+ events worldwide</strong>, I've spent years on stage — but my real work goes far beyond it.
            </p>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Because confidence isn't about performing for the world… <em>it's about owning who you are.</em>
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              With a Master's degree in Journalism and Mass Communication, I understand what it takes to move from self-doubt to self-mastery. My mission is clear: <strong>To transform confidence and communication into a signature presence that commands attention without saying a word.</strong>
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-turquoise-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-turquoise-600" />
                  </div>
                  <span className="text-text-secondary font-medium text-sm">{benefit.title}</span>
                </div>
              ))}
            </div>

            <a 
              href="#pricing" 
              data-testid="about-cta"
              className="btn-primary px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
            >
              Start Your Journey <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PurposeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> Inside SpeakUpp
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Where Transformation Becomes Reality
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Step into a space designed for more than just learning — this is where transformation becomes your reality. Every session is a high-energy, immersive experience where you are not just a participant, but a presence being shaped, refined, and elevated.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              data-testid={`purpose-card-${index}`}
              className="card p-6 text-center group"
            >
              <div className="w-16 h-16 bg-turquoise-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-turquoise-200 transition-colors">
                <benefit.icon className="w-8 h-8 text-turquoise-600" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ClassesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="classes" className="py-20 md:py-28 bg-turquoise-gradient text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Video className="w-4 h-4" /> Live Zoom Sessions
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl mb-6">
              This Is Not Passive Learning
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              Conducted live on Zoom, these sessions allow you to connect from anywhere in the world while experiencing a deeply interactive and personalized environment. <strong>This is where you evolve in real time.</strong>
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Live, high-impact sessions with direct interaction</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Personalized feedback to refine your presence</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Guided practical exercises for immediate shift</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Access to session recordings for deeper integration</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Exclusive WhatsApp circle for continued growth</span>
              </li>
            </ul>

            <a 
              href="#pricing" 
              data-testid="classes-cta"
              className="bg-white text-turquoise-600 px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-turquoise-50 transition-colors"
            >
              Join Class Now <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`${index === 0 ? 'col-span-2' : ''}`}>
                <img 
                  src={img}
                  alt={`Session ${index + 1}`}
                  className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" /> Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            What Our Students Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real stories from real people who transformed their lives with Speakupp
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              data-testid={`testimonial-card-${index}`}
              className="testimonial-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-text-primary text-sm">{testimonial.name}</p>
                  <p className="text-text-secondary text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ScheduleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" /> Schedule
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Weekly Zoom Class Schedule
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Join our live interactive sessions every week. All times are in IST (Indian Standard Time).
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {schedule.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              data-testid={`schedule-card-${index}`}
              className={`relative rounded-2xl p-6 bg-white border-2 transition-all hover:shadow-lg ${
                item.status === 'popular' 
                  ? 'border-turquoise-500 shadow-lg' 
                  : 'border-gray-100 hover:border-turquoise-200'
              }`}
            >
              {item.status === 'popular' && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-turquoise-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="text-center">
                <div className="w-14 h-14 bg-turquoise-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-turquoise-600" />
                </div>
                <h3 className="font-heading text-xl text-text-primary mb-1">{item.day}</h3>
                <div className="flex items-center justify-center gap-2 text-turquoise-600 font-semibold mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{item.time} IST</span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{item.topic}</p>
                <p className="text-xs text-gray-400">Duration: {item.duration}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Class CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-turquoise-50 to-turquoise-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-heading text-xl text-text-primary mb-3">Ready to Join?</h3>
            <p className="text-text-secondary mb-6 text-sm">
              Purchase a plan below and receive your Zoom meeting link instantly via WhatsApp/Email
            </p>
            <a 
              href={ZOOM_MEETING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="schedule-join-btn"
              className="btn-primary px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
            >
              <Video className="w-5 h-5" /> Join Zoom Meeting
            </a>
            <p className="text-xs text-gray-500 mt-4">
              * Meeting link will be active during scheduled class times
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 md:py-28 bg-turquoise-50" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" /> Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Choose Your Plan
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Affordable plans designed for students and professionals alike
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              data-testid={`pricing-card-${plan.id}`}
              className={`rounded-2xl p-8 md:p-10 relative bg-white ${
                plan.popular 
                  ? 'card-popular' 
                  : 'border border-turquoise-100 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl text-text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-turquoise-600">{plan.price}</span>
                  <span className="text-text-secondary">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-turquoise-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-turquoise-600" />
                    </div>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                data-testid={`pricing-cta-${plan.id}`}
                className={`block w-full py-4 rounded-full font-semibold text-center transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-turquoise-100 text-turquoise-700 hover:bg-turquoise-200'
                }`}
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Razorpay Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-white rounded-xl border border-turquoise-200 max-w-2xl mx-auto"
        >
          <p className="text-center text-text-secondary text-sm">
            <strong className="text-turquoise-600">Secure Payment:</strong> All payments are processed securely via Razorpay. After payment, you'll receive Zoom class link via email/WhatsApp.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Mail className="w-4 h-4" /> Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have questions? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-heading text-2xl text-text-primary mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <a 
                href="tel:+919599539864" 
                data-testid="contact-phone"
                className="flex items-center gap-4 p-4 bg-turquoise-50 rounded-xl hover:bg-turquoise-100 transition-colors"
              >
                <div className="w-12 h-12 bg-turquoise-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p className="font-semibold text-text-primary">+91 9599 539864</p>
                </div>
              </a>
              
              <a 
                href="mailto:Speakupp3@gmail.com" 
                data-testid="contact-email"
                className="flex items-center gap-4 p-4 bg-turquoise-50 rounded-xl hover:bg-turquoise-100 transition-colors"
              >
                <div className="w-12 h-12 bg-turquoise-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="font-semibold text-text-primary">Speakupp3@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-4 bg-turquoise-50 rounded-xl">
                <div className="w-12 h-12 bg-turquoise-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Location</p>
                  <p className="font-semibold text-text-primary">Ghaziabad, Uttar Pradesh</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-text-secondary mb-4">Follow us on social media</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/emcee_sandhya?igsh=MTFiNGx3NWU3b3VjZQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="social-instagram"
                  className="w-12 h-12 bg-turquoise-100 rounded-xl flex items-center justify-center hover:bg-turquoise-500 hover:text-white transition-all text-turquoise-600"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="social-facebook"
                  className="w-12 h-12 bg-turquoise-100 rounded-xl flex items-center justify-center hover:bg-turquoise-500 hover:text-white transition-all text-turquoise-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sandhya-bhandari-1246ab111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="social-linkedin"
                  className="w-12 h-12 bg-turquoise-100 rounded-xl flex items-center justify-center hover:bg-turquoise-500 hover:text-white transition-all text-turquoise-600"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com/@anchorsandhya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="social-youtube"
                  className="w-12 h-12 bg-turquoise-100 rounded-xl flex items-center justify-center hover:bg-turquoise-500 hover:text-white transition-all text-turquoise-600"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Your Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                <input 
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                <textarea 
                  rows="5"
                  required
                  placeholder="How can we help you?"
                  className="form-input resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  data-testid="contact-message-input"
                ></textarea>
              </div>
              <button 
                type="submit"
                data-testid="contact-submit-btn"
                className="btn-primary w-full py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-turquoise-gradient text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl mb-6">
          Ready to Transform Your Life?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of others who have already started their journey to confidence and success with Speakupp.
        </p>
        <a
          href="#pricing"
          data-testid="cta-join"
          className="inline-flex items-center gap-2 bg-white text-turquoise-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-turquoise-50 transition-colors shadow-lg"
        >
          Join Zoom Class Today <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-turquoise-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">Speakupp</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering individuals to build confidence, master communication, and transform their lives through expert coaching.
            </p>
            <a 
              href="https://speakupp.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-turquoise-400 hover:text-turquoise-300 font-medium"
              data-testid="footer-domain"
            >
              www.speakupp.in
            </a>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-turquoise-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-turquoise-400 transition-colors">About</a></li>
              <li><a href="#classes" className="text-gray-400 hover:text-turquoise-400 transition-colors">Classes</a></li>
              <li><a href="#schedule" className="text-gray-400 hover:text-turquoise-400 transition-colors">Schedule</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-turquoise-400 transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-turquoise-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919599539864" className="text-gray-400 hover:text-turquoise-400 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +91 9599 539864
                </a>
              </li>
              <li>
                <a href="mailto:Speakupp3@gmail.com" className="text-gray-400 hover:text-turquoise-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Speakupp3@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Speakupp. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/emcee_sandhya?igsh=MTFiNGx3NWU3b3VjZQ==" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-turquoise-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-turquoise-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sandhya-bhandari-1246ab111" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-turquoise-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/@anchorsandhya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-turquoise-400 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <AboutSection />
        <PurposeSection />
        <ClassesSection />
        <TestimonialsSection />
        <ScheduleSection />
        <PricingSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
