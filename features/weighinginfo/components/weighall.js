import React from 'react'
import { Table, Pagination } from "antd";
import Fieldtableall from './fieldtableall';

const columns = [
  {
    title: 'วันที่',
    dataIndex: 'date',
  },
  {
    title: 'ด่านชั่งเคลื่อนที่',
    dataIndex: 'movesation',
  },
  {
    title: 'สถานีชั่งน้ำหนัก',
    dataIndex: 'weighsation',
  },
  {
    title: 'Weight In Motion',
    dataIndex: 'weighwim',
  },
  {
    title: 'สบร.',
    dataIndex: 'sbr',
  },
  {
    title: 'รวมทั้งหมด',
    dataIndex: 'sum',
  },

];
const data = [
  {
    date: '15 สิงหาคม 2567',
    movesation: '656',
    weighsation: '555',
    weighwim: '1,666',
    sbr: '123',
    sum: '123,456',
  },
  
  {
    date: '17 สิงหาคม 2567',
    movesation: '65',
    weighsation: '485',
    weighwim: '12,666',
    sbr: '13',
    sum: '53,456',
  },
  
  {
    date: '19 สิงหาคม 2567',
    movesation: '99',
    weighsation: '999',
    weighwim: '9,999',
    sbr: '999',
    sum: '999,999',
  },
  
  
];

const Weighall = () => {
  return (
    <div>
      <Fieldtableall />
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={50} />
    </div>
  )
}

export default Weighall
