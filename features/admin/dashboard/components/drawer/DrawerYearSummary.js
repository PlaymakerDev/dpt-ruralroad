import React from 'react'
import { Drawer, Typography, Table } from 'antd'
import Image from 'next/image'
import ArrowDown from '@/public/images/arrow-down.svg'

const Content = (props) => {
  const { } = props

  const data = [
    {
      car_license: '80-6822',
      province: 'กรุงเทพมหานคร',
      km: 4,
      type: 'รถพ่วง (ยาง 8 ล้อ)',
      overweight_record: 'มีประวัติน้ำหนักเกิน'
    },
    {
      car_license: '80-6822',
      province: 'กรุงเทพมหานคร',
      km: 4,
      type: 'รถพ่วง (ยาง 8 ล้อ)',
      overweight_record: 'ขาเบียด'
    },
  ]

  const columns = [
    {
      title: 'ทะเบียนรถ',
      key: 'car_license',
      dataIndex: 'car_license'
    },
    {
      title: 'จังหวัด',
      key: 'province',
      dataIndex: 'province'
    },
    {
      title: 'กม.',
      key: 'km',
      dataIndex: 'km'
    },
    {
      title: 'ประเภท',
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: 'ประวัติน้ำหนักเกิน',
      key: 'overweight_record',
      dataIndex: 'overweight_record'
    },
  ]

  return (
    <div>
      <section>
        <Typography.Title level={4} className='!m-0'>สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ สถานีตรวจสอบน้ำหนัก/หน่วยชั่งพาหนะเคลื่อนที่</Typography.Title>
        <Typography.Text className='!text-[#C3C3C3]'>ปีงบประมาณ พ.ศ. 2557 - ปัจจุบัน</Typography.Text>
      </section>
      <section className='mt-5'>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </section>
    </div>
  )
}

const DrawerYearSummary = (props) => {
  const { open, setOpen } = props

  return (
    <Drawer
      title={<Typography.Text className='!text-xl !font-IBMPlexSansThaiRegular' strong>ประวัติสรุปผลรายปี</Typography.Text>}
      placement={'bottom'}
      // width={500}
      height={'70%'}
      onClose={() => setOpen(false)}
      open={open}
      closeIcon={
        <Image
          src={ArrowDown}
          alt='arrow-down'
        />
      }
      extra={<Typography.Text className='!text-xl !font-IBMPlexSansThaiRegular' strong>ปีงบประมาณ 2557 - ปัจจุบัน</Typography.Text>}
      // classNames={{
      //   header: 'my-3'
      // }}
      destroyOnClose
    >
      <Content />
    </Drawer>
  )
}

export default React.memo(DrawerYearSummary)
