import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Typography, Row, Col, Button, message, Empty, Breadcrumb, Dropdown, Space } from 'antd'
import { PreviewContent } from '../content'
import { Form, Field, useForm } from "@/components/form";
import axios from 'axios';
import { DownloadOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'
import config from "@/config";
import {
  ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
} from "@/utils/constant";
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { OverWeightVehicleTab } from '@/pages/_app';

const MainContent = (props) => {
  const { } = props
  const { query } = useRouter()
  const [loading, setLoading] = useState(false)
  const [apiGetPDF, loadingGetPDF] = useGetAPI('overlay')
  // VARIABLE
  // const td_id = query?.id
  const td_id = query?.id
  const baseAPIPath = config.hostBackend
  const apiPath = `/api/v1/arrest_record/${query?.arrest_id}/export_pdf`
  const file_type = 'pdf'

  console.log('arres id',query?.arres_id)
  // FINALISE
  const contructedUrl = `${baseAPIPath}${apiPath}`
  // const contructedUrl = `${baseAPIPath}${apiPath}?arrest_id=${td_id}&file_type=${file_type}`

  // const isError = useCallback(async() => {
  //   const response = await axios.get(contructedUrl)
  //   if(response?.message == 'NotFoundException: No arrest log data found.'){
  //     message.error('pdf error')
  //     contructedUrl = 'https://pdfobject.com/pdf/sample.pdf'
  //   }
  // }, [])

  // isError()

  const downloadFile = useCallback(async (td_id, file_type /*xlsx , pdf*/) => {
    // SETTING QUERIES
    const body = {
      download: true
    }
    // SET LOADING TO TRUE
    setLoading(true)
    // SEND REQUEST TO API END POINT
    const { success, response } = await axios.get(`${config.hostBackend}/api/v1/arrest_record/${query?.arrest_id}/export_pdf`, {
      // const { success, response } = await axios.get(`${config.hostBackend}/api/v1/reports/export/arrest`, {
      params: body,
      // headers: {
      //   "Authorization": Bearer ${user.token}
      // },
      responseType: 'blob'
    }).then((res) => {
      return {
        success: true,
        response: {
          data: res?.data,
          message: "Retrieved file successfully!"
        }
      }
    }).catch((error) => {
      return {
        success: false,
        response: {
          data: null,
          message: error?.message
        }
      }
    }).finally(() => {
      // SET LOADING TO FALSE
      setLoading(false)
    })
    if (success) {
      const fileDownload = document.createElement('a')
      const blobURL = window.URL.createObjectURL(new Blob([response?.data]))
      fileDownload.setAttribute('href', blobURL)
      fileDownload.setAttribute('download', `รายงานบันทึกการจับกุม.${file_type}`)
      fileDownload.click()
    } else {
      message.error(response?.message || ERROR_MESSAGE_INTERNAL_SERVER_ERROR)
    }
  }, [])

  // const form = useForm({
  //   initialValues: {
  //     type: ''
  //   },
  //   rules: {},
  // });

  // const { values } = form;

  // const buildValue = useCallback((values, next) => {
  //   next(values);
  // }, []);

  // const handlerSubmit = useCallback((values) => {
  //   downloadFile(query?.id, values?.type);
  // }, [downloadFile, query]);

  const renderPreview = useMemo(() => {
    if (!!contructedUrl) {
      return (
        <PreviewContent
          path={contructedUrl}
        />
      )
    } else {
      return (
        <Empty
          description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
        />
      )
    }
  }, [contructedUrl])


  const handleClick = () => {
    router.push({
      pathname: `/admin/information/overweight-vehicle/overview`,
      query: {
        ...router.query
      }
    });
  };

  const items = useMemo(() => [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => {
          downloadFile(query?.id, 'pdf')
        }}>
          PDF File
        </a>
      ),
    },
    // {
    //   key: '2',
    //   label: (
    //     <a target="_blank" rel="noopener noreferrer" onClick={() => {
    //       downloadFile(query?.id, 'xlsx')
    //     }}>
    //       Excel File
    //     </a>
    //   ),
    // }
  ], []);

  // const { vehicleMenuTab, setVehicleMenuTab } = useContext(OverWeightVehicleTab);


  return (
    <div>
      {/* <section>
        <Row gutter={[16, 0]} align={'middle'}>
          <Col xs={24} md={12}>
            <Typography.Title level={3} className='!m-0'>รายงานบันทึกการจับกุม</Typography.Title>
          </Col>
          <Col xs={24} md={12} className='mt-5 md:mt-0'>
            <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
              <Row gutter={16} justify={'end'}>
                <Col xs={24} sm={12} md={6} lg={4} xl={4} xxl={3}>
                  <Field.Select
                    name="type"
                    optKeys={['value', 'label']}
                    options={[
                      { value: 'xlsx', label: 'xlsx' },
                      { value: 'pdf', label: 'pdf' },
                    ]}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
                  <Button
                    disabled={!values?.type}
                    htmlType="submit"
                    type='primary'
                    size='large'
                    icon={<DownloadOutlined />}
                    className='!w-full disabled:!bg-[#e6e6e6] disabled!:border-[#e6e6e6]'
                    // style={{
                    //   background: !values?.type ? '#e6e6e6' : '#00EEFF88',
                    //   borderColor: !values?.type ? '#e6e6e6' : '#00EEFF88'
                    // }}
                    loading={loading}
                  >
                    ดาวน์โหลดไฟล์
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </section> */}
      <section className='flex justify-between'>
        <div>
          <Typography.Title level={3} className='!m-0'>รายงานบันทึกการจับกุม</Typography.Title>
        </div>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                {/* <Button className='!border-[#0594A4] !bg-[#0594A4] !text-white !p-4 !font-bold !rounded-xl'>
                  ดาวโหลดไฟล์
                  <DownOutlined />
                </Button> */}
                <Button
                  className='!border-[#0594A4] !bg-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold !rounded-xl'
                  icon={<DownOutlined />}
                >
                  ดาวโหลดไฟล์
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </section>
      {/* <section className='mt-5'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item className='text-gray-500'>ข้อมูลรถเข้าชั่ง</Breadcrumb.Item>
          <Breadcrumb.Item className='text-gray-500 cursor-pointer hover:text-white transition duration-300' onClick={() => handleClick()}>สรุปข้อมูลเข้าชั่ง</Breadcrumb.Item>
          <Breadcrumb.Item className='font-bold'>รายละเอียด</Breadcrumb.Item>
        </Breadcrumb>
      </section> */}
      <section className='mt-5'>
        {renderPreview}
      </section>
    </div>
  )
}

export default React.memo(MainContent)
