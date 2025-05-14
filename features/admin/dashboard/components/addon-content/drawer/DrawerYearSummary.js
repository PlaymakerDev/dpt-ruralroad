import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Drawer, Typography, Table, Spin, message, Row, Col } from 'antd'
import Image from 'next/image'
import ArrowDown from '@/public/images/arrow-down.svg'
import format from '@/utils/stringformat'
import { useAppSelector } from '@/store/hooks'
import FormSearchYearSummary from './FormSearchYearSummary'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getSumWeightYearV2 } from '@/store/features/dashboardSlice'

const Content = (props) => {
  const { data, summary, loading } = props

  console.log("data", data)
  console.log("summary", summary)
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
      title: 'รถเข้าชั่ง WIM',
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
      summary={() => {
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} className='text-center'><strong>{summary[0]?.year_total || '-'}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={1} className='text-center'><strong>{format(summary[0]?.plan_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={2} className='text-center'><strong>{format(summary[0]?.result_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={3} className='text-center'><strong>{format(summary[0]?.way_id_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={4} className='text-center'><strong>{format(summary[0]?.station_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={5} className='text-center'><strong>{format(summary[0]?.wim_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={6} className='text-center'><strong>{format(summary[0]?.spot_check_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={7} className='text-center'><strong>{format(summary[0]?.all_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={8} className='text-center'><strong>{format(summary[0]?.arrest_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={9} className='text-center'><strong>{format(summary[0]?.judge_total).normal() || 0}</strong></Table.Summary.Cell>
            <Table.Summary.Cell index={10}><strong>{summary[0]?.note || 0}</strong></Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  )
}

const DrawerYearSummary = (props) => {
  const { open, setOpen, info } = props
  const [drawerData, setDrawerData] = useState({ summary: [], data: [] })


  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getSumWeightYearV2, reducerName: 'dashboard', reducerKey: 'sum_weight_year_v2'
  })

  useEffect(() => {
    if (open) {
      setDrawerData({ data: info?.data, summary: info?.summary })
    }
  }, [open, info])

  const getYearSummary = useCallback(async (values) => {
    try {
      const response = await apiGetData(`/api/v1/dashboards/sum_weight_year_v2`, values, false, {})
      if (response?.success) {
        setDrawerData(response?.data)
      } else {
        message.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }, [setDrawerData, apiGetData])

  return (
    <Drawer
      title={<Typography.Text className='!text-xl !font-IBMPlexSansThaiRegular' strong>ประวัติสรุปผลรายปี</Typography.Text>}
      placement={'bottom'}
      // width={500}
      height={'70%'}
      onClose={() => {
        setOpen({ open: false, info: { data: [], summary: [] }, loading: false })
        setDrawerData({ data: [], summary: [] })
      }
      }
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
      <div>
        <section>
          <Typography.Title level={4} className='!m-0'>สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ สถานีตรวจสอบน้ำหนัก/หน่วยชั่งพาหนะเคลื่อนที่</Typography.Title>
          <Typography.Text className='!text-[#C3C3C3]'>ปีงบประมาณ พ.ศ. 2557 - ปัจจุบัน</Typography.Text>
        </section>
        <section className='mt-5'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
              <FormSearchYearSummary
                apiGetData={getYearSummary}
              />
            </Col>
          </Row>
        </section>
        <section className='mt-5'>
          <Content
            data={drawerData.data}
            summary={drawerData.summary}
            loading={loading}
          />
        </section>
      </div>
    </Drawer>
  )
}

export default React.memo(DrawerYearSummary)
