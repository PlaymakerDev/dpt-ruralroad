import React, { useCallback, useEffect, useState } from "react";
import { Modal, Row, Col, Image, Typography, Upload, Button, Spin, message } from "antd";
// import { Form, Field, useForm } from "@/components/form";
import { UploadOutlined } from "@ant-design/icons";
import usePostAPI from "@/utils/hooks/api/usePostAPI";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const Content = (props) => {

  const { imageDataBuild, imageTDID } = props;

  const [apiPost, loadingPost] = usePostAPI('overlay')

  // LOADING
  const [loadingFrontVehicle, setLoadingFrontVehicle] = useState(false)
  const [loadingBackVehicle, setLoadingBackVehicle] = useState(false)
  const [loadingWeightSlip, setLoadingWeightSlip] = useState(false)
  const [loadingLeftVehicle, setLoadingLeftVehicle] = useState(false)
  const [loadingRightVehicle, setLoadingRightVehicle] = useState(false)
  const [loadingDrivingLicense, setLoadingDrivingLicense] = useState(false)

  const [fallbacks, setFallbacks] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
    image5: false,
    image6: false,
  });

  const handleError = (imageName) => {
    setFallbacks((prev) => ({ ...prev, [imageName]: true }));
  };

  const handleShow = (imageName) => {
    setFallbacks((prev) => ({ ...prev, [imageName]: false }));
  };
  // LOAD IMAGE
  const [frontVehicle, setFrontVehicle] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path1
      ,
    },
  ])
  const [backVehicle, setBackVehicle] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path2,
    },
  ])
  const [weightSlip, setWeightSlip] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path3,
    },
  ])
  const [leftVehicle, setLeftVehicle] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path4,
    },
  ])
  const [rightVehicle, setRightVehicle] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path5,
    },
  ])
  const [drivingLicense, setDrivingLicense] = useState([
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: imageDataBuild.image_path6,
    },
  ])

  const uploadFrontVehicle = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path1', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingFrontVehicle(false);
        setFrontVehicle(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image1')
    } else {
      setLoadingFrontVehicle(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  const uploadBackVehicle = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path2', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingBackVehicle(false);
        setBackVehicle(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image2')

    } else {
      setLoadingBackVehicle(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  const uploadWeightSlip = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path3', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingWeightSlip(false);
        setWeightSlip(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image3')

    } else {
      setLoadingWeightSlip(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  const uploadLeftVehicle = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path4', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingLeftVehicle(false);
        setLeftVehicle(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image4')
    } else {
      setLoadingLeftVehicle(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  const uploadRightVehicle = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path5', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingRightVehicle(false);
        setRightVehicle(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image5')

    } else {
      setLoadingRightVehicle(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  const uploadLicense = useCallback(async (file) => {
    const body = new FormData()
    body.append('image_path6', file)
    const response = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${imageTDID.t_id}/${imageTDID.td_id}`, body, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (response?.success) {
      getBase64(file, (url) => {
        setLoadingDrivingLicense(false);
        setDrivingLicense(url);
      });
      message.success('อัปโหลดไฟล์สำเร็จ')
      handleShow('image6')

    } else {
      setLoadingDrivingLicense(false);
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, imageTDID])

  return (
    // <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>รถด้านหน้า</Typography.Title>
          <Spin spinning={loadingFrontVehicle}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={frontVehicle[0]?.url ? frontVehicle[0].url : frontVehicle}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image1') }}
                preview={!fallbacks.image1}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
              // onError={<p>asd</p>}
              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingFrontVehicle(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingFrontVehicle(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadFrontVehicle(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>รถด้านหลัง</Typography.Title>
          <Spin spinning={loadingBackVehicle}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={backVehicle[0]?.url ? backVehicle[0].url : backVehicle}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image2') }}
                preview={!fallbacks.image2}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingBackVehicle(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingBackVehicle(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadBackVehicle(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>รถด้านซ้าย</Typography.Title>
          <Spin spinning={loadingWeightSlip}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={weightSlip[0]?.url ? weightSlip[0].url : weightSlip}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image3') }}
                preview={!fallbacks.image3}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingWeightSlip(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingWeightSlip(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadWeightSlip(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>รถด้านขวา</Typography.Title>
          <Spin spinning={loadingLeftVehicle}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={leftVehicle[0]?.url ? leftVehicle[0].url : leftVehicle}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image4') }}
                preview={!fallbacks.image4}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingLeftVehicle(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingLeftVehicle(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadLeftVehicle(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>สลิปน้ำหนัก</Typography.Title>
          <Spin spinning={loadingRightVehicle}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={rightVehicle[0]?.url ? rightVehicle[0].url : rightVehicle}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image5') }}
                preview={!fallbacks.image5}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}

              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingRightVehicle(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingRightVehicle(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadRightVehicle(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
        <div className="border rounded-lg p-3 h-full">
          <Typography.Title level={5}>ใบขับขี่</Typography.Title>
          <Spin spinning={loadingDrivingLicense}>
            <figure className='h-56 relative overflow-hidden rounded-lg bg-[#101524]'>
              <Image
                src={drivingLicense[0]?.url ? drivingLicense[0].url : drivingLicense}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                onError={() => { handleError('image6') }}
                preview={!fallbacks.image6}
                fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
              />
            </figure>
          </Spin>
          <section className="mt-5">
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
                  setLoadingDrivingLicense(true);
                  return;
                }
                if (file.file.status === 'done') {
                  const allowList = ['image/jpg', 'image/jpeg', 'image/png']
                  const isListAvailable = allowList.some(item => item === file.file.type)
                  if (!isListAvailable) {
                    setLoadingDrivingLicense(false)
                    message.error('ประเภทไฟล์ไม่ถูกต้อง')
                    return Upload.LIST_IGNORE
                  } else {
                    uploadLicense(file.file.originFileObj)
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
              >
                อัพโหลดภาพ
              </Button>
            </Upload>
          </section>
        </div>
      </Col>
    </Row>
    // </Form>
  );
};

const ModalImagePreview = (props) => {
  const { open, setOpen, ImagePreview, imageTDID } = props;

  const checkImageData = () => {
    if (ImagePreview.imagepreview.data.length == 0) {
      return {
        data: false,
        image: null
      }
    } else {
      return {
        data: true,
        image: ImagePreview.imagepreview.data[0]
      }
    }
  }

  const [imageDataBuild, setImageDataBuild] = useState()
  const ImageData = checkImageData();

  useEffect(() => {
    if (ImageData.data) {
      setImageDataBuild({
        image_path1: ImageData.image.image_path1 || '',
        image_path2: ImageData.image.image_path2 || '',
        image_path3: ImageData.image.image_path3 || '',
        image_path4: ImageData.image.image_path4 || '',
        image_path5: ImageData.image.image_path5 || '',
        image_path6: ImageData.image.image_path6 || '',
      });
    } else {
      setImageDataBuild({
        image_path1: '',
        image_path2: '',
        image_path3: '',
        image_path4: '',
        image_path5: '',
        image_path6: '',
      });
    }
  }, [open]);
  return (
    <Modal
      title="รูปรถเข้าชั่ง"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false })}
      width={1400}
      // okText='บันทึก'
      // cancelText='ยกเลิก'
      // okButtonProps={{
      //   htmlType: 'submit',
      //   type: 'primary',
      //   size: 'large'
      // }}
      // cancelButtonProps={{
      //   htmlType: 'button',
      //   type: 'text',
      //   size: 'large'
      // }}
      footer={false}
    >
      <main className='my-5'>
        <Content
          imageDataBuild={imageDataBuild}
          imageTDID={imageTDID}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalImagePreview);
