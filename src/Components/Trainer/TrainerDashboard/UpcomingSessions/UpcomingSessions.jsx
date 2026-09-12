import React, { useMemo, useState } from "react";

import {
  LuCalendarDays,
  LuChevronLeft,
  LuChevronRight,
  LuClock3,
  LuVideo,
  LuMapPin,
  LuUsersRound,
  LuArrowUpRight,
  LuPalette,
  LuDatabase,
  LuBookOpen,
  LuChartNoAxesCombined,
} from "react-icons/lu";

import "./UpcomingSessions.css";

// =====================================================
// SESSION DATA
// =====================================================

const sessions = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    date: "Mar 11, 2025",
    time: "02:00 PM – 03:30 PM",
    type: "Online",
    icon: LuPalette,
    theme: "purple",
  },
  {
    id: 2,
    title: "Database Design",
    date: "Mar 12, 2025",
    time: "10:00 AM – 11:30 AM",
    type: "On Campus",
    icon: LuDatabase,
    theme: "green",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    date: "Mar 13, 2025",
    time: "01:00 PM – 02:30 PM",
    type: "Online",
    icon: LuBookOpen,
    theme: "orange",
  },
  {
    id: 4,
    title: "Project Review & Feedback",
    date: "Mar 14, 2025",
    time: "11:00 AM – 12:30 PM",
    type: "On Campus",
    icon: LuChartNoAxesCombined,
    theme: "rose",
  },
];

// =====================================================
// EVENT DATE DATA
// =====================================================

const calendarEvents = {
  "2025-03-11": "purple",
  "2025-03-12": "green",
  "2025-03-13": "orange",
  "2025-03-14": "red",
};

// =====================================================
// DATE HELPERS
// =====================================================

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isSameDate = (dateOne, dateTwo) => {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
};

// =====================================================
// UPCOMING SESSIONS
// =====================================================

