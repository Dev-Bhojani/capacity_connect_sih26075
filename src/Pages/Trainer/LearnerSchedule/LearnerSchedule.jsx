import React, { useEffect, useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBookOpen,
  LuCalendar,
  LuCalendarDays,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuClock3,
  LuEllipsis,
  LuGraduationCap,
  LuMapPin,
  LuPlus,
  LuSearch,
  LuSlidersHorizontal,
  LuUsersRound,
  LuVideo,
  LuX,
} from "react-icons/lu";

import "./LearnerSchedule.css";

/* =========================================================
   SCHEDULE DATA
========================================================= */

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "React Development",
    type: "Training Session",
    date: "2026-09-02",
    startTime: "10:00",
    endTime: "11:30",
    trainer: "Arjun Mehta",
    batch: "Batch A",
    learners: 28,
    location: "Virtual Classroom",
    color: "blue",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Database Design Quiz",
    type: "Quiz",
    date: "2026-09-03",
    startTime: "12:00",
    endTime: "13:00",
    trainer: "Priya Shah",
    batch: "Batch B",
    learners: 24,
    location: "Online",
    color: "lavender",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    type: "Training Session",
    date: "2026-09-05",
    startTime: "11:00",
    endTime: "12:30",
    trainer: "Neha Kapoor",
    batch: "Batch C",
    learners: 26,
    location: "Design Lab",
    color: "peach",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Frontend Development",
    type: "Workshop",
    date: "2026-09-08",
    startTime: "10:30",
    endTime: "12:30",
    trainer: "Rahul Verma",
    batch: "Batch A",
    learners: 28,
    location: "Innovation Lab",
    color: "mint",
    status: "Completed",
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    type: "Training Session",
    date: "2026-09-09",
    startTime: "14:00",
    endTime: "15:30",
    trainer: "Amit Rao",
    batch: "Batch D",
    learners: 22,
    location: "Virtual Classroom",
    color: "blue",
    status: "Scheduled",
  },
  {
    id: 6,
    title: "Project Management Assessment",
    type: "Assessment",
    date: "2026-09-10",
    startTime: "11:00",
    endTime: "12:30",
    trainer: "Kavya Joshi",
    batch: "Batch B",
    learners: 24,
    location: "Assessment Center",
    color: "lavender",
    status: "Scheduled",
  },
  {
    id: 7,
    title: "Web Development",
    type: "Training Session",
    date: "2026-09-11",
    startTime: "09:30",
    endTime: "11:00",
    trainer: "Arjun Mehta",
    batch: "Batch A",
    learners: 28,
    location: "Virtual Classroom",
    color: "blue",
    status: "Scheduled",
  },
  {
    id: 8,
    title: "Career Readiness Workshop",
    type: "Workshop",
    date: "2026-09-12",
    startTime: "15:00",
    endTime: "16:30",
    trainer: "Riya Patel",
    batch: "Batch C",
    learners: 26,
    location: "Seminar Hall",
    color: "peach",
    status: "Scheduled",
  },
  {
    id: 9,
    title: "Data Structures",
    type: "Training Session",
    date: "2026-09-14",
    startTime: "10:00",
    endTime: "11:30",
    trainer: "Vikram Singh",
    batch: "Batch B",
    learners: 24,
    location: "Virtual Classroom",
    color: "mint",
    status: "Scheduled",
  },
  {
    id: 10,
    title: "Artificial Intelligence Quiz",
    type: "Quiz",
    date: "2026-09-15",
    startTime: "13:00",
    endTime: "14:00",
    trainer: "Sneha Rao",
    batch: "Batch C",
    learners: 26,
    location: "Online",
    color: "lavender",
    status: "Scheduled",
  },
  {
    id: 11,
    title: "Database Management",
    type: "Training Session",
    date: "2026-09-16",
    startTime: "10:30",
    endTime: "12:00",
    trainer: "Priya Shah",
    batch: "Batch D",
    learners: 22,
    location: "Virtual Classroom",
    color: "blue",
    status: "Scheduled",
  },
  {
    id: 12,
    title: "Team Project Review",
    type: "Assessment",
    date: "2026-09-17",
    startTime: "14:30",
    endTime: "16:00",
    trainer: "Rahul Verma",
    batch: "Batch A",
    learners: 28,
    location: "Innovation Lab",
    color: "peach",
    status: "Scheduled",
  },
  {
    id: 13,
    title: "React Project Workshop",
    type: "Workshop",
    date: "2026-09-18",
    startTime: "11:00",
    endTime: "13:00",
    trainer: "Arjun Mehta",
    batch: "Batch B",
    learners: 24,
    location: "Development Lab",
    color: "mint",
    status: "Scheduled",
  },
  {
    id: 14,
    title: "Cloud Computing",
    type: "Training Session",
    date: "2026-09-21",
    startTime: "09:30",
    endTime: "11:00",
    trainer: "Aman Shah",
    batch: "Batch C",
    learners: 26,
    location: "Virtual Classroom",
    color: "blue",
    status: "Scheduled",
  },
  {
    id: 15,
    title: "Cloud Fundamentals Quiz",
    type: "Quiz",
    date: "2026-09-22",
    startTime: "12:00",
    endTime: "13:00",
    trainer: "Aman Shah",
    batch: "Batch C",
    learners: 26,
    location: "Online",
    color: "lavender",
    status: "Scheduled",
  },
  {
    id: 16,
    title: "Final Project Assessment",
    type: "Assessment",
    date: "2026-09-24",
    startTime: "10:00",
    endTime: "12:00",
    trainer: "Kavya Joshi",
    batch: "Batch D",
    learners: 22,
    location: "Assessment Center",
    color: "peach",
    status: "Scheduled",
  },
];

