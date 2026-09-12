import React, { useEffect, useRef, useState } from "react";
import {
  LuBookOpen,
  LuCalendar,
  LuCalendarDays,
  LuChevronDown,
  LuChevronRight,
  LuClock3,
  LuEllipsis,
  LuGraduationCap,
  LuPlus,
  LuUsersRound,
} from "react-icons/lu";

import "./ScheduleHeader.css";

const ScheduleHeader = ({
  onCreateSchedule,
  onToday,
  onViewCalendarSettings,
}) => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isTodayActive, setIsTodayActive] = useState(false);

  const createMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  /* =========================================================
     OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target)
      ) {
        setShowCreateMenu(false);
      }

      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCreateMenu(false);
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     TODAY
  ========================================================= */

  const handleToday = () => {
    setIsTodayActive(true);
    setShowMoreMenu(false);

    onToday?.();

    window.dispatchEvent(new CustomEvent("trainer-schedule-today"));

    setTimeout(() => {
      setIsTodayActive(false);
    }, 700);
  };

  /* =========================================================
     CREATE TRAINING SESSION
  ========================================================= */

  const handleCreateSchedule = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "training-session",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "training-session",
        },
      }),
    );
  };

  /* =========================================================
     CREATE QUIZ
  ========================================================= */

  const handleCreateQuiz = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "quiz",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "quiz",
        },
      }),
    );
  };

  /* =========================================================
     CREATE ASSESSMENT
  ========================================================= */

  const handleCreateAssessment = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "assessment",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "assessment",
        },
      }),
    );
  };

  /* =========================================================
     CALENDAR SETTINGS
  ========================================================= */

  const handleCalendarSettings = () => {
    setShowMoreMenu(false);

    onViewCalendarSettings?.();

    window.dispatchEvent(new CustomEvent("trainer-calendar-settings"));
  };

  /* =========================================================
     VIEW FULL SCHEDULE
  ========================================================= */

  const handleViewSchedule = () => {
    setShowMoreMenu(false);

    window.dispatchEvent(new CustomEvent("trainer-view-full-schedule"));
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="schedule-header">
      <div className="schedule-header-shell">
        {/* =================================================
            DECORATIVE GLASS ORBS
        ================================================= */}

        <span
          className="schedule-header-orb schedule-header-orb-one"
          aria-hidden="true"
        />

        <span
          className="schedule-header-orb schedule-header-orb-two"
          aria-hidden="true"
        />

        <span
          className="schedule-header-orb schedule-header-orb-three"
          aria-hidden="true"
        />

        {/* =================================================
            TOP / MAIN HEADER
        ================================================= */}

        <div className="schedule-header-main">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="schedule-header-left">
            {/* ===============================================
                BREADCRUMB
            =============================================== */}

            <nav className="schedule-breadcrumb" aria-label="Breadcrumb">
              <button
                type="button"
                className="schedule-breadcrumb-item schedule-breadcrumb-home"
                onClick={() => {
                  window.location.href = "/trainer";
                }}
              >
                <LuGraduationCap size={14} strokeWidth={1.8} />

                <span>Trainer Dashboard</span>
              </button>

              <LuChevronRight
                className="schedule-breadcrumb-arrow"
                size={13}
                strokeWidth={1.8}
              />

              <span className="schedule-breadcrumb-current">Schedule</span>
            </nav>

            {/* ===============================================
                TITLE
            =============================================== */}

            <div className="schedule-title-area">
              <span className="schedule-title-accent">TRAINER WORKSPACE</span>

              <h1>
                Trainer <span>Schedule</span>
              </h1>

              <p>
                Manage your upcoming training sessions, classes, assessments and
                scheduled activities in one place.
              </p>
            </div>
          </div>

          {/* =================================================
              CENTER ILLUSTRATION
          ================================================= */}

          <div className="schedule-illustration" aria-hidden="true">
            <div className="schedule-illustration-glow" />

            <div className="schedule-calendar-art">
              {/* Calendar rings */}

              <div className="schedule-calendar-rings">
                <span />
                <span />
                <span />
                <span />
              </div>

              {/* Calendar top */}

              <div className="schedule-calendar-top">
                <span />
                <span />
                <span />
              </div>

              {/* Calendar body */}

              <div className="schedule-calendar-body">
                <div className="schedule-calendar-line schedule-calendar-line-wide" />

                <div className="schedule-calendar-line schedule-calendar-line-short" />

                <div className="schedule-calendar-mini-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                {/* Calendar events */}

                <div className="schedule-calendar-event event-mint">
                  <span />
                </div>

                <div className="schedule-calendar-event event-peach">
                  <span />
                </div>

                <div className="schedule-calendar-event event-lavender">
                  <span />
                </div>
              </div>

              {/* Clock */}

              <div className="schedule-clock">
                <div className="schedule-clock-face">
                  <span className="schedule-clock-hour" />

                  <span className="schedule-clock-minute" />

                  <span className="schedule-clock-center" />
                </div>
              </div>
            </div>

            {/* Illustration caption */}

            <div className="schedule-art-caption">
              <span>Plan</span>

              <span>Teach</span>

              <span>Inspire</span>

              <i />
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE REMOVED
              
              Previously contained:
              - Date
              - Greeting
              - Quote
              - Create Schedule
              - Today
              - More menu
          ================================================= */}
        </div>

        {/* =================================================
            BOTTOM SUMMARY STRIP
        ================================================= */}

        <div className="schedule-header-summary">
          {/* =================================================
              ACTIVE COURSES
          ================================================= */}

          <button
            type="button"
            className="schedule-summary-card schedule-summary-mint"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "active-courses",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuBookOpen size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Active Courses</small>

              <strong>6</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              TOTAL BATCHES
          ================================================= */}

          <button
            type="button"
            className="schedule-summary-card schedule-summary-sky"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "total-batches",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuUsersRound size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Total Batches</small>

              <strong>12</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              SCHEDULED THIS WEEK
          ================================================= */}

          <button
            type="button"
            className="schedule-summary-card schedule-summary-peach"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "scheduled-this-week",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuGraduationCap size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Scheduled This Week</small>

              <strong>18</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              TOTAL HOURS
          ================================================= */}

          <button
            type="button"
            className="schedule-summary-card schedule-summary-lavender"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "total-hours",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuClock3 size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Total Hours</small>

              <strong>24.5 hrs</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              NAVY MOTIVATIONAL CARD
          ================================================= */}

          <div className="schedule-summary-message">
            <div className="schedule-summary-message-icon">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 17L9 12L13 15L20 7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M16 7H20V11"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="schedule-summary-message-content">
              <strong>Keep Going!</strong>

              <span>
                Consistent teaching
                <br />
                builds stronger learners.
              </span>
            </div>

            <div className="schedule-summary-wave" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleHeader;
