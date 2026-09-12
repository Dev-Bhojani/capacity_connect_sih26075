import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCopy,
  FiFacebook,
  FiGlobe,
  FiHeadphones,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShield,
  FiTwitter,
  FiX,
  FiYoutube,
} from "react-icons/fi";

import "./ContactUs.css";
import logo from "../../assets/Images/Final_logo_IMD.png";

const ContactUs = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [copiedItem, setCopiedItem] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const contactFormRef = useRef(null);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const scrollToSection = (id) => {
    setMobileOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/");
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about-us");
  };

  const handleLogin = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setMobileOpen(false);
    navigate("/register");
  };

  /*
    Explore and Resources now redirect to Login
    from the Contact Us page.
  */

  const handleExplore = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  const handleResources = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  /* =========================================================
     COPY CONTACT INFORMATION
  ========================================================= */

  const handleCopy = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopiedItem(type);

      window.setTimeout(() => {
        setCopiedItem("");
      }, 2200);
    } catch {
      setCopiedItem("");
    }
  };

  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (formStatus) {
      setFormStatus("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormStatus("Please complete all required fields.");
      return;
    }

    setFormStatus("Thank you. Your message has been prepared successfully.");

    setFormData({
      name: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
    });
  };

  /* =========================================================
     FAQ
  ========================================================= */

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? -1 : index));
  };

  /* =========================================================
     KEYBOARD / OUTSIDE BEHAVIOUR
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     DATA
  ========================================================= */

  const contactMethods = [
    {
      id: "email",
      icon: FiMail,
      eyebrow: "EMAIL",
      title: "Send us a message",
      value: "support@capacityconnect.gov.in",
      description:
        "For platform support, account questions and general enquiries.",
      action: "Copy email",
      copyValue: "support@capacityconnect.gov.in",
      theme: "lavender",
    },
    {
      id: "phone",
      icon: FiPhone,
      eyebrow: "PHONE",
      title: "Talk to our team",
      value: "+91 1800 123 4567",
      description: "Speak with our support team during official service hours.",
      action: "Copy number",
      copyValue: "+91 1800 123 4567",
      theme: "mint",
    },
    {
      id: "support",
      icon: FiHeadphones,
      eyebrow: "SUPPORT",
      title: "Platform assistance",
      value: "Support Centre",
      description:
        "Get help with learning, training, resources and platform access.",
      action: "Open support",
      theme: "peach",
    },
  ];

  const faqs = [
    {
      question: "How can I get help with my Capacity Connect account?",
      answer:
        "You can contact the support team through the form on this page or use the official email and phone details above. Include your account-related context so the team can route your request efficiently.",
    },
    {
      question: "Can organisations request training support?",
      answer:
        "Yes. Organisations can use the contact form to describe their training requirements, learner groups and expected outcomes. The appropriate team can then review the request.",
    },
    {
      question: "Where can I find learning resources?",
      answer:
        "Learning resources are available through the platform's Knowledge Hub. You can also explore courses and learning paths from the main Capacity Connect experience.",
    },
    {
      question: "How long does it take to receive a response?",
      answer:
        "Response time depends on the nature of the enquiry. Providing a clear subject, organisation details and a concise description helps the support team respond more efficiently.",
    },
  ];

  return (
    <main className="contact-page">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="contact-navbar">
        <div className="contact-navbar__inner">
          {/* BRAND */}

          <button
            type="button"
            className="contact-brand"
            onClick={handleHome}
            aria-label="Capacity Connect home"
          >
            <span className="contact-brand__logo">
              <img
                src={logo}
                alt="Capacity Connect"
                className="contact-brand__logo-image"
              />
            </span>

            <span className="contact-brand__text">
              <strong>CAPACITY CONNECT</strong>
              <small>LEARN. DEVELOP. GROW.</small>
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}

          <nav
            className="contact-navbar__navigation"
            aria-label="Primary navigation"
          >
            <button
              type="button"
              className="contact-navbar__link contact-navbar__link--dropdown"
              onClick={handleExplore}
            >
              Explore
              <FiChevronDown />
            </button>

            <button
              type="button"
              className="contact-navbar__link"
              onClick={() => navigate("/")}
            >
              About
            </button>

            <button
              type="button"
              className="contact-navbar__link contact-navbar__link--dropdown"
              onClick={handleResources}
            >
              Resources
              <FiChevronDown />
            </button>

            <button
              type="button"
              className="contact-navbar__link"
              onClick={() => navigate("/")}
            >
              How It Works
            </button>

            <button
              type="button"
              className="contact-navbar__link"
              onClick={handleAbout}
            >
              About Us
            </button>

            <button
              type="button"
              className="contact-navbar__link contact-navbar__link--active"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Contact Us
            </button>
          </nav>

          {/* ACTIONS */}

          <div className="contact-navbar__actions">
            <button
              type="button"
              className="contact-navbar__login"
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              type="button"
              className="contact-navbar__signup"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>

          {/* MOBILE */}

          <button
            type="button"
            className="contact-navbar__mobile-button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}

        {mobileOpen && (
          <div className="contact-mobile-menu">
            <button type="button" onClick={handleExplore}>
              Explore
              <FiChevronRight />
            </button>

            <button type="button" onClick={() => navigate("/")}>
              About
            </button>

            <button type="button" onClick={handleResources}>
              Resources
              <FiChevronRight />
            </button>

            <button type="button" onClick={() => navigate("/")}>
              How It Works
            </button>

            <button type="button" onClick={handleAbout}>
              About Us
            </button>

            <button
              type="button"
              className="contact-mobile-menu__active"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </button>

            <div className="contact-mobile-menu__actions">
              <button type="button" onClick={handleLogin}>
                Login
              </button>

              <button type="button" onClick={handleRegister}>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">
        <div className="contact-hero__orb contact-hero__orb--one" />
        <div className="contact-hero__orb contact-hero__orb--two" />

        <div className="contact-hero__grid">
          <div className="contact-hero__content">
            <div className="contact-eyebrow contact-eyebrow--light">
              <span />
              <strong>CONTACT CAPACITY CONNECT</strong>
              <span />
            </div>

            <h1>
              Let's build a stronger
              <span>learning ecosystem.</span>
            </h1>

            <p>
              Whether you need platform support, training assistance,
              partnership information or simply have a question, our team is
              here to help.
            </p>

            <div className="contact-hero__actions">
              <button
                type="button"
                className="contact-primary-button"
                onClick={() =>
                  contactFormRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                <span>Send an enquiry</span>
                <FiArrowRight />
              </button>

              <button
                type="button"
                className="contact-secondary-button"
                onClick={() => scrollToSection("contact-options")}
              >
                <FiMessageCircle />
                <span>Contact options</span>
              </button>
            </div>

            <div className="contact-hero__trust">
              <span className="contact-hero__trust-icon">
                <FiShield />
              </span>

              <div>
                <strong>Official support channel</strong>
                <span>Secure. Professional. Learner-focused.</span>
              </div>
            </div>
          </div>

          {/* HERO SIDE PANEL */}

          <div className="contact-hero__panel">
            <div className="contact-hero__panel-glow" />

            <div className="contact-hero__panel-top">
              <span className="contact-status-dot" />
              <span>Support team available</span>
            </div>

            <div className="contact-hero__panel-icon">
              <FiHeadphones />
            </div>

            <h2>We're here to listen.</h2>

            <p>
              Tell us what you need and we'll help direct your request to the
              right team.
            </p>

            <div className="contact-hero__panel-meta">
              <div>
                <FiClock />
                <span>Official service hours</span>
              </div>

              <div>
                <FiGlobe />
                <span>Available across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT OPTIONS
      ===================================================== */}

      <section id="contact-options" className="contact-options-section">
        <div className="contact-section-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <span />
              <strong>HOW CAN WE HELP?</strong>
              <span />
            </div>

            <h2>Choose the way that works for you.</h2>

            <p>
              Connect with Capacity Connect through the channel that best
              matches your requirement.
            </p>
          </div>

          <div className="contact-method-grid">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              return (
                <article
                  key={method.id}
                  className={`contact-method-card contact-method-card--${method.theme}`}
                >
                  <div className="contact-method-card__top">
                    <span className="contact-method-card__icon">
                      <Icon />
                    </span>

                    <span className="contact-method-card__number">
                      0{contactMethods.indexOf(method) + 1}
                    </span>
                  </div>

                  <span className="contact-method-card__eyebrow">
                    {method.eyebrow}
                  </span>

                  <h3>{method.title}</h3>

                  <button
                    type="button"
                    className="contact-method-card__value"
                    onClick={() => {
                      if (method.copyValue) {
                        handleCopy(method.copyValue, method.id);
                      } else {
                        scrollToSection("contact-form");
                      }
                    }}
                    title={
                      method.copyValue
                        ? `Copy ${method.copyValue}`
                        : "Open contact form"
                    }
                  >
                    <span>{method.value}</span>

                    {copiedItem === method.id ? <FiCheck /> : <FiCopy />}
                  </button>

                  <p>{method.description}</p>

                  <button
                    type="button"
                    className="contact-method-card__action"
                    onClick={() => {
                      if (method.copyValue) {
                        handleCopy(method.copyValue, method.id);
                      } else {
                        scrollToSection("contact-form");
                      }
                    }}
                  >
                    <span>
                      {copiedItem === method.id ? "Copied" : method.action}
                    </span>

                    <FiArrowRight />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FORM + INFORMATION
      ===================================================== */}

      <section
        id="contact-form"
        className="contact-form-section"
        ref={contactFormRef}
      >
        <div className="contact-form-container">
          {/* LEFT INFORMATION */}

          <aside className="contact-form-intro">
            <div className="contact-eyebrow">
              <span />
              <strong>GET IN TOUCH</strong>
              <span />
            </div>

            <h2>
              Tell us
              <span>what's on your mind.</span>
            </h2>

            <p>
              Share a little context about your request. A clear message helps
              us connect you with the right people faster.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-item__icon">
                  <FiMail />
                </span>

                <div>
                  <span>Email</span>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("support@capacityconnect.gov.in", "form-email")
                    }
                  >
                    {copiedItem === "form-email"
                      ? "Copied"
                      : "support@capacityconnect.gov.in"}
                  </button>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-item__icon">
                  <FiPhone />
                </span>

                <div>
                  <span>Phone</span>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("+91 1800 123 4567", "form-phone")
                    }
                  >
                    {copiedItem === "form-phone"
                      ? "Copied"
                      : "+91 1800 123 4567"}
                  </button>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-item__icon">
                  <FiMapPin />
                </span>

                <div>
                  <span>Service coverage</span>
                  <strong>Across India</strong>
                </div>
              </div>
            </div>

            <div className="contact-form-intro__note">
              <FiShield />

              <span>
                Your information is used only to understand and respond to your
                enquiry.
              </span>
            </div>
          </aside>

          {/* FORM */}

          <div className="contact-form-card">
            <div className="contact-form-card__header">
              <div>
                <span>ENQUIRY FORM</span>
                <h3>Send us a message</h3>
              </div>

              <span className="contact-form-card__mark">
                <FiSend />
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>
                    Full name <b>*</b>
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </label>

                <label className="contact-field">
                  <span>
                    Email address <b>*</b>
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="contact-field">
                  <span>Organisation</span>

                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleFormChange}
                    placeholder="Organisation or institution"
                    autoComplete="organization"
                  />
                </label>

                <label className="contact-field">
                  <span>
                    Subject <b>*</b>
                  </span>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="Platform Support">Platform Support</option>
                    <option value="Training Support">Training Support</option>
                    <option value="Learning Resources">
                      Learning Resources
                    </option>
                    <option value="Partnership">Partnership</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </label>
              </div>

              <label className="contact-field contact-field--message">
                <span>
                  Message <b>*</b>
                </span>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell us how we can help..."
                  rows="6"
                />
              </label>

              {formStatus && (
                <div
                  className={`contact-form-status ${
                    formStatus.startsWith("Please")
                      ? "contact-form-status--error"
                      : "contact-form-status--success"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <FiCheck />
                  <span>{formStatus}</span>
                </div>
              )}

              <div className="contact-form-footer">
                <p>
                  <span>*</span> Required fields
                </p>

                <button type="submit" className="contact-submit-button">
                  <span>Send enquiry</span>
                  <FiArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          DARK SUPPORT SECTION
      ===================================================== */}

      <section className="contact-support-section">
        <div className="contact-support__glow contact-support__glow--one" />
        <div className="contact-support__glow contact-support__glow--two" />

        <div className="contact-support-container">
          <div className="contact-support__main">
            <div className="contact-eyebrow contact-eyebrow--light">
              <span />
              <strong>NEED A QUICK ANSWER?</strong>
              <span />
            </div>

            <h2>
              Find your way around
              <span>Capacity Connect.</span>
            </h2>

            <p>
              Explore learning resources, discover courses or learn more about
              the platform before reaching out.
            </p>

            <div className="contact-support__actions">
              <button type="button" onClick={handleExplore}>
                <span>Explore courses</span>
                <FiArrowRight />
              </button>

              <button type="button" onClick={handleResources}>
                <span>Knowledge Hub</span>
                <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="contact-support__cards">
            <button
              type="button"
              className="contact-support-card contact-support-card--blue"
              onClick={handleAbout}
            >
              <span className="contact-support-card__icon">
                <FiGlobe />
              </span>

              <span className="contact-support-card__content">
                <strong>About Capacity Connect</strong>
                <span>Understand our mission and ecosystem.</span>
              </span>

              <FiChevronRight />
            </button>

            <button
              type="button"
              className="contact-support-card contact-support-card--mint"
              onClick={handleResources}
            >
              <span className="contact-support-card__icon">
                <FiMessageCircle />
              </span>

              <span className="contact-support-card__content">
                <strong>Explore Knowledge</strong>
                <span>Access useful learning resources.</span>
              </span>

              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="contact-faq-section">
        <div className="contact-section-container">
          <div className="contact-faq-layout">
            <div className="contact-faq-intro">
              <div className="contact-eyebrow">
                <span />
                <strong>COMMON QUESTIONS</strong>
                <span />
              </div>

              <h2>
                Before you
                <span>reach out.</span>
              </h2>

              <p>
                A few answers to common questions about getting support and
                navigating Capacity Connect.
              </p>

              <button
                type="button"
                className="contact-faq-link"
                onClick={() =>
                  contactFormRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                <span>Still need help?</span>
                <FiArrowRight />
              </button>
            </div>

            <div className="contact-faq-list">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;

                return (
                  <article
                    key={faq.question}
                    className={`contact-faq-item ${
                      isOpen ? "contact-faq-item--open" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="contact-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <FiChevronDown />
                    </button>

                    {isOpen && (
                      <div className="contact-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER CONTACT STRIP
      ===================================================== */}

      <footer className="contact-footer">
        <div className="contact-footer__inner">
          <div className="contact-footer__brand">
            <button
              type="button"
              className="contact-brand contact-brand--footer"
              onClick={handleHome}
            >
              <span className="contact-brand__logo">
                <img
                  src={logo}
                  alt="Capacity Connect"
                  className="contact-brand__logo-image"
                />
              </span>

              <span className="contact-brand__text">
                <strong>CAPACITY CONNECT</strong>
                <small>LEARN. DEVELOP. GROW.</small>
              </span>
            </button>

            <p>
              Connecting people, knowledge and opportunities through a modern
              learning ecosystem.
            </p>
          </div>

          <div className="contact-footer__links">
            <button type="button" onClick={handleHome}>
              Home
            </button>

            <button type="button" onClick={handleAbout}>
              About Us
            </button>

            <button type="button" onClick={handleResources}>
              Knowledge Hub
            </button>

            <button type="button" onClick={handleExplore}>
              Courses
            </button>
          </div>

          {/* =====================================================
              SOCIAL MEDIA
          ===================================================== */}

          <div className="contact-footer__socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FiFacebook />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              title="X / Twitter"
            >
              <FiTwitter />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <FiInstagram />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
            >
              <FiYoutube />
            </a>
          </div>
        </div>

        <div className="contact-footer__bottom">
          <span>© 2026 Capacity Connect. All rights reserved.</span>

          <div>
            <button type="button">Privacy</button>
            <button type="button">Terms</button>
            <button type="button">Accessibility</button>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ContactUs;
