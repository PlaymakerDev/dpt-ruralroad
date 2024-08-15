import React, { useState } from 'react';
import { Card } from 'antd';
import Weightable from './weightable';

const tabListNoTitle = [
  {
    key: 'article',
    label: 'article',
  },
  {
    key: 'app',
    label: 'app',
  },
  {
    key: 'project',
    label: 'project',
  },
];
const contentListNoTitle = {
  article: <Weightable />,
  app: <p>app content</p>,
  project: <p>project content</p>,
};


const Weightab = () => {
  
const [activeTabKey2, setActiveTabKey2] = useState('article');
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

export default Weightab
