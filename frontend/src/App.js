import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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

// Gallery photos for classes section - UPDATE THESE 3 IMAGES AS NEEDED
const GALLERY_IMAGES = [
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/ncc5ixdh_IMG_7945.JPG.jpeg", // Red dress at podium
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/n09dtor6_IMG_6361.JPEG", // Saree at awards
  "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/14jbmxm2_IMG_7948.JPEG" // Third photo
];

// Video URLs
const FEATURED_VIDEO_URL = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/dg9ocwnc_sandhya%20mam%20reel%202.mp4";
const INTRO_VIDEO_URL = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/5luqjwvo_video.mp4";

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
    period: "/class",
    amount: 19900, // Amount in paise for Razorpay
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
    period: "/class",
    amount: 29900, // Amount in paise for Razorpay
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
const ZOOM_MEETING_LINK = "https://us05web.zoom.us/j/83777965782?pwd=neVazmQIo8eg1RRil7iGfWQuD2zxSr.1";
// =====================================

// Schedule data - 2 classes per month, every 15 days
const getUpcomingClassDates = () => {
  const today = new Date();
  const dates = [];
  
  // Get the 1st and 15th of current or next months
  let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
  
  while (dates.length < 2) {
    // Check 1st of month
    const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    if (firstOfMonth > today) {
      dates.push(firstOfMonth);
    }
    
    // Check 15th of month
    const fifteenthOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
    if (fifteenthOfMonth > today && dates.length < 2) {
      dates.push(fifteenthOfMonth);
    }
    
    // Move to next month
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }
  
  return dates.slice(0, 2);
};

const formatClassDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Video - Main/Larger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" /> Featured Video
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Meet Sandhya
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Watch this to understand how SpeakUpp can help you uncover the confident version of yourself
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="video-container mb-16"
          data-testid="featured-video-container"
<iframe
  src="https://www.youtube.com/embed/0KMgIr-2C58"
  className="w-full rounded-2xl shadow-2xl"
  style={{aspectRatio: '9/16', maxHeight: '600px'}}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  data-testid="featured-video"
