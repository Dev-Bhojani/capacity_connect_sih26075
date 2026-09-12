import React from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiPlayCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./LearningStats.css";

const LearningStats = ({
  totalCourses = 0,
  inProgressCourses = 0,
  completedCourses = 0,
  overallProgress = 0,
}) => {
  const navigate = useNavigate();

  const safeTotalCourses = Math.max(0, Number(totalCourses) || 0);
  const safeInProgressCourses = Math.max(0, Number(inProgressCourses) || 0);
  const safeCompletedCourses = Math.max(0, Number(completedCourses) || 0);

  const safeOverallProgress = Math.min(
    100,
    Math.max(0, Number(overallProgress) || 0),
  );

  // =========================================
  // NAVIGATION HANDLERS
  // =========================================

  const handleViewDetails = () => {
    navigate("/learner/skill-gaps");
  };

  const handleViewCourses = () => {
    navigate("/learner/courses");
  };

  const handleViewCertificates = () => {
    navigate("/learner/certificates");
  };

  // =========================================
  // SCROLL TO TOP OF CURRENT MY LEARNING PAGE
  // =========================================

  const handleContinueLearning = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleViewLearningPath = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // LEARNING STAT CARDS
  // =========================================

  const stats = [
    {
      id: "total-courses",
      title: "Total Courses",
      value: safeTotalCourses,
      icon: <FiBookOpen />,
      color: "blue",
      description: "Courses you are enrolled in",
      actionText: "View all courses",
      onAction: handleViewCourses,
    },
    {
      id: "in-progress",
      title: "In Progress",
      value: safeInProgressCourses,
      icon: <FiPlayCircle />,
      color: "orange",
      description: "Courses currently in progress",
      actionText: "Continue learning",
      onAction: handleContinueLearning,
    },
    {
      id: "completed",
      title: "Completed",
      value: safeCompletedCourses,
      icon: <FiCheckCircle />,
      color: "green",
      description: "Courses you have completed",
      actionText: "View certificates",
      onAction: handleViewCertificates,
    },
    {
      id: "overall-progress",
      title: "Overall Progress",
      value: `${safeOverallProgress}%`,
      icon: <FiTrendingUp />,
      color: "purple",
      description: "Across all enrolled courses",
      actionText: "See learning path",
      onAction: handleViewLearningPath,
      progress: true,
    },
  ];

  // =========================================
  // RENDER
  // =========================================

  return (
    <section className="learning-stats">
      <div className="learning-stats__background" aria-hidden="true">
        <span className="learning-stats__background-wave learning-stats__background-wave--one" />
        <span className="learning-stats__background-wave learning-stats__background-wave--two" />
        <span className="learning-stats__background-glow learning-stats__background-glow--one" />
        <span className="learning-stats__background-glow learning-stats__background-glow--two" />
      </div>

      <div className="learning-stats__container">
        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <div className="learning-stats__header">
          <div className="learning-stats__heading">
            <span className="learning-stats__eyebrow">LEARNING OVERVIEW</span>

            <h2 className="learning-stats__title">Your progress at a glance</h2>

            <p className="learning-stats__description">
              Track your learning journey and see how you&apos;re doing.
            </p>
          </div>

          <div className="learning-stats__header-actions">
            <button
              type="button"
              className="learning-stats__period"
              aria-label="Current learning statistics period"
            >
              <span className="learning-stats__period-dot" />

              <span>This Month</span>
            </button>

            <Button
              variant="ghost"
              size="sm"
              rounded="full"
              rightIcon={<FiArrowRight />}
              onClick={handleViewDetails}
              className="learning-stats__details-button"
            >
              View details
            </Button>
          </div>
        </div>

        {/* =========================================
            STAT CARDS
        ========================================= */}

        <div className="learning-stats__grid">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              variant="default"
              size="lg"
              rounded="xl"
              hover={true}
              className={`learning-stats__card learning-stats__card--${stat.color}`}
            >
              <div className="learning-stats__card-content">
                {/* =========================================
                    CARD TOP
                ========================================= */}

                <div className="learning-stats__card-top">
                  <div className="learning-stats__icon">{stat.icon}</div>

                  <Badge
                    variant={stat.color === "purple" ? "purple" : stat.color}
                    appearance="soft"
                    size="sm"
                    shape="pill"
                  >
                    +0%
                  </Badge>
                </div>

                {/* =========================================
                    CARD TITLE
                ========================================= */}

                <div className="learning-stats__card-title">{stat.title}</div>

                {/* =========================================
                    MAIN VALUE
                ========================================= */}

                <div className="learning-stats__value">{stat.value}</div>

                {/* =========================================
                    DESCRIPTION
                ========================================= */}

                <p className="learning-stats__card-description">
                  {stat.description}
                </p>

                {/* =========================================
                    PROGRESS
                ========================================= */}

                {stat.progress && (
                  <div className="learning-stats__progress-wrapper">
                    <ProgressBar
                      value={safeOverallProgress}
                      variant="purple"
                      appearance="gradient"
                      size="sm"
                      rounded="full"
                    />

                    <div className="learning-stats__progress-label">
                      <span>Course completion</span>

                      <strong>{safeOverallProgress}%</strong>
                    </div>
                  </div>
                )}

                {/* =========================================
                    BOTTOM ACTION
                ========================================= */}

                <div className="learning-stats__card-action">
                  <Button
                    variant="ghost"
                    size="sm"
                    rounded="full"
                    rightIcon={<FiArrowRight />}
                    onClick={stat.onAction}
                    className="learning-stats__action-button"
                  >
                    {stat.actionText}
                  </Button>
                </div>
              </div>

              {/* =========================================
                  DECORATIVE WAVE
              ========================================= */}

              <div className="learning-stats__card-wave" aria-hidden="true">
                <span />
                <span />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningStats;
