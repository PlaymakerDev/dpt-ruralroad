import React, { useContext } from "react";
import { Col, Row, Space, Table, Typography } from "antd";
import { EditFilled, FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import stf from '@/utils/stringformat'
import { calculate_index } from "@/utils/calculator";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { allowAdmin } from "@/utils/allowAdmin";
import { parseData } from "@/utils/parsedata";
import { FormSearchNew } from "../../screen";
import { TruckDetail } from "@/pages/_app";

dayjs.extend(customParseFormat);

const TableStationary = (props) => {
  const { formSearch, setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab } = useContext(FormSearchNew);
  const { setTruckDetail } = useContext(TruckDetail)

  const { data, loading, page, perPage, total, onChange, role } = props;
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
      title: "สถานี",
      key: "department",
      dataIndex: "department",
      width: 200,
      render: (item, record) => {
        if (record?.station?.station_name) {
          return record?.station?.station_name
        }
        return '-'
      },
      sorter: (a, b) => a?.station?.station_name.localeCompare(b?.station?.station_name)
    },
    {
      title: "สายทาง",
      key: "route",
      dataIndex: "route",
      width: 150,
      render: (item, record) => {
        if (record?.station?.location_description) {
          return record?.station?.location_description
        }
        return '-'
      },
      sorter: (a, b) => a?.station?.location_description.localeCompare(b?.station?.location_description)
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
      title: "น้ำหนักตามที่ชั่ง",
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
          return <Typography.Text className='!text-[#56E4EE]'>{item}</Typography.Text>
        } else {
          return <Typography.Text className='!text-[#FF4A4A]'>{item}</Typography.Text>
        }
      },
      sorter: (a, b) => Number(a?.gross_weight_over) - Number(b?.gross_weight_over)
    },
    // {
    //   title: "เพลาที่เกิน",
    //   key: "drive_shaft_over",
    //   dataIndex: "drive_shaft_over",
    //   align: 'center',
    //   width: 150,
    //   render: (item) => {
    //     if (item) {
    //       return item
    //     }
    //     return '-'
    //   }
    // },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (item, record) => {
        if (allowAdmin(role)) {
          return (
            // <div className='inline-flex flex-wrap items-center gap-5'>
            <Row gutter={[16, 0]}>
              <Col>
                <EditFilled
                  className='!cursor-pointer'
                  onClick={async (e) => {
                    e.stopPropagation();
                    const originalData = {
                      ...formSearch,
                      type: 'stationary',
                      type_id: 1,
                      brand: data?.brand || '',
                      lp_head_no: record?.lp_head_no || '-',
                      lp_head_province_id: Number(record?.lp_head_province_id) || 0,
                      lp_tail_no: record?.lp_tail_no || '-',
                      lp_tail_province_id: Number(record?.lp_tail_province_id) || 0,
                      is_arrested: record?.is_arrested || '',
                      td_id: record?.td_id || '',

                      arrest_id: record?.arrest_record?.id || ''
                    }

                    router.push({
                      pathname: `/admin/information/overweight-vehicle/update/${record?.td_id}`,
                      query: {
                        ...originalData
                      }
                    }
                    )
                  }
                  }
                />
              </Col>
              <Col>
                {
                  record?.is_arrested == null ? '' : <FileTextOutlined
                    className='!cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: `/admin/information/overweight-vehicle/preview/${record?.td_id}`,
                        query: {
                          type: 'stationary',
                          plan_year: formSearch.plan_year,
                          start_date: formSearch.start_date,
                          end_date: formSearch.end_date,
                          department_id: formSearch.department_id,
                          page: formSearch.page,
                          station_id: formSearch.station_id,

                          arrest_id: record?.arrest_record?.id || ''
                        }
                      })
                    }
                    }
                  />
                }
              </Col>
            </Row>
            // </div>
          )
        }
      }
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      rowClassName='!cursor-pointer'
      onRow={(record) => {
        if (role === "ADMIN") {
          return {
            onClick: async () => {
              const originalData = {
                ...formSearch,
                type: 'stationary',
                type_id: 1,
                brand: data?.brand || '',
                lp_head_no: record?.lp_head_no || '-',
                lp_head_province_id: Number(record?.lp_head_province_id) || 0,
                lp_tail_no: record?.lp_tail_no || '-',
                lp_tail_province_id: Number(record?.lp_tail_province_id) || 0,
                is_arrested: record?.is_arrested || '',
                td_id: record?.td_id || '',
                gross_weight_over: record?.gross_weight_over || '',
                gross_weight: record?.gross_weight || '',
                legal_weight: record?.vehicle_class?.legal_weight || '',
                arrest_id: record?.arrest_record?.id || ''
              }
              router.push({
                pathname: `/admin/information/overweight-vehicle/update/${record?.td_id}`,
                query: originalData
              });
            },
          };
        }
        return {}; // Return empty object for other roles
      }}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
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

export default React.memo(TableStationary);
