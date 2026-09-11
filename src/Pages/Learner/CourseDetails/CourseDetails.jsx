import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft, FiLoader } from "react-icons/fi";

/* =========================================================
   LOCAL MOCK ENROLLMENT DATA
========================================================= */

import {
  CURRENT_LEARNER_ID,
  getEnrollment,
  createEnrollment,
} from "../../../../data/mock/enrollments";

/* =========================================================
   COURSE DETAILS COMPONENTS
========================================================= */

import CourseDetailsHero from "../../../Components/Learner/CourseDetails/CourseDetailsHero/CourseDetailsHero";
import CourseOverview from "../../../Components/Learner/CourseDetails/CourseOverview/CourseOverview";
import CourseModules from "../../../Components/Learner/CourseDetails/CourseModules/CourseModules";
import CourseTrainer from "../../../Components/Learner/CourseDetails/CourseTrainer/CourseTrainer";

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

import Button from "../../../Reusable_components/Button/Button";

import "./CourseDetails.css";

/* =========================================================
   API URLS
========================================================= */

const COURSES_API_URL =
  "https://6a9ff1473e0d88d3d7e534f8.mockapi.io/api/courses";

const TRAINERS_API_URL =
  "https://6a9ff1473e0d88d3d7e534f8.mockapi.io/api/trainers";

