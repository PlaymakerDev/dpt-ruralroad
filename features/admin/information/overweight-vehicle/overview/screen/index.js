import React, { useCallback, useState, createContext, useEffect, useContext } from "react";
import { Card } from "antd";
import { Stationary, WIM, Mobile } from "../components/tab-content";
import { useRouter } from "next/router";
import { OverWeightVehicleTab } from "@/pages/_app";

export const FormSearchNew = createContext();

const OverviewScreen = (props) => {
  const [localVehicleMenuTab, setLocalVehicleMenuTab] = useState('stationary')
  const { setCurrentStep } = props;
  const { query, push } = useRouter();
  const router = useRouter();
  // Set FORM
  const INIT_DETAIL_FORM = {
    plan_year: router.query.plan_year ? router.query.plan_year : "",
    start_date: router.query.start_date ? router.query.start_date : "",
    end_date: router.query.end_date ? router.query.end_date : "",
    station_id: router.query.station_id ? router.query.station_id : "",
    department_id: router.query.department_id ? router.query.department_id : "",
  }
  // SetTabKey
  // const [vehicleMenuTab, setVehicleMenuTab] = useState("stationary");
  // SetFormSearch
  const [formSearch, setFormSearch] = useState(INIT_DETAIL_FORM);
  const onTabUpdate = useCallback(
    (targetTab) => {
      setCurrentStep(targetTab);
      setLocalVehicleMenuTab(targetTab);
      router.push({
        pathname: '/admin/information/overweight-vehicle/overview',
        query: {
          type: targetTab,
        }
      })
      // setVehicleMenuTab(targetTab)
    },
    [setCurrentStep]
  );
  // EffectChangeTab
  useEffect(() => {
    if (router.query.type) {
      setLocalVehicleMenuTab(router.query.type);
      setCurrentStep(router.query.type);
    }else{
      router.replace({
        pathname: '/admin/information/overweight-vehicle/overview',
        query: { type: 'stationary' },
      });
    }
  }, [router.query.type, setCurrentStep]);

  useEffect(() => {
  }, [localVehicleMenuTab])
  console.log("test")



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
    stationary: <Stationary tabKey={localVehicleMenuTab} formSearch={formSearch} />,
    wim: <WIM tabKey={localVehicleMenuTab} formSearch={formSearch} />,
    mobile: <Mobile tabKey={localVehicleMenuTab} formSearch={formSearch} />,
  };
  return (
    <FormSearchNew.Provider value={{ formSearch, setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab }}>
      <Card
        tabList={tabList}
        activeTabKey={localVehicleMenuTab}
        onTabChange={(e) => onTabUpdate(e)}
      >
        {content[query.type]}
      </Card>
    </FormSearchNew.Provider>
  );
};

export default React.memo(OverviewScreen);
