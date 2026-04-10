import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Check, 
  Star, 
  Play, 
  Calendar, 
  Clock, 
  Mail, 
  Instagram, 
  Linkedin, 
  Youtube,
  ChevronRight,
  Sparkles,
  Heart,
  Users,
  MessageCircle,
  ArrowRight
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

// Sandhya's actual photos
const HERO_IMAGE = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/o2qa7qs8_WhatsApp%20Image%202026-04-07%20at%208.53.56%20PM.jpeg"; // Professional selfie in pink blazer
const ABOUT_IMAGE = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/dn6ta4hk_WhatsApp%20Image%202026-04-07%20at%208.53.57%20PM.jpeg"; // Speaking at corporate event
const VIDEO_THUMBNAIL = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/qkrwthls_WhatsApp%20Image%202026-04-07%20at%208.53.57%20PM%20%282%29.jpeg"; // Event photo sparkly dress
const EVENT_IMAGE = "https://customer-assets.emergentagent.com/job_confidence-journey-6/artifacts/1dnv6cac_WhatsApp%20Image%202026-04-07%20at%208.53.57%20PM%20%281%29.jpeg"; // Event photo with arm raised

// Testimonial images
const TESTIMONIAL_IMAGES = [
  "https://images.unsplash.com/photo-1616154517532-0ae338354c63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHw0fHxoYXBweSUyMGNvbmZpZGVudCUyMHdvbWFufGVufDB8fHx8MTc3NTg0NzA3OXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGNvbmZpZGVudCUyMHdvbWFufGVufDB8fHx8MTc3NTg0NzA3OXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1736342181249-9e81c11737b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwzfHxoYXBweSUyMGNvbmZpZGVudCUyMHdvbWFufGVufDB8fHx8MTc3NTg0NzA3OXww&ixlib=rb-4.1.0&q=85"
];

// Data
const benefits = [
  { icon: Sparkles, title: "Build Unshakable Confidence", description: "Develop inner strength that stays with you in every situation" },
  { icon: MessageCircle, title: "Improve Communication Skills", description: "Express yourself clearly and connect authentically with others" },
  { icon: Heart, title: "Overcome Fear & Self-Doubt", description: "Break free from limiting beliefs that hold you back" },
  { icon: Users, title: "Become Your Best Version", description: "Unlock your full potential and live life on your terms" }
];

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "₹999",
    period: "/month",
    features: [
      "2 group Zoom sessions per month",
      "Access to session recordings",
      "Email support"
    ],
    popular: false
  },
  {
    id: "standard",
    name: "Standard",
    price: "₹1,999",
    period: "/month",
    features: [
      "Weekly group Zoom sessions",
      "Access to community support",
      "Session recordings",
      "Priority email support"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹3,999",
    period: "/month",
    features: [
      "Weekly group sessions",
      "1 private 1-on-1 session per month",
      "Priority support",
      "Personalized feedback",
      "Exclusive resources"
    ],
    popular: false
  }
];

const schedule = [
  { day: "Monday", time: "7:00 PM IST" },
  { day: "Wednesday", time: "7:00 PM IST" },
  { day: "Saturday", time: "7:00 PM IST" }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Marketing Executive",
    text: "Sandhya's classes have completely transformed how I present myself at work. I went from dreading meetings to confidently leading them!",
    rating: 5
  },
  {
    id: 2,
    name: "Anjali Mehta",
    role: "Entrepreneur",
    text: "After just 3 months with Sandhya, I successfully pitched to investors and secured funding. Her techniques are life-changing.",
    rating: 5
  },
  {
    id: 3,
    name: "Kavitha Reddy",
    role: "Software Engineer",
    text: "I used to struggle with public speaking. Now I regularly present at tech conferences. Thank you, Sandhya!",
    rating: 5
  }
];

