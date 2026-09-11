import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

/* =========================================================
   LEARNER LAYOUT
========================================================= */

import LearnerLayout from "../Layouts/LearnerLayout/LearnerLayout";

/* =========================================================
   LEARNER PAGES
========================================================= */

import Dashboard from "../Pages/Learner/Dashboard/Dashboard";

import MyLearning from "../Pages/Learner/MyLearning/MyLearning";

import CourseCatalog from "../Pages/Learner/CourseCatalog/CourseCatalog";

import CourseDetails from "../Pages/Learner/CourseDetails/CourseDetails";

import MySkills from "../Pages/Learner/MySkills/MySkills";

import SkillGaps from "../Pages/Learner/SkillGaps/SkillGaps";

import Recommendations from "../Pages/Learner/Recommendations/Recommendations";

import Certificates from "../Pages/Learner/Certificates/Certificates";

import Knowledge from "../Pages/Learner/Knowledge/Knowledge";

/* =========================================================
   QUIZ PAGES
========================================================= */

import Quizzes from "../Pages/Learner/Quizzes/Quizzes";

import QuizAttempt from "../Pages/Learner/QuizAttempt/QuizAttempt";

import QuizResult from "../Pages/Learner/QuizResult/QuizResult";

/* =========================================================
   PLACEHOLDER PAGE
========================================================= */

const PlaceholderPage = ({ title }) => {
  return (
    <div
      style={{
        minHeight: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "40px 20px",

        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          margin: 0,

          fontSize: "24px",
          fontWeight: 700,

          lineHeight: 1.3,
        }}
      >
        {title}
      </h1>
    </div>
  );
};

/* =========================================================
   LEARNER ROUTES
========================================================= */

const LearnerRoutes = () => {
  return (
    <Routes>
      {/* =====================================================
          LEARNER LAYOUT
      ===================================================== */}

      <Route path="/" element={<LearnerLayout />}>
        {/* =================================================
            DEFAULT ROUTE
        ================================================== */}

        <Route index element={<Navigate to="dashboard" replace />} />

        {/* =================================================
            DASHBOARD
        ================================================== */}

        <Route path="dashboard" element={<Dashboard />} />

        {/* =================================================
            MY LEARNING
        ================================================== */}

        <Route path="learning" element={<MyLearning />} />

        {/* =================================================
            COURSE CATALOG
        ================================================== */}

        <Route path="courses" element={<CourseCatalog />} />

        {/* =================================================
            COURSE DETAILS
        ================================================== */}

        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* =================================================
            LEARNING PLAYER
            Placeholder for now
        ================================================== */}

        <Route
          path="courses/:courseId/learn"
          element={<PlaceholderPage title="Learning Player" />}
        />

        {/* =================================================
            COURSE QUIZ
            Legacy / Course-based route
            Placeholder for now
        ================================================== */}

        <Route
          path="courses/:courseId/quiz/:quizId"
          element={<PlaceholderPage title="Quiz" />}
        />

        {/* =================================================
            COURSE QUIZ RESULT
            Legacy / Course-based route
            Placeholder for now
        ================================================== */}

        <Route
          path="courses/:courseId/result/:attemptId"
          element={<PlaceholderPage title="Quiz Result" />}
        />

        {/* =================================================
            MY SKILLS
        ================================================== */}

        <Route path="skills" element={<MySkills />} />

        {/* =================================================
            SKILL GAPS
        ================================================== */}

        <Route path="skill-gaps" element={<SkillGaps />} />

        {/* =================================================
            RECOMMENDATIONS
        ================================================== */}

        <Route path="recommendations" element={<Recommendations />} />

        {/* =================================================
            CERTIFICATES
        ================================================== */}

        <Route path="certificates" element={<Certificates />} />

        {/* =================================================
            KNOWLEDGE HUB
        ================================================== */}

        <Route path="knowledge-hub" element={<Knowledge />} />

        {/* =================================================
            KNOWLEDGE RESOURCE DETAILS
            Placeholder for now
        ================================================== */}

        <Route
          path="knowledge-hub/:resourceId"
          element={<PlaceholderPage title="Resource Details" />}
        />

        {/* =================================================
            QUIZ CENTER
        ================================================== */}

        <Route path="quizzes" element={<Quizzes />} />

        {/* =================================================
            QUIZ ATTEMPT
            Real Page
        ================================================== */}

        <Route path="quizzes/:quizId/attempt" element={<QuizAttempt />} />

        {/* =================================================
            QUIZ RESULT
            Real Page
        ================================================== */}

        <Route
          path="quizzes/:quizId/result/:attemptId"
          element={<QuizResult />}
        />

        {/* =================================================
            PROFILE
            Placeholder for now
        ================================================== */}

        <Route path="profile" element={<PlaceholderPage title="Profile" />} />

        {/* =================================================
            SETTINGS
            Placeholder for now
        ================================================== */}

        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  );
};

export default LearnerRoutes;
