import React from 'react';
import { Table } from 'antd';
import '@/features/orgsetupplan/style/tableblack.module.css';
import { Pagination } from 'antd';
import { dataSource, columns } from './mockupdata';



const OpsTable = () => {
  return (
    <section className='w-full bg-gradient border border-lightblue rounded-lg mt-4'>
    <div className='rounded-lg overflow-hidden'>
      <div className='overflow-auto'>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          className='rounded-lg bg-transparent'
          style={{ minWidth: '100%' }} // ให้ตารางขยายเต็มความกว้างของคอนเทนเนอร์
        />
      </div>
    </div>

    <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={50} />
  </section>
  )
}

export default OpsTable