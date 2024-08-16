import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { Trollway, Cargo, Role } from "../components/tab-content";

const SettingScreen = (props) => {
  const {} = props;
  const [tabKey, setTabKey] = useState("trollway");

  const onTabUpdate = useCallback((targetTab) => {
    setTabKey(targetTab);
  }, []);

  const tabList = [
    {
      key: "trollway",
      tab: "สายทาง",
    },
    {
      key: "cargo",
      tab: "สิ่งของบรรทุก",
    },
    {
      key: "role",
      tab: "ตำแหน่งงาน",
    },
  ];

  const content = {
    trollway: <Trollway />,
    cargo: <Cargo />,
    role: <Role />,
  };

  return (
    <Card tabList={tabList} onTabChange={(e) => onTabUpdate(e)}>
      {content[tabKey]}
    </Card>
  );
};

export default React.memo(SettingScreen);
