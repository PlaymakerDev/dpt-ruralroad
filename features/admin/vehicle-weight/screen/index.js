import React, { useCallback, useState } from "react";
import { Card } from "antd";
import {
  StationWeighingUnit as Station,
  WIMWeighingUnit as WIM,
  MobileWeighingUnit as Mobile,
  WeighingSummary as Summary
} from "../components/tab-content";

const VehicleWeightScreen = (props) => {
  const { setCurrentStep } = props;
  const [tabKey, setTabKey] = useState("station");

  const onTabUpdate = useCallback((targetTab) => {
    setCurrentStep(targetTab)
    setTabKey(targetTab);
  }, []);

  const tabList = [
    {
      key: "station",
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
    {
      key: "summary",
      tab: "สรุปข้อมูลเข้าชั่ง",
    },
  ];

  const content = {
    station: <Station />,
    wim: <WIM />,
    mobile: <Mobile />,
    summary: <Summary />,
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

export default React.memo(VehicleWeightScreen);
