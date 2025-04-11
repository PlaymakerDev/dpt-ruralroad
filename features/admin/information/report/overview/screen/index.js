import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Card, Tabs } from 'antd'
import {
  CentralManagementProposal as CentralManagement,
  WeighingUnitToRDHighwayDistrict as WeightUnit,
  RDHighwayDistrictToRDHighwayRegion as HighwayDistrict,
  RDHighwayRegionToRDBureau as HighwayRegion
} from '../components/tab'
import { useAppSelector } from '@/store/hooks'
import { allowAdmin, filterDeptType } from '@/utils/allowAdmin'

const ReportScreen = (props) => {
  const { query, setCurrentStep } = props
  const [tabKey, setTabKey] = useState('central_management')
  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name
  const deptType = user?.dept_type

  const onTabUpdate = useCallback((targetTab) => {
    setCurrentStep(targetTab)
    setTabKey(targetTab)
  }, [setCurrentStep])

  const renderItem = useMemo(() => {
    if (filterDeptType(deptType,role)) {
    // if (allowAdmin(role)) {
      return [
        {
          key: 'central_management',
          label: 'ส่วนกลางเสนอผู้บริหาร',
          children: <CentralManagement tabKey={tabKey} />,
        },
        {
          key: 'weight_unit',
          label: 'หน่วยชั่ง ถึง ขทช.',
          children: <WeightUnit tabKey={tabKey} />,
        },
        {
          key: 'highway_district',
          label: 'ขทช. ถึง สทช.',
          children: <HighwayDistrict tabKey={tabKey} />,
        },
        {
          key: 'highway_region',
          label: 'สทช. ถึง สบร.',
          children: <HighwayRegion tabKey={tabKey} />,
        },
      ]
    } else {
      return [
        {
          key: 'weight_unit',
          label: 'หน่วยชั่ง ถึง ขทช.',
          children: <WeightUnit tabKey={tabKey} />,
        },
        {
          key: 'highway_district',
          label: 'ขทช. ถึง สทช.',
          children: <HighwayDistrict tabKey={tabKey} />,
        },
        {
          key: 'highway_region',
          label: 'สทช. ถึง สบร.',
          children: <HighwayRegion tabKey={tabKey} />,
        },
      ]
    }
  }, [role, tabKey])

  // const items = [
  //   {
  //     key: 'central_management',
  //     label: 'ส่วนกลางเสนอผู้บริหาร',
  //     children: <CentralManagement />,
  //   },
  //   {
  //     key: 'weight_unit',
  //     label: 'หน่วยชั่ง ถึง ขทช.',
  //     children: <WeightUnit />,
  //   },
  //   {
  //     key: 'highway_district',
  //     label: 'ขทช. ถึง สทช.',
  //     children: <HighwayDistrict />,
  //   },
  //   {
  //     key: 'highway_region',
  //     label: 'สทช. ถึง สบร.',
  //     children: <HighwayRegion />,
  //   },
  // ];

  return (
    <Tabs
      defaultActiveKey={query?.tabKey ? query?.tabKey : tabKey}
      items={renderItem}
      onChange={onTabUpdate}
    />
  )
}

export default React.memo(ReportScreen)