/>
</motion.div>
        {/* Introduction Video - Secondary/Smaller */}
        {/* Introduction Video - Secondary/Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-turquoise-100 text-turquoise-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" /> Introduction
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mb-2">
            More About SpeakUpp
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
          data-testid="intro-video-container"
        >
<iframe
  src="https://www.youtube.com/embed/BBPX6SfD5pY"
  className="w-full rounded-2xl shadow-lg"
  style={{aspectRatio: '9/16', maxHeight: '600px'}}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  data-testid="intro-video"
/>
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
              <div key={index} className={`${index === 0 ? 'col-span-2' : ''} overflow-hidden rounded-xl shadow-lg bg-white`}>
                <img 
                  src={img}
                  alt={`Session ${index + 1}`}
                  className="w-full h-auto object-contain"
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
  const upcomingDates = getUpcomingClassDates();

  return (
    <section id="schedule" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Upcoming Classes
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            2 classes per month, every 15 days. All sessions at <strong>7:00 PM IST</strong> via Zoom.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {upcomingDates.map((date, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              data-testid={`schedule-card-${index}`}
              className={`relative rounded-2xl p-8 bg-white border-2 transition-all hover:shadow-lg ${
                index === 0 
                  ? 'border-turquoise-500 shadow-lg' 
                  : 'border-gray-100 hover:border-turquoise-200'
              }`}
            >
              {index === 0 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-turquoise-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Next Class
                </span>
              )}
              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-turquoise-600" />
                </div>
                <h3 className="font-heading text-xl text-text-primary mb-2">{formatClassDate(date)}</h3>
                <div className="flex items-center justify-center gap-2 text-turquoise-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>7:00 PM IST</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-turquoise-50 to-turquoise-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-heading text-xl text-text-primary mb-3">How It Works</h3>
            <p className="text-text-secondary text-sm">
              Book your seat using the pricing plans below. After payment, you'll receive the Zoom meeting link via email instantly!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// API Base URL
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://speakupp-production.up.railway.app';

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const orderResponse = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          plan: plan.name,
          amount: plan.amount
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Open Razorpay modal
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SpeakUpp',
        description: plan.name,
        order_id: orderData.order_id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${API_BASE_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                name,
                email,
                plan: plan.name,
                amount: plan.amount
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              onSuccess(verifyData.zoom_link);
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name,
          email
        },
        theme: {
          color: '#14b8a6'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl text-text-primary">Book Your Seat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-turquoise-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-text-secondary">Selected Plan</p>
          <p className="font-heading text-xl text-turquoise-600">{plan.name} - {plan.price}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your full name"
              data-testid="payment-name-input"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              data-testid="payment-email-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2"
            data-testid="payment-submit-btn"
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>Pay {plan.price} <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secured by Razorpay. You'll receive Zoom link via email after payment.
        </p>
      </motion.div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, zoomLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-20 h-20 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-turquoise-600" />
        </div>
        <h3 className="font-heading text-2xl text-text-primary mb-2">Payment Successful!</h3>
        <p className="text-text-secondary mb-6">
          Your seat is confirmed! Check your email for the Zoom link.
        </p>
        
        <a
          href={zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 mb-4"
        >
          <Video className="w-5 h-5" /> Join Zoom Class
        </a>
        
        <button
          onClick={onClose}
          className="text-turquoise-600 font-medium hover:underline"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [zoomLink, setZoomLink] = useState('');

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (link) => {
    setZoomLink(link);
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

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
                onClick={() => handleBuyNow(plan)}
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
            <strong className="text-turquoise-600">Secure Payment:</strong> All payments are processed securely via Razorpay. After payment, you'll receive Zoom class link via email.
          </p>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          plan={selectedPlan}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        zoomLink={zoomLink}
      />
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

// Admin Page Component
const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [zoomLink, setZoomLink] = useState('');
  const [newZoomLink, setNewZoomLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchBookings();
      fetchZoomLink();
    } else {
      setMessage('Invalid password');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
        headers: { 'X-Admin-Password': 'admin123' }
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchZoomLink = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/zoom-link`);
      const data = await response.json();
      setZoomLink(data.zoom_link || '');
      setNewZoomLink(data.zoom_link || '');
    } catch (err) {
      console.error('Error fetching zoom link:', err);
    }
  };

  const updateZoomLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/zoom-link`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': 'admin123'
        },
        body: JSON.stringify({ zoom_link: newZoomLink })
      });
      const data = await response.json();
      if (data.success) {
        setZoomLink(newZoomLink);
        setMessage('Zoom link updated successfully!');
      }
    } catch (err) {
      setMessage('Error updating zoom link');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-turquoise-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-turquoise-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-turquoise-600" />
            </div>
            <h1 className="font-heading text-2xl text-text-primary">Admin Login</h1>
            <p className="text-text-secondary text-sm mt-2">Enter password to access admin panel</p>
          </div>
          
          {message && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
              {message}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mb-4"
              data-testid="admin-password-input"
            />
            <button
              type="submit"
              className="btn-primary w-full py-4 rounded-full font-semibold"
              data-testid="admin-login-btn"
            >
              Login
            </button>
          </form>
          
          <button
            onClick={() => navigate('/')}
            className="text-turquoise-600 text-sm mt-4 block mx-auto hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-turquoise-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary">Manage bookings and settings</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-turquoise-600 font-medium hover:underline"
          >
            Back to Website
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-turquoise-100 text-turquoise-700 p-4 rounded-xl mb-6">
            {message}
          </div>
        )}

        {/* Zoom Link Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="font-heading text-xl text-text-primary mb-4">Zoom Meeting Link</h2>
          <p className="text-text-secondary text-sm mb-4">Current: <a href={zoomLink} className="text-turquoise-600 hover:underline" target="_blank" rel="noopener noreferrer">{zoomLink}</a></p>
          
          <form onSubmit={updateZoomLink} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="Enter new Zoom link"
              value={newZoomLink}
              onChange={(e) => setNewZoomLink(e.target.value)}
              className="form-input flex-1"
              data-testid="zoom-link-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
              data-testid="update-zoom-btn"
            >
              {loading ? 'Updating...' : 'Update Link'}
            </button>
          </form>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-xl text-text-primary">All Bookings ({bookings.length})</h2>
            <button
              onClick={fetchBookings}
              className="text-turquoise-600 font-medium hover:underline text-sm"
            >
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-turquoise-50">
                  <th className="text-left p-4 font-semibold text-text-primary">ID</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Name</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Email</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Plan</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Amount</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Payment ID</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-text-secondary">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-turquoise-50/50">
                      <td className="p-4 text-text-secondary">{booking.id}</td>
                      <td className="p-4 text-text-primary font-medium">{booking.name}</td>
                      <td className="p-4 text-text-secondary">{booking.email}</td>
                      <td className="p-4">
                        <span className="bg-turquoise-100 text-turquoise-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.plan}
                        </span>
                      </td>
                      <td className="p-4 text-turquoise-600 font-semibold">₹{booking.amount / 100}</td>
                      <td className="p-4 text-text-secondary text-xs">{booking.payment_id}</td>
                      <td className="p-4 text-text-secondary text-sm">
                        {booking.created_at ? new Date(booking.created_at).toLocaleDateString('en-IN') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
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
    <div className="LandingPage">
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
};

// Main App Component with Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
