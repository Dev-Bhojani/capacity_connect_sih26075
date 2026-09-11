import React from "react";

import "./TrainerDashboard.css";

// =====================================================
// TRAINER DASHBOARD COMPONENTS
// =====================================================

import WelcomeSection from "../../../Components/Trainer/TrainerDashboard/WelcomeSection/WelcomeSection";

import StatsCards from "../../../Components/Trainer/TrainerDashboard/StatsCards/StatsCards";

import LearnerOverview from "../../../Components/Trainer/TrainerDashboard/LearnerOverview/LearnerOverview";

import CourseOverview from "../../../Components/Trainer/TrainerDashboard/CourseOverview/CourseOverview";

import PerformanceOverview from "../../../Components/Trainer/TrainerDashboard/PerformanceOverview/PerformanceOverview";

// =====================================================
// TRAINER DASHBOARD
// =====================================================

const TrainerDashboard = () => {
  return (
    <div className="trainer-dashboard">
      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <WelcomeSection />

      {/* =================================================
          STATS CARDS
      ================================================= */}

      <StatsCards />

      {/* =================================================
          LEARNER OVERVIEW
      ================================================= */}

      <LearnerOverview />

      {/* =================================================
          COURSE OVERVIEW
      ================================================= */}

      <CourseOverview />

      {/* =================================================
          PERFORMANCE OVERVIEW
      ================================================= */}

      <PerformanceOverview />
    </div>
  );
};

export default TrainerDashboard;
