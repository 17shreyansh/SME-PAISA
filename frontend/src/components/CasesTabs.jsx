import React from 'react';
import { Tabs } from 'antd';
import './CasesTabs.css'; // Create this file

const { TabPane } = Tabs;

const CasesTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      className="cases-tabs"
      tabBarGutter={24}
    >
      <TabPane tab="All Cases" key="all" />
      <TabPane tab="Pending" key="pending" />
      <TabPane tab="In Review" key="review" />
      <TabPane tab="Approved" key="approved" />
    </Tabs>
  );
};

export default CasesTabs;
