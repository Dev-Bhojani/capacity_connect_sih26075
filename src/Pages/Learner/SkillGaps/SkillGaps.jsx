// src/Pages/Learner/SkillGaps/SkillGaps.jsx

import React from "react";

import SkillGapsHeader from "../../../Components/Learner/SkillGaps/SkillGapsHeader/SkillGapsHeader";

import SkillGapOverview from "../../../Components/Learner/SkillGaps/SkillGapOverview/SkillGapOverview";

import SkillGapDetails from "../../../Components/Learner/SkillGaps/SkillGapDetails/SkillGapDetails";

import SkillGapsClosing from "../../../Components/Learner/SkillGaps/SkillGapsClosing/SkillGapsClosing";

import {
  CURRENT_LEARNER_ID,
  getSkillStats,
} from "../../../../data/mock/skills";

import "./SkillGaps.css";

const SkillGaps = () => {
  const stats = getSkillStats(CURRENT_LEARNER_ID);

  /* =========================================================
     HEADER HANDLERS
  ========================================================= */

  const handleExploreSkillGaps = () => {
    console.log("Explore Skill Gaps");
  };

  const handleViewLearningResources = () => {
    console.log("View Learning Resources");
  };

  /* =========================================================
     SKILL GAP OVERVIEW HANDLERS
  ========================================================= */

  const handleExploreResources = (skill) => {
    console.log("Explore resources for:", skill);
  };

  const handleViewSkillDetails = (skill) => {
    console.log("View skill details:", skill);
  };

  /* =========================================================
     SKILL GAP DETAILS HANDLERS
  ========================================================= */

  const handleViewAllResources = () => {
    console.log("View All Resources");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="skill-gaps-page">
      <div className="skill-gaps-page__container">
        {/* =====================================================
            SKILL GAPS HEADER
        ===================================================== */}

        <SkillGapsHeader
          stats={stats}
          onExploreSkillGaps={handleExploreSkillGaps}
          onViewLearningResources={handleViewLearningResources}
        />

        {/* =====================================================
            SKILL GAP OVERVIEW
        ===================================================== */}

        <SkillGapOverview
          onExploreResources={handleExploreResources}
          onViewSkillDetails={handleViewSkillDetails}
        />

        {/* =====================================================
            SKILL GAP DETAILS
        ===================================================== */}

        <SkillGapDetails
          onViewSkillDetails={handleViewSkillDetails}
          onExploreResources={handleExploreResources}
          onViewAllResources={handleViewAllResources}
              />
        <SkillGapsClosing
          stats={stats}
          onExploreResources={handleExploreResources}
          onViewAllResources={handleViewAllResources}
          onBackToSkills={() => {
            console.log("Back to My Skills");
          }}
        />
      </div>
    </main>
  );
};

export default SkillGaps;