const UpcomingSessions = () => {
  const today = new Date();

  // ===================================================
  // CALENDAR STATE
  // ===================================================

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState(today);

  // ===================================================
  // CALENDAR MONTH / YEAR
  // ===================================================

  const calendarMonth = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // ===================================================
  // PREVIOUS MONTH
  // ===================================================

  const handlePreviousMonth = () => {
    setCurrentMonth(
      (previousMonth) =>
        new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1),
    );
  };

  // ===================================================
  // NEXT MONTH
  // ===================================================

  const handleNextMonth = () => {
    setCurrentMonth(
      (nextMonth) =>
        new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1),
    );
  };

  // ===================================================
  // SELECT DATE
  // ===================================================

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    // If the user clicks a date belonging to the
    // previous or next month, automatically move
    // the calendar to that month.
    if (
      date.getMonth() !== currentMonth.getMonth() ||
      date.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  // ===================================================
  // GENERATE CALENDAR DAYS
  // ===================================================

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the current month
    const firstDayOfMonth = new Date(year, month, 1);

    // Last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Sunday = 0
    // Monday = 1
    // ...
    // Saturday = 6
    const startingDay = firstDayOfMonth.getDay();

    const totalDaysInMonth = lastDayOfMonth.getDate();

    // Number of days in the previous month
    const previousMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // =================================================
    // PREVIOUS MONTH DAYS
    // =================================================

    for (let index = startingDay - 1; index >= 0; index--) {
      const day = previousMonthLastDay - index;

      const date = new Date(year, month - 1, day);

      days.push({
        date,
        day,
        muted: true,
      });
    }

    // =================================================
    // CURRENT MONTH DAYS
    // =================================================

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(year, month, day);

      const dateKey = getDateKey(date);

      days.push({
        date,
        day,
        muted: false,
        today: isSameDate(date, today),
        selected: isSameDate(date, selectedDate),
        event: calendarEvents[dateKey] || null,
      });
    }

    // =================================================
    // NEXT MONTH DAYS
    // =================================================

    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);

      days.push({
        date,
        day,
        muted: true,
      });
    }

    return days;
  }, [currentMonth, selectedDate, today]);

  // ===================================================
  // GO TO TODAY
  // ===================================================

  const handleToday = () => {
    const todayDate = new Date();

    setCurrentMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));

    setSelectedDate(todayDate);
  };

  return (
    <section className="trainer-upcoming-sessions">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="upcoming-sessions-header">
        <div className="upcoming-sessions-heading">
          <div className="upcoming-sessions-title-icon">
            <LuCalendarDays />
          </div>

          <div className="upcoming-sessions-heading-text">
            <h2>Upcoming Sessions</h2>

            <p>Your next classes and training sessions</p>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT GRID
      ================================================= */}

      <div className="upcoming-sessions-grid">
        {/* =================================================
            NEXT SESSION - DARK NAVY
        ================================================= */}

        <article className="next-session-card">
          <div className="next-session-glow"></div>

          <div className="next-session-header">
            <div>
              <span className="next-session-label">Next Session</span>

              <div className="next-session-time">
                <span className="session-live-dot"></span>

                <span>In 2 hours</span>
              </div>
            </div>

            <button
              type="button"
              className="next-session-arrow"
              aria-label="Open next session"
            >
              <LuChevronRight />
            </button>
          </div>

          {/* SESSION INFORMATION */}

          <div className="next-session-course">
            <div className="next-session-course-icon">
              <LuBookOpen />
            </div>

            <div className="next-session-course-info">
              <h3>React Development</h3>

              <p>Building Interactive UIs</p>
            </div>
          </div>

          <div className="next-session-divider"></div>

          {/* DETAILS */}

          <div className="next-session-details">
            <div className="next-session-detail">
              <LuCalendarDays />

              <span>Today, Mar 10</span>

              <strong>10:00 AM – 11:30 AM</strong>
            </div>

            <div className="next-session-detail">
              <LuVideo />

              <span>Online Session</span>

              <strong>Google Meet</strong>
            </div>

            <div className="next-session-detail">
              <LuUsersRound />

              <span>24 Learners</span>

              <strong>Enrolled</strong>
            </div>
          </div>

          {/* JOIN BUTTON */}

          <button type="button" className="join-session-button">
            <span>Join Session</span>

            <LuArrowUpRight />
          </button>
        </article>

        {/* =================================================
            SESSION LIST
        ================================================= */}

        <article className="upcoming-list-card">
          <div className="upcoming-list-header">
            <div>
              <h3>Upcoming Sessions</h3>

              <p>Scheduled training activities</p>
            </div>

            <button type="button" className="view-all-sessions">
              <span>View All</span>

              <LuArrowUpRight />
            </button>
          </div>

          <div className="session-list">
            {sessions.map((session) => {
              const SessionIcon = session.icon;

              return (
                <div className="session-item" key={session.id}>
                  {/* SESSION ICON */}

                  <div
                    className={`session-item-icon session-item-${session.theme}`}
                  >
                    <SessionIcon />
                  </div>

                  {/* SESSION CONTENT */}

                  <div className="session-item-content">
                    <h4>{session.title}</h4>

                    <div className="session-item-meta">
                      <span>
                        <LuCalendarDays />

                        {session.date}
                      </span>

                      <span>
                        <LuClock3 />

                        {session.time}
                      </span>
                    </div>
                  </div>

                  {/* SESSION TYPE */}

                  <span
                    className={`session-type session-type-${session.theme}`}
                  >
                    {session.type === "Online" ? <LuVideo /> : <LuMapPin />}

                    {session.type}
                  </span>

                  {/* ARROW */}

                  <button
                    type="button"
                    className="session-item-arrow"
                    aria-label={`Open ${session.title}`}
                  >
                    <LuChevronRight />
                  </button>
                </div>
              );
            })}
          </div>
        </article>

        {/* =================================================
            CALENDAR + QUICK ACTION
        ================================================= */}

        <div className="upcoming-right-column">
          {/* =================================================
              REAL CALENDAR
          ================================================= */}

          <article className="session-calendar-card">
            {/* CALENDAR HEADER */}

            <div className="calendar-header">
              <button
                type="button"
                className="calendar-nav-button"
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                <LuChevronLeft />
              </button>

              <h3>{calendarMonth}</h3>

              <button
                type="button"
                className="calendar-nav-button"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <LuChevronRight />
              </button>
            </div>

            {/* TODAY BUTTON */}

            <button
              type="button"
              className="calendar-today-button"
              onClick={handleToday}
            >
              Today
            </button>

            {/* WEEKDAYS */}

            <div className="calendar-weekdays">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* CALENDAR GRID */}

            <div className="calendar-grid">
              {calendarDays.map((item) => {
                const dateKey = getDateKey(item.date);

                return (
                  <button
                    type="button"
                    key={dateKey}
                    className={`
                      calendar-day
                      ${item.muted ? "calendar-day-muted" : ""}
                      ${item.today ? "calendar-day-today" : ""}
                      ${item.selected ? "calendar-day-active" : ""}
                      ${item.event ? `calendar-event-${item.event}` : ""}
                    `}
                    onClick={() => handleDateSelect(item.date)}
                    aria-label={item.date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    aria-pressed={item.selected}
                  >
                    <span>{item.day}</span>

                    {item.event && <i className="calendar-event-dot"></i>}
                  </button>
                );
              })}
            </div>
          </article>

          {/* =================================================
              SCHEDULE SESSION
          ================================================= */}

          <button type="button" className="schedule-session-card">
            <div className="schedule-session-icon">
              <LuCalendarDays />
            </div>

            <div className="schedule-session-content">
              <h3>Schedule a Session</h3>

              <p>Plan and create new training sessions for your learners.</p>
            </div>

            <LuChevronRight className="schedule-session-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSessions;