/* =========================================================
   COURSE DETAILS
========================================================= */

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  /* =========================================================
     COURSE STATE
  ========================================================= */

  const [course, setCourse] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  /* =========================================================
     TRAINER STATE
  ========================================================= */

  const [trainer, setTrainer] = useState(null);

  const [isTrainerLoading, setIsTrainerLoading] = useState(false);

  const [trainerError, setTrainerError] = useState("");

  /* =========================================================
     ENROLLMENT STATE
  ========================================================= */

  const [enrollment, setEnrollment] = useState(null);

  const [isEnrollmentLoading, setIsEnrollmentLoading] = useState(true);

  const [isEnrolling, setIsEnrolling] = useState(false);

  const [enrollmentError, setEnrollmentError] = useState("");

  /* =========================================================
     FETCH SELECTED COURSE
  ========================================================= */

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourse = async () => {
      setIsLoading(true);
      setError("");

      setCourse(null);

      setTrainer(null);
      setTrainerError("");

      setEnrollment(null);
      setEnrollmentError("");
      setIsEnrollmentLoading(true);

      try {
        const response = await fetch(`${COURSES_API_URL}/${courseId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Unable to load course. Server returned ${response.status}.`,
          );
        }

        const courseData = await response.json();

        if (!courseData || !courseData.id) {
          throw new Error("Invalid course data received from the server.");
        }

        setCourse(courseData);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch course:", fetchError);

        setError(
          fetchError.message ||
            "Something went wrong while loading the course.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (courseId) {
      fetchCourse();
    }

    return () => {
      controller.abort();
    };
  }, [courseId]);

  /* =========================================================
     CHECK ENROLLMENT

     This runs whenever the selected course changes.

     learner-001 + course-001
              ↓
       getEnrollment()
              ↓
     Existing enrollment?
       /             \
     YES              NO
      ↓                ↓
    set data       set null
  ========================================================= */

  useEffect(() => {
    if (!course?.id) {
      setEnrollment(null);
      setIsEnrollmentLoading(false);

      return;
    }

    setIsEnrollmentLoading(true);
    setEnrollmentError("");

    try {
      const existingEnrollment = getEnrollment(CURRENT_LEARNER_ID, course.id);

      setEnrollment(existingEnrollment);
    } catch (enrollmentCheckError) {
      console.error("Failed to check enrollment:", enrollmentCheckError);

      setEnrollmentError("Unable to check your enrollment status.");
    } finally {
      setIsEnrollmentLoading(false);
    }
  }, [course]);

  /* =========================================================
     FETCH TRAINER

     course.trainerId
          ↓
     /trainers/:trainerId
  ========================================================= */

  useEffect(() => {
    if (!course?.trainerId) {
      setTrainer(null);
      setTrainerError("");
      setIsTrainerLoading(false);

      return;
    }

    const controller = new AbortController();

    const fetchTrainer = async () => {
      setIsTrainerLoading(true);
      setTrainerError("");
      setTrainer(null);

      try {
        const response = await fetch(
          `${TRAINERS_API_URL}/${course.trainerId}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load trainer. Server returned ${response.status}.`,
          );
        }

        const trainerData = await response.json();

        if (!trainerData || !trainerData.id) {
          throw new Error("Invalid trainer data received from the server.");
        }

        setTrainer(trainerData);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch trainer:", fetchError);

        setTrainer(null);

        setTrainerError(
          fetchError.message ||
            "Something went wrong while loading the trainer.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsTrainerLoading(false);
        }
      }
    };

    fetchTrainer();

    return () => {
      controller.abort();
    };
  }, [course]);

  /* =========================================================
     BACK TO COURSE CATALOG
  ========================================================= */

  const handleBack = () => {
    navigate("/learner/courses");
  };

  /* =========================================================
     ENROLL IN COURSE
  ========================================================= */

  const handleEnroll = (selectedCourse) => {
    if (!selectedCourse?.id) {
      return;
    }

    /*
      Prevent multiple clicks while enrollment
      is being created.
    */

    if (isEnrolling) {
      return;
    }

    /* -------------------------------------------------------
       Already enrolled
    ------------------------------------------------------- */

    if (enrollment) {
      console.log("Learner is already enrolled:", enrollment);

      return;
    }

    setIsEnrolling(true);
    setEnrollmentError("");

    try {
      const result = createEnrollment(CURRENT_LEARNER_ID, selectedCourse.id);

      /* -----------------------------------------------------
         Enrollment failed
      ----------------------------------------------------- */

      if (!result.success) {
        setEnrollmentError(
          result.message || "Unable to enroll in this course.",
        );

        /*
          If an enrollment already exists,
          keep it in state.
        */

        if (result.enrollment) {
          setEnrollment(result.enrollment);
        }

        return;
      }

      /* -----------------------------------------------------
         Enrollment successful
      ----------------------------------------------------- */

      setEnrollment(result.enrollment);

      console.log("Successfully enrolled:", result.enrollment);
    } catch (enrollmentCreateError) {
      console.error("Failed to create enrollment:", enrollmentCreateError);

      setEnrollmentError("Something went wrong while enrolling in the course.");
    } finally {
      setIsEnrolling(false);
    }
  };

  /* =========================================================
     CONTINUE LEARNING
  ========================================================= */

  const handleContinueLearning = () => {
    if (!course?.id) {
      return;
    }

    navigate(`/learner/courses/${course.id}/learn`);
  };

  /* =========================================================
     FAVORITE
  ========================================================= */

  const handleFavorite = (selectedCourse) => {
    console.log(
      "Favorite changed:",
      selectedCourse.id,
      selectedCourse.isFavorite,
    );

    /*
      Favorite API will be connected later.
    */
  };

  /* =========================================================
     VIEW TRAINER PROFILE
  ========================================================= */

  const handleViewTrainerProfile = (selectedTrainer) => {
    console.log("View trainer profile:", selectedTrainer);

    /*
      Trainer Profile page will be connected later.

      Future route:

      /learner/trainers/:trainerId
    */
  };

  /* =========================================================
     COURSE LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="course-details-page">
        <div className="course-details-page__state">
          <div className="course-details-page__state-icon course-details-page__state-icon--loading">
            <FiLoader />
          </div>

          <h2>Loading course</h2>

          <p>Please wait while we load the course details.</p>

          <span className="course-details-page__loading-text">
            Preparing your learning experience...
          </span>
        </div>
      </div>
    );
  }

  /* =========================================================
     COURSE ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="course-details-page">
        <div className="course-details-page__state course-details-page__state--error">
          <div className="course-details-page__state-icon course-details-page__state-icon--error">
            <FiAlertCircle />
          </div>

          <h2>Unable to load course</h2>

          <p>{error}</p>

          <Button
            variant="primary"
            size="md"
            rounded="lg"
            leftIcon={<FiArrowLeft />}
            onClick={handleBack}
          >
            Back to Course Catalog
          </Button>
        </div>
      </div>
    );
  }

  /* =========================================================
     COURSE NOT FOUND
  ========================================================= */

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="course-details-page__state">
          <div className="course-details-page__state-icon course-details-page__state-icon--error">
            <FiAlertCircle />
          </div>

          <h2>Course not found</h2>

          <p>The course you are looking for could not be found.</p>

          <Button
            variant="primary"
            size="md"
            rounded="lg"
            leftIcon={<FiArrowLeft />}
            onClick={handleBack}
          >
            Back to Course Catalog
          </Button>
        </div>
      </div>
    );
  }

  /* =========================================================
     DETERMINE ENROLLMENT STATUS
  ========================================================= */

  const isEnrolled = Boolean(enrollment);

  const isCompleted =
    enrollment?.status === "completed" || Number(enrollment?.progress) >= 100;

  /* =========================================================
     COURSE DETAILS PAGE
  ========================================================= */

  return (
    <div className="course-details-page">
      {/* =====================================================
          1. COURSE DETAILS HERO
      ===================================================== */}

      <CourseDetailsHero
        course={course}
        onBack={handleBack}
        onEnroll={handleEnroll}
        onFavorite={handleFavorite}
        enrollment={enrollment}
        isEnrolled={isEnrolled}
        isCompleted={isCompleted}
        isEnrollmentLoading={isEnrollmentLoading}
        isEnrolling={isEnrolling}
        onContinueLearning={handleContinueLearning}
      />

      {/* =====================================================
          ENROLLMENT ERROR
      ===================================================== */}

      {enrollmentError && (
        <div className="course-details-page__enrollment-message course-details-page__enrollment-message--error">
          <FiAlertCircle />

          <span>{enrollmentError}</span>
        </div>
      )}

      {/* =====================================================
          2. COURSE OVERVIEW
      ===================================================== */}

      <CourseOverview course={course} />

      {/* =====================================================
          3. COURSE CURRICULUM
      ===================================================== */}

      <CourseModules course={course} />

      {/* =====================================================
          4. COURSE TRAINER
      ===================================================== */}

      {isTrainerLoading && (
        <section className="course-details-page__trainer-state">
          <div className="course-details-page__trainer-loading">
            <div className="course-details-page__trainer-loading-icon">
              <FiLoader />
            </div>

            <div className="course-details-page__trainer-loading-content">
              <strong>Loading course trainer</strong>

              <span>Preparing expert information...</span>
            </div>
          </div>
        </section>
      )}

      {!isTrainerLoading && trainer && (
        <CourseTrainer
          trainer={trainer}
          onViewProfile={handleViewTrainerProfile}
        />
      )}

      {/* =====================================================
          TRAINER ERROR

          Course remains usable even if trainer
          information fails to load.
      ===================================================== */}

      {!isTrainerLoading && trainerError && (
        <section className="course-details-page__trainer-state">
          <div className="course-details-page__trainer-error">
            <div className="course-details-page__trainer-error-icon">
              <FiAlertCircle />
            </div>

            <div className="course-details-page__trainer-error-content">
              <strong>Trainer information unavailable</strong>

              <p>
                The course is available, but trainer information could not be
                loaded right now.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseDetails;
