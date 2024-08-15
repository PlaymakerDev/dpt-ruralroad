import React from 'react'
import { Table } from "antd";
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
    date: '15 สิงหาคม 2567',
    sation: 'ปักกิ่ง',
    weighcar: '156',
    weighover: '666',
  },
  {
    key: '2',
    date: '17 สิงหาคม 2567',
    sation: 'เกาหลีเหนือ',
    weighcar: '189',
    weighover: '72',
  },
  
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Weightable = () => {
  return (
    <div>
      <Fieldtable />
      <Table columns={columns} dataSource={data} onChange={onChange}
      rowClassName={(data, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')} />
      
    </div>
  )
}

export default Weightable
