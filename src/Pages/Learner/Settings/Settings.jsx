import React from "react";

import SettingsHeader from "../../../Components/Learner/Settings/SettingsHeader/SettingsHeader";

import "./Settings.css";
import AccountSettings from "../../../Components/Learner/Settings/AccountSettings/AccountSettings";
import PrivacySettings from "../../../Components/Learner/Settings/PrivacySettings/PrivacySettings";
import NotificationSettings from "../../../Components/Learner/Settings/NotificationSettings/NotificationSettings";
import LearningPreferences from "../../../Components/Learner/Settings/LearningPreferences/LearningPreferences";

const Settings = () => {
  return (
    <main className="learner-settings-page">
      <div className="learner-settings-page__container">
        <SettingsHeader />
        <AccountSettings />
        <PrivacySettings />
        <NotificationSettings />
        <LearningPreferences />
      </div>
    </main>
  );
};

export default Settings;
