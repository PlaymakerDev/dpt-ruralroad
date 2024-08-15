import React, { useState } from 'react';
import { Card } from 'antd';
import Weightable from './weightable';
import Weighwim from './weighwim';
import Weighmove from './weighmove';
import Weighall from './weighall';

const tabListNoTitle = [
  {
    key: 'tab1',
    label: 'ข้อมูลรถเข้าชั่งสถานี',
  },
  {
    key: 'tab2',
    label: 'ข้อมูลรถเข้าชั่ง WIM',
  },
  {
    key: 'tab3',
    label: 'ข้อมูลหน่วยชั่งเคลื่อนที่',
  },
  {
    key: 'tab4',
    label: 'สรุปข้อมูลเข้าชั่ง',
  },
];
const contentListNoTitle = {
  tab1: <Weightable />,
  tab2: <Weighwim />,
  tab3: <Weighmove />,
  tab4: <Weighall />,
};


const Tabtable = () => {
  
const [activeTabKey2, setActiveTabKey2] = useState('tab1');
const onTab2Change = (key) => {
  setActiveTabKey2(key);
};
  return (
    <div>
      <Card
        className='container mx-auto p-4 border-1 border-blue-500 bg-gradient border-lightblue !w-full !h-full !bg-slate-500'
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </div>
  )
}

export default Tabtable
