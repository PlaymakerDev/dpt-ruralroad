import React from 'react'
import { Typography, Table, ConfigProvider } from 'antd'

const TableSummary = (props) => {
  const { } = props

  const columns = [
    {
      title: 'ปีงบประมาณ',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'แผนดำเนินการ',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'ผลจำนวนครั้งที่ตั้งด่าน',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'จำนวนสายทางที่ให้ดำเนินการ',
      dataIndex: 'process',
      key: 'process',
    },
    {
      title: 'รถเข้าชั่ง WIM',
      dataIndex: 'wim_check',
      key: 'wim_check',
    },
    {
      title: 'รถเข้าชั่ง Sport Check',
      dataIndex: 'sport_check',
      key: 'sport_check',
    },
    {
      title: 'รวมจำนวนรถเข้าชั่ง',
      dataIndex: 'weight_amount',
      key: 'weight_amount',
    },
    {
      title: 'ศาลพิจารณา',
      dataIndex: 'court_decision',
      key: 'court_decision',
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <div className=''>
      <section>
        <Typography.Title level={5} className='!m-0'>สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ สถานีตรวจสอบน้ำหนัก/หน่วยชั่งพาหนะเคลื่อนที่</Typography.Title>
        <Typography.Text>ปีงบประมาณ พ.ศ. 2557 - ปัจจุบัน</Typography.Text>
      </section>
      <section className='mt-3'>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#56E4EE77'
              }
            }
          }}>
          <Table
            dataSource={[]}
            columns={columns}
            scroll={{ x: 1600 }}
          />
        </ConfigProvider>
      </section>
    </div>
  )
}

export default React.memo(TableSummary)