/* =========================================================
   CONSTANTS
========================================================= */

const SESSION_TYPES = [
  "All Types",
  "Training Session",
  "Quiz",
  "Assessment",
  "Workshop",
];

const STATUS_OPTIONS = ["All Status", "Scheduled", "Completed", "Cancelled"];

const COURSE_OPTIONS = [
  "All Courses",
  "React Development",
  "Database Design Quiz",
  "UI/UX Design Fundamentals",
  "Frontend Development",
  "JavaScript Advanced Concepts",
  "Project Management Assessment",
  "Web Development",
  "Data Structures",
  "Artificial Intelligence Quiz",
  "Database Management",
  "Cloud Computing",
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* =========================================================
   HELPERS
========================================================= */

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatShortDate = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
};

const getMonthCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const previousMonthLastDay = new Date(year, month, 0).getDate();

  const days = [];

  for (let index = startOffset - 1; index >= 0; index -= 1) {
    const date = new Date(year, month - 1, previousMonthLastDay - index);

    days.push({
      date,
      key: getDateKey(date),
      currentMonth: false,
    });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);

    days.push({
      date,
      key: getDateKey(date),
      currentMonth: true,
    });
  }

  let nextDay = 1;

  while (days.length < 42) {
    const date = new Date(year, month + 1, nextDay);

    days.push({
      date,
      key: getDateKey(date),
      currentMonth: false,
    });

    nextDay += 1;
  }

  return days;
};

/* =========================================================
   COMPONENT
========================================================= */

