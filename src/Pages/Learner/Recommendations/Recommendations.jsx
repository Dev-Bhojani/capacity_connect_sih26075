// src/Pages/Learner/Recommendations/Recommendations.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import RecommendationsHeader from "../../../Components/Learner/Recommendations/RecommendationsHeader/RecommendationsHeader";
import RecommendationList from "../../../Components/Learner/Recommendations/RecommendationList/RecommendationList";
import LearningPaths from "../../../Components/Learner/Recommendations/LearningPaths/LearningPaths";
import RecommendationsClosing from "../../../Components/Learner/Recommendations/RecommendationsClosing/RecommendationsClosing";

import {
  CURRENT_LEARNER_ID,
  getSkillStats,
} from "../../../../data/mock/skills";

import "./Recommendations.css";

/* =========================================================
   RECOMMENDATIONS PAGE
========================================================= */

const Recommendations = () => {
  const navigate = useNavigate();

  const stats = getSkillStats(CURRENT_LEARNER_ID);

  /* =======================================================
     HEADER ACTIONS
  ======================================================= */

  const handleExploreCourses = () => {
    console.log("Explore recommended courses");

    // Scroll to recommended courses
    document.querySelector(".recommendation-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewLearningPath = () => {
    console.log("View learning path");

    // Scroll to Learning Paths section
    document.querySelector(".learning-paths")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =======================================================
     RECOMMENDATION LIST ACTIONS
  ======================================================= */

  const handleExploreCourse = (course) => {
    console.log("Explore course:", course);
  };

  const handleViewAllRecommendations = () => {
    console.log("View all recommendations");
  };

  /* =======================================================
     LEARNING PATH ACTIONS
  ======================================================= */

  const handleContinuePath = (path) => {
    console.log("Continue learning path:", path);
  };

  const handleViewAllPaths = () => {
    console.log("View all learning paths");
  };

  /* =======================================================
     CLOSING SECTION ACTIONS
  ======================================================= */

  const handleContinueLearning = () => {
    console.log("Continue learning");

    // Continue from the active learning path
    document.querySelector(".learning-paths")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewSkillGaps = () => {
    console.log("View skill gaps");

    navigate("/learner/skill-gaps");
  };

  const handleClosingExploreCourses = () => {
    console.log("Explore courses");

    // Scroll back to recommended courses
    document.querySelector(".recommendation-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="recommendations-page">
      <div className="recommendations-page__container">
        {/* =================================================
            RECOMMENDATIONS HEADER
        ================================================= */}

        <RecommendationsHeader
          stats={stats}
          onExploreCourses={handleExploreCourses}
          onViewLearningPath={handleViewLearningPath}
        />

        {/* =================================================
            RECOMMENDED COURSES
        ================================================= */}

        <RecommendationList
          onExploreCourse={handleExploreCourse}
          onViewAllRecommendations={handleViewAllRecommendations}
          onViewLearningPath={handleViewLearningPath}
        />

        {/* =================================================
            LEARNING PATHS
        ================================================= */}

        <LearningPaths
          onContinuePath={handleContinuePath}
          onViewAllPaths={handleViewAllPaths}
        />

        {/* =================================================
            RECOMMENDATIONS CLOSING
        ================================================= */}

        <RecommendationsClosing
          stats={stats}
          onContinueLearning={handleContinueLearning}
          onViewSkillGaps={handleViewSkillGaps}
          onExploreCourses={handleClosingExploreCourses}
        />
      </div>
    </main>
  );
};

export default Recommendations;
