import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { Trollway, Cargo, Role, User } from "../components/tab-content";
import Addnews from "../components/tab-content/Addnews";

const SettingScreen = (props) => {
  const { setCurrentStep } = props;
  const [tabKey, setTabKey] = useState("trollway");

  const onTabUpdate = useCallback((targetTab) => {
    setCurrentStep(targetTab)
    setTabKey(targetTab);
  }, [setCurrentStep]);

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
    {
      key: "addnews",
      tab: "ข่าวสาร"
    }
  ];

  const content = {
    trollway: <Trollway />,
    cargo: <Cargo />,
    role: <Role />,
    user: <User />,
    addnews: <Addnews/>,
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
