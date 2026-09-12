import React from "react";
import { Routes, Route } from "react-router-dom";

// ========================================
// Trainer Layout
// ========================================
import TrainerLayout from "../Layouts/TrainerLayout/TrainerLayout";

// ========================================
// Trainer Error Page
// ========================================
import NotFound from "../Pages/Errors/NotFound/NotFound";

// ========================================
// Trainer Course Details
// ========================================
import CourseDetails from "../Pages/Trainer/CourseDetails/CourseDetails";

// ========================================
// Trainer Pages
// ========================================
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard/TrainerDashboard";
import TrainerLearners from "../Pages/Trainer/TrainerLearners/TrainerLearners";
import TrainerCourses from "../Pages/Trainer/TrainerCourses/TrainerCourses";
import TrainerQuizzes from "../Pages/Trainer/TrainerQuizzes/TrainerQuizzes";
import QuizDetails from "../Pages/Trainer/QuizDetails/QuizDetails";
import TrainerAttendance from "../Pages/Trainer/TrainerAttendance/TrainerAttendance";
import TrainerPerformance from "../Pages/Trainer/TrainerPerformance/TrainerPerformance";
import TrainerSchedule from "../Pages/Trainer/TrainerSchedule/TrainerSchedule";
import LearnerSchedule from "../Pages/Trainer/LearnerSchedule/LearnerSchedule";
import TrainerProfile from "../Pages/Trainer/TrainerProfile/TrainerProfile";

// ========================================
// Trainer Routes
// ========================================

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrainerLayout />}>
        {/* ========================================
            Trainer Dashboard
        ======================================== */}

        <Route index element={<TrainerDashboard />} />

        {/* ========================================
            Trainer Learners
        ======================================== */}

        <Route path="trainer-learners" element={<TrainerLearners />} />

        {/* ========================================
            Trainer Courses
        ======================================== */}

        <Route path="trainer-courses" element={<TrainerCourses />} />

        <Route path="trainer-courses/:courseId" element={<CourseDetails />} />

        {/* ========================================
            Trainer Quizzes
        ======================================== */}

        <Route path="trainer-quizzes" element={<TrainerQuizzes />} />

        <Route path="trainer-quizzes/:quizId" element={<QuizDetails />} />

        {/* ========================================
            Trainer Attendance
        ======================================== */}

        <Route path="trainer-attendance" element={<TrainerAttendance />} />

        {/* ========================================
            Trainer Performance
        ======================================== */}

        <Route path="trainer-performance" element={<TrainerPerformance />} />

        {/* ========================================
            Trainer Schedule
        ======================================== */}

        <Route path="trainer-schedule" element={<TrainerSchedule />} />

        {/* ========================================
            Learner Schedule
        ======================================== */}

        <Route path="learner-schedule" element={<LearnerSchedule />} />

        {/* ========================================
            Trainer Profile
        ======================================== */}

        <Route path="trainer-profile" element={<TrainerProfile />} />

        {/* ========================================
            Trainer Pending Tasks
        ======================================== */}

        {/* Pending Tasks route can be added here when its page is created */}

        {/* ========================================
            Trainer 404
            Must be LAST
        ======================================== */}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
