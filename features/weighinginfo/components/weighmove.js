import React from 'react'
import { Table } from "antd";
import Fieldtablemove from './fieldtablemove';

const columns = [
  {
    title: 'ลำดับ',
    dataIndex: 'key',
  },
  {
    title: 'วันที่',
    dataIndex: 'date',
  },
  {
    title: 'เวลาจัดตั้ง',
    dataIndex: 'timestart',
  },
  {
    title: 'เวลาสิ้นสุด',
    dataIndex: 'timeend',
  },
  {
    title: 'หน่วยที่จัดตั้ง',
    dataIndex: 'duty',
  },
  {
    title: 'รหัสสายทาง',
    dataIndex: 'code',
  },
  {
    title: 'บูรณาการ',
    dataIndex: 'wtf',
  },
  {
    title: 'จำนวนรถเข้าชั่ง',
    dataIndex: 'manyin',
  },
  {
    title: 'น้ำหนักเกิน',
    dataIndex: 'over',
  },
  
];
const data = [
  {
    key: '1',
    date: '20 สิงหาคม 2567',
    timestart: '13:30',
    timeend: '15.50',
    duty: 'ตลิ่งชัน',
    code: 'กกน.123',
    wtf: 'กช.',
    manyin: '1',
    over: '1',
  },
  {
    key: '2',
    date: '25 สิงหาคม 2567',
    timestart: '16:30',
    timeend: '18.50',
    duty: 'น่านไง',
    code: 'วดฟ.789',
    wtf: '-',
    manyin: '10',
    over: '5',
  },
  
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Weighmove = () => {
  return (
    <div>
      <Fieldtablemove />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}

export default Weighmove
