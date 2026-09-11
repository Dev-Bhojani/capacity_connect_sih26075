import React from "react";

import CertificatesHeader from "../../../Components/Learner/Certificates/CertificatesHeader/CertificatesHeader";

import CertificateOverview from "../../../Components/Learner/Certificates/CertificateOverview/CertificateOverview";

import CertificateList from "../../../Components/Learner/Certificates/CertificateList/CertificateList";

import CertificatesClosing from "../../../Components/Learner/Certificates/CertificatesClosing/CertificatesClosing";

import {
  CURRENT_CERTIFICATE_LEARNER_ID,
  getCertificateStats,
  getLatestCertificate,
  getCurrentLearnerCertificates,
} from "../../../../data/mock/certificate";

import "./Certificates.css";

const Certificates = () => {
  /* =========================================================
     CURRENT LEARNER
  ========================================================= */

  const learnerId = CURRENT_CERTIFICATE_LEARNER_ID;

  /* =========================================================
     CERTIFICATE DATA
  ========================================================= */

  const certificateStats = getCertificateStats(learnerId);

  const latestCertificate = getLatestCertificate(learnerId);

  const learnerCertificates = getCurrentLearnerCertificates(learnerId);

  /* =========================================================
     HEADER ACTIONS
  ========================================================= */

  const handleViewLatestCertificate = (certificate) => {
    if (!certificate) {
      console.log("No latest certificate available.");
      return;
    }

    console.log("View latest certificate:", certificate);

    /*
      Later, when the certificate details page is created,
      this can become:

      navigate(`/learner/certificates/${certificate.id}`);
    */
  };

  const handleExploreCourses = () => {
    console.log("Explore more courses");

    /*
      Later, when course catalog routing is finalized,
      this can become:

      navigate("/learner/courses");
    */
  };

  /* =========================================================
     CLOSING SECTION ACTIONS
  ========================================================= */

  const handleBrowseLearningPaths = () => {
    console.log("Browse learning paths");

    /*
      Later, when Learning Paths routing is finalized,
      this can become:

      navigate("/learner/recommendations");
    */
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="certificates-page">
      <div className="certificates-page__container">
        {/* =====================================================
            SECTION 01
            CERTIFICATES HEADER
        ===================================================== */}

        <CertificatesHeader
          stats={certificateStats}
          latestCertificate={latestCertificate}
          onViewLatestCertificate={handleViewLatestCertificate}
          onExploreCourses={handleExploreCourses}
        />

        {/* =====================================================
            SECTION 02
            CERTIFICATE OVERVIEW
        ===================================================== */}

        <CertificateOverview
          stats={certificateStats}
          latestCertificate={latestCertificate}
          onExploreCourses={handleExploreCourses}
        />

        {/* =====================================================
            SECTION 03
            CERTIFICATE LIST
        ===================================================== */}

        <CertificateList certificates={learnerCertificates} />

        {/* =====================================================
            SECTION 04
            CERTIFICATES CLOSING
        ===================================================== */}

        <CertificatesClosing
          stats={certificateStats}
          onExploreCourses={handleExploreCourses}
          onBrowseLearningPaths={handleBrowseLearningPaths}
        />
      </div>
    </main>
  );
};

export default Certificates;
