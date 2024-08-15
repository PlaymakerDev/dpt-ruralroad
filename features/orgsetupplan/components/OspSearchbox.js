import React from 'react';
import { Typography, Select } from 'antd';
import '../style/opssearch.module.css'; // Import the CSS file

const OspSearchbox = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <section className='w-full bg-gradient border border-lightblue rounded-lg mt-4 p-4 px-8'>
      <Typography.Title level={5} className='text-white'>ค้นหา</Typography.Title>
      <div className='flex flex-row flex-wrap gap-4'>
        <div className='flex flex-col'>
          <Typography.Text className='text-white'>ปีงบประมาณ</Typography.Text>
          <Select
            defaultValue={currentYear}
            style={{ width: 200, color: 'white' }}
            onChange={(value) => console.log('Selected Year:', value)}
          >
            {years.map(year => (
              <Select.Option key={year} value={year} className="custom-option">
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='flex flex-col'>
          <Typography.Text className='text-white'>หน่วยงาน</Typography.Text>
          <Select
            defaultValue={currentYear}
            style={{ width: 250, color: 'white' }}
            onChange={(value) => console.log('Selected Year:', value)}
          >
            {years.map(year => (
              <Select.Option key={year} value={year} className="custom-option">
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>
        <button className='rounded-lg text-white w-32'>ค้นหา</button>
        <div className='flex-1 flex items-center '>
          <p className='text-white'>ล้างการค้นหา</p>
        </div>
        <button className='rounded-lg ml-auto text-white w-40'>เพิ่มข้อมูล</button>
      </div>
    </section>


  );
};

export default OspSearchbox;
