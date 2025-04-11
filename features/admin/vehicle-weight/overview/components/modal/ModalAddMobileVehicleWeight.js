import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Row, Col, Typography, Upload, message } from "antd";
import { Form, Field, useForm } from "@/components/form";
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import usePostAPI from "@/utils/hooks/api/usePostAPI";
import { getAllProvince, getGoods, getProvincePlate, getVehicleClass } from '@/store/features/masterSlice'
const _ = require('lodash');

const Content = (props) => {
  const { refSubmit, tid, reload, setOpen, latestTDID } = props;

  const TID = tid?.tid

  const [axleDisbled, setAxleDisbled] = useState([true, true, true, true, true, true, true, true])
  const [axle, setAxle] = useState(null)
  const [legalWeight, setLegalWeight] = useState(null)
  // API GET
  const [apiPost, loadingPost] = usePostAPI('overlay')
  // const [apiGetProvince, loading, province] = useGetAPI('overlay', {
  //   funcDispatch: getAllProvince, reducerName: 'master', reducerKey: 'province'
  // })

  const [apiGetProvincePlate, loadingProvincePlate, ProvincePlate] = useGetAPI('overlay', {
    funcDispatch: getProvincePlate, reducerName: 'master', reducerKey: 'province_plate'
  })

  const [apiGetGoods, loadingGoods, goods] = useGetAPI('overlay', {
    funcDispatch: getGoods, reducerName: 'master', reducerKey: 'goods'
  })

  const [apiGetVehicleClass, loadingVehicleClass, VehicleClass] = useGetAPI('overlay', {
    funcDispatch: getVehicleClass, reducerName: 'master', reducerKey: 'vehicle_class'
  })



  useEffect(() => {
    apiGetProvincePlate('/api/v1/masters/province_plates', { page: 1, page_size: 2000000 }, false)
    // apiGetProvince('/api/v1/masters/provinces_all', {}, false)
    apiGetGoods('api/v1/masters/goods', {}, false)
    apiGetVehicleClass('/api/v1/masters/vehicle_class', { page: 1, page_size: 100 }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const selectDisabled = (cartype) => {

    const truckData = VehicleClass.vehicle_class.data?.find(item => item.vehicle_class_id === cartype)
    setAxle(truckData.drive_shaft_ref == 0 ? 'มากกว่า 7' : truckData.drive_shaft_ref)
    setLegalWeight(truckData.legal_weight == 0 ? null : `${truckData.legal_weight} ตัน`)

    // SUPER HARD CODE
    if (truckData.drive_shaft_ref == 1) {
      setAxleDisbled([false, true, true, true, true, true, true, true])
      handlerChange({
        axie_2: '',
        axie_3: '',
        axie_4: '',
        axie_5: '',
        axie_6: '',
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 2) {
      setAxleDisbled([false, false, true, true, true, true, true, true])
      handlerChange({
        axie_3: '',
        axie_4: '',
        axie_5: '',
        axie_6: '',
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 3) {
      setAxleDisbled([false, false, false, true, true, true, true, true])
      handlerChange({
        axie_4: '',
        axie_5: '',
        axie_6: '',
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 4) {
      setAxleDisbled([false, false, false, false, true, true, true, true])
      handlerChange({
        axie_5: '',
        axie_6: '',
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 5) {
      setAxleDisbled([false, false, false, false, false, true, true, true])
      handlerChange({
        axie_6: '',
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 6) {
      setAxleDisbled([false, false, false, false, false, false, true, true])
      handlerChange({
        axie_7: '',

      })
    }
    if (truckData.drive_shaft_ref == 7) {
      setAxleDisbled([false, false, false, false, false, false, false, true])
      handlerChange({

      })
    }
    if (truckData.drive_shaft_ref == 0) { setAxleDisbled([false, false, false, false, false, false, false, false]) }
    if (truckData.drive_shaft_ref < 0 || truckData.drive_shaft_ref > 7) {
      setAxleDisbled([true, true, true, true, true, true, true, true])
      handlerChange({
        axie_1: '',
        axie_2: '',
        axie_3: '',
        axie_4: '',
        axie_5: '',
        axie_6: '',
        axie_7: '',
      })
    }

  };

  const form = useForm({
    initialValues: {
      start_date: '',
      start_time: '',
      type_car: '',
      type_cargo: '',
      license_plate_head: '',
      province_head: '',
      license_plate_trailer: '',
      province_trailer: '',
      axie_1: '',
      axie_2: '',
      axie_3: '',
      axie_4: '',
      axie_5: '',
      axie_6: '',
      axie_7: '',
    },
    rules: {},
    blackList: ['axie_count', 'legal_weight']
  });

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {


    const getImage = {
      front: values.front_image || [],
      back: values.back_image || [],
      left: values.left_size || [],
      right: values.right_side || [],
      slip: values.weight_slip || [],
      license: values.driving_license || [],
    }

    const convertOBJ = {
      image_path1: getImage.front.length != 0 ? getImage.front[0].originFileObj : [],
      image_path2: getImage.back.length != 0 ? getImage.back[0].originFileObj : [],
      image_path3: getImage.left.length != 0 ? getImage.left[0].originFileObj : [],
      image_path4: getImage.right.length != 0 ? getImage.right[0].originFileObj : [],
      image_path5: getImage.slip.length != 0 ? getImage.slip[0].originFileObj : [],
      image_path6: getImage.license.length != 0 ? getImage.license[0].originFileObj : [],
    }

    const body = {
      form: {
        t_id: TID || '',
        lp_head_no: values.license_plate_head || '',
        lp_head_province_id: values.province_head != null ? Number(values.province_head) : 0,
        lp_tail_no: values.license_plate_trailer || '',
        lp_tail_province_id: values.province_trailer != null ? Number(values.province_trailer) : 0,
        vehicle_class_id: Number(values.type_car) || '',
        material_name: values.type_cargo || '',
        ds_1: Number(values.axie_1) || 0,
        ds_2: Number(values.axie_2) || 0,
        ds_3: Number(values.axie_3) || 0,
        ds_4: Number(values.axie_4) || 0,
        ds_5: Number(values.axie_5) || 0,
        ds_6: Number(values.axie_6) || 0,
        ds_7: Number(values.axie_7) || 0
      },
      file: {
        t_id: TID || '',
        image: convertOBJ
      }

    }



    next(body);
  }, [TID]);

  const handlerSubmit = useCallback(async (values, next) => {
    const response = await apiPost('/api/v1/weight/weight_mobile_master_detail', values.form, {}, false)
    if (response.success) {
      message.success('Create Form Success')
      next([values.file, { td_id: response.data.td_id }]);
    } else {
      message.error('Create Failed')
    }

  }, [apiPost]);

  const uploadFile = useCallback(async (values) => {
    const imageResponse = await apiPost(`/api/v1/weight/weight_mobile_master_detail/photo/${values[0].t_id}/${values[1].td_id || ''}`, values[0].image, undefined, false, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (imageResponse.success) {
      message.success('Create Image Success')
    } else {
      message.error('Create Image Failed')
    }
    await reload()
    setOpen({ open: false, info: {} })
  }, [apiPost, reload, setOpen])


  let ConvertString = _.map(ProvincePlate.data, (record) => ({
    ...record,
    id: String(record.id),
  }));


  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit, uploadFile]}>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Input
              label="ทะเบียนรถ (หัวลาก)"
              name="license_plate_head"
              placeholder="ทะเบียนรถ (หัวลาก)"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Select
              label="จังหวัด (หัวลาก)"
              name="province_head"
              placeholder="จังหวัด (หัวลาก)"
              optKeys={['id', 'name']}
              options={ConvertString || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Input
              label="ทะเบียนรถ (หางลาก)"
              name="license_plate_trailer"
              placeholder="ทะเบียนรถ (หางลาก)"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Select
              label="จังหวัด (หางลาก)"
              name="province_trailer"
              placeholder="จังหวัด (หางลาก)"
              optKeys={['id', 'name']}
              options={ConvertString || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Select
              label="ประเภทรถ"
              name="type_car"
              placeholder="ประเภทรถ"
              optKeys={['vehicle_class_id', 'vehicle_class_desc']}
              options={VehicleClass.vehicle_class.data || []}
              dropdownMatchSelectWidth={false}
              onChange={(value, option) => {
                handlerChange({
                  [value]: option
                })
                selectDisabled(option);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Input
              label="จำนวนเพลา"
              name="axie_count"
              placeholder="จำนวนเพลา"
              value={axle}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Input
              label="น้ำหนักตามกฎหมาย"
              name="legal_weight"
              placeholder="น้ำหนักตามกฎหมาย"
              value={legalWeight}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Field.Select
              label="บรรทุก"
              name="type_cargo"
              placeholder="บรรทุก"
              optKeys={['goods_name', 'goods_name']}
              options={goods.overview.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            />
          </Col>
          <Col className="!w-full">
            <Row gutter={[16, 0]}>
              <Col sm={24} md={24} lg={14}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Field.Input
                      label="เพลาที่ 1"
                      name="axie_1"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[0]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'

                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Field.Input
                      label="เพลาที่ 2"
                      name="axie_2"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[1]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Field.Input
                      label="เพลาที่ 3"
                      name="axie_3"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[2]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Field.Input
                      label="เพลาที่ 4"
                      name="axie_4"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[3]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />

                  </Col>
                </Row>
              </Col>

              <Col sm={24} md={24} lg={10}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                    <Field.Input
                      label="เพลาที่ 5"
                      name="axie_5"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[4]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                    <Field.Input
                      label="เพลาที่ 6"
                      name="axie_6"
                      disabled={axleDisbled[5]}
                      placeholder="น้ำหนัก (ตัน)"
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                    <Field.Input
                      label="เพลาที่ 7"
                      name="axie_7"
                      placeholder="น้ำหนัก (ตัน)"
                      disabled={axleDisbled[6]}
                      onChange={(n, v) => {
                        handlerChange({ [n]: v.replace(/[^0-9.]/g, '') })
                      }}
                      className='text-sm'
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="mt-5">
        <Typography.Title level={5}>รูปการจัดตั้งหน่วยชั่ง</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='ด้านหน้า'
              name='front_image'
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
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='ด้านหลัง'
              name='back_image'
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
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='ด้านซ้าย'
              name='left_size'
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
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='ด้านขวา'
              name='right_side'
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
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='สลิปน้ำหนัก'
              name='weight_slip'
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
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Field.Upload
              title='ใบขับขี่'
              name='driving_license'
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
              hideRequired
            />
          </Col>
        </Row>
      </section>
      <button ref={refSubmit} type="submit" hidden />
    </Form>
  );
};

const ModalAddMobileVehicleWeight = (props) => {
  const { open, setOpen, tid, reload, latestTDID } = props;
  const refSubmit = useRef()

  return (
    <Modal
      title="เพิ่มข้อมูล รถที่เข้าชั่ง"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
      width={1000}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large',
        onClick: () => refSubmit.current.click(),
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
          tid={tid}
          reload={reload}
          setOpen={setOpen}
          latestTDID={latestTDID}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalAddMobileVehicleWeight);
