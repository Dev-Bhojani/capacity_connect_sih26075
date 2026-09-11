import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseCatalogHeader from "../../../Components/Learner/CourseCatalog/CourseCatalogHeader/CourseCatalogHeader";
import CourseFilters from "../../../Components/Learner/CourseCatalog/CourseFilters/CourseFilters";
import CourseCard from "../../../Components/Learner/CourseCatalog/CourseCard/CourseCard";

import "./CourseCatalog.css";

/* =========================================================
   DEFAULT FILTERS
========================================================= */

const DEFAULT_FILTERS = {
  category: "all",
  difficulty: "all",
  duration: "all",
  skill: "all",
  sort: "relevant",
};

/* =========================================================
   MOCK API
========================================================= */

const API_URL = "https://6a9ff1473e0d88d3d7e534f8.mockapi.io/api/courses";

/* =========================================================
   HELPERS
========================================================= */

/*
  Converts a skill name into the same format used by
  CourseFilters.

  Examples:

  "Data Analysis" -> "data-analysis"
  "Marine Tech"   -> "marine-tech"
  "Python"        -> "python"
*/
const normalizeSkill = (skill = "") => {
  return skill
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

/*
  Extract the number of weeks from durationLabel.

  "4 weeks" -> 4
  "8 weeks" -> 8
*/
const getDurationWeeks = (durationLabel = "") => {
  const weeks = Number.parseInt(durationLabel, 10);

  return Number.isNaN(weeks) ? 0 : weeks;
};

/*
  Convert actual duration into the filter buckets.

  1–3 weeks -> short
  4–6 weeks -> medium
  7+ weeks  -> long
*/
const getDurationCategory = (durationLabel = "") => {
  const weeks = getDurationWeeks(durationLabel);

  if (weeks <= 3) {
    return "short";
  }

  if (weeks <= 6) {
    return "medium";
  }

  return "long";
};

/* =========================================================
   COURSE CATALOG
========================================================= */

const CourseCatalog = () => {
  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigate = useNavigate();

  /* =========================================================
     COURSE STATE

     Courses are retrieved from the Mock API.

     Keeping courses in state allows local interactions such
     as Favorite to update immediately.
  ========================================================= */

  const [courses, setCourses] = useState([]);

  /* =========================================================
     API STATE
  ========================================================= */

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FILTER STATE
  ========================================================= */

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  /* =========================================================
     FETCH COURSES FROM MOCK API

     This runs once when CourseCatalog mounts.
  ========================================================= */

  useEffect(() => {
    setIsLoading(true);
    setError("");

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Unable to load courses. Server returned ${response.status}.`,
          );
        }

        return response.json();
      })
      .then((response) => {
        if (!Array.isArray(response)) {
          throw new Error("Invalid course data received from the server.");
        }

        setCourses(response);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch courses:", fetchError);

        setError(
          fetchError.message ||
            "Something went wrong while loading the courses.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /* =========================================================
     FILTER HANDLER
  ========================================================= */

  const handleFilterChange = (updatedFilters) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      ...updatedFilters,
    }));
  };

  /* =========================================================
     RESET HANDLER
  ========================================================= */

  const handleReset = () => {
    setFilters({ ...DEFAULT_FILTERS });
  };

  /* =========================================================
     FILTER + SORT COURSES

     The complete pipeline is:

     1. Category
     2. Difficulty
     3. Duration
     4. Skill
     5. Sort

     Every selected filter is applied together.
  ========================================================= */

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      /* -------------------------------------------------------
         CATEGORY
      ------------------------------------------------------- */

      if (filters.category !== "all" && course.category !== filters.category) {
        return false;
      }

      /* -------------------------------------------------------
         DIFFICULTY
      ------------------------------------------------------- */

      if (
        filters.difficulty !== "all" &&
        course.difficulty !== filters.difficulty
      ) {
        return false;
      }

      /* -------------------------------------------------------
         DURATION
      ------------------------------------------------------- */

      if (filters.duration !== "all") {
        const courseDuration = getDurationCategory(course.durationLabel);

        if (courseDuration !== filters.duration) {
          return false;
        }
      }

      /* -------------------------------------------------------
         SKILL
      ------------------------------------------------------- */

      if (filters.skill !== "all") {
        const hasSkill = course.skills.some(
          (skill) => normalizeSkill(skill) === filters.skill,
        );

        if (!hasSkill) {
          return false;
        }
      }

      return true;
    });

    /* =======================================================
       SORT

       Sorting happens AFTER filtering so the selected sort
       only controls the currently visible courses.
    ======================================================= */

    switch (filters.sort) {
      /* -----------------------------------------------------
         NEWEST
      ----------------------------------------------------- */

      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      /* -----------------------------------------------------
         MOST POPULAR
      ----------------------------------------------------- */

      case "popular":
        result.sort((a, b) => b.learners - a.learners);
        break;

      /* -----------------------------------------------------
         HIGHEST RATED
      ----------------------------------------------------- */

      case "rating":
        result.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }

          return b.learners - a.learners;
        });
        break;

      /* -----------------------------------------------------
         SHORTEST DURATION
      ----------------------------------------------------- */

      case "duration-short":
        result.sort((a, b) => {
          const weeksA = getDurationWeeks(a.durationLabel);
          const weeksB = getDurationWeeks(b.durationLabel);

          if (weeksA !== weeksB) {
            return weeksA - weeksB;
          }

          return b.rating - a.rating;
        });
        break;

      /* -----------------------------------------------------
         MOST RELEVANT
      ----------------------------------------------------- */

      case "relevant":
      default:
        result.sort((a, b) => {
          /*
            Recommended courses first.
          */

          if (a.recommended && !b.recommended) {
            return -1;
          }

          if (!a.recommended && b.recommended) {
            return 1;
          }

          /*
            Then highest rating.
          */

          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }

          /*
            Finally popularity.
          */

          return b.learners - a.learners;
        });

        break;
    }

    return result;
  }, [courses, filters]);

  /* =========================================================
     VIEW COURSE

     CourseCard -> Course Details route
  ========================================================= */

  const handleViewCourse = (course) => {
    if (!course?.id) {
      console.error("Cannot open course: course ID is missing.");
      return;
    }

    navigate(`/learner/courses/${course.id}`);
  };

  /* =========================================================
     FAVORITE HANDLER

     This updates the local course state immediately.

     The same action is also sent to the Mock API.
  ========================================================= */

  const handleFavoriteChange = async (course, isFavorite) => {
    if (!course?.id) {
      console.error("Cannot update favorite: course ID is missing.");
      return;
    }

    const previousFavoriteState = course.isFavorite;

    /* -------------------------------------------------------
       Optimistic UI update
    ------------------------------------------------------- */

    setCourses((previousCourses) =>
      previousCourses.map((item) =>
        item.id === course.id
          ? {
              ...item,
              isFavorite,
            }
          : item,
      ),
    );

    try {
      const response = await fetch(`${API_URL}/${course.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          isFavorite,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Unable to update favorite. Server returned ${response.status}.`,
        );
      }
    } catch (favoriteError) {
      console.error("Failed to update favorite:", favoriteError);

      /*
        Revert optimistic update if API request fails.
      */

      setCourses((previousCourses) =>
        previousCourses.map((item) =>
          item.id === course.id
            ? {
                ...item,
                isFavorite: previousFavoriteState,
              }
            : item,
        ),
      );
    }
  };

  /* =========================================================
     TOTAL COURSE COUNT

     Automatically stays synchronized with API data.
  ========================================================= */

  const totalCourses = courses.length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="course-catalog-page">
      {/* =====================================================
          COURSE CATALOG HEADER
      ===================================================== */}

      <CourseCatalogHeader
        totalCourses={totalCourses}
        activeLearners="1.2K+"
        completedCourses={12}
      />

      {/* =====================================================
          COURSE FILTERS
      ===================================================== */}

      <CourseFilters
        totalCourses={totalCourses}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* =====================================================
          COURSE RESULTS
      ===================================================== */}

      <section className="course-catalog-results">
        {/* ===================================================
            RESULTS HEADER
        =================================================== */}

        <div className="course-catalog-results__header">
          <div className="course-catalog-results__heading">
            <span className="course-catalog-results__eyebrow">
              COURSE CATALOG
            </span>

            <h2 className="course-catalog-results__title">
              Explore learning opportunities
            </h2>

            <p className="course-catalog-results__description">
              Find courses that match your skills, goals, and learning needs.
            </p>
          </div>

          <div className="course-catalog-results__count">
            <strong>{filteredCourses.length}</strong>

            <span>{filteredCourses.length === 1 ? "course" : "courses"}</span>
          </div>
        </div>

        {/* ===================================================
            LOADING STATE
        =================================================== */}

        {isLoading ? (
          <div className="course-catalog-results__empty">
            <div className="course-catalog-results__empty-icon">⌛</div>

            <h3>Loading courses</h3>

            <p>Please wait while we load the latest learning opportunities.</p>
          </div>
        ) : error ? (
          /* =================================================
             ERROR STATE
          ================================================= */

          <div className="course-catalog-results__empty">
            <div className="course-catalog-results__empty-icon">!</div>

            <h3>Unable to load courses</h3>

            <p>{error}</p>

            <button type="button" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : filteredCourses.length > 0 ? (
          /* =================================================
             COURSE GRID
          ================================================= */

          <div className="course-catalog-results__grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewCourse={handleViewCourse}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          /* =================================================
             NO RESULTS
          ================================================= */

          <div className="course-catalog-results__empty">
            <div className="course-catalog-results__empty-icon">⌕</div>

            <h3>No courses found</h3>

            <p>
              Try adjusting the selected filters to discover more learning
              opportunities.
            </p>

            <button type="button" onClick={handleReset}>
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseCatalog;
