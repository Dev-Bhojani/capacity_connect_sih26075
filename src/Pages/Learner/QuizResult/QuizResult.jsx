import React, { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";

/* =========================================================
   QUIZ RESULT COMPONENTS
========================================================= */

import QuizResultHeader from "../../../Components/Learner/QuizResult/QuizResultHeader/QuizResultHeader";

import QuizScore from "../../../Components/Learner/QuizResult/QuizScore/QuizScore";

import QuizPerformance from "../../../Components/Learner/QuizResult/QuizPerformance/QuizPerformance";

import QuizReview from "../../../Components/Learner/QuizResult/QuizReview/QuizReview";

import QuizResultActions from "../../../Components/Learner/QuizResult/QuizResultActions/QuizResultActions";

/* =========================================================
   QUIZ DATA
========================================================= */

import { getQuizzes } from "../../../../data/mock/quiz";

import "./QuizResult.css";

/* =========================================================
   CONSTANTS
========================================================= */

const ATTEMPTS_STORAGE_KEY = "capacityConnectQuizAttempts";

const ATTEMPT_HISTORY_STORAGE_KEY = "capacityConnectQuizAttemptHistory";

const CURRENT_LEARNER_ID = "learner-001";

/* =========================================================
   QUIZ RESULT PAGE
   Capacity Connect - Learner
========================================================= */

const QuizResult = () => {
  const navigate = useNavigate();

  const { quizId, attemptId } = useParams();

  /* =======================================================
     GET QUIZ
  ======================================================= */

  const quiz = useMemo(() => {
    if (!quizId) {
      return null;
    }

    const quizzes = getQuizzes();

    return quizzes.find((item) => item.quizId === quizId) || null;
  }, [quizId]);

  /* =======================================================
     GET STORED ATTEMPT
  ======================================================= */

  const attempt = useMemo(() => {
    if (!quizId || !attemptId) {
      return null;
    }

    /* -------------------------------------------------------
       FIRST: SEARCH ATTEMPT HISTORY
    ------------------------------------------------------- */

    try {
      const storedHistory = JSON.parse(
        localStorage.getItem(ATTEMPT_HISTORY_STORAGE_KEY) || "[]",
      );

      if (Array.isArray(storedHistory)) {
        const historyAttempt = storedHistory.find(
          (item) =>
            item.attemptId === attemptId &&
            item.quizId === quizId &&
            item.learnerId === CURRENT_LEARNER_ID,
        );

        if (historyAttempt) {
          return historyAttempt;
        }
      }
    } catch (error) {
      console.error("Unable to read quiz attempt history:", error);
    }

    /* -------------------------------------------------------
       SECOND: SEARCH LATEST ATTEMPT
    ------------------------------------------------------- */

    try {
      const storedAttempts = JSON.parse(
        localStorage.getItem(ATTEMPTS_STORAGE_KEY) || "{}",
      );

      const latestAttempt = storedAttempts?.[quizId];

      if (
        latestAttempt &&
        latestAttempt.attemptId === attemptId &&
        latestAttempt.learnerId === CURRENT_LEARNER_ID
      ) {
        return latestAttempt;
      }
    } catch (error) {
      console.error("Unable to read latest quiz attempt:", error);
    }

    return null;
  }, [quizId, attemptId]);

  /* =======================================================
     NORMALIZED RESULT
  ======================================================= */

  const result = useMemo(() => {
    if (!attempt) {
      return null;
    }

    const totalQuestions = Number(
      attempt.totalQuestions ??
        quiz?.totalQuestions ??
        quiz?.questionCount ??
        quiz?.questions?.length ??
        0,
    );

    const correctAnswers = Number(attempt.correctAnswers ?? 0);

    const incorrectAnswers = Number(attempt.incorrectAnswers ?? 0);

    const unanswered = Number(
      attempt.unanswered ??
        Math.max(totalQuestions - correctAnswers - incorrectAnswers, 0),
    );

    const score = Number(attempt.score ?? 0);

    const passingScore = Number(
      attempt.passingScore ?? quiz?.passingScore ?? 70,
    );

    const passed =
      typeof attempt.passed === "boolean"
        ? attempt.passed
        : score >= passingScore;

    return {
      ...attempt,

      score,

      passingScore,

      passed,

      totalQuestions,

      correctAnswers,

      incorrectAnswers,

      unanswered,

      completedAt: attempt.completedAt || attempt.completionDate || null,

      timeTaken: Number(attempt.timeTaken ?? 0),

      earnedPoints: Number(attempt.earnedPoints ?? 0),

      totalPoints: Number(attempt.totalPoints ?? 0),

      answers: Array.isArray(attempt.answers) ? attempt.answers : [],
    };
  }, [attempt, quiz]);

  /* =======================================================
     BACK TO QUIZZES
  ======================================================= */

  const handleBackToQuizzes = () => {
    navigate("/learner/quizzes");
  };

  /* =======================================================
     TAKE QUIZ AGAIN
  ======================================================= */

  const handleTakeQuizAgain = () => {
    if (!quiz?.quizId) {
      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/attempt`);
  };

  /* =======================================================
     REVIEW PERFORMANCE
     
     QuizReview is already rendered above QuizResultActions.
     This smoothly moves the learner back to the review area.
  ======================================================= */

  const handleReviewPerformance = () => {
    const reviewSection = document.querySelector(".quiz-review");

    if (reviewSection) {
      reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =======================================================
     EXPLORE MORE QUIZZES
     
     We already have a confirmed quizzes route, so this
     safely uses the existing quizzes page.
  ======================================================= */

  const handleExploreMoreQuizzes = () => {
    navigate("/learner/quizzes");
  };

  /* =======================================================
     INVALID QUIZ
  ======================================================= */

  if (!quiz) {
    return (
      <main className="quiz-result quiz-result--not-found">
        <div className="quiz-result__not-found">
          <div className="quiz-result__not-found-icon">?</div>

          <span className="quiz-result__not-found-eyebrow">QUIZ RESULT</span>

          <h1>Quiz Not Found</h1>

          <p>
            The quiz you are trying to view does not exist or is no longer
            available.
          </p>

          <button type="button" onClick={handleBackToQuizzes}>
            Back to Quizzes
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     INVALID ATTEMPT
  ======================================================= */

  if (!attempt || !result) {
    return (
      <main className="quiz-result quiz-result--not-found">
        <div className="quiz-result__not-found">
          <div className="quiz-result__not-found-icon">!</div>

          <span className="quiz-result__not-found-eyebrow">
            RESULT UNAVAILABLE
          </span>

          <h1>Result Not Found</h1>

          <p>
            We couldn&apos;t find this quiz attempt. It may have expired, been
            removed, or may not belong to the current learner.
          </p>

          <div className="quiz-result__not-found-actions">
            <button type="button" onClick={handleBackToQuizzes}>
              Back to Quizzes
            </button>

            <button
              type="button"
              className="quiz-result__secondary-button"
              onClick={handleTakeQuizAgain}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="quiz-result">
      <div className="quiz-result__container">
        {/* =================================================
            RESULT HEADER
        ================================================== */}

        <QuizResultHeader quiz={quiz} result={result} />

        {/* =================================================
            QUIZ SCORE
        ================================================== */}

        <QuizScore quiz={quiz} result={result} />

        {/* =================================================
            QUIZ PERFORMANCE
        ================================================== */}

        <QuizPerformance quiz={quiz} result={result} />

        {/* =================================================
            QUIZ REVIEW
        ================================================== */}

        <QuizReview quiz={quiz} result={result} />

        {/* =================================================
            RESULT ACTIONS
        ================================================== */}

        <QuizResultActions
          quiz={quiz}
          result={result}
          onTakeQuizAgain={handleTakeQuizAgain}
          onBackToQuizzes={handleBackToQuizzes}
          onReviewPerformance={handleReviewPerformance}
          onExploreMoreQuizzes={handleExploreMoreQuizzes}
        />
      </div>
    </main>
  );
};

export default QuizResult;
