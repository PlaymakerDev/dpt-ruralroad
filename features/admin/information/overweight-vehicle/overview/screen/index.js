import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { Stationary, WIM, Mobile } from "../components/tab-content";

const OverviewScreen = (props) => {
  const { } = props;
  const [tabKey, setTabKey] = useState("stationary");

  const onTabUpdate = useCallback((targetTab) => {
    setTabKey(targetTab);
  }, []);

  const tabList = [
    {
      key: "stationary",
      tab: "ข้อมูลรถเข้าชั่งสถานี",
    },
    {
      key: "wim",
      tab: "ข้อมูลรถเข้าชั่ง WIM",
    },
    {
      key: "mobile",
      tab: "ข้อมูลหน่วยชั่งเคลื่อนที่",
    },
  ];

  const content = {
    stationary: <Stationary />,
    wim: <WIM />,
    mobile: <Mobile />,
  };

  return (
    <Card
      tabList={tabList}
      onTabChange={(e) => onTabUpdate(e)}
    >
      {content[tabKey]}
    </Card>
  );
};

export default React.memo(OverviewScreen);
