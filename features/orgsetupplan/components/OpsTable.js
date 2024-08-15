import React from 'react';
import {  Table } from 'antd';
import '@/features/orgsetupplan/style/tableblack.module.css';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const OpsTable = () => {
  return (
    <section className='w-full bg-gradient border border-lightblue rounded-lg mt-4'   style={{ color: 'black'  }}>
      <Table dataSource={dataSource} columns={columns}  className='custom-table'/>;
    </section>
  )
}

export default OpsTable