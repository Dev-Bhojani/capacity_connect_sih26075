import React from "react";
import {
  FiAward,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiCode,
  FiDownload,
  FiFileText,
  FiGrid,
  FiShield,
  FiStar,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

import "./CertificatesHeader.css";

const CertificatesHeader = ({
  stats = {},
  latestCertificate = null,
  onViewLatestCertificate,
  onExploreCourses,
}) => {
  const {
    totalCertificates = 0,
    verifiedCertificates = 0,
    averageScore = 0,
  } = stats;

  const latest = latestCertificate || {
    courseTitle: "Full Stack Web Development",
    completionDate: "27 Aug 2026",
    certificateNumber: "CC-FSWD-2026-001",
    score: 92,
    verification: {
      isVerified: true,
    },
  };

  const formatDate = (date) => {
    if (!date) return "Recently completed";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleLatestCertificate = () => {
    if (onViewLatestCertificate) {
      onViewLatestCertificate(latest);
      return;
    }

    console.log("View latest certificate:", latest);
  };

  const handleExploreCourses = () => {
    if (onExploreCourses) {
      onExploreCourses();
      return;
    }

    console.log("Explore more courses");
  };

  return (
    <></>
  );
};

export default CertificatesHeader;
