import React from "react";

import SettingsHeader from "../../../Components/Learner/Settings/SettingsHeader/SettingsHeader";

import "./Settings.css";
import AccountSettings from "../../../Components/Learner/Settings/AccountSettings/AccountSettings";

const Settings = () => {
  return (
    <main className="learner-settings-page">
      <div className="learner-settings-page__container">
        <SettingsHeader />
        <AccountSettings />
      </div>
    </main>
  );
};

export default Settings;
