import React, { useEffect, useRef, useState } from "react";

import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCheck,
  LuDownload,
  LuPlus,
  LuRefreshCw,
  LuUsersRound,
  LuBookOpen,
  LuLayers3,
} from "react-icons/lu";

import "./AttendanceHeader.css";

/* =========================================================
   ATTENDANCE HEADER
========================================================= */

const AttendanceHeader = ({ onMarkAttendance, onExport }) => {
  /* ======================================================
     DATE HELPERS
  ====================================================== */

  const getToday = () => {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatExportDate = (date) => {
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(/,/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* ======================================================
     INITIAL DATE
  ====================================================== */

  const initialToday = getToday();
  const today = initialToday;

  /* ======================================================
     LOCAL STATE
  ====================================================== */

  const [selectedDate, setSelectedDate] = useState(initialToday);

  const [calendarDate, setCalendarDate] = useState(
    new Date(initialToday.getFullYear(), initialToday.getMonth(), 1),
  );

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const [isExporting, setIsExporting] = useState(false);

  const headerRef = useRef(null);

  /* ======================================================
     CALENDAR INFORMATION
  ====================================================== */

  const monthName = calendarDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const year = calendarDate.getFullYear();

  /* ======================================================
     CALENDAR DAYS
  ====================================================== */

  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1,
    );

    const lastDayOfMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + 1,
      0,
    );

    const previousMonthLastDay = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      0,
    );

    const startingDay = firstDayOfMonth.getDay();

    const daysInMonth = lastDayOfMonth.getDate();

    const daysInPreviousMonth = previousMonthLastDay.getDate();

    const calendarDays = [];

    /* ====================================================
       PREVIOUS MONTH
    ==================================================== */

    for (let index = startingDay - 1; index >= 0; index--) {
      const day = daysInPreviousMonth - index;

      calendarDays.push({
        date: new Date(
          calendarDate.getFullYear(),
          calendarDate.getMonth() - 1,
          day,
        ),
        currentMonth: false,
      });
    }

    /* ====================================================
       CURRENT MONTH
    ==================================================== */

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        date: new Date(
          calendarDate.getFullYear(),
          calendarDate.getMonth(),
          day,
        ),
        currentMonth: true,
      });
    }

    /* ====================================================
       NEXT MONTH

       Fill calendar to 42 cells.
    ==================================================== */

    let nextMonthDay = 1;

    while (calendarDays.length < 42) {
      calendarDays.push({
        date: new Date(
          calendarDate.getFullYear(),
          calendarDate.getMonth() + 1,
          nextMonthDay,
        ),
        currentMonth: false,
      });

      nextMonthDay += 1;
    }

    return calendarDays;
  };

  const calendarDays = getCalendarDays();

  /* ======================================================
     OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ======================================================
     ESCAPE KEY
  ====================================================== */

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        setDateDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /* ======================================================
     DATE TOGGLE
  ====================================================== */

  const handleDateToggle = () => {
    setDateDropdownOpen((previous) => !previous);
  };

  /* ======================================================
     DATE CHANGE
  ====================================================== */

  const handleDateChange = (date) => {
    setSelectedDate(date);

    setCalendarDate(new Date(date.getFullYear(), date.getMonth(), 1));

    setDateDropdownOpen(false);
  };

  /* ======================================================
     PREVIOUS MONTH
  ====================================================== */

  const handlePreviousMonth = () => {
    setCalendarDate(
      (previous) =>
        new Date(previous.getFullYear(), previous.getMonth() - 1, 1),
    );
  };

  /* ======================================================
     NEXT MONTH
  ====================================================== */

  const handleNextMonth = () => {
    setCalendarDate(
      (previous) =>
        new Date(previous.getFullYear(), previous.getMonth() + 1, 1),
    );
  };

  /* ======================================================
     TODAY
  ====================================================== */

  const handleToday = () => {
    const currentDate = getToday();

    setSelectedDate(currentDate);

    setCalendarDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    );

    setDateDropdownOpen(false);
  };

  /* ======================================================
     CHECK TODAY
  ====================================================== */

  const isToday = (date) => {
    return getDateKey(date) === getDateKey(getToday());
  };

  /* ======================================================
     CHECK SELECTED DATE
  ====================================================== */

  const isSelectedDate = (date) => {
    return getDateKey(date) === getDateKey(selectedDate);
  };

  /* ======================================================
     MARK ATTENDANCE
  ====================================================== */

  const handleMarkAttendance = () => {
    const formattedDate = formatDate(selectedDate);

    if (onMarkAttendance) {
      onMarkAttendance({
        date: formattedDate,
      });

      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-mark-attendance", {
        detail: {
          date: formattedDate,
        },
      }),
    );
  };

  /* ======================================================
     EXPORT ATTENDANCE
  ====================================================== */

  const handleExport = () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    const formattedDate = formatDate(selectedDate);

    /* ====================================================
       ATTENDANCE DATA

       Replace this sample data later with your real
       attendance data from the backend/API.
    ==================================================== */

    const attendanceData = [
      {
        learnerId: "CC001",
        learnerName: "Aarav Sharma",
        course: "React for Beginners",
        batch: "Batch A",
        status: "Present",
      },
      {
        learnerId: "CC002",
        learnerName: "Ananya Patel",
        course: "React for Beginners",
        batch: "Batch A",
        status: "Present",
      },
      {
        learnerId: "CC003",
        learnerName: "Rohan Mehta",
        course: "Python for Data Science",
        batch: "Batch B",
        status: "Present",
      },
      {
        learnerId: "CC004",
        learnerName: "Priya Shah",
        course: "UI/UX Design Fundamentals",
        batch: "Batch C",
        status: "Present",
      },
      {
        learnerId: "CC005",
        learnerName: "Arjun Joshi",
        course: "Cloud Computing Basics",
        batch: "Batch D",
        status: "Absent",
      },
      {
        learnerId: "CC006",
        learnerName: "Kavya Desai",
        course: "Digital Marketing Strategy",
        batch: "Batch E",
        status: "Present",
      },
      {
        learnerId: "CC007",
        learnerName: "Dev Malhotra",
        course: "Node.js Backend Development",
        batch: "Batch F",
        status: "Present",
      },
      {
        learnerId: "CC008",
        learnerName: "Ishita Verma",
        course: "AI for Everyone",
        batch: "Batch G",
        status: "Present",
      },
      {
        learnerId: "CC009",
        learnerName: "Rahul Trivedi",
        course: "Flutter App Development",
        batch: "Batch H",
        status: "Absent",
      },
      {
        learnerId: "CC010",
        learnerName: "Meera Kapoor",
        course: "React for Beginners",
        batch: "Batch A",
        status: "Present",
      },
    ];

    /* ====================================================
       CALCULATE SUMMARY
    ==================================================== */

    const totalLearners = attendanceData.length;

    const presentCount = attendanceData.filter(
      (learner) => learner.status === "Present",
    ).length;

    const absentCount = attendanceData.filter(
      (learner) => learner.status === "Absent",
    ).length;

    const attendancePercentage =
      totalLearners > 0
        ? ((presentCount / totalLearners) * 100).toFixed(1)
        : "0.0";

    /* ====================================================
       CSV HEADER
    ==================================================== */

    const rows = [
      ["Date", "Learner ID", "Learner Name", "Course", "Batch", "Status"],
    ];

    /* ====================================================
       CSV DATA
    ==================================================== */

    attendanceData.forEach((learner) => {
      rows.push([
        formattedDate,
        learner.learnerId,
        learner.learnerName,
        learner.course,
        learner.batch,
        learner.status,
      ]);
    });

    /* ====================================================
       SUMMARY SECTION
    ==================================================== */

    rows.push([]);

    rows.push(["Attendance Summary"]);

    rows.push(["Selected Date", formattedDate]);

    rows.push(["Total Learners", totalLearners]);

    rows.push(["Present", presentCount]);

    rows.push(["Absent", absentCount]);

    rows.push(["Attendance Percentage", `${attendancePercentage}%`]);

    /* ====================================================
       CONVERT DATA TO CSV
    ==================================================== */

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const safeValue = String(value ?? "").replace(/"/g, '""');

            return `"${safeValue}"`;
          })
          .join(","),
      )
      .join("\n");

    /* ====================================================
       CREATE CSV FILE
    ==================================================== */

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    /* ====================================================
       DOWNLOAD FILE
    ==================================================== */

    const link = document.createElement("a");

    link.href = url;

    link.download = `attendance-${formatExportDate(selectedDate)}.csv`;

    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    /* ====================================================
       OPTIONAL EXTERNAL EXPORT HANDLER
    ==================================================== */

    if (onExport) {
      onExport({
        date: formattedDate,
        totalLearners,
        present: presentCount,
        absent: absentCount,
        attendance: `${attendancePercentage}%`,
        data: attendanceData,
      });
    }

    /* ====================================================
       RESET EXPORT STATE
    ==================================================== */

    window.setTimeout(() => {
      setIsExporting(false);
    }, 500);
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="attendance-header" ref={headerRef}>
      {/* ==================================================
          DECORATIVE GLASS ORBS
      ================================================== */}

      <div className="attendance-header-orb attendance-orb-one" />

      <div className="attendance-header-orb attendance-orb-two" />

      {/* ==================================================
          TOP CONTENT
      ================================================== */}

      <div className="attendance-header-top">
        {/* =================================================
            TITLE
        ================================================= */}

        <div className="attendance-header-title-group">
          <div className="attendance-header-title-icon">
            <LuCalendarDays size={21} strokeWidth={1.7} />
          </div>

          <div className="attendance-header-title">
            <div className="attendance-title-line">
              <h1>Attendance</h1>

              <span className="attendance-live-badge">
                <span className="attendance-live-dot" />
                Live
              </span>
            </div>

            <p>Track and manage learner attendance across your courses.</p>
          </div>
        </div>

        {/* =================================================
            DECORATIVE CALENDAR PANEL
        ================================================= */}

        <div className="attendance-header-visual">
          <div className="attendance-visual-glow" />

          <div className="attendance-mini-calendar">
            <div className="attendance-calendar-top">
              <span>
                {today
                  .toLocaleDateString("en-US", {
                    month: "short",
                  })
                  .toUpperCase()}
              </span>

              <LuCalendarDays size={15} strokeWidth={1.7} />
            </div>

            <strong>{today.getDate()}</strong>

            <div className="attendance-calendar-checks">
              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>

              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>

              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>
            </div>
          </div>

          <div className="attendance-visual-message">
            <span>Daily attendance</span>

            <strong>Stay consistent.</strong>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM ACTION AREA
      ================================================== */}

      <div className="attendance-header-bottom">
        {/* =================================================
            QUICK INFORMATION
        ================================================= */}

        <div className="attendance-header-metrics">
          {/* ===============================================
              LEARNERS
          =============================================== */}

          <div className="attendance-header-metric metric-blue">
            <div className="attendance-metric-icon">
              <LuUsersRound size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>42</strong>

              <span>Learners</span>
            </div>
          </div>

          {/* ===============================================
              COURSES
          =============================================== */}

          <div className="attendance-header-metric metric-lavender">
            <div className="attendance-metric-icon">
              <LuBookOpen size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>5</strong>

              <span>Courses</span>
            </div>
          </div>

          {/* ===============================================
              BATCHES
          =============================================== */}

          <div className="attendance-header-metric metric-mint">
            <div className="attendance-metric-icon">
              <LuLayers3 size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>8</strong>

              <span>Batches</span>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="attendance-header-actions">
          {/* ===============================================
              DATE SELECTOR
          =============================================== */}

          <div className="attendance-date-wrapper">
            <button
              type="button"
              className={`attendance-date-button ${
                dateDropdownOpen ? "is-open" : ""
              }`}
              onClick={handleDateToggle}
              aria-expanded={dateDropdownOpen}
              aria-haspopup="dialog"
            >
              <LuCalendarDays size={15} strokeWidth={1.8} />

              <span>{formatDate(selectedDate)}</span>

              <LuChevronDown
                className={dateDropdownOpen ? "is-rotated" : ""}
                size={14}
                strokeWidth={1.8}
              />
            </button>

            {/* =============================================
                CALENDAR
            ============================================= */}

            {dateDropdownOpen && (
              <div
                className="attendance-date-dropdown"
                role="dialog"
                aria-label="Select attendance date"
              >
                {/* =========================================
                    CALENDAR HEADER
                ========================================= */}

                <div className="attendance-calendar-header">
                  <div className="attendance-calendar-month">
                    <strong>{monthName}</strong>

                    <span>{year}</span>
                  </div>

                  <div className="attendance-calendar-navigation">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={handlePreviousMonth}
                    >
                      <LuChevronLeft size={16} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={handleNextMonth}
                    >
                      <LuChevronRight size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

                {/* =========================================
                    WEEKDAYS
                ========================================= */}

                <div className="attendance-calendar-weekdays">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* =========================================
                    CALENDAR GRID
                ========================================= */}

                <div className="attendance-calendar-grid">
                  {calendarDays.map((calendarDay) => {
                    const { date, currentMonth } = calendarDay;

                    const selected = isSelectedDate(date);

                    const currentDay = isToday(date);

                    return (
                      <button
                        type="button"
                        key={getDateKey(date)}
                        className={[
                          "attendance-calendar-day",
                          !currentMonth ? "outside-month" : "",
                          selected ? "selected" : "",
                          currentDay ? "today" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handleDateChange(date)}
                        aria-label={`Select ${formatDate(date)}`}
                        aria-pressed={selected}
                      >
                        <span>{date.getDate()}</span>

                        {currentDay && (
                          <i className="attendance-calendar-today-dot" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* =========================================
                    CALENDAR FOOTER
                ========================================= */}

                <div className="attendance-calendar-footer">
                  <div className="attendance-calendar-selected">
                    <span className="attendance-selected-indicator" />

                    <span>{formatDate(selectedDate)}</span>
                  </div>

                  <button
                    type="button"
                    className="attendance-calendar-today"
                    onClick={handleToday}
                  >
                    Today
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===============================================
              TODAY
          =============================================== */}

          <button
            type="button"
            className="attendance-today-button"
            onClick={handleToday}
          >
            <LuRefreshCw size={14} strokeWidth={1.8} />

            <span>Today</span>
          </button>

          {/* ===============================================
              MARK ATTENDANCE
          =============================================== */}

          <button
            type="button"
            className="attendance-mark-button"
            onClick={handleMarkAttendance}
          >
            <LuPlus size={17} strokeWidth={1.9} />

            <span>Mark Attendance</span>
          </button>

          {/* ===============================================
              EXPORT
          =============================================== */}

          <button
            type="button"
            className={`attendance-export-button ${
              isExporting ? "is-exporting" : ""
            }`}
            onClick={handleExport}
            disabled={isExporting}
          >
            <LuDownload size={15} strokeWidth={1.8} />

            <span>{isExporting ? "Exporting..." : "Export"}</span>

            <LuChevronDown size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AttendanceHeader;
