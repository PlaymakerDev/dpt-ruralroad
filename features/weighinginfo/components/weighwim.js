import React from 'react'
import { Table, Pagination } from "antd";
import Fieldtable from './fieldtable';

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
    title: 'สถานี',
    dataIndex: 'sation',

  },
  {
    title: 'จำนวนรถเข้าชั่ง',
    dataIndex: 'weighcar',
  },
  {
    title: 'รถบรรทุกน้ำหนักเกิน',
    dataIndex: 'weighover',
  },

];
const data = [
  {
    key: '1',
    date: '20 สิงหาคม 2567',
    sation: 'หมูกรอบ',
    weighcar: '16',
    weighover: '466',
  },
  
  {
    key: '2',
    date: '13 สิงหาคม 2567',
    sation: 'ข้าวผัด',
    weighcar: '19',
    weighover: '112',
  },
  
];

const Weighwim = () => {
  return (
    <div>
      <Fieldtable />
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={50} />
    </div>
  )
}

export default Weighwim