// Components
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(45,42,38,0.05)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" data-testid="logo" className="font-heading text-2xl font-semibold text-text-primary">
            Speakupp
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" data-testid="nav-about" className="text-text-secondary hover:text-brand-primary transition-colors font-body">About</a>
            <a href="#benefits" data-testid="nav-benefits" className="text-text-secondary hover:text-brand-primary transition-colors font-body">Benefits</a>
            <a href="#pricing" data-testid="nav-pricing" className="text-text-secondary hover:text-brand-primary transition-colors font-body">Pricing</a>
            <a href="#schedule" data-testid="nav-schedule" className="text-text-secondary hover:text-brand-primary transition-colors font-body">Schedule</a>
            <a href="#testimonials" data-testid="nav-testimonials" className="text-text-secondary hover:text-brand-primary transition-colors font-body">Reviews</a>
          </nav>
          <a 
            href="#pricing" 
            data-testid="header-cta"
            className="btn-primary px-6 py-2.5 rounded-full font-body font-medium text-sm"
          >
            Join a Class
          </a>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="gradient-hero min-h-screen pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4"
            >
              Confidence Coach
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-6"
            >
              Unlock Your Confidence and <span className="text-brand-primary italic">Transform</span> Your Life
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="font-body text-lg text-text-secondary mb-8 max-w-lg"
            >
              Join Sandhya's live Zoom classes and become your most confident self. With over 7 years of experience helping hundreds transform their lives.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing" 
                data-testid="hero-cta-primary"
                className="btn-primary px-8 py-4 rounded-full font-body font-semibold text-center inline-flex items-center justify-center gap-2"
              >
                Join a Class <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#video" 
                data-testid="hero-cta-secondary"
                className="px-8 py-4 rounded-full font-body font-semibold text-text-primary border-2 border-border-medium hover:border-brand-primary transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Watch Intro
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-3xl blur-2xl"></div>
              <img 
                src={HERO_IMAGE}
                alt="Sandhya - Confidence Coach"
                data-testid="hero-image"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[4/5]"
              />
            </div>
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-text-primary">800+</p>
                  <p className="text-sm text-text-secondary">Events Hosted</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-primary-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-accent/30 to-transparent rounded-3xl"></div>
            <img 
              src={ABOUT_IMAGE}
              alt="Sandhya Bhandari"
              data-testid="about-image"
              className="relative w-full max-w-lg rounded-2xl shadow-xl object-cover aspect-[4/5]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
              About Sandhya
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-6">
              Your Guide to <span className="italic text-brand-primary">Unshakeable</span> Confidence
            </h2>
            <p className="font-body text-text-secondary mb-6 leading-relaxed">
              Sandhya Bhandari is one of the leading anchors and confidence coaches in Delhi/NCR. With a Master's degree in Journalism and Mass Communication, she has dedicated over 7 years to helping individuals overcome self-doubt, fear, and anxiety.
            </p>
            <p className="font-body text-text-secondary mb-8 leading-relaxed">
              Having hosted more than 800 events across the country, Sandhya brings unmatched expertise in communication, stage presence, and personal transformation. Her mission is to inspire and transform lives through her powerful coaching and ability to connect with people of all ages.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-brand-primary">7+</p>
                <p className="text-sm text-text-secondary">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-brand-primary">800+</p>
                <p className="text-sm text-text-secondary">Events Hosted</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-brand-primary">500+</p>
                <p className="text-sm text-text-secondary">Lives Transformed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="section-padding bg-primary-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
            Why Join
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Transform Every Area of Your Life
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Discover the profound benefits of building authentic confidence
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              data-testid={`benefit-card-${index}`}
              className="card p-8 md:p-10 group hover:border-brand-primary/30"
            >
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-text-primary mb-3">
                {benefit.title}
              </h3>
              <p className="font-body text-text-secondary">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="video" className="section-padding bg-primary-bg-secondary" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
            Introduction
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">
            Meet Sandhya
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video group cursor-pointer"
          data-testid="video-container"
        >
          <img 
            src={VIDEO_THUMBNAIL}
            alt="Meet Sandhya - Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-text-primary/30 group-hover:bg-text-primary/40 transition-colors"></div>
          <button 
            data-testid="play-video-btn"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 play-button-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-body text-sm opacity-80">Watch the full introduction</p>
            <p className="font-heading text-xl">Discover your potential</p>
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
    <section id="pricing" className="section-padding bg-primary-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
            Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Choose Your Journey
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Flexible plans designed to fit your needs and budget
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              data-testid={`pricing-card-${plan.id}`}
              className={`rounded-2xl p-8 md:p-10 relative ${
                plan.popular 
                  ? 'card-popular bg-white scale-105' 
                  : 'card bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl text-text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-4xl sm:text-5xl font-semibold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary font-body">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="font-body text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`pricing-cta-${plan.id}`}
                className={`block w-full py-4 rounded-full font-body font-semibold text-center transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-primary-bg-secondary text-text-primary hover:bg-brand-primary hover:text-white'
                }`}
              >
                Get Started
              </a>
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
    <section id="schedule" className="section-padding bg-primary-bg-secondary" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
            Schedule
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            Weekly Class Timings
          </h2>
          <p className="font-body text-text-secondary">
            All sessions are conducted via Zoom
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
        >
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              data-testid={`schedule-card-${index}`}
              className="card p-6 md:p-8 text-center hover:border-brand-primary/30"
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-2">{item.day}</h3>
              <div className="flex items-center justify-center gap-2 text-text-secondary">
                <Clock className="w-4 h-4" />
                <span className="font-body">{item.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-text-secondary font-body text-sm"
        >
          All times are in Indian Standard Time (IST)
        </motion.p>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding bg-primary-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-brand-primary mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-text-primary mb-4">
            What My Clients Say
          </h2>
          <p className="font-body text-text-secondary max-w-2xl mx-auto">
            Real stories from real people who transformed their lives
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              data-testid={`testimonial-card-${index}`}
              className="card p-8 md:p-10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-primary fill-brand-primary" />
                ))}
              </div>
              <p className="font-body text-text-secondary mb-8 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIAL_IMAGES[index]}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-lg text-text-primary">{testimonial.name}</p>
                  <p className="font-body text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-brand-primary to-brand-primary-hover" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Start Your Confidence Journey Today
          </h2>
          <p className="font-body text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step towards becoming your most confident self. Join hundreds of others who have already transformed their lives.
          </p>
          <a
            href="#pricing"
            data-testid="cta-book-spot"
            className="inline-flex items-center gap-2 bg-white text-brand-primary px-10 py-4 rounded-full font-body font-semibold text-lg hover:bg-primary-bg transition-colors hover:shadow-xl"
          >
            Book Your Spot <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary-bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="font-heading text-2xl font-semibold text-text-primary mb-4 block">
              Speakupp
            </a>
            <p className="font-body text-text-secondary mb-6 max-w-sm">
              Empowering individuals to unlock their confidence and transform their lives through expert coaching and guidance.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-instagram"
                className="w-10 h-10 bg-border-subtle rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors text-text-secondary"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="w-10 h-10 bg-border-subtle rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors text-text-secondary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-youtube"
                className="w-10 h-10 bg-border-subtle rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors text-text-secondary"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="font-body text-text-secondary hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="#benefits" className="font-body text-text-secondary hover:text-brand-primary transition-colors">Benefits</a></li>
              <li><a href="#pricing" className="font-body text-text-secondary hover:text-brand-primary transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="font-body text-text-secondary hover:text-brand-primary transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg text-text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@speakupp.com" 
                data-testid="contact-email"
                className="flex items-center gap-3 font-body text-text-secondary hover:text-brand-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@speakupp.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border-subtle pt-8">
          <p className="font-body text-sm text-text-secondary text-center">
            © {new Date().getFullYear()} Sandhya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
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
        <AboutSection />
        <BenefitsSection />
        <VideoSection />
        <PricingSection />
        <ScheduleSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
