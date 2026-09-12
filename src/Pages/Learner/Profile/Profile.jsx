import React from "react";

import ProfileHeader from "../../../Components/Learner/MyProfile/ProfileHeader/ProfileHeader";

import "./Profile.css";
import ProfileOverview from "../../../Components/Learner/MyProfile/ProfileOverview/ProfileOverview";
import PersonalInformation from "../../../Components/Learner/MyProfile/PersonalInformation/PersonalInformation";
import LearningStatistics from "../../../Components/Learner/MyProfile/LearningStatistics/LearningStatistics";

const Profile = () => {
  return (
    <div className="learner-profile">
      {/* =========================================================
          PROFILE HEADER
          ========================================================= */}

      <ProfileHeader />
      <ProfileOverview />
      <PersonalInformation />
      <LearningStatistics />
    </div>
  );
};

export default Profile;
