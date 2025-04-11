import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Modal, Row, Col, Typography, message, Upload } from "antd";
import { Form, Field, useForm } from "@/components/form";
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getCollaborativeList, getWayAll, getWayDetail } from '@/store/features/masterSlice'
import { useAppDispatch } from "@/store/hooks";
import usePostAPI from "@/utils/hooks/api/usePostAPI";

const Content = (props) => {
  const { refSubmit, onReload, setOpen } = props;
  // API
  const [apiPost, loadingPost] = usePostAPI('overlay')

  const [apiGetCollaborateList, loadingCollaborateList, collaborateList] = useGetAPI('overlay', {
    funcDispatch: getCollaborativeList, reducerName: 'master', reducerKey: 'collaborative_list'
  })

  const [apiGetWayAll, loadingWayAll, wayAll] = useGetAPI('overlay', {
    funcDispatch: getWayAll, reducerName: 'master', reducerKey: 'way'
  })

  const [apiGetWayDetail, loadingWayDetail, wayDetail] = useGetAPI('overlay', {
    funcDispatch: getWayDetail, reducerName: 'master', reducerKey: 'way'
  })

  useEffect(() => {
    apiGetCollaborateList('/api/v1/masters/collaborative_list', {}, false, {})
    apiGetWayAll('/api/v1/masters/way_all', {}, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm({
    initialValues: {
      route: '',
      collaboration: '',
      way_description: '',
      address: '',
      from_km: '',
      to_km: '',
      way_image: [],
      collaborator_image: []
    },
    rules: {
      route: {
        required: 'required_route'
      },
      from_km: {
        required: 'required_from_km'
      },
      to_km: {
        required: 'required_to_km'
      },
      way_image: {
        required: 'required_way_image'
      },
      collaborator_image: {
        required: 'required_collaborator_image'
      },
    },
    blackList: ['way_description', 'address'],
  });

  const { errors, values, handlerChange } = form;

  useEffect(() => {
    if (values.route) {
      apiGetWayDetail(`/api/v1/masters/way/${values.route}`, {}, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.route])

  useEffect(() => {
    if (values.route) {
      let res = [
        wayDetail.detail.province,
        wayDetail.detail.district,
        wayDetail.detail.subdistrict,
      ]
      handlerChange({
        way_description: wayDetail.detail.name,
        address: res.join(' ')
      })
    } else {
      handlerChange({
        way_description: '',
        address: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.route, wayDetail])

  const buildValue = useCallback((values, next) => {
    const body = {
      submit: {
        wid: values.route,
        collaboration: values.collaboration == "" ? "" : values.collaboration.join(','),
        km_from: values.from_km,
        km_to: values.to_km
      },
      upload: {
        file1: values.way_image[0]?.originFileObj,
        file2: values.collaborator_image[0]?.originFileObj
      },
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback(async (values, next) => {
    const response = await apiPost('/api/v1/weight/weight_mobile_master', values.submit, {}, false)
    if (response?.success) {
      next({  
        upload: values.upload,
        api_response: response?.data
      })
    } else {
      message.error('ไม่สามารถบันทึกข้อมูลได้')
    }
  }, [apiPost]);

  const uploadFile = useCallback(async (values) => {
    const body = new FormData()
    body.append('file1', values.upload.file1)
    body.append('file2', values.upload.file2)

    const response = await apiPost(`/api/v1/weight/weight_mobile_master/${values.api_response.t_id}/photo`, body, {}, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (response?.success) {
      message.success('บันทึกข้อมูลสำเร็จ')
      onReload()
      setOpen({ open: false, info: {} })
    } else {
      message.error('ไม่สามารถอัปโหลดไฟล์ได้')
    }
  }, [apiPost, onReload, setOpen]);

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit, uploadFile]}>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Select
              label="ข้อมูลสายทาง"
              name="route"
              placeholder="ข้อมูลสายทาง"
              optKeys={['id', 'way_code']}
              options={wayAll.all}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired={!errors.route}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Select
              label="ร่วมบูรณาการ"
              name="collaboration"
              placeholder="ร่วมบูรณาการ"
              optKeys={['colname', 'colname']}
              options={collaborateList.data}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired={!errors.collaboration}
              mode="multiple"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.TextArea
              label="ข้อมูลสายทาง"
              name="way_description"
              placeholder="ข้อมูลสายทาง"
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.TextArea
              label="ที่อยู่"
              name="address"
              placeholder="ที่อยู่"
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Field.Input
              label="เริ่ม กม. ที่"
              name="from_km"
              placeholder="เริ่ม กม. ที่"
              hideRequired={!errors.from_km}
            />
            <span className="text-[#727272]">เช่น 1+100</span>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Field.Input
              label="ถึง กม. ที่"
              name="to_km"
              placeholder="ถึง กม. ที่"
              hideRequired={!errors.to_km}
            />
            <span className="text-[#727272]">เช่น 1+500</span>
          </Col>
        </Row>
      </section>
      <section className="mt-5">
        <Typography.Title level={5}>รูปการจัดตั้งหน่วยชั่ง</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Field.Upload
              title='จัดจราจรตั้งหน่วยชั่ง'
              name='way_image'
              maxCount={1}
              accept="image/png, image/jpeg"
              listType='picture-card'
              maxSizeLimit={10000000}
              // hideRequired={!errors.file}
              beforeUpload={(file) => {
                // DEFAULT VALUES
                const allowList = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
                const maxFileSize = 10000000
                // CHECK
                const isListAvailable = allowList.some(item => item === file.type)
                const isLt10 = file.size < maxFileSize
                if (!isListAvailable) {
                  // message.error('Invalid file type')
                  message.error('ประเภทไฟล์ไม่ถูกต้อง')
                  return Upload.LIST_IGNORE
                }
                if (!isLt10) {
                  // message.error('File size exceed')
                  message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                  return Upload.LIST_IGNORE
                }
                // RETURN UPLOAD.LIST_IGNORE
                return false
              }}
              label='อัปโหลดรูป'
              hideRequired={!errors.way_image}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Field.Upload
              title='เจ้าหน้าที่ร่วมตั้งหน่วยชั่ง'
              name='collaborator_image'
              maxCount={1}
              accept="image/png, image/jpeg"
              listType='picture-card'
              maxSizeLimit={10000000}
              // hideRequired={!errors.file}
              beforeUpload={(file) => {
                // DEFAULT VALUES
                const allowList = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
                const maxFileSize = 10000000
                // CHECK
                const isListAvailable = allowList.some(item => item === file.type)
                const isLt10 = file.size < maxFileSize
                if (!isListAvailable) {
                  // message.error('Invalid file type')
                  message.error('ประเภทไฟล์ไม่ถูกต้อง')
                  return Upload.LIST_IGNORE
                }
                if (!isLt10) {
                  // message.error('File size exceed')
                  message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                  return Upload.LIST_IGNORE
                }
                // RETURN UPLOAD.LIST_IGNORE
                return false
              }}
              label='อัปโหลดรูป'
              hideRequired={!errors.collaborator_image}
            />
          </Col>
        </Row>
      </section>
      <button ref={refSubmit} type="submit" hidden />
    </Form>
  );
};

const ModalAddMobileDepartment = (props) => {
  const { open, setOpen, onReload } = props;
  // REF
  const refSubmit = useRef(null)
  // API
  const [apiPost, loadingPost] = usePostAPI('overlay')

  return (
    <Modal
      title="เพิ่มข้อมูลจัดตั้งหน่วยเคลื่อนที่"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
      width={700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large',
        onClick: () => refSubmit.current.click(),
        loading: loadingPost
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        <Content
          refSubmit={refSubmit}
          onReload={onReload}
          setOpen={setOpen}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalAddMobileDepartment);
