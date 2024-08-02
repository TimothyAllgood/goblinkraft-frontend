import React, { useEffect, useRef, useState } from "react";
import "./Tabs.css";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const tabHeadersRef = useRef(null);

  useEffect(() => {
    setActiveTab(tabs[0].label);
  }, [tabs]);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs">
      <div className="tab-headers" ref={tabHeadersRef}>
        {tabs.map((tab) => (
          <span
            key={tab.label}
            className={`tab-header ${activeTab === tab.label ? "active" : ""}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`tab-panel ${activeTab === tab.label ? "active" : ""}`}
          >
            {activeTab === tab.label &&
              React.cloneElement(tab.component, { heightRef: tabHeadersRef })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
