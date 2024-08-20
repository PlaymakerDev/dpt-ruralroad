import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { Trollway, Cargo, Role, User } from "../components/tab-content";

const SettingScreen = (props) => {
  const { } = props;
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
    {
      key: "user",
      tab: "ผู้ใช้งาน",
    },
  ];

  const content = {
    trollway: <Trollway />,
    cargo: <Cargo />,
    role: <Role />,
    user: <User />,
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

export default React.memo(SettingScreen);
