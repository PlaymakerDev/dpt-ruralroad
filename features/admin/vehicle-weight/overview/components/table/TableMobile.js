import React, { useCallback } from "react";
import { Col, message, Modal, Row, Table, Typography } from "antd";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import Bin from "@/components/icon/Bin";
import { calculate_index } from '@/utils/calculator'
import stf from '@/utils/stringformat'
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { filterDeptType } from "@/utils/allowAdmin";
import { useAppSelector } from "@/store/hooks";

dayjs.extend(customParseFormat);

const TableMobile = (props) => {
  const { data, loading, page, perPage, total, onChange, setStep, setCurrentStep, setDetailProps, reload } = props;
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name
  const deptType = user?.dept_type

  const deleteRecord = useCallback(async (tid) => {
    const response = await apiDelete(`/api/v1/weight/weight_mobile_master/${tid}`, {}, {}, false)
    if (response?.success) {
      message.success('ลบข้อมูลสำเร็จ')
      reload()
      Modal.destroyAll()
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [apiDelete, reload])

  const confirmDelete = useCallback((tid) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านต้องการลบข้อมูลรถเข้าชั่งใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => deleteRecord(tid),
      onCancel: () => Modal.destroyAll()
    })
  }, [deleteRecord])

  // const mock_data = [
  //   {
  //     no: '1',
  //     date: '01 พฤษภาคม 2567',
  //     start_time: '10:48',
  //     end_time: '10:48',
  //     department: 'เพชรบุรี',
  //     route_code: 'พบ.4019',
  //     province: 'พระนครศรีอยุธยา',
  //     collaboration: '-',
  //     amount: '0',
  //     excess_weight: '0'
  //   },
  // ];

  const columns = [
    {
      title: "ลำดับ",
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 100,
      render: (item, record, index) => {
        return stf(calculate_index(index, page, perPage, total)).normal()
      }
    },
    {
      title: "วันที่",
      key: "CreateDate",
      dataIndex: "CreateDate",
      align: 'center',
      width: 200,
      render: (item) => {
        if (item) {
          return dayjs(item, 'DD/MM/YYYY').locale('th').format('DD MMMM YYYY')
        }
        return '-'
      },
      sorter: (a, b) => dayjs(a.CreateDate, 'DD/MM/YYYY').unix() - dayjs(b.CreateDate, 'DD/MM/YYYY').unix()
    },
    {
      title: "เวลาจัดตั้ง",
      key: "TimeFrom",
      dataIndex: "TimeFrom",
      align: 'center',
      width: 100,
      render: (item) => {
        if (item) {
          return dayjs(item, 'HH:mm').format('HH:mm')
        }
        return '-'
      }
    },
    {
      title: "เวลาสิ้นสุด",
      key: "TimeTo",
      dataIndex: "TimeTo",
      align: 'center',
      width: 100,
      render: (item) => {
        if (item) {
          return dayjs(item, 'HH:mm').format('HH:mm')
        }
        return '-'
      }
    },
    {
      title: "หน่วยที่จัดตั้ง",
      key: "DeptProvince",
      dataIndex: "DeptProvince",
      width: 100,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "รหัสสายทาง",
      key: "WayID",
      dataIndex: "WayID",
      width: 150,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
      sorter: (a, b) => a.WayID.localeCompare(b.WayID)
    },
    {
      title: "จังหวัด",
      key: "Province",
      dataIndex: "Province",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
      sorter: (a, b) => a.Province.localeCompare(b.Province)
    },
    {
      title: "บูรณาการ",
      key: "Collaboration",
      dataIndex: "Collaboration",
      align: 'center',
      width: 150,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "จำนวนรถเข้าชั่ง ",
      key: "Total",
      dataIndex: "Total",
      align: 'center',
      width: 150,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      }
    },
    {
      title: "น้ำหนักที่เกิน",
      key: "TotalOver",
      dataIndex: "TotalOver",
      align: 'center',
      width: 150,
      render: (item) => {
        if (typeof item === 'undefined') {
          return
        }
        return Number(item)
      },
      sorter: (a, b) => Number(a.TotalOver) - Number(b.TotalOver)
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          <Row className="w-full">
            <Col className="w-full flex items-center justify-center" span={12}>
              {

                filterDeptType(deptType, role) && <Bin
                  className='!cursor-pointer !text-[#FF4A4A]'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    confirmDelete(record.TID);
                  }}
                />

              }

            </Col>
            <Col className="w-full" span={12}>
              <RightOutlined
                className='!cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailProps({
                    tid: record.TID
                  })
                  setStep(2);
                  setCurrentStep((prev) => ({
                    ...prev,
                    in_detail: true
                  }))
                }}
              />
            </Col>
          </Row>
          // <div className='inline-flex flex-wrap items-center gap-5'>

          //   <Bin
          //     className='!cursor-pointer !text-[#FF4A4A]'
          //     onClick={(e) => {
          //       e.stopPropagation(); // Prevent row click
          //       confirmDelete(record.TID);
          //     }}
          //   />



          //   <RightOutlined
          //     className='!cursor-pointer'
          //     onClick={(e) => {
          //       e.stopPropagation();
          //       setDetailProps({
          //         tid: record.TID
          //       })
          //       setStep(2);
          //       setCurrentStep((prev) => ({
          //         ...prev,
          //         in_detail: true
          //       }))
          //     }}
          //   />
          // </div>
        )
      }
    },
  ];

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
          setDetailProps({
            tid: record.TID
          })
          setStep(2);
          setCurrentStep((prev) => ({
            ...prev,
            in_detail: true
          }))
        },
      })}
      scroll={{ x: 1600 }}
    />
  );
};

export default React.memo(TableMobile);
