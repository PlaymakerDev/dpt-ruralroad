import React, { useMemo, useState, createContext, useCallback, useEffect } from 'react'
import { Typography, Breadcrumb, Row, Col, Button, message, Empty, Space, Dropdown } from 'antd'
import { PreviewContent } from '../content'
import { useRouter } from 'next/router';
import { Form, Field, useForm } from "@/components/form";
import axios from 'axios';
import { DownloadOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import config from "@/config";
import { ERROR_MESSAGE_INTERNAL_SERVER_ERROR } from "@/utils/constant";

const MainContent = (props) => {
  const { } = props
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  // VARIABLE
  const baseAPIPath = config.hostBackend
  const apiPath = '/api/v1/reports/spot_performance_sum_daily'
  const date = router?.query?.date
  const file_type = 'pdf'
  // FINALISE
  const contructedUrl = useMemo(() => {
    if (router?.query?.date) {
      return `${baseAPIPath}${apiPath}?date=${date}&file_type=${file_type}`
    } else {
      return `${baseAPIPath}${apiPath}?file_type=${file_type}`
    }
  }, [router, baseAPIPath, apiPath, date, file_type])

  const downloadFile = useCallback(async (date, file_type /*xlsx , pdf*/) => {
    // SETTING QUERIES
    const body = {
      date: date,
      file_type: file_type
    }
    // SET LOADING TO TRUE
    setLoading(true)
    // SEND REQUEST TO API END POINT
    const { success, response } = await axios.get(`${config.hostBackend}/api/v1/reports/spot_performance_sum_daily`, {
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
      fileDownload.setAttribute('download', `สรุปข้อมูลรถเข้าชั่ง.${file_type}`)
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
  //   // next(values);
  
  // }, []);

  // const handlerSubmit = useCallback((values) => {
  //   downloadFile(router?.query?.date, values?.type);
  // }, [downloadFile, router?.query]);

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
      pathname: `/admin/vehicle-weight/overview`,
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
          downloadFile(router?.query?.date, 'pdf')
        }}>
          PDF File
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => {
          downloadFile(router?.query?.date, 'xlsx')
        }}>
          Excel File
        </a>
      ),
    }
  ], []);

  return (
    <div>
      {/* <section>
        <Row gutter={[16, 0]} align={'middle'}>
          <Col xs={24} md={12}>
            <Typography.Title level={3} className='!m-0'>สรุปข้อมูลรถเข้าชั่ง</Typography.Title>
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
          <Typography.Title level={3} className='!m-0'>สรุปข้อมูลรถเข้าชั่ง</Typography.Title>
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

      <section className='mt-5'>
        <Breadcrumb separator='>'>
          <Breadcrumb.Item className='text-gray-500'>ข้อมูลรถเข้าชั่ง</Breadcrumb.Item>
          <Breadcrumb.Item className='text-gray-500 cursor-pointer hover:text-white transition duration-300' onClick={() => handleClick()}>สรุปข้อมูลเข้าชั่ง</Breadcrumb.Item>
          <Breadcrumb.Item className='font-bold'>รายละเอียด</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section className='mt-5'>
        {renderPreview}
      </section>
    </div>
  )
}

export default React.memo(MainContent)
