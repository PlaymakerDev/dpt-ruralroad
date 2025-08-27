import React, { useMemo } from 'react'
import { Drawer, Typography, Table, Spin } from 'antd'
import Image from 'next/image'
import ArrowDown from '@/public/images/arrow-down.svg'
import format from '@/utils/stringformat'
import { useAppSelector } from '@/store/hooks'

const Content = (props) => {
  const { data, loading } = props

  // const mock_data = [
  //   {
  //     car_license: '80-6822',
  //     province: 'กรุงเทพมหานคร',
  //     km: 4,
  //     type: 'รถพ่วง (ยาง 8 ล้อ)',
  //     overweight_record: 'มีประวัติน้ำหนักเกิน'
  //   },
  //   {
  //     car_license: '80-6822',
  //     province: 'กรุงเทพมหานคร',
  //     km: 4,
  //     type: 'รถพ่วง (ยาง 8 ล้อ)',
  //     overweight_record: 'ขาเบียด'
  //   },
  // ]

  const columns = [
    {
      title: 'ปีงบประมาณ',
      key: 'year_total',
      dataIndex: 'year_total',
      width: 100,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
      sorter: (a, b) => Number(a.year_total) - Number(b.year_total)
    },
    {
      title: 'แผนดำเนินการ',
      key: 'plan_total',
      dataIndex: 'plan_total',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'ผลจำนวนครั้งที่ตั้งด่าน',
      key: 'result_total',
      dataIndex: 'result_total',
      width: 300,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'จำนวนสายทางที่ดำเนินการ',
      key: 'way_id_total',
      dataIndex: 'way_id_total',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'รถเข้าชั่งสถานี',
      key: 'station_total',
      dataIndex: 'station_total',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'รถเข้าชั่ง VIS',
      key: 'wim_total',
      dataIndex: 'wim_total',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'รถเข้าชั่ง Spot Check',
      key: 'spot_check_total',
      dataIndex: 'spot_check_total',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'รวมจำนวนรถเข้าชั่ง',
      key: 'all_total',
      dataIndex: 'all_total',
      width: 300,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'จับกุมดำเนินคดี',
      key: 'arrest_total',
      dataIndex: 'arrest_total',
      width: 300,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'ศาลพิจารณา',
      key: 'judge_total',
      dataIndex: 'judge_total',
      width: 300,
      align: 'center',
      render: (item) => {
        if (item) {
          return format(item).normal()
        }
        return '-'
      }
    },
    {
      title: 'หมายเหตุ',
      key: 'note',
      dataIndex: 'note',
      width: 300,
      // align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
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
          columns={columns}
          dataSource={data || []}
          loading={loading}
          pagination={false}
          // pagination={{
          //   defaultCurrent: 1,
          //   defaultPageSize: 100,
          //   current: page,
          //   pageSize: perPage,
          //   total: Number(total) || 0,
          //   onChange: onChange,
          //   showSizeChanger: false,
          //   position: ['bottomCenter']
          // }}
          scroll={{ x: 1600 }}
        />
        {/* <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          loading={loading}
        /> */}
      </section>
    </div>
  )
}

const DrawerYearSummary = (props) => {
  const { open, setOpen, info, loading } = props
  // const data = useAppSelector(state => state.dashboard.sum_weight_year.data)
  // const loading = useAppSelector(state => state.tasksRunning['GET:/api/v1/dashboards/sum_weight_year'])

  // const renderContent = useMemo(() => {
  //   if (!loading?.loading && typeof loading?.loading !== 'undefined') {
  //     return (
  //       <Content
  //         data={data}
  //         loading={loading?.loading}
  //       />
  //     )
  //   } else {
  //     return (
  //       <Spin
  //         spinning={loading?.loading}
  //       />
  //     )
  //   }
  // }, [data, loading])

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
      <Content
        data={info}
        loading={loading}
      />
      {/* {renderContent} */}
    </Drawer>
  )
}

export default React.memo(DrawerYearSummary)