const LearnerSchedule = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(getDateKey(today));

  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");

  const [viewMode, setViewMode] = useState("month");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [openFilter, setOpenFilter] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [events, setEvents] = useState(INITIAL_EVENTS);

  /* =====================================================
     CLOSE DROPDOWNS
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".learner-schedule-filter-wrapper")) {
        setOpenFilter(null);
      }

      if (!event.target.closest(".learner-schedule-more-wrapper")) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
        setShowMoreMenu(false);
        setSelectedEvent(null);
        setShowCreateModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     CALENDAR DAYS
  ===================================================== */

  const calendarDays = useMemo(
    () => getMonthCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  /* =====================================================
     FILTERED EVENTS
  ===================================================== */

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.trainer.toLowerCase().includes(normalizedSearch) ||
        event.batch.toLowerCase().includes(normalizedSearch);

      const matchesType =
        selectedType === "All Types" || event.type === selectedType;

      const matchesStatus =
        selectedStatus === "All Status" || event.status === selectedStatus;

      const matchesCourse =
        selectedCourse === "All Courses" || event.title === selectedCourse;

      return matchesSearch && matchesType && matchesStatus && matchesCourse;
    });
  }, [events, searchValue, selectedType, selectedStatus, selectedCourse]);

  /* =====================================================
     MONTH EVENTS
  ===================================================== */

  const monthEvents = useMemo(() => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);

      return (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  }, [filteredEvents, currentMonth, currentYear]);

  /* =====================================================
     UPCOMING EVENTS
  ===================================================== */

  const upcomingEvents = useMemo(() => {
    return filteredEvents
      .filter((event) => event.date >= getDateKey(today))
      .sort((first, second) => {
        return `${first.date}${first.startTime}`.localeCompare(
          `${second.date}${second.startTime}`,
        );
      })
      .slice(0, 4);
  }, [filteredEvents]);

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(getDateKey(today));
  };

  /* =====================================================
     EVENT ACTIONS
  ===================================================== */

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateSchedule = () => {
    setShowCreateModal(true);
  };

  const handleAddSchedule = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
    setShowCreateModal(false);
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const handleResetFilters = () => {
    setSearchValue("");
    setSelectedType("All Types");
    setSelectedStatus("All Status");
    setSelectedCourse("All Courses");
  };

  /* =====================================================
     DATE EVENTS
  ===================================================== */

  const getEventsForDate = (dateKey) => {
    return filteredEvents.filter((event) => event.date === dateKey);
  };

  /* =====================================================
     EVENT TYPE ICON
  ===================================================== */

  const getEventIcon = (type) => {
    if (type === "Quiz") {
      return LuGraduationCap;
    }

    if (type === "Assessment") {
      return LuCheck;
    }

    if (type === "Workshop") {
      return LuUsersRound;
    }

    return LuBookOpen;
  };

  /* =====================================================
     EVENT TYPE CLASS
  ===================================================== */

  const getEventTypeClass = (type) => {
    if (type === "Quiz") {
      return "type-quiz";
    }

    if (type === "Assessment") {
      return "type-assessment";
    }

    if (type === "Workshop") {
      return "type-workshop";
    }

    return "type-training";
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="learner-schedule-page">
      <div className="learner-schedule-shell">
        {/* =================================================
            DECORATIVE GLASS ELEMENTS
        ================================================= */}

        <span
          className="learner-schedule-orb learner-schedule-orb-one"
          aria-hidden="true"
        />

        <span
          className="learner-schedule-orb learner-schedule-orb-two"
          aria-hidden="true"
        />

        <span
          className="learner-schedule-orb learner-schedule-orb-three"
          aria-hidden="true"
        />

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="learner-schedule-header">
          <div className="learner-schedule-header-left">
            <nav
              className="learner-schedule-breadcrumb"
              aria-label="Breadcrumb"
            >
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/trainer";
                }}
              >
                <LuGraduationCap size={14} />
                <span>Trainer Dashboard</span>
              </button>

              <LuChevronRight size={13} />

              <span>Schedule</span>
            </nav>

            <div className="learner-schedule-heading">
              <span className="learner-schedule-eyebrow">
                TRAINER WORKSPACE
              </span>

              <div className="learner-schedule-title-row">
                <div className="learner-schedule-title-icon">
                  <LuCalendarDays size={21} strokeWidth={1.7} />
                </div>

                <div>
                  <h1>Schedule</h1>

                  <p>
                    Plan sessions, manage activities and keep your training
                    calendar organized.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="learner-schedule-header-right">
            <div className="learner-schedule-date-card">
              <div className="learner-schedule-date-icon">
                <LuCalendar size={19} strokeWidth={1.7} />
              </div>

              <div>
                <strong>
                  {today.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>

                <span>Stay organized. Teach with purpose.</span>
              </div>
            </div>

            <button
              type="button"
              className="learner-schedule-create-button"
              onClick={handleCreateSchedule}
            >
              <LuPlus size={17} strokeWidth={2} />
              <span>Create Schedule</span>
            </button>
          </div>
        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="learner-schedule-summary">
          <article className="schedule-summary-card summary-blue">
            <div className="schedule-summary-icon">
              <LuBookOpen size={18} />
            </div>

            <div>
              <span>Active Courses</span>
              <strong>6</strong>
            </div>

            <small>Currently teaching</small>
          </article>

          <article className="schedule-summary-card summary-mint">
            <div className="schedule-summary-icon">
              <LuUsersRound size={18} />
            </div>

            <div>
              <span>Total Batches</span>
              <strong>12</strong>
            </div>

            <small>Across all courses</small>
          </article>

          <article className="schedule-summary-card summary-peach">
            <div className="schedule-summary-icon">
              <LuCalendarDays size={18} />
            </div>

            <div>
              <span>This Month</span>
              <strong>{monthEvents.length}</strong>
            </div>

            <small>Scheduled activities</small>
          </article>

          <article className="schedule-summary-card summary-lavender">
            <div className="schedule-summary-icon">
              <LuClock3 size={18} />
            </div>

            <div>
              <span>Teaching Hours</span>
              <strong>24.5</strong>
            </div>

            <small>Planned this month</small>
          </article>

          <article className="schedule-summary-message">
            <div className="schedule-message-icon">
              <LuGraduationCap size={19} />
            </div>

            <div>
              <strong>Keep going!</strong>
              <span>Consistent teaching builds stronger learners.</span>
            </div>
          </article>
        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="learner-schedule-filters">
          <div className="learner-schedule-filter-top">
            <div className="learner-schedule-filter-title">
              <div>
                <LuSlidersHorizontal size={17} />
              </div>

              <div>
                <h2>Schedule Overview</h2>
                <p>Find and organize your scheduled activities.</p>
              </div>
            </div>

            <button
              type="button"
              className="learner-schedule-reset-button"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>

          <div className="learner-schedule-filter-row">
            <div className="learner-schedule-search">
              <LuSearch size={15} />

              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search sessions, trainers or batches..."
                aria-label="Search schedule"
              />

              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  aria-label="Clear search"
                >
                  <LuX size={13} />
                </button>
              )}
            </div>

            <div className="learner-schedule-filter-wrapper">
              <button
                type="button"
                className={`learner-schedule-select ${
                  openFilter === "course" ? "is-open" : ""
                }`}
                onClick={() =>
                  setOpenFilter((current) =>
                    current === "course" ? null : "course",
                  )
                }
              >
                <span>
                  <LuBookOpen size={14} />
                  {selectedCourse}
                </span>

                <LuChevronDown
                  size={14}
                  className={openFilter === "course" ? "rotate" : ""}
                />
              </button>

              {openFilter === "course" && (
                <div className="learner-schedule-filter-menu">
                  {COURSE_OPTIONS.map((course) => (
                    <button
                      type="button"
                      key={course}
                      className={selectedCourse === course ? "selected" : ""}
                      onClick={() => {
                        setSelectedCourse(course);
                        setOpenFilter(null);
                      }}
                    >
                      <span>{course}</span>

                      {selectedCourse === course && <LuCheck size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="learner-schedule-filter-wrapper">
              <button
                type="button"
                className={`learner-schedule-select ${
                  openFilter === "type" ? "is-open" : ""
                }`}
                onClick={() =>
                  setOpenFilter((current) =>
                    current === "type" ? null : "type",
                  )
                }
              >
                <span>
                  <LuCalendarDays size={14} />
                  {selectedType}
                </span>

                <LuChevronDown
                  size={14}
                  className={openFilter === "type" ? "rotate" : ""}
                />
              </button>

              {openFilter === "type" && (
                <div className="learner-schedule-filter-menu">
                  {SESSION_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={selectedType === type ? "selected" : ""}
                      onClick={() => {
                        setSelectedType(type);
                        setOpenFilter(null);
                      }}
                    >
                      <span>{type}</span>

                      {selectedType === type && <LuCheck size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="learner-schedule-filter-wrapper">
              <button
                type="button"
                className={`learner-schedule-select ${
                  openFilter === "status" ? "is-open" : ""
                }`}
                onClick={() =>
                  setOpenFilter((current) =>
                    current === "status" ? null : "status",
                  )
                }
              >
                <span>
                  <LuCheck size={14} />
                  {selectedStatus}
                </span>

                <LuChevronDown
                  size={14}
                  className={openFilter === "status" ? "rotate" : ""}
                />
              </button>

              {openFilter === "status" && (
                <div className="learner-schedule-filter-menu">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      type="button"
                      key={status}
                      className={selectedStatus === status ? "selected" : ""}
                      onClick={() => {
                        setSelectedStatus(status);
                        setOpenFilter(null);
                      }}
                    >
                      <span>{status}</span>

                      {selectedStatus === status && <LuCheck size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            CALENDAR SECTION
        ================================================= */}

        <section className="learner-schedule-calendar-section">
          <div className="learner-schedule-calendar-header">
            <div className="learner-calendar-heading">
              <div className="learner-calendar-month-icon">
                <LuCalendarDays size={19} />
              </div>

              <div>
                <h2>
                  {MONTHS[currentMonth]} {currentYear}
                </h2>

                <span>
                  {monthEvents.length} scheduled{" "}
                  {monthEvents.length === 1 ? "activity" : "activities"}
                </span>
              </div>
            </div>

            <div className="learner-calendar-controls">
              <div className="learner-calendar-nav">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                >
                  <LuChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  className="learner-calendar-today"
                  onClick={handleToday}
                >
                  <LuCalendar size={14} />
                  <span>Today</span>
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                >
                  <LuChevronRight size={16} />
                </button>
              </div>

              <div className="learner-calendar-view-toggle">
                <button
                  type="button"
                  className={viewMode === "month" ? "active" : ""}
                  onClick={() => setViewMode("month")}
                >
                  Month
                </button>

                <button
                  type="button"
                  className={viewMode === "agenda" ? "active" : ""}
                  onClick={() => setViewMode("agenda")}
                >
                  Agenda
                </button>
              </div>

              <div className="learner-schedule-more-wrapper">
                <button
                  type="button"
                  className="learner-calendar-more"
                  onClick={() => setShowMoreMenu((current) => !current)}
                  aria-expanded={showMoreMenu}
                  aria-label="More calendar options"
                >
                  <LuEllipsis size={18} />
                </button>

                {showMoreMenu && (
                  <div className="learner-calendar-more-menu">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode("month");
                        setShowMoreMenu(false);
                      }}
                    >
                      <LuCalendarDays size={14} />
                      Month View
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setViewMode("agenda");
                        setShowMoreMenu(false);
                      }}
                    >
                      <LuClock3 size={14} />
                      Agenda View
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        handleResetFilters();
                      }}
                    >
                      <LuSlidersHorizontal size={14} />
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              MONTH VIEW
          ================================================= */}

          {viewMode === "month" && (
            <div className="learner-calendar-layout">
              <div className="learner-calendar-main">
                <div className="learner-calendar-weekdays">
                  {WEEK_DAYS.map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                <div className="learner-calendar-grid">
                  {calendarDays.map((day) => {
                    const dayEvents = getEventsForDate(day.key);

                    const isToday = day.key === getDateKey(today);
                    const isSelected = day.key === selectedDate;

                    return (
                      <button
                        type="button"
                        key={day.key}
                        className={`learner-calendar-day ${
                          !day.currentMonth ? "outside-month" : ""
                        } ${isToday ? "today" : ""} ${
                          isSelected ? "selected-day" : ""
                        }`}
                        onClick={() => setSelectedDate(day.key)}
                      >
                        <div className="learner-calendar-day-number">
                          <span>{day.date.getDate()}</span>

                          {isToday && <i>Today</i>}
                        </div>

                        <div className="learner-calendar-events">
                          {dayEvents.slice(0, 3).map((event) => {
                            const EventIcon = getEventIcon(event.type);

                            return (
                              <span
                                key={event.id}
                                className={`learner-calendar-event event-${event.color}`}
                                onClick={(clickEvent) => {
                                  clickEvent.stopPropagation();
                                  handleEventClick(event);
                                }}
                              >
                                <EventIcon size={10} />

                                <span>{event.title}</span>
                              </span>
                            );
                          })}

                          {dayEvents.length > 3 && (
                            <span className="learner-calendar-more-events">
                              +{dayEvents.length - 3} more
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  RIGHT INFORMATION PANEL
              ================================================= */}

              <aside className="learner-calendar-sidebar">
                <div className="learner-selected-date-card">
                  <div className="selected-date-top">
                    <div className="selected-date-icon">
                      <LuCalendarDays size={17} />
                    </div>

                    <span>Selected Date</span>
                  </div>

                  <strong>{formatDisplayDate(selectedDate)}</strong>

                  <span>
                    {getEventsForDate(selectedDate).length} scheduled{" "}
                    {getEventsForDate(selectedDate).length === 1
                      ? "activity"
                      : "activities"}
                  </span>
                </div>

                <div className="learner-day-events">
                  <div className="learner-day-events-header">
                    <div>
                      <h3>Day Schedule</h3>
                      <span>Activities for this date</span>
                    </div>

                    <span>{getEventsForDate(selectedDate).length}</span>
                  </div>

                  {getEventsForDate(selectedDate).length === 0 ? (
                    <div className="learner-day-empty">
                      <div>
                        <LuCalendarDays size={18} />
                      </div>

                      <strong>No activities</strong>

                      <span>
                        There are no scheduled activities for this date.
                      </span>

                      <button type="button" onClick={handleCreateSchedule}>
                        <LuPlus size={13} />
                        Add Schedule
                      </button>
                    </div>
                  ) : (
                    <div className="learner-day-event-list">
                      {getEventsForDate(selectedDate).map((event) => {
                        const EventIcon = getEventIcon(event.type);

                        return (
                          <button
                            type="button"
                            key={event.id}
                            className={`learner-day-event learner-day-event-${event.color}`}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="learner-day-event-icon">
                              <EventIcon size={14} />
                            </div>

                            <div>
                              <strong>{event.title}</strong>

                              <span>
                                {formatTime(event.startTime)} –{" "}
                                {formatTime(event.endTime)}
                              </span>

                              <small>{event.type}</small>
                            </div>

                            <LuChevronRight size={14} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="learner-calendar-legend">
                  <h3>Session Types</h3>

                  <div className="calendar-legend-grid">
                    <span>
                      <i className="legend-blue" />
                      Training
                    </span>

                    <span>
                      <i className="legend-lavender" />
                      Quiz
                    </span>

                    <span>
                      <i className="legend-peach" />
                      Assessment
                    </span>

                    <span>
                      <i className="legend-mint" />
                      Workshop
                    </span>
                  </div>
                </div>

                <div className="learner-calendar-navy-card">
                  <div className="navy-card-icon">
                    <LuGraduationCap size={19} />
                  </div>

                  <div>
                    <strong>Teach with purpose.</strong>

                    <span>
                      A well-planned session creates a brighter tomorrow.
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* =================================================
              AGENDA VIEW
          ================================================= */}

          {viewMode === "agenda" && (
            <div className="learner-agenda-view">
              {monthEvents.length === 0 ? (
                <div className="learner-agenda-empty">
                  <div>
                    <LuCalendarDays size={25} />
                  </div>

                  <h3>No scheduled activities</h3>

                  <p>
                    No activities match your current filters for this month.
                  </p>

                  <button type="button" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                monthEvents.map((event) => {
                  const EventIcon = getEventIcon(event.type);

                  return (
                    <button
                      type="button"
                      key={event.id}
                      className={`learner-agenda-item agenda-${event.color}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="learner-agenda-date">
                        <strong>
                          {new Date(`${event.date}T00:00:00`).getDate()}
                        </strong>

                        <span>
                          {new Date(
                            `${event.date}T00:00:00`,
                          ).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                      </div>

                      <div className="learner-agenda-icon">
                        <EventIcon size={17} />
                      </div>

                      <div className="learner-agenda-content">
                        <div>
                          <strong>{event.title}</strong>

                          <span
                            className={`learner-agenda-type ${getEventTypeClass(
                              event.type,
                            )}`}
                          >
                            {event.type}
                          </span>
                        </div>

                        <p>
                          {formatTime(event.startTime)} –{" "}
                          {formatTime(event.endTime)} · {event.batch}
                        </p>
                      </div>

                      <div className="learner-agenda-meta">
                        <span>
                          <LuMapPin size={12} />
                          {event.location}
                        </span>

                        <span>
                          <LuUsersRound size={12} />
                          {event.learners} learners
                        </span>
                      </div>

                      <LuChevronRight size={16} />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </section>

        {/* =================================================
            UPCOMING SCHEDULE
        ================================================= */}

        <section className="learner-upcoming-section">
          <div className="learner-upcoming-header">
            <div>
              <span className="learner-section-eyebrow">NEXT ACTIVITIES</span>
              <h2>Upcoming Schedule</h2>
              <p>Your next sessions and scheduled activities.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setViewMode("agenda");
                window.scrollTo({
                  top: document.querySelector(
                    ".learner-schedule-calendar-section",
                  )?.offsetTop
                    ? document.querySelector(
                        ".learner-schedule-calendar-section",
                      ).offsetTop - 30
                    : 0,
                  behavior: "smooth",
                });
              }}
            >
              View Full Agenda
              <LuArrowRight size={14} />
            </button>
          </div>

          <div className="learner-upcoming-grid">
            {upcomingEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);

              return (
                <button
                  type="button"
                  key={event.id}
                  className={`learner-upcoming-card upcoming-${event.color}`}
                  onClick={() => {
                    setSelectedDate(event.date);
                    setSelectedEvent(event);

                    const eventDate = new Date(`${event.date}T00:00:00`);

                    setCurrentMonth(eventDate.getMonth());
                    setCurrentYear(eventDate.getFullYear());
                  }}
                >
                  <div className="upcoming-card-date">
                    <strong>{formatShortDate(event.date)}</strong>
                    <span>{formatTime(event.startTime)}</span>
                  </div>

                  <div className="upcoming-card-main">
                    <div className="upcoming-card-icon">
                      <EventIcon size={16} />
                    </div>

                    <div>
                      <strong>{event.title}</strong>
                      <span>{event.type}</span>
                    </div>
                  </div>

                  <div className="upcoming-card-footer">
                    <span>
                      <LuUsersRound size={12} />
                      {event.batch}
                    </span>

                    <LuChevronRight size={15} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* =====================================================
          EVENT DETAILS MODAL
      ===================================================== */}

      {selectedEvent && (
        <div
          className="learner-schedule-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEvent(null);
            }
          }}
        >
          <div className="learner-schedule-event-modal">
            <button
              type="button"
              className="learner-modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
            >
              <LuX size={17} />
            </button>

            <div
              className={`learner-modal-event-icon modal-${selectedEvent.color}`}
            >
              {React.createElement(getEventIcon(selectedEvent.type), {
                size: 22,
              })}
            </div>

            <span className="learner-modal-eyebrow">{selectedEvent.type}</span>

            <h2>{selectedEvent.title}</h2>

            <div className="learner-modal-details">
              <div>
                <LuCalendarDays size={15} />
                <span>{formatDisplayDate(selectedEvent.date)}</span>
              </div>

              <div>
                <LuClock3 size={15} />
                <span>
                  {formatTime(selectedEvent.startTime)} –{" "}
                  {formatTime(selectedEvent.endTime)}
                </span>
              </div>

              <div>
                <LuUsersRound size={15} />
                <span>
                  {selectedEvent.batch} · {selectedEvent.learners} learners
                </span>
              </div>

              <div>
                <LuMapPin size={15} />
                <span>{selectedEvent.location}</span>
              </div>

              <div>
                <LuGraduationCap size={15} />
                <span>Trainer: {selectedEvent.trainer}</span>
              </div>
            </div>

            <div className="learner-modal-status-row">
              <span
                className={`learner-modal-status status-${selectedEvent.status.toLowerCase()}`}
              >
                <i />
                {selectedEvent.status}
              </span>

              <button type="button" onClick={() => setSelectedEvent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CREATE SCHEDULE MODAL
      ===================================================== */}

      {showCreateModal && (
        <CreateScheduleModal
          selectedDate={selectedDate}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleAddSchedule}
        />
      )}
    </main>
  );
};

/* =========================================================
   CREATE SCHEDULE MODAL
========================================================= */

const CreateScheduleModal = ({ selectedDate, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Training Session");
  const [date, setDate] = useState(selectedDate);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:30");
  const [batch, setBatch] = useState("Batch A");
  const [location, setLocation] = useState("Virtual Classroom");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const colors = {
      "Training Session": "blue",
      Quiz: "lavender",
      Assessment: "peach",
      Workshop: "mint",
    };

    onCreate({
      title: title.trim(),
      type,
      date,
      startTime,
      endTime,
      trainer: "Current Trainer",
      batch,
      learners: batch === "Batch A" ? 28 : batch === "Batch B" ? 24 : 26,
      location,
      color: colors[type],
      status: "Scheduled",
    });
  };

  return (
    <div
      className="learner-schedule-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form className="learner-create-modal" onSubmit={handleSubmit}>
        <div className="learner-create-modal-header">
          <div>
            <span>Create New Activity</span>
            <h2>Add to Schedule</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create schedule"
          >
            <LuX size={17} />
          </button>
        </div>

        <div className="learner-create-form-grid">
          <label className="full-field">
            <span>Activity Title</span>

            <div className="create-input">
              <LuBookOpen size={14} />

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. React Development"
                required
              />
            </div>
          </label>

          <label>
            <span>Session Type</span>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              {SESSION_TYPES.slice(1).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Date</span>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Start Time</span>

            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </label>

          <label>
            <span>End Time</span>

            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Batch</span>

            <select
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
            >
              <option>Batch A</option>
              <option>Batch B</option>
              <option>Batch C</option>
              <option>Batch D</option>
            </select>
          </label>

          <label>
            <span>Location</span>

            <div className="create-input">
              <LuMapPin size={14} />

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </label>
        </div>

        <div className="learner-create-modal-footer">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit">
            <LuPlus size={15} />
            Create Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default LearnerSchedule;
