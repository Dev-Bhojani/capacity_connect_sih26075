import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiEye,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMenu,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const closeNavigation = () => {
    setMobileOpen(false);
  };

  /*
   * Explore and Resources intentionally redirect to Login.
   * This matches the behavior of the Contact Us page.
   */

  const handleExplore = () => {
    closeNavigation();
    navigate("/login");
  };

  const handleResources = () => {
    closeNavigation();
    navigate("/login");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLandingSection = (id) => {
    closeNavigation();

    navigate("/");

    window.setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 180);
  };

  /* =========================================================
     PURPOSE DATA
  ========================================================= */

  const missionCards = [
    {
      title: "Our Mission",
      description:
        "To democratise learning and build capabilities for a stronger, more inclusive India.",
      icon: FiTarget,
      theme: "blue",
    },
    {
      title: "Our Vision",
      description:
        "A future-ready India where every individual has the skills and opportunities to thrive.",
      icon: FiEye,
      theme: "green",
    },
    {
      title: "Our Values",
      description:
        "Inclusivity, integrity, innovation and impact in everything we do.",
      icon: FiHeart,
      theme: "peach",
    },
  ];

  /* =========================================================
     JOURNEY DATA
  ========================================================= */

  const journeyItems = [
    {
      year: "2021",
      title: "The Beginning",
      text: "Conceptualised a unified learning platform.",
    },
    {
      year: "2022",
      title: "Building Together",
      text: "Launched initial learning programmes with partners.",
    },
    {
      year: "2023",
      title: "Growing Impact",
      text: "Reached 500K+ learners across India.",
    },
    {
      year: "2024",
      title: "Expanding Horizons",
      text: "Introduced new initiatives and learning resources.",
    },
    {
      year: "2025",
      title: "A Stronger Tomorrow",
      text: "1M+ learners and a growing learning ecosystem.",
    },
  ];

  /* =========================================================
     IMPACT DATA
  ========================================================= */

  const impactCards = [
    {
      title: "Individuals",
      description: "Building careers and creating new opportunities.",
      icon: FiTarget,
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
      theme: "blue",
    },
    {
      title: "Institutions",
      description: "Strengthening organisational capabilities.",
      icon: FiBriefcase,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
      theme: "green",
    },
    {
      title: "Communities",
      description: "Creating inclusive growth opportunities.",
      icon: FiUsers,
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85",
      theme: "purple",
    },
    {
      title: "A Stronger India",
      description: "Contributing to a skilled, resilient nation.",
      icon: FiGlobe,
      image:
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=900&q=85",
      theme: "peach",
    },
  ];

  /* =========================================================
     PARTNERS
  ========================================================= */

  const partners = [
    "Government of India",
    "MeitY",
    "NITI Aayog",
    "Digital India",
    "Skill India",
    "Azadi Ka Amrit Mahotsav",
  ];

  return (
    <div className="about-page">
      {/* =====================================================
          ABOUT US NAVBAR
      ===================================================== */}

      <header
        className={[
          "about-page__header",
          isScrolled ? "about-page__header--scrolled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="about-page__navbar">
          {/* BRAND */}

          <button
            type="button"
            className="about-page__brand"
            onClick={() => navigate("/")}
            aria-label="Capacity Connect Home"
          >
            <span className="about-page__brand-logo">
              <span className="about-page__brand-wave about-page__brand-wave--1" />
              <span className="about-page__brand-wave about-page__brand-wave--2" />
              <span className="about-page__brand-wave about-page__brand-wave--3" />
            </span>

            <span className="about-page__brand-text">
              <strong>CAPACITY CONNECT</strong>
              <small>LEARN. DEVELOP. GROW.</small>
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}

          <nav className="about-page__nav" aria-label="Primary navigation">
            {/* EXPLORE */}

            <button
              type="button"
              className="about-page__nav-link"
              onClick={handleExplore}
            >
              Explore
            </button>

            {/* ABOUT */}

            <button
              type="button"
              className="about-page__nav-link"
              onClick={() => scrollToSection("about-page__introduction")}
            >
              About
            </button>

            {/* RESOURCES */}

            <button
              type="button"
              className="about-page__nav-link"
              onClick={handleResources}
            >
              Resources
            </button>

            {/* HOW IT WORKS */}

            <button
              type="button"
              className="about-page__nav-link"
              onClick={() => handleLandingSection("how-it-works")}
            >
              How It Works
            </button>

            {/* ABOUT US */}

            <button
              type="button"
              className="about-page__nav-link about-page__nav-link--active"
              onClick={() => scrollToSection("about-page__introduction")}
            >
              About Us
            </button>

            {/* CONTACT US */}

            <button
              type="button"
              className="about-page__nav-link"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </button>
          </nav>

          {/* ACTIONS */}

          <div className="about-page__actions">
            <button
              type="button"
              className="about-page__login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              type="button"
              className="about-page__signup"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            className="about-page__mobile-button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}

        {mobileOpen && (
          <div className="about-page__mobile-menu">
            {/* EXPLORE */}

            <button type="button" onClick={handleExplore}>
              <span>Explore</span>
              <FiArrowRight />
            </button>

            {/* ABOUT */}

            <button
              type="button"
              onClick={() => {
                scrollToSection("about-page__introduction");
                closeNavigation();
              }}
            >
              About
            </button>

            {/* RESOURCES */}

            <button type="button" onClick={handleResources}>
              <span>Resources</span>
              <FiArrowRight />
            </button>

            {/* HOW IT WORKS */}

            <button
              type="button"
              onClick={() => handleLandingSection("how-it-works")}
            >
              How It Works
            </button>

            {/* ABOUT US */}

            <button
              type="button"
              onClick={() => {
                scrollToSection("about-page__introduction");
                closeNavigation();
              }}
            >
              About Us
            </button>

            {/* CONTACT US */}

            <button
              type="button"
              onClick={() => {
                closeNavigation();
                navigate("/contact-us");
              }}
            >
              Contact Us
            </button>

            {/* MOBILE ACTIONS */}

            <div className="about-page__mobile-actions">
              <button
                type="button"
                className="about-page__mobile-login"
                onClick={() => {
                  closeNavigation();
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                type="button"
                className="about-page__mobile-signup"
                onClick={() => {
                  closeNavigation();
                  navigate("/register");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="about-page__hero" id="about-page__introduction">
          <div className="about-page__hero-glow about-page__hero-glow-one" />
          <div className="about-page__hero-glow about-page__hero-glow-two" />

          <div className="about-page__container about-page__hero-grid">
            <div className="about-page__hero-content">
              <div className="about-page__eyebrow">
                <span>ABOUT</span>
                <strong>CAPACITY CONNECT</strong>
                <i />
              </div>

              <h1>
                Empowering People.
                <span> Strengthening </span>
                Tomorrow.
              </h1>

              <p className="about-page__hero-description">
                Capacity Connect is a unified learning platform designed to
                build skills, enable leadership and support a more capable,
                inclusive and future-ready India.
              </p>

              <div className="about-page__hero-actions">
                <button
                  type="button"
                  className="about-page__primary-button"
                  onClick={() => scrollToSection("about-page__journey")}
                >
                  <span>Our Story</span>
                  <FiArrowRight />
                </button>

                <button
                  type="button"
                  className="about-page__outline-button"
                  onClick={() => scrollToSection("about-page__impact")}
                >
                  <FiUsers />
                  <span>Meet the Community</span>
                </button>
              </div>

              <div className="about-page__hero-stats">
                <div>
                  <strong>1M+</strong>
                  <span>Learners Empowered</span>
                </div>

                <div>
                  <strong>500+</strong>
                  <span>Learning Resources</span>
                </div>

                <div>
                  <strong>100+</strong>
                  <span>Partner Organisations</span>
                </div>
              </div>
            </div>

            <div className="about-page__hero-visual">
              <div className="about-page__hero-main-image">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85"
                  alt="Learners collaborating"
                />

                <div className="about-page__image-overlay">
                  <span>SKILLS</span>
                  <strong>for a Brighter India</strong>
                  <i />
                </div>
              </div>

              <div className="about-page__floating-card about-page__floating-card-one">
                <div className="about-page__floating-icon about-page__floating-green">
                  <FiHeart />
                </div>

                <div>
                  <strong>Learning today.</strong>
                  <span>A stronger tomorrow.</span>
                </div>
              </div>

              <div className="about-page__floating-card about-page__floating-card-two">
                <div className="about-page__floating-mini-image">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=85"
                    alt="People learning together"
                  />
                </div>

                <div>
                  <strong>People</strong>
                  <span>Progress</span>
                  <small>Possibilities</small>
                </div>
              </div>

              <span className="about-page__visual-orb about-page__visual-orb-one" />
              <span className="about-page__visual-orb about-page__visual-orb-two" />
            </div>
          </div>
        </section>

        {/* ===================================================
            PURPOSE
        =================================================== */}

        <section className="about-page__purpose">
          <div className="about-page__container">
            <div className="about-page__section-heading">
              <span>WHAT DRIVES US</span>

              <h2>Purpose behind every learning opportunity.</h2>

              <p>
                Everything we build is guided by a simple belief: capability
                creates opportunity, and opportunity creates progress.
              </p>
            </div>

            <div className="about-page__purpose-grid">
              {missionCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    className={`about-page__purpose-card about-page__purpose-${card.theme}`}
                    key={card.title}
                  >
                    <div className="about-page__purpose-icon">
                      <Icon />
                    </div>

                    <div className="about-page__purpose-content">
                      <h3>{card.title}</h3>

                      <p>{card.description}</p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Learn more about ${card.title}`}
                      onClick={() => scrollToSection("about-page__journey")}
                    >
                      <FiArrowRight />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            JOURNEY
        =================================================== */}

        <section className="about-page__journey" id="about-page__journey">
          <div className="about-page__journey-glow about-page__journey-glow-one" />
          <div className="about-page__journey-glow about-page__journey-glow-two" />

          <div className="about-page__container about-page__journey-grid">
            <div className="about-page__journey-intro">
              <span className="about-page__dark-eyebrow">OUR JOURNEY</span>

              <h2>
                Built for People.
                <span>Driven by Impact.</span>
              </h2>

              <p>
                From a simple idea to a nationwide learning ecosystem, our
                journey is powered by a shared belief — that people are
                India&apos;s greatest strength.
              </p>

              <button
                type="button"
                className="about-page__dark-button"
                onClick={() => scrollToSection("about-page__impact")}
              >
                <span>Explore Milestones</span>
                <FiArrowRight />
              </button>
            </div>

            <div className="about-page__timeline">
              <div className="about-page__timeline-line" />

              {journeyItems.map((item) => (
                <div className="about-page__timeline-item" key={item.year}>
                  <div className="about-page__timeline-dot">
                    <span />
                  </div>

                  <div className="about-page__timeline-year">{item.year}</div>

                  <div className="about-page__timeline-content">
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            LEADERSHIP
        =================================================== */}

        <section className="about-page__leadership">
          <div className="about-page__container about-page__leadership-grid">
            <div className="about-page__quote-card">
              <span className="about-page__quote-mark">“</span>

              <p>
                We believe that when people learn, communities grow,
                institutions strengthen and nations thrive.
              </p>

              <div className="about-page__quote-person">
                <div className="about-page__quote-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=500&q=85"
                    alt="Program Director"
                  />
                </div>

                <div>
                  <strong>Dr. Ananya Rao</strong>
                  <span>Program Director</span>
                  <small>Capacity Connect</small>
                </div>
              </div>
            </div>

            <div className="about-page__leadership-side">
              <div className="about-page__mini-impact-grid">
                <div className="about-page__mini-impact about-page__mini-blue">
                  <FiUsers />
                  <strong>1M+</strong>
                  <span>Active Learners</span>
                </div>

                <div className="about-page__mini-impact about-page__mini-green">
                  <FiBookOpen />
                  <strong>500+</strong>
                  <span>Courses & Resources</span>
                </div>

                <div className="about-page__mini-impact about-page__mini-purple">
                  <FiBriefcase />
                  <strong>100+</strong>
                  <span>Partner Organisations</span>
                </div>

                <div className="about-page__mini-impact about-page__mini-peach">
                  <FiGlobe />
                  <strong>28+</strong>
                  <span>States & UTs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            IMPACT
        =================================================== */}

        <section className="about-page__impact" id="about-page__impact">
          <div className="about-page__container">
            <div className="about-page__section-heading about-page__impact-heading">
              <span>OUR IMPACT</span>

              <h2>Real Learning. Real Change.</h2>

              <p>
                Creating opportunities, building skills and enabling progress
                across communities.
              </p>
            </div>

            <div className="about-page__impact-grid">
              {impactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    className={`about-page__impact-card about-page__impact-${card.theme}`}
                    key={card.title}
                  >
                    <div className="about-page__impact-information">
                      <div className="about-page__impact-icon">
                        <Icon />
                      </div>

                      <h3>{card.title}</h3>

                      <p>{card.description}</p>
                    </div>

                    <div className="about-page__impact-image">
                      <img src={card.image} alt={card.title} />
                    </div>

                    <span className="about-page__impact-shine" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            PARTNERS
        =================================================== */}

        <section className="about-page__partners">
          <div className="about-page__container">
            <div className="about-page__partners-heading">
              <span>
                TRUSTED BY GOVERNMENT, INSTITUTIONS AND LEARNING PARTNERS
              </span>
            </div>

            <div className="about-page__partners-list">
              {partners.map((partner, index) => (
                <div className="about-page__partner" key={partner}>
                  <div className="about-page__partner-symbol">
                    {index === 0 && <FiAward />}
                    {index === 1 && <FiGlobe />}
                    {index === 2 && <FiTarget />}
                    {index === 3 && <FiLayers />}
                    {index === 4 && <FiBookOpen />}
                    {index === 5 && <FiHeart />}
                  </div>

                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        <section className="about-page__cta-section">
          <div className="about-page__container">
            <div className="about-page__cta">
              <div className="about-page__cta-decoration about-page__cta-decoration-one" />
              <div className="about-page__cta-decoration about-page__cta-decoration-two" />

              <div className="about-page__cta-content">
                <span>BE A PART OF OUR JOURNEY</span>

                <h2>Let&apos;s build a more capable India together.</h2>

                <p>Learn, collaborate and contribute to a brighter future.</p>
              </div>

              <div className="about-page__cta-actions">
                <button
                  type="button"
                  className="about-page__primary-button"
                  onClick={() => navigate("/register")}
                >
                  <span>Get Started</span>
                  <FiArrowRight />
                </button>

                <button
                  type="button"
                  className="about-page__outline-button"
                  onClick={() => navigate("/contact-us")}
                >
                  <FiMessageCircle />
                  <span>Contact Us</span>
                </button>
              </div>

              <div className="about-page__cta-leaf about-page__cta-leaf-one" />
              <div className="about-page__cta-leaf about-page__cta-leaf-two" />
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="about-page__footer">
        <div className="about-page__container about-page__footer-grid">
          <div className="about-page__footer-brand">
            <button
              type="button"
              className="about-page__footer-brand-link"
              onClick={() => navigate("/")}
            >
              <span className="about-page__footer-logo">
                <span />
                <span />
                <span />
              </span>

              <span>
                <strong>CAPACITY CONNECT</strong>
                <small>LEARN. DEVELOP. GROW.</small>
              </span>
            </button>

            <p>
              Building a skilled, inclusive and future-ready India through
              meaningful learning.
            </p>
          </div>

          <div className="about-page__footer-links">
            <button type="button" onClick={() => navigate("/")}>
              Home
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("about-page__introduction")}
            >
              About
            </button>

            {/* Resources now redirects to Login */}

            <button type="button" onClick={handleResources}>
              Resources
            </button>

            <button type="button" onClick={() => navigate("/contact-us")}>
              Contact Us
            </button>

            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>

          <div className="about-page__footer-social">
            <button type="button" aria-label="LinkedIn">
              in
            </button>

            <button type="button" aria-label="Twitter">
              𝕏
            </button>

            <button type="button" aria-label="YouTube">
              ▶
            </button>

            <button type="button" aria-label="Instagram">
              ◎
            </button>
          </div>
        </div>

        <div className="about-page__footer-bottom">
          <div className="about-page__container">
            <span>© 2026 Capacity Connect. All rights reserved.</span>

            <div>
              <button type="button">Privacy</button>
              <button type="button">Terms</button>
              <button type="button">Accessibility</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
