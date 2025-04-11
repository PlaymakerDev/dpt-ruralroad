import React, { useMemo } from "react";
import { Col, Empty, Row, Spin } from "antd";
import { DetailCard } from "../detail/detail-card";

const DetailWeighingUnitToRDHighwayDistrict = (props) => {
  const { tabKey, loading = false } = props;


  const data = [
    {
      key: '17',
      description: "แบบบันทึกการชั่งน้ำหนักยานพาหนะ (จ.2)",
      urlPreview: '/api/v1/reports/province_to_office'
      // urlPreview: '/api/v1/reports/province_to_office?start_date=2024-08-01&end_date=2024-10-30&file_type=pdf&department_id=95'
    },
    {
      key: '14',
      description: "แผน-ผลการดำเนินงานรายสายทาง",
      urlPreview: '/api/v1/reports/mobile_plan_result_way?year_type=ce_year&plan_year=2023&department_id=1&file_type=xlsx',
    },
    {
      key: '13',
      description: "แบบ กสท.04 (รายสายทาง)",
      urlPreview: '/api/v1/reports/mobile_sum_office_way_id?year=2020&year_type=ce_year&file_type=xlsx&month=9'
    },
    {

      key: '6',
      description: "แบบรายงานการติดตามคดี (กสท.07)",
      urlPreview: '/api/v1/reports/arrest_list',

    },
    {
      id: "17",
      description: "สำเนาสลิป (กสท.03)",
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      id: "18",
      description: "บันทึกจับกุม (กรณีน้ำหนักเกิน)",
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      id: "19",
      description: "รูปถ่ายขณะปฏิบัติหน้าที่",
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview?key=mobile'
    },
  ];

  return (
    <Spin spinning={false}>
      {data?.length !== 0 ? (
        <Row gutter={[30, 30]}>
          {data?.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={item.key || item.id || index}>
                <DetailCard
                  index={index}
                  data={item}
                  url={'/admin/information/report/preview/1'}
                  tabKey={tabKey}

                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row gutter={[30, 30]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className="p-12">
              <Empty description="No Data" />
            </div>
          </Col>
        </Row>
      )}
    </Spin>
  );
};

export default React.memo(DetailWeighingUnitToRDHighwayDistrict);
