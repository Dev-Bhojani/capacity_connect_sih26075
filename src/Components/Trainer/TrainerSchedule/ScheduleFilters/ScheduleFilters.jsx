import React, { useEffect, useRef, useState } from "react";
import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronRight,
  LuCircleCheck,
  LuFilter,
  LuLayers3,
  LuLightbulb,
  LuRefreshCw,
  LuSearch,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./ScheduleFilters.css";

const ScheduleFilters = ({ filters = {}, onFiltersChange, onResetFilters }) => {
  /* =====================================================
     PARENT FILTER VALUES
  ===================================================== */

  const {
    searchValue: parentSearchValue = "",
    course: parentCourse = "All Courses",
    batch: parentBatch = "All Batches",
    sessionType: parentSessionType = "All Types",
    status: parentStatus = "All Status",
    dateRange: parentDateRange = "This Week",
  } = filters;

  /* =====================================================
     LOCAL FILTER STATE

     Changes stay local until Apply Filters is clicked.
  ===================================================== */

  const [searchValue, setSearchValue] = useState(parentSearchValue);

  const [course, setCourse] = useState(parentCourse);

  const [batch, setBatch] = useState(parentBatch);

  const [sessionType, setSessionType] = useState(parentSessionType);

  const [status, setStatus] = useState(parentStatus);

  const [dateRange, setDateRange] = useState(parentDateRange);

  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  /* =====================================================
     OPTIONS
  ===================================================== */

  const courseOptions = [
    "All Courses",
    "Web Development",
    "Data Structures",
    "Database Management",
    "Artificial Intelligence",
  ];

  const batchOptions = [
    "All Batches",
    "Batch A",
    "Batch B",
    "Batch C",
    "Batch D",
  ];

  const sessionTypeOptions = [
    "All Types",
    "Training Session",
    "Quiz",
    "Assessment",
    "Workshop",
  ];

  const statusOptions = [
    "All Status",
    "Scheduled",
    "Completed",
    "Cancelled",
    "Rescheduled",
  ];

  const dateRangeOptions = [
    "Today",
    "This Week",
    "This Month",
    "Next 7 Days",
    "Next 30 Days",
  ];

  /* =====================================================
     SYNC WITH PARENT
  ===================================================== */

  useEffect(() => {
    setSearchValue(parentSearchValue);
    setCourse(parentCourse);
    setBatch(parentBatch);
    setSessionType(parentSessionType);
    setStatus(parentStatus);
    setDateRange(parentDateRange);
  }, [
    parentSearchValue,
    parentCourse,
    parentBatch,
    parentSessionType,
    parentStatus,
    parentDateRange,
  ]);

  /* =====================================================
     CLOSE DROPDOWNS

     - Outside click
     - Escape key
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     DROPDOWN
  ===================================================== */

  const toggleDropdown = (type) => {
    setOpenDropdown((current) => (current === type ? null : type));
  };

  const handleSelect = (type, value) => {
    if (type === "course") {
      setCourse(value);
    }

    if (type === "batch") {
      setBatch(value);
    }

    if (type === "sessionType") {
      setSessionType(value);
    }

    if (type === "status") {
      setStatus(value);
    }

    if (type === "dateRange") {
      setDateRange(value);
    }

    setOpenDropdown(null);
  };

  /* =====================================================
     ACTIVE FILTERS
  ===================================================== */

  const activeFilters = [];

  if (dateRange !== "This Week") {
    activeFilters.push({
      id: "dateRange",
      type: "dateRange",
      label: dateRange,
      theme: "sky",
      icon: <LuCalendarDays size={13} />,
    });
  }

  if (course !== "All Courses") {
    activeFilters.push({
      id: "course",
      type: "course",
      label: course,
      theme: "mint",
      icon: <LuLayers3 size={13} />,
    });
  }

  if (batch !== "All Batches") {
    activeFilters.push({
      id: "batch",
      type: "batch",
      label: batch,
      theme: "peach",
      icon: <LuUsersRound size={13} />,
    });
  }

  if (sessionType !== "All Types") {
    activeFilters.push({
      id: "sessionType",
      type: "sessionType",
      label: sessionType,
      theme: "lavender",
      icon: <LuLayers3 size={13} />,
    });
  }

  if (status !== "All Status") {
    activeFilters.push({
      id: "status",
      type: "status",
      label: status,
      theme: "green",
      icon: <LuCircleCheck size={13} />,
    });
  }

  if (searchValue.trim()) {
    activeFilters.push({
      id: "search",
      type: "search",
      label: `"${searchValue.trim()}"`,
      theme: "blue",
      icon: <LuSearch size={13} />,
    });
  }

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    const resetValues = {
      searchValue: "",
      course: "All Courses",
      batch: "All Batches",
      sessionType: "All Types",
      status: "All Status",
      dateRange: "This Week",
    };

    setSearchValue("");
    setCourse("All Courses");
    setBatch("All Batches");
    setSessionType("All Types");
    setStatus("All Status");
    setDateRange("This Week");

    setOpenDropdown(null);

    onResetFilters?.(resetValues);

    onFiltersChange?.(resetValues);
  };

  /* =====================================================
     APPLY
  ===================================================== */

  const handleApply = () => {
    const filterData = {
      searchValue: searchValue.trim(),
      course,
      batch,
      sessionType,
      status,
      dateRange,
    };

    setOpenDropdown(null);

    onFiltersChange?.(filterData);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-filters-applied", {
        detail: filterData,
      }),
    );
  };

  /* =====================================================
     REMOVE INDIVIDUAL FILTER
  ===================================================== */

  const removeFilter = (type) => {
    if (type === "search") {
      setSearchValue("");
    }

    if (type === "course") {
      setCourse("All Courses");
    }

    if (type === "batch") {
      setBatch("All Batches");
    }

    if (type === "sessionType") {
      setSessionType("All Types");
    }

    if (type === "status") {
      setStatus("All Status");
    }

    if (type === "dateRange") {
      setDateRange("This Week");
    }
  };

  /* =====================================================
     DROPDOWN RENDERER
  ===================================================== */

  const renderDropdown = (type, label, value, options, icon, theme) => {
    const isOpen = openDropdown === type;

    return (
      <div className={`schedule-filter-field schedule-filter-field-${theme}`}>
        <label className="schedule-filter-label">{label}</label>

        <div className="schedule-filter-dropdown">
          <button
            type="button"
            className={`schedule-filter-trigger ${isOpen ? "is-open" : ""}`}
            onClick={() => toggleDropdown(type)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="schedule-filter-trigger-left">
              <span className="schedule-filter-trigger-icon">{icon}</span>

              <span className="schedule-filter-trigger-value">{value}</span>
            </span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={`schedule-filter-chevron ${isOpen ? "rotate" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="schedule-filter-menu" role="listbox">
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`schedule-filter-option ${
                    option === value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(type, option)}
                  role="option"
                  aria-selected={option === value}
                >
                  <span>{option}</span>

                  {option === value && (
                    <LuCircleCheck size={13} strokeWidth={1.8} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <></>
  );
};

export default ScheduleFilters;
