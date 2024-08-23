import React, { useState, useCallback } from 'react'
import { Card, Tabs } from 'antd'
import {
  CentralManagementProposal as CentralManagement,
  WeighingUnitToRDHighwayDistrict as WeightUnit,
  RDHighwayDistrictToRDHighwayRegion as HighwayDistrict,
  RDHighwayRegionToRDBureau as HighwayRegion
} from '../components/tab'

const ReportScreen = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState('central_management')

  const onTabUpdate = useCallback((targetTab) => {
    setTabKey(targetTab)
  }, [])

  const items = [
    {
      key: 'central_management',
      label: 'ส่วนกลางเสนอผู้บริหาร',
      children: <CentralManagement />,
    },
    {
      key: 'weight_unit',
      label: 'หน่วยชั่ง ถึง ขทช.',
      children: <WeightUnit />,
    },
    {
      key: 'highway_district',
      label: 'ขทช. ถึง สทช.',
      children: <HighwayDistrict />,
    },
    {
      key: 'highway_region',
      label: 'สทช. ถึง สบร.',
      children: <HighwayRegion />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={tabKey}
      items={items}
      onChange={onTabUpdate}
    />
  )
}

export default React.memo(ReportScreen)
