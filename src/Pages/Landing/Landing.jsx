import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiChevronDown,
  FiCompass,
  FiGlobe,
  FiMenu,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

import Button from "../../Reusable_components/Button/Button";
import Dropdown from "../../Reusable_components/Dropdown/Dropdown";
import SearchBar from "../../Reusable_components/SearchBar/SearchBar";
import Card from "../../Reusable_components/Card/Card";

// src/assets/Images/landing_backdrop_2.jpeg
// src/assets/Images/capacity_connect_logo.png
// src/assets/Images/landing_backdrop_3.jpg
// src/assets/Images/landing_backdrop.jpg
import backdropImage from "../../assets/Images/landing_backdrop_5.jpg";

import "./Landing.css";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /* =========================================================
     NAVBAR SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (query) => {
    const value = String(query ?? "").trim();

    if (!value) return;

    console.log("Capacity Connect search:", value);
  };

  const handlePopularSearch = (value) => {
    setSearchValue(value);
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleAction = (action) => {
    console.log(action);

    setMobileOpen(false);
  };

  /* =========================================================
     EXPLORE DROPDOWN
  ========================================================= */

  const exploreItems = [
    {
      id: "courses",
      label: "Courses",
      value: "courses",
      description: "Explore learning opportunities",
      onClick: () => handleAction("Courses"),
    },
    {
      id: "learning-paths",
      label: "Learning Paths",
      value: "learning-paths",
      description: "Follow structured development journeys",
      onClick: () => handleAction("Learning Paths"),
    },
    {
      id: "competencies",
      label: "Competencies",
      value: "competencies",
      description: "Explore capability areas",
      onClick: () => handleAction("Competencies"),
    },
    {
      id: "assessment",
      label: "Skill Assessment",
      value: "assessment",
      description: "Understand your current capabilities",
      onClick: () => handleAction("Skill Assessment"),
    },
  ];

  /* =========================================================
     RESOURCE DROPDOWN
  ========================================================= */

  const resourceItems = [
    {
      id: "knowledge-hub",
      label: "Knowledge Hub",
      value: "knowledge-hub",
      description: "Explore knowledge and insights",
      onClick: () => handleAction("Knowledge Hub"),
    },
    {
      id: "guidelines",
      label: "Guidelines & Policies",
      value: "guidelines",
      description: "Official documents and guidance",
      onClick: () => handleAction("Guidelines & Policies"),
    },
    {
      id: "research",
      label: "Research Resources",
      value: "research",
      description: "Research and technical resources",
      onClick: () => handleAction("Research Resources"),
    },
  ];

  /* =========================================================
     POPULAR SEARCHES
  ========================================================= */

  const popularSearches = [
    "Data Analysis",
    "Remote Sensing",
    "Ocean Science",
    "Leadership",
    "Project Management",
  ];

  return (
    <main className="landing">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="landing__hero"
        style={{
          "--landing-backdrop": `url("${backdropImage}")`,
        }}
      >
        <div className="landing__hero-image" />
        <div className="landing__hero-overlay" />
        <div className="landing__hero-vignette" />

        {/* ===================================================
            MAIN NAVBAR
        ==================================================== */}

        <header
          className={[
            "landing__header",
            isScrolled ? "landing__header--scrolled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="landing__navbar">
            {/* -------------------------------------------------
                LEFT: BRAND
            -------------------------------------------------- */}

            <a
              href="#top"
              className="landing__brand"
              aria-label="Capacity Connect"
            >
              <span className="landing__brand-logo">
                <span className="landing__brand-wave landing__brand-wave--1" />
                <span className="landing__brand-wave landing__brand-wave--2" />
                <span className="landing__brand-wave landing__brand-wave--3" />
              </span>

              <span className="landing__brand-text">
                <strong>CAPACITY CONNECT</strong>

                <small>LEARN. DEVELOP. GROW.</small>
              </span>
            </a>

            {/* -------------------------------------------------
                CENTER: NAVIGATION
            -------------------------------------------------- */}

            <nav className="landing__nav" aria-label="Primary navigation">
              <div className="landing__nav-dropdown">
                <Dropdown
                  items={exploreItems}
                  placeholder="Explore"
                  appearance="dark"
                  variant="ghost"
                  size="sm"
                  width="260px"
                  placement="bottom-start"
                  showArrow
                  ariaLabel="Explore"
                />
              </div>

              <button
                type="button"
                className="landing__nav-link"
                onClick={() => handleAction("About")}
              >
                About
              </button>

              <div className="landing__nav-dropdown">
                <Dropdown
                  items={resourceItems}
                  placeholder="Resources"
                  appearance="dark"
                  variant="ghost"
                  size="sm"
                  width="265px"
                  placement="bottom-start"
                  showArrow
                  ariaLabel="Resources"
                />
              </div>

              <button
                type="button"
                className="landing__nav-link"
                onClick={() => handleAction("How It Works")}
              >
                How It Works
              </button>
            </nav>

            {/* -------------------------------------------------
                RIGHT: ACTIONS
            -------------------------------------------------- */}

            <div className="landing__actions">
              <button
                type="button"
                className="landing__login"
                onClick={() => handleAction("Login")}
              >
                Login
              </button>

              <Button
                variant="primary"
                size="sm"
                rounded="full"
                className="landing__signup"
                onClick={() => handleAction("Sign Up")}
              >
                Sign Up
              </Button>
            </div>

            {/* -------------------------------------------------
                MOBILE
            -------------------------------------------------- */}

            <button
              type="button"
              className="landing__mobile-button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================== */}

          {mobileOpen && (
            <div className="landing__mobile-menu">
              <button type="button" onClick={() => handleAction("Explore")}>
                Explore
                <FiChevronDown />
              </button>

              <button type="button" onClick={() => handleAction("About")}>
                About
              </button>

              <button type="button" onClick={() => handleAction("Resources")}>
                Resources
                <FiChevronDown />
              </button>

              <button
                type="button"
                onClick={() => handleAction("How It Works")}
              >
                How It Works
              </button>

              <div className="landing__mobile-actions">
                <Button
                  variant="glass"
                  size="md"
                  rounded="full"
                  fullWidth
                  onClick={() => handleAction("Login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  rounded="full"
                  fullWidth
                  onClick={() => handleAction("Sign Up")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* ===================================================
            HERO CONTENT
        ==================================================== */}

        <div className="landing__content">
          {/* Government line */}

          <div className="landing__eyebrow">
            <span className="landing__eyebrow-line" />

            <span>GOVERNMENT OF INDIA</span>

            <b>•</b>

            <span>MINISTRY OF EARTH SCIENCES</span>

            <span className="landing__eyebrow-line" />
          </div>

          {/* Heading */}

          <h1 className="landing__title">
            <span>Empower your skills.</span>

            <span className="landing__title-gradient">
              Shape what comes next.
            </span>
          </h1>

          {/* Description */}

          <p className="landing__description">
            One connected learning ecosystem for building capabilities,
            discovering knowledge
            <br className="landing__description-break" />
            and growing a future-ready workforce.
          </p>

          {/* Search */}

          <div className="landing__search-wrapper">
            <SearchBar
              value={searchValue}
              onChange={(value) => {
                if (typeof value === "string") {
                  setSearchValue(value);
                } else {
                  setSearchValue(value?.target?.value ?? "");
                }
              }}
              onSearch={handleSearch}
              placeholder="Search courses, skills, resources..."
              appearance="glass"
              variant="default"
              size="xl"
              shape="pill"
              fullWidth
              bordered
              shadow={false}
              glow={false}
              animated
              searchOnEnter
            />
          </div>

          {/* Popular searches */}

          <div className="landing__popular">
            <span className="landing__popular-label">POPULAR</span>

            <div className="landing__popular-items">
              {popularSearches.map((item) => (
                <button
                  type="button"
                  className="landing__popular-pill"
                  key={item}
                  onClick={() => handlePopularSearch(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}

          <div className="landing__cta">
            <Button
              variant="primary"
              size="lg"
              rounded="lg"
              rightIcon={<FiArrowRight />}
              className="landing__primary-button"
              onClick={() => handleAction("Explore Capacity Connect")}
            >
              Explore Capacity Connect
            </Button>

            <button
              type="button"
              className="landing__how"
              onClick={() => handleAction("How It Works")}
            >
              <span className="landing__play">
                <FiPlay />
              </span>

              <span>See how it works</span>
            </button>
          </div>
        </div>

        {/* ===================================================
            BOTTOM INFORMATION
        ==================================================== */}

        <div className="landing__bottom">
          <div className="landing__bottom-rule" />

          <div className="landing__bottom-columns">
            <div className="landing__bottom-column">
              <strong>LEARN</strong>

              <span>Curated courses &amp; pathways</span>
            </div>

            <div className="landing__bottom-column">
              <strong>DEVELOP</strong>

              <span>Competency-led growth</span>
            </div>

            <div className="landing__bottom-column">
              <strong>GROW</strong>

              <span>A future-ready workforce</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__about" id="about">
        {/* =====================================================
            SECTION DECORATION
        ====================================================== */}

        <div className="landing__about-art" aria-hidden="true">
          <span className="landing__about-orbit landing__about-orbit--outer" />
          <span className="landing__about-orbit landing__about-orbit--middle" />
          <span className="landing__about-orbit landing__about-orbit--inner" />

          <span className="landing__about-accent landing__about-accent--one" />
          <span className="landing__about-accent landing__about-accent--two" />
          <span className="landing__about-accent landing__about-accent--three" />
        </div>

        <div className="landing__about-container">
          {/* ===================================================
              HEADING
          ==================================================== */}

          <div className="landing__about-heading">
            <span className="landing__about-kicker">
              <i />
              THE CAPACITY CONNECT ECOSYSTEM
            </span>

            <h2>
              What is <span>Capacity Connect?</span>
            </h2>

            <p>
              A connected learning and capability ecosystem that brings people,
              knowledge and development opportunities together — helping
              individuals learn with purpose, build meaningful capabilities and
              discover what comes next.
            </p>
          </div>

          {/* ===================================================
              CONNECTED ECOSYSTEM VISUAL
          ==================================================== */}

          <section className="landing__capacity-connect">
            <div className="landing__capacity-orbit landing__capacity-orbit--one"></div>
            <div className="landing__capacity-orbit landing__capacity-orbit--two"></div>

            <div className="landing__capacity-grid">
              {/* ───────────────────────── LEARN ───────────────────────── */}
              <div className="landing__capacity-card landing__capacity-card--learn">
                <Card
                  variant="dark"
                  size="lg"
                  rounded="xl"
                  hover={true}
                  className="capacity-card capacity-card--dark"
                  icon={<FiBookOpen />}
                  badge="01"
                  badgeVariant="primary"
                  title="Build knowledge"
                  description="Discover courses, pathways and trusted learning resources aligned with your development goals."
                  meta={<span>Courses&nbsp; • &nbsp;Pathways</span>}
                  onAction={() => {}}
                  actionText="Explore learning"
                  actionIcon={<FiArrowRight />}
                />
              </div>

              {/* ──────────────────────── DEVELOP ──────────────────────── */}
              <div className="landing__capacity-card landing__capacity-card--develop">
                <Card
                  variant="default"
                  size="lg"
                  rounded="xl"
                  hover={true}
                  className="capacity-card capacity-card--light"
                  icon={<FiTarget />}
                  badge="02"
                  badgeVariant="info"
                  title="Build capability"
                  description="Assess strengths, identify gaps and focus on the competencies that create meaningful growth."
                  meta={<span>Competencies&nbsp; • &nbsp;Assessment</span>}
                  onAction={() => {}}
                  actionText="Build capability"
                  actionIcon={<FiArrowRight />}
                />
              </div>

              {/* ─────────────────────── DISCOVER ─────────────────────── */}
              <div className="landing__capacity-card landing__capacity-card--discover">
                <Card
                  variant="info"
                  size="lg"
                  rounded="xl"
                  hover={true}
                  className="capacity-card capacity-card--cyan"
                  icon={<FiCompass />}
                  badge="03"
                  badgeVariant="primary"
                  title="Find what comes next"
                  description="Explore knowledge, opportunities and development directions that connect learning with future goals."
                  meta={<span>Knowledge&nbsp; • &nbsp;Opportunities</span>}
                  onAction={() => {}}
                  actionText="Discover opportunities"
                  actionIcon={<FiArrowRight />}
                />
              </div>
            </div>

            {/* ───────────────────── CENTRAL CONNECTION ───────────────────── */}
            <div className="landing__capacity-core">
              <div className="landing__capacity-core-ring">
                <div className="landing__capacity-core-icon">
                  <FiGlobe />
                </div>

                <span className="landing__capacity-core-name">CAPACITY</span>

                <span className="landing__capacity-core-subtitle">CONNECT</span>
              </div>
            </div>

            {/* Connection points */}
            <span className="landing__capacity-node landing__capacity-node--left"></span>
            <span className="landing__capacity-node landing__capacity-node--right"></span>
            <span className="landing__capacity-node landing__capacity-node--bottom"></span>
          </section>

          {/* ===================================================
              SIMPLE ECOSYSTEM STATEMENT
          ==================================================== */}

          <div className="landing__about-bottom">
            <span className="landing__about-bottom-line" />

            <div className="landing__about-bottom-text">
              <span>EVERYTHING CONNECTS</span>

              <p>
                Learn
                <b> · </b>
                Develop
                <b> · </b>
                Discover
                <b> · </b>
                Grow
              </p>
            </div>

            <span className="landing__about-bottom-line" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
