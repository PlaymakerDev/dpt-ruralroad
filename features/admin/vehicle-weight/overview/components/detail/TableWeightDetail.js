import React, { useCallback, useEffect } from 'react'
import { Button, Space, Table, Typography } from 'antd'
import { TruckFilled } from '@ant-design/icons'
import { calculate_index } from '@/utils/calculator'
import stf from '@/utils/stringformat'
import { VEHICLE_PROPERTIES, WEIGHT_STATUS, WEIGHT_STATUS_WITH_PROPERTIES } from '@/utils/constant'
import Image from 'next/image'
import { TruckIcon } from '@/components/icon'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { div } from '@/utils/calculate'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getAllProvince } from '@/store/features/masterSlice'
// const _ = require('lodash');

dayjs.extend(customParseFormat);

const TableWeightDetail = (props) => {
  const { data, loading, page, perPage, total, onChange, setStep, setCurrentStep, setOpen, openModalWithData } = props

  const [apiGetProvince, loadingProvince, masterProvince] = useGetAPI('overlay', {
    funcDispatch: getAllProvince, reducerName: 'master', reducerKey: 'province'
  })

  useEffect(() => {
    apiGetProvince('/api/v1/masters/provinces_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      align: 'center',
      width: 100,
      render: (item, record, index) => {
        return stf(calculate_index(index, page, perPage, total)).normal()
      }
    },
    {
      title: "วัน-เวลา",
      key: 'time_stamp',
      dataIndex: "time_stamp",
      width: 200,
      render: (item, record) => {
        if (item) {
          return dayjs(item, 'DD/MM/YYYY HH:mm:ss').locale('th').format('DD MMMM YYYY HH:mm:ss')
        }
        return '-'
      },
      sorter: (a, b) => dayjs(a.time_stamp, 'DD/MM/YYYY HH:mm:ss').unix() - dayjs(b.time_stamp, 'DD/MM/YYYY HH:mm:ss').unix()
    },
    {
      title: "ทะเบียน",
      key: 'vehicle_license',
      dataIndex: "vehicle_license",
      width: 200,
      render: (item, record) => {
        // const result = _.find(masterProvince.all, { pid: Number(record?.lp_head_province_id) });
        return (
          <Space direction='vertical'>
            <Typography.Text>ทะเบียน : {record?.lp_head_no || '-'}</Typography.Text>
            <Typography.Text>จังหวัด : {record?.lp_head_province_name || '-'}</Typography.Text>
            {/* <Typography.Text>จังหวัด : {result ? result.name_th : '-'}</Typography.Text> */}
          </Space>
        )
      }
    },
    {
      title: "ประเภทรถบรรทุก",
      key: 'vehicle_type',
      dataIndex: "vehicle_type",
      width: 200,
      render: (item, record) => {
        if (record.vehicle_class_id) {
          return (
            <Space direction='vertical'>
              <Typography.Text>{VEHICLE_PROPERTIES[record.vehicle_class_id]?.properties?.vehicle_type}</Typography.Text>
              <Typography.Text>{VEHICLE_PROPERTIES[record.vehicle_class_id]?.properties?.vehicle_description}</Typography.Text>
            </Space>
          )
        }
        return '-'
      }
    },
    {
      title: "ลักษณะรถ",
      key: 'vehicle_appearance',
      dataIndex: "vehicle_appearance",
      width: 200,
      onHeaderCell: () => {
        return {
          style: {
            textAlign: 'center',
          }
        };
      },
      render: (item, record) => {
        if (record.vehicle_class_id) {

          const newWidth = VEHICLE_PROPERTIES[record.vehicle_class_id]?.vehicle?.width * 0.5
          const newHeight = VEHICLE_PROPERTIES[record.vehicle_class_id]?.vehicle?.height * 0.2
          return (

            <Image
              src={VEHICLE_PROPERTIES[record.vehicle_class_id]?.vehicle?.image}
              alt='vehicle-appearance'
              width={newWidth}
              height={newHeight}
            />

          )
        }
        return '-'
      }
    },
    {
      title: "น้ำหนักที่ชั่ง (ตัน)",
      key: "gross_weight",
      dataIndex: "gross_weight",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "น้ำหนักที่เกิน (ตัน)",
      key: "grossweight_over",
      dataIndex: "grossweight_over",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(record.gross_weight) < Number(record.legal_weight)) {
          return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        }
      }
    },
    {
      title: "น้ำหนักตามกฏหมาย (ตัน)",
      key: "legal_weight",
      dataIndex: "legal_weight",
      align: 'center',
      width: 150,
      render: (item, record) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "สถานะเข้าชั่ง",
      key: 'is_over_weight',
      dataIndex: "is_over_weight",
      align: 'center',
      width: 150,
      render: (item, record) => {
        if (item) {
          return <Typography.Text className={`!text-[${WEIGHT_STATUS_WITH_PROPERTIES[item]?.color}]`}>{WEIGHT_STATUS_WITH_PROPERTIES[item]?.text}</Typography.Text>
        }
        return '-'
        // if (Number(record.gross_weight) < Number(record.legal_weight)) {
        //   return <Typography.Text className='!text-[#56E4EE]'>{WEIGHT_STATUS[item]}</Typography.Text>
        // } else {
        //   return <Typography.Text className='!text-[#FF4A4A]'>{WEIGHT_STATUS[item]}</Typography.Text>
        // }
      },
      sorter: (a, b) => a.is_over_weight.localeCompare(b.is_over_weight)
    },
    {
      title: '',
      key: 'action',
      dataIndex: "action",
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          <Button
            type='primary'
            icon={<TruckIcon customFill='#FFFFFF' />}
            // onClick={() => setOpen({ open: true })}
            onClick={() => openModalWithData(record)}
          />
        )
      }
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 100,
        current: page,
        pageSize: perPage,
        total: Number(total) || 0,
        onChange: onChange,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      onRow={(record) => ({
        onClick: () => {
          openModalWithData(record)
        },
      })}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableWeightDetail)
