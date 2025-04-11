import React, { useCallback, useState, useContext, createContext, useEffect , useRef} from "react";
import { Card } from "antd";
import {
  StationWeighingUnit as Station,
  WIMWeighingUnit as WIM,
  MobileWeighingUnit as Mobile,
  WeighingSummary as Summary
} from "../components/tab-content";
import { PageContext } from "@/pages/admin/vehicle-weight/overview";
import { useRouter } from 'next/router';


export const FormSearchNew = createContext();

const INIT_DETAIL_FORM = { 
  type: '',
  start_date: "",
  end_date: "",
}

const VehicleWeightScreen = (props) => {
  const router = useRouter()
  const { key, menu } = router.query
  const { setCurrentStep } = props;
  const { setStep } = useContext(PageContext)
  const [tabKey, setTabKey] = useState("");
  const mobileContentRef = useRef(null); // Create a ref for the "mobile" content
  const [formSearch, setFormSearch] = useState(INIT_DETAIL_FORM);

  const onTabUpdate = useCallback((targetTab) => {
    setStep(1)
    setCurrentStep({
      step: targetTab,
      in_detail: false
    })
    setTabKey(targetTab);
  }, [setCurrentStep, setStep]);

  useEffect(() => {
    if (router.query.type) {
      setCurrentStep({
        step: router.query.type,
        in_detail: false
      })
      setTabKey(router.query.type);
    }
  }, [router.query.type, setCurrentStep]);

  useEffect(() => {
    if (key === "mobile") {
      setTabKey(key)
    }else{
      setTabKey('station')
    }
  }, [key]);


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
    station: <Station tabKey={tabKey} setCurrentStep={setCurrentStep} />,
    wim: <WIM tabKey={tabKey} setCurrentStep={setCurrentStep} />,
    mobile: <Mobile tabKey={tabKey} setCurrentStep={setCurrentStep} />,
    summary: <Summary tabKey={tabKey} formSearch={formSearch}/>,
  };

  return (
    <FormSearchNew.Provider value={{ setFormSearch }}>
    <Card
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={(e) => onTabUpdate(e)}
    >
      {content[tabKey]}
    </Card>
    </FormSearchNew.Provider>
  );
};

export default React.memo(VehicleWeightScreen);
