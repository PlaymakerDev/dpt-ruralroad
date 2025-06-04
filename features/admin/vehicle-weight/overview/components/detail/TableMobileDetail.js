import React, { useCallback, useState } from 'react'
import { Button, Space, Table, Typography, Image, Modal, message, Row, Col } from 'antd'
import { PictureOutlined, TruckFilled, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import stf from '@/utils/stringformat'
import { calculate_index } from '@/utils/calculator'
import { VEHICLE_PROPERTIES, WEIGHT_STATUS, WEIGHT_STATUS_WITH_PROPERTIES } from '@/utils/constant'
import NextImage from 'next/image'
import { Bin as DeleteIcon, TruckIcon } from '@/components/icon'
import useDeleteAPI from '@/utils/hooks/api/useDeleteAPI'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { filterDeptType } from '@/utils/allowAdmin'
import { useAppSelector } from '@/store/hooks'

dayjs.extend(customParseFormat);

const TableMobileDetail = (props) => {
  const { data, loading, page, perPage, total, onChange, openModalWithData, openImageModalWithData, reload, setimageTDID } = props
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name
  const deptType = user?.dept_type

  console.log('the role', role)

  const deleteRecord = useCallback(async (td_id) => {
    const response = await apiDelete(`/api/v1/weight/weight_mobile_master_detail/${td_id}`, {}, {}, false)
    if (response?.success) {
      message.success('ลบข้อมูลสำเร็จ')
      reload()
      Modal.destroyAll()
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [apiDelete, reload])

  const confirmDelete = useCallback((td_id) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านต้องการลบข้อมูลรถเข้าชั่งใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => deleteRecord(td_id),
      okButtonProps: {
        loading: loadingDelete
      },
      onCancel: () => Modal.destroyAll()
    })
  }, [deleteRecord, loadingDelete])

  // const mock_data = [
  //   {
  //     no: "1",
  //     date: "09 สิงหาคม 2567",
  //     time: '20:54:23',
  //     vehicle_license_plate: "83-2835",
  //     province: 'ราชบุรี',
  //     vehicle_type: "ประเภท 2",
  //     vehicle_type_detail: '3 เพลา 6 เส้น',
  //     total_weight: "12.000",
  //     legal_weight: "15.000",
  //     weighing_status: "น้ำหนักปกติ",
  //     vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
  //   },
  //   {
  //     no: "2",
  //     date: "09 สิงหาคม 2567",
  //     time: '20:54:23',
  //     vehicle_license_plate: "83-2835",
  //     province: 'ราชบุรี',
  //     vehicle_type: "ประเภท 2",
  //     vehicle_type_detail: '3 เพลา 6 เส้น',
  //     total_weight: "53.500",
  //     legal_weight: "55.00",
  //     weighing_status: "น้ำหนักปกติ",
  //     vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
  //   },
  //   {
  //     no: "3",
  //     date: "09 สิงหาคม 2567",
  //     time: '20:54:23',
  //     vehicle_license_plate: "83-2835",
  //     province: 'ราชบุรี',
  //     vehicle_type: "ประเภท 2",
  //     vehicle_type_detail: '3 เพลา 6 เส้น',
  //     total_weight: "17.000",
  //     legal_weight: "15.000",
  //     weighing_status: "น้ำหนักเกิน",
  //     vehicle_weighing_image: 'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e',
  //   },
  // ]

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
      title: "วันที่ / เวลา",
      key: 'create_date',
      dataIndex: "create_date",
      width: 200,
      render: (item, record) => {
        if (item) {
          return dayjs(item, 'DD/MM/YYYY HH:mm:ss').locale('th').format('DD MMMM YYYY HH:mm:ss')
        }
        return '-'
      },
      sorter: (a, b) => dayjs(a.create_date, 'DD/MM/YYYY HH:mm:ss').unix() - dayjs(b.create_date, 'DD/MM/YYYY HH:mm:ss').unix()
    },
    {
      title: "ทะเบียน",
      key: 'vehicle_license_plate',
      dataIndex: "vehicle_license_plate",
      width: 200,
      render: (item, record) => {
        return (
          <Space direction='vertical'>
            <Typography.Text>ทะเบียน: {record.lp_head_no || '-'}</Typography.Text>
            <Typography.Text>จังหวัด: {record.lp_head_province_name || '-'}</Typography.Text>
          </Space>
        )
      }
    },
    {
      title: "ประเภทรถบรรทุก",
      key: 'vehicle_type',
      dataIndex: "vehicle_type",
      width: 150,
      // onHeaderCell: () => {
      //   return {
      //     style: {
      //       textAlign: 'center',
      //     }
      //   };
      // },
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
      render: (item, record) => {
        if (!!record.vehicle_class_id && record.vehicle_class_id !== 99) {
          const newWidth = VEHICLE_PROPERTIES[record.vehicle_class_id]?.vehicle?.width * 0.5
          const newHeight = VEHICLE_PROPERTIES[record.vehicle_class_id]?.vehicle?.height * 0.2
          return (
            <NextImage
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
      title: "น้ำหนักที่ชั่งได้ (ตัน)",
      key: "gross_weight",
      dataIndex: "gross_weight",
      align: 'center',
      width: 100,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
      // render: (item, record) => {
      //   if (Number(item) <= Number(record.legal_weight)) {
      //     return (
      //       <Typography.Text className='!text-[#56E4EE]'>{item} ตัน</Typography.Text>
      //     )
      //   } else {
      //     return (
      //       <Typography.Text className='!text-[#FF4A4A]'>{item} ตัน</Typography.Text>
      //     )
      //   }
      // }
    },
    {
      title: "น้ำหนักที่เกิน (ตัน)",
      key: "gross_weight_over",
      dataIndex: "gross_weight_over",
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (Number(record.gross_weight) < Number(record.legal_weight)) {
          return <Typography.Text className='!text-[#56E4EE]'>{item || 0}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item || 0}</Typography.Text>
        }
      }
    },
    {
      title: "สถานะ",
      key: 'is_over_weight',
      dataIndex: "is_over_weight",
      // key: 'is_over_weight_desc',
      // dataIndex: "is_over_weight_desc",
      align: 'center',
      width: 100,
      render: (item) => {
        if (item) {
          return <Typography.Text className={`!text-[${WEIGHT_STATUS_WITH_PROPERTIES[item]?.color}]`}>{WEIGHT_STATUS_WITH_PROPERTIES[item]?.text}</Typography.Text>
        }
        return '-'

        // if (Number(record.gross_weight) < Number(record.legal_weight)) {
        //   return <Typography.Text className='!text-[#56E4EE]'>{WEIGHT_STATUS[item]}</Typography.Text>
        // } else {
        //   return <Typography.Text className='!text-[#FF4A4A]'>{WEIGHT_STATUS[item]}</Typography.Text>
        // }
        // }
        // if (item == "ไม่เกิน") {
        //   return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        // } else {
        //   return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        // }
      },
      sorter: (a, b) => a.is_over_weight.localeCompare(b.is_over_weight)
    },
    {
      title: "รูปรถเข้าชั่ง",
      key: 'vehicle_weighing_image',
      dataIndex: "vehicle_weighing_image",
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          <Button
            type='primary'
            // size='large'
            icon={<PictureOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setimageTDID(record)
              openImageModalWithData(record)
            }}
          />
        )
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: "action",
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          // <div className='flex items-center justify-between'>
          //   {
          //     filterDeptType(deptType, role) && <DeleteIcon
          //       className='!cursor-pointer !text-[#FF4A4A]'
          //       // onClick={() => confirmDelete(record.td_id)}
          //       onClick={(e) => {
          //         e.stopPropagation(); // Prevent row click
          //         confirmDelete(record.td_id);
          //       }}
          //     />
          //   }
          //   <Button
          //     type='primary'
          //     icon={<TruckIcon customFill='#FFFFFF' />}
          //     // onClick={() => setOpenVehicle({ open: true })}
          //     onClick={(e) => {
          //       e.stopPropagation();
          //       openModalWithData(record)
          //     }}
          //   />
          // </div>
          <Row align={'middle'}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {
                filterDeptType(deptType, role) && <DeleteIcon
                  className='!cursor-pointer !text-[#FF4A4A]'
                  // onClick={() => confirmDelete(record.td_id)}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    confirmDelete(record.td_id);
                  }}
                />
              }
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Button
                type='primary'
                icon={<TruckIcon color='#FFFFFF' />}
                // onClick={() => setOpenVehicle({ open: true })}
                onClick={(e) => {
                  e.stopPropagation();
                  openModalWithData(record)
                }}
              />
            </Col>
          </Row>
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
      rowClassName='!cursor-pointer'
      onRow={(record) => ({
        onClick: () => {
          openModalWithData(record)
        },
      })}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableMobileDetail)
