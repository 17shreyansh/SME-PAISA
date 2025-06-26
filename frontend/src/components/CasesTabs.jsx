import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const CasesTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: '16px' }}>
      <TabPane tab="All Cases" key="all" />
      <TabPane tab="Pending" key="pending" />
      <TabPane tab="In Review" key="review" />
      <TabPane tab="Approved" key="approved" />
    </Tabs>
  );
};

export default CasesTabs;