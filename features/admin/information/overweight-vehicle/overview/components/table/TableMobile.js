import React, { useContext } from "react";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import { EditFilled, FileTextOutlined, TruckFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import stf from '@/utils/stringformat'
import { calculate_index } from "@/utils/calculator";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { allowAdmin } from "@/utils/allowAdmin";
import { TruckIcon } from "@/components/icon";
import { parseData } from "@/utils/parsedata";
import { FormSearchNew } from "../../screen";
import { TruckDetail } from "@/pages/_app";

dayjs.extend(customParseFormat);

const TableMobile = (props) => {
  const { data, loading, page, perPage, total, onChange, setOpen, role } = props;
  const { formSearch, setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab } = useContext(FormSearchNew);

  const { setTruckDetail } = useContext(TruckDetail)

  const router = useRouter()

  // const mock_data = [
  //   {
  //     no: "1",
  //     date: "09 สิงหาคม 2567 20:54:23",
  //     department: "ระยอง",
  //     route: "รย.5002",
  //     car_license: "99-1678",
  //     province: "กรุงเทพฯ",
  //     vehicle_type: "ประเภท 5",
  //     vehicle_detail: "3 เพลา 10 เส้น",
  //     legal_weight: "25.0",
  //     measured_weight: "31.109",
  //     excess_weight: "6.608",
  //     excess_axie: "-",
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
      title: "วัน / เวลา",
      key: "time_stamp",
      dataIndex: "time_stamp",
      width: 200,
      render: (item) => {
        if (item) {
          return dayjs(item).locale('th').format('DD MMMM BBBB HH:mm:ss')
        }
        return '-'
      },
      sorter: (a, b) => dayjs(a?.time_stamp).unix() - dayjs(b?.time_stamp).unix()
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      width: 200,
      render: (item, record) => {
        if (record?.master?.department?.name2) {
          return record?.master?.department?.name2
        }
        return '-'
      },
      sorter: (a, b) => a?.master?.department?.name2?.localeCompare(b?.master?.department?.name2)
    },
    {
      title: "สายทาง",
      key: "route",
      dataIndex: "route",
      width: 150,
      render: (item, record) => {
        if (record?.master?.way_code) {
          return record?.master?.way_code
        }
        return '-'
      },
      sorter: (a, b) => a?.master?.way_code?.localeCompare(b?.master?.way_code)
    },
    {
      title: "ทะเบียน",
      key: "car_license",
      dataIndex: "car_license",
      width: 200,
      render: (item, record) => {
        return (
          <Space direction="vertical">
            <Typography.Text>{record?.lp_head_no || '-'}</Typography.Text>
            {/* <Typography.Text>{record.lp_head_province?.name || '-'}</Typography.Text> */}
            {/* <Typography.Text>{record.lp_head_province_id || '-'}</Typography.Text> */}
            <Typography.Text>
              {(typeof parseData(record?.lp_head_province_id) === 'string' ? record?.lp_head_province_id : record?.lp_head_province?.name) || '-'}
            </Typography.Text>
          </Space>
        )
      }
    },
    {
      title: "ประเภทรถ",
      key: "vehicle_type",
      dataIndex: "vehicle_type",
      width: 300,
      render: (item, record) => {
        return (
          <Space direction="vertical">
            <Typography.Text>{record?.vehicle_class?.vehicle_class_desc2 || '-'}</Typography.Text>
            <Typography.Text>{record?.vehicle_class?.vehicle_class_desc3 || '-'}</Typography.Text>
          </Space>
        )
      }
    },
    // {
    //   title: "น้ำหนักตามกฎหมาย ",
    //   key: "legal_weight",
    //   dataIndex: "legal_weight",
    //   align: 'center',
    //   width: 150,
    //   render: (item) => {
    //     return (
    //       <Typography.Text>{item}</Typography.Text>
    //     )
    //   }
    // },
    {
      title: "น้ำหนักตามที่ชั่ง ",
      key: "gross_weight",
      dataIndex: "gross_weight",
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
      title: "น้ำหนักที่เกิน",
      key: "gross_weight_over",
      dataIndex: "gross_weight_over",
      align: 'center',
      width: 150,
      render: (item, record) => {
        if (Number(record?.gross_weight) < Number(record?.legal_weight)) {
          return (
            <Typography.Text className="!text-[#56E4EE]">{item}</Typography.Text>
          )
        } else {
          return (
            <Typography.Text className="!text-[#FF4A4A]">{item}</Typography.Text>
          )
        }
      },
      sorter: (a, b) => Number(a?.gross_weight_over) - Number(b?.gross_weight_over)
    },
    // {
    //   title: "เพลาที่เกิน",
    //   key: "excess_axie",
    //   dataIndex: "excess_axie",
    //   align: 'center',
    //   width: 150,
    //   render: (item) => {
    //     return (
    //       <Typography.Text>{item}</Typography.Text>
    //     )
    //   }
    // },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 160,
      render: (item, record) => {
        return (
          <Row>
            {allowAdmin(role) ? (
              <>
                <Col className="w-9">
                  <div className="h-full flex items-center justify-center">
                    <EditFilled
                      className="!cursor-pointer"
                      onClick={async (e) => {
                        e.stopPropagation();
                        console.log('table arres record',record?.arrest_record)
                        const originalData = {
                          ...formSearch,
                          type: 'mobile',
                          type_id : 2,
                          brand: data?.brand || '',
                          lp_head_no: record?.lp_head_no || '-',
                          lp_head_province_id: Number(record?.lp_head_province_id) || 0,
                          lp_tail_no: record?.lp_tail_no || '-',
                          lp_tail_province_id: Number(record?.lp_tail_province_id) || 0,
                          is_arrested: record?.is_arrested || '',
                          td_id: record?.td_id || '',

                          gross_weight_over: record?.gross_weight_over || '',
                          gross_weight : record?.gross_weight || '',
                          legal_weight : record?.vehicle_class?.legal_weight || '',

                          arrest_id : record?.arrest_record?.id || ''
                        };

                        router.push({
                          pathname: `/admin/information/overweight-vehicle/update/${record?.td_id}`,
                          query: {
                            ...originalData,
                          },
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col className="w-9">
                  <div className="h-full flex items-center justify-center">
                    {record?.is_arrested == null ? (
                      ''
                    ) : (
                      <FileTextOutlined
                        className="!cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push({
                            pathname: `/admin/information/overweight-vehicle/preview/${record?.td_id}`,
                            query: {
                              type: 'mobile',
                              plan_year: formSearch.plan_year,
                              start_date: formSearch.start_date,
                              end_date: formSearch.end_date,
                              department_id: formSearch.department_id,
                              page: formSearch.page,
                              arrest_id : record?.arrest_record?.id || ''
                            },
                          });
                        }}
                      />
                    )}
                  </div>
                </Col>
              </>
            ) : null}

            <Col className="w-12">
              <Button
                type="primary"
                icon={<TruckIcon customFill="#FFFFFF" />}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen({ open: true, td_id: record?.td_id });
                }}
              />
            </Col>
          </Row>
        );
      }
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      onRow={(record) => ({
        onClick: () => {
          setOpen({ open: true, td_id: record?.td_id })
        },
      })}
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
      scroll={{ x: 1600 }}
    />
  );
};

export default React.memo(TableMobile);
