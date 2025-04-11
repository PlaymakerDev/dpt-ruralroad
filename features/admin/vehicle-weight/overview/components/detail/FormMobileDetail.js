import React, { useCallback, useState } from 'react'
import { Button, Card, Col, Image, message, Row, Spin, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import usePostAPI from '@/utils/hooks/api/usePostAPI'

dayjs.extend(customParseFormat);

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const FormMobileDetail = (props) => {
  const { tid, data } = props
  // USE API
  const [apiPost, loadingPost] = usePostAPI('overlay')
  // SET LOADING
  const [loadingBlockage, setLoadingBlockage] = useState(false)
  const [loadingCollaborator, setLoadingCollaborator] = useState(false)
  // SET IMAGE
  const [blockage, setBlockage] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      // url: 'https://www.checkraka.com/uploaded/knowledge/logo/1a/1ac5abae3d4ab80a853b3ca45383fe35.jpg',
      url: data.image_path1,
    },
  ])
  const [collaborator, setCollaborator] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      // url: 'https://image.makewebeasy.net/makeweb/m_1920x0/YgfkDhkF8/SSSwebsite/9158_1.jpg?v=202012190947',
      url: data.image_path2,
    },
  ])

  const uploadBlockage = useCallback(async (file) => {
    const body = new FormData()
    body.append('file1', file)

    const response = await apiPost(`/api/v1/weight/weight_mobile_master/${tid}/photo`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingBlockage(false);
        setBlockage(url);
      });
    } else {
      setLoadingBlockage(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, tid])

  const uploadCollaborator = useCallback(async (file) => {
    const body = new FormData()
    body.append('file2', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master/${tid}/photo`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingCollaborator(false);
        setCollaborator(url);
      });
    } else {
      setLoadingCollaborator(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, tid])

  return (
    <Card>
      <Row gutter={[16, 16]} align={'top'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={14}>
          <Typography.Title level={3}>ข้อมูลหน่วยจัดตั้งเคลื่อนที่</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.dept_province || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>ขื่อหน่วยชั่งยานพาหนะ</Typography.Text>
                </Col>

              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.way_id || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>รหัสสายทาง</Typography.Text>
                </Col>

              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  {/* <Typography.Text className='!text-lg' strong>11 สิงหาคม 2567 16:24:30</Typography.Text> */}
                  <Typography.Text className='!text-lg' strong>{data.time_from || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>วันที่จัดตั้ง</Typography.Text>
                </Col>
                {/* <Typography.Text className='!text-lg' strong>{dayjs(data.create_date, 'DD/MM/YYYY').locale('th').format('DD MMMM YYYY') || '-'}</Typography.Text> */}
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  {/* <Typography.Text className='!text-lg' strong>11 สิงหาคม 2567 16:24:30</Typography.Text> */}
                  <Typography.Text className='!text-lg' strong>{data.time_to || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>สิ้นสุด</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.district || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>อำเภอ</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.province || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>จังหวัด</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.km_from || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>เริ่ม กม. ที่</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.km_to || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>ถึง กม. ที่</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.collaboration || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>การร่วมบูรณาการ</Typography.Text>
                </Col>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
              <div className='flex flex-wrap justify-start items-end h-full'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-lg' strong>{data.way_name || '-'}</Typography.Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Typography.Text className='!text-[#56E4EE]'>ชื่อสายทาง</Typography.Text>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <div>
                <Typography.Title level={5}>กั้นการจราจร</Typography.Title>
                <Spin spinning={loadingBlockage}>
                  <figure className='h-44 relative overflow-hidden rounded-lg bg-[#101524]'>
                    <Image
                      src={blockage[0]?.url ? blockage[0].url : blockage}
                      alt='collaboration-image'
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                      // fallback='data:image/png;base64,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'
                    />
                  </figure>
                </Spin>
                <section className='mt-3'>
                  <Upload
                    showUploadList={false}
                    accept="image/*"
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage) {
                        message.error("สามารถอัปโหลดได้เฉพาะไฟล์รูปเท่านั้น!");
                      }
                      return isImage || Upload.LIST_IGNORE; 
                    }}
                    onChange={(file) => {
                      if (file.file.status === 'uploading') {
                        setLoadingBlockage(true);
                        return;
                      }
                      if (file.file.status === 'done') {
                        const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                        const isListAvailable = allowList.some(item => item === file.file.type)
                        if (!isListAvailable) {
                          setLoadingBlockage(false)
                          message.error('ประเภทไฟล์ไม่ถูกต้อง')
                          return Upload.LIST_IGNORE
                        } else {
                          uploadBlockage(file.file.originFileObj)
                        }
                        // getBase64(file.file.originFileObj, (url) => {
                        //   setLoadingBlockage(false);
                        //   setBlockage(url);
                        // });
                      }
                    }}
                    accept="image/png, image/jpeg, image/jpg"
                  >
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      loading={loadingBlockage}
                    >
                      อัพโหลดภาพ
                    </Button>
                  </Upload>
                </section>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <div>
                <Typography.Title level={5}>บุคคลผู้ร่วมบูรณาการ</Typography.Title>
                <Spin spinning={loadingCollaborator}>
                  <figure className='h-44 relative overflow-hidden rounded-lg bg-[#101524]'>
                    <Image
                      src={collaborator[0]?.url ? collaborator[0].url : collaborator}
                      alt='collaboration-image'
                      width={'100%'}
                      height={'100%'}
                      className='object-cover object-center'
                      fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                      // fallback='data:image/png;base64,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'
                    />
                  </figure>
                </Spin>
                <section className='mt-3'>
                  <Upload
                    showUploadList={false}
                    accept="image/*"
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage) {
                        message.error("สามารถอัปโหลดได้เฉพาะไฟล์รูปเท่านั้น!");
                      }
                      return isImage || Upload.LIST_IGNORE; 
                    }}
                    onChange={(file) => {
                      if (file.file.status === 'uploading') {
                        setLoadingCollaborator(true);
                        return;
                      }
                      if (file.file.status === 'done') {
                        const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                        const isListAvailable = allowList.some(item => item === file.file.type)
                        if (!isListAvailable) {
                          setLoadingCollaborator(false)
                          message.error('ประเภทไฟล์ไม่ถูกต้อง')
                          return Upload.LIST_IGNORE
                        } else {
                          uploadCollaborator(file.file.originFileObj)
                        }
                        // getBase64(file.file.originFileObj, (url) => {
                        //   setLoadingCollaborator(false);
                        //   setCollaborator(url);
                        // });
                      }
                    }}
                    accept="image/png, image/jpeg, image/jpg"
                  >
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      loading={loadingCollaborator}
                    >
                      อัพโหลดภาพ
                    </Button>
                  </Upload>
                </section>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(FormMobileDetail)
