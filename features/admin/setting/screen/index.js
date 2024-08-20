import React, { useCallback, useState } from "react";
import { Card } from "antd";
import { Trollway, Cargo, Role, User } from "../components/tab-content";
import { ModalCargo, ModalRole } from "../components/model";
import ModalTrollway from "../components/model/ModalTrollway";

const SettingScreen = (props) => {
  const {} = props;
  const [tabKey, setTabKey] = useState("trollway");
  const [open, setOpen] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openTrollway, setOpenTrollway] = useState(false);

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
    trollway: <Trollway setOpen={setOpenTrollway} />,
    cargo: <Cargo setOpen={setOpen} />,
    role: <Role setOpen={setOpenRole} />,
    user: <User/>,
  };

  return (
    <>
      <Card tabList={tabList} onTabChange={(e) => onTabUpdate(e)}>
        {content[tabKey]}
      </Card>
      <ModalTrollway open={openTrollway} setOpen={setOpenTrollway} />
      <ModalCargo open={open} setOpen={setOpen} />
      <ModalRole open={openRole} setOpen={setOpenRole} />
    </>
  );
};

export default React.memo(SettingScreen);
