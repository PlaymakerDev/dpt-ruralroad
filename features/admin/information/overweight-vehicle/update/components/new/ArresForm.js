import { Button, Checkbox, Col, ConfigProvider, DatePicker, Image, Input, message, Row, Select, TimePicker } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '@/features/admin/information/overweight-vehicle/update/style/ArresForm.module.css'
import Radio from '@/components/icon/Radio'
import CheckboxIcon from '@/components/icon/CheckboxIcon'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getDistrict, getDistrict2, getProvince, getSubDistrict, getSubDistrict2 } from '@/store/features/masterSlice'
import { Form, Field, useForm } from '@/components/form'
import next from 'next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { getCarGo } from '@/store/features/settingSlice'
import usePostAPI from '@/utils/hooks/api/usePostAPI'
import { getArresDetail } from '@/store/features/informationSlice'
import usePutAPI from '@/utils/hooks/api/usePutAPI'


const ArresForm = (props) => {


  const [apiPost, loadingPost] = usePostAPI('overlay')
  const [apiPut, loadingPut] = usePutAPI("overlay");

  const [activeRadio1, setActiveRadio1] = useState(1);
  const [activeRadio2, setActiveRadio2] = useState(1);
  const [activeRadio3, setActiveRadio3] = useState(1);
  const [checkboxStatus, setCheckboxStatus] = useState({
    checkbox1: 0,
    checkbox2: 0,
    checkbox3: 0,
    checkbox4: 0,
    checkbox5: 0,
  });

  const [activeProvince1, setActiveProvince1] = useState(false)
  const [showDistrict1, setShowDistrict1] = useState(false);


  const [activeProvince2, setActiveProvince2] = useState(false)
  const [showDistrict2, setShowDistrict2] = useState(false);

  const { query, data } = props

  console.log('props data', data)
  const router = useRouter();

  const [apiGetDistrict, districtLoading, districtData] = useGetAPI('overlay', {
    funcDispatch: getDistrict, reducerName: 'master', reducerKey: 'district'
  })

  const [apiGetSubDistrict, subDistrictLoading, subDistrictData] = useGetAPI('overlay', {
    funcDispatch: getSubDistrict, reducerName: 'master', reducerKey: 'sub_district'
  })

  const [apiGetDistrict2, districtLoading2, districtData2] = useGetAPI('overlay', {
    funcDispatch: getDistrict2, reducerName: 'master', reducerKey: 'district'
  })

  const [apiGetSubDistrict2, subDistrictLoading2, subDistrictData2] = useGetAPI('overlay', {
    funcDispatch: getSubDistrict2, reducerName: 'master', reducerKey: 'sub_district'
  })

  const [apiGetProvince, ProvinceLoading, provinceData] = useGetAPI('overlay', {
    funcDispatch: getProvince, reducerName: 'master', reducerKey: 'province'
  })

  const [apiGetGoods, goodsLoading, goodsData] = useGetAPI('overlay', {
    funcDispatch: getCarGo, reducerName: 'setting', reducerKey: 'car_go'
  })



  // const record_date = get_arres_data?.record_date || ''
  // const locale_date = get_arres_data?.locale_date || ''
  // const tell_law_date = get_arres_data?.tell_law_date || ''
  // const tell_law_time = get_arres_data?.tell_law_time || ''
  // const tell_law_prosecutor_date = get_arres_data?.tell_law_prosecutor_date || ''
  // const tell_law_prosecutor_time = get_arres_data?.tell_law_prosecutor_time || ''
  // const record_date = '2025-01-01'
  // const locale_date = '2025-01-14T00:00:00.000Z'
  // const tell_law_date = "2025-01-28T00:00:00.000Z"
  // const tell_law_time = "05:05:05"
  // const tell_law_prosecutor_date = "2025-01-20T00:00:00.000Z"
  // const tell_law_prosecutor_time = '12:20:20'

  // console.log('Record Date:', record_date);
  // console.log('Locale Date:', locale_date);
  // console.log('Tell Law Date:', tell_law_date);
  // console.log('Tell Law Time:', tell_law_time);
  // console.log('Tell Law Prosecutor Date:', tell_law_prosecutor_date);
  // console.log('Tell Law Prosecutor Time:', tell_law_prosecutor_time);


  const form = useForm({
    initialValues: {
      "tdid": query?.td_id || '',
      "record_no": data?.record_no || '',
      "record_location": data?.record_location || '',
      "record_date": data?.record_date ? dayjs(data?.record_date || '') : '',
      "record_time": data?.record_time || '',
      "witness_fullname": data?.witness_fullname || '',
      "witness_race": data?.witness_race || '',
      "witness_nationality": data?.witness_nationality || '',
      "witness_ocupation": data?.witness_ocupation || '',
      "address_no": data?.address_no || '',
      "address_moo": data?.address_moo || '',
      "address_road": data?.address_road || '',
      "address_soi": data?.address_soi || '',
      "province": data?.province_id || '',
      "district": data?.district_id || '',
      "sub_district": data?.sub_district_id || '',
      "phone_number": data?.phone_number || '',
      "employer_fullname": data?.employer_fullname || '',
      "truck_brand": data?.truck_brand || '',
      "vehicle_registration_plate": query?.lp_head_no || '',
      "vehicle_type": data?.vehicle_type || '',
      "vehicle_axle": data?.vehicle_axle || '',
      "vehicle_rubber": data?.vehicle_rubber || '',
      "vehicle_tow_type": data?.vehicle_tow_type == "พ่วง" ? 1 : data?.vehicle_tow_type == "กึ่งพ่วง" ? 2 : 1,
      "tow_vehicle_registration_plate_tail": data?.tow_vehicle_registration_plate_tail || '',
      "tow_type": data?.tow_type || '',
      "tow_axle": data?.tow_axle || '',
      "tow_rubber": data?.tow_rubber || '',
      "distance_kingpin": data?.distance_kingpin || '',
      "truck_carrier_type": data?.truck_carrier_type ? String(data?.truck_carrier_type) : '',
      "rural_road_number": data?.rural_road_number || '',
      "source_province": data?.source_province_id || '',
      "destination_province": data?.destination_province_id || '',
      "weight_station_type": query?.type_id || 1,
      "explain_1": query?.type_id == 1 ? data?.explain : '',
      "explain_2": query?.type_id == 2 ? data?.explain : '',
      "explain_3": query?.type_id == 3 ? data?.explain : '',
      "truck_total_weight": query?.gross_weight ? (Number(query?.gross_weight) * 1000).toLocaleString() : '',
      "over_weight": query?.legal_weight ? (Number(query?.legal_weight) * 1000).toLocaleString() : '',
      "legal_weight": query?.gross_weight_over ? (Number(query?.gross_weight_over) * 1000).toLocaleString() : '',
      "annoucement_no": data?.annoucement_no || '',
      "truck_registration_plate": data?.truck_registration_plate || '',
      "truck_registration_plate_copy": data?.truck_registration_plate_copy || '',
      "truck_license_type": data?.truck_license_type || '',
      "slip_weight_from_company": data?.slip_weight_from_company || '',
      "slip_weight_from_weight_unit": data?.slip_weight_from_weight_unit || '',
      "locale_rural_road_no": data?.locale_rural_road_no || '',
      "locale_km": data?.locale_km || '',
      "locale_province": data?.locale_province_id || '',
      "locale_district": data?.locale_district_id || '',
      "locale_sub_district": data?.locale_sub_district_id || '',
      "locale_date": data?.locale_date ? dayjs(data?.locale_date).subtract(7, 'hour') : '',
      "locale_time": data?.locale_time || '',
      "confesstion": data?.confesstion == "ผู้ต้องหารับสารภาพตลอดข้อกล่าวหา" ? 1 : data?.confesstion == "ผู้ต้องหาปฏิเสธข้อกล่าวหา" ? 2 : data?.confesstion == "อื่นๆ" ? 3 : 1,
      "confesstion_other": data?.confesstion_other || '',
      "evidence": data?.evidence || 0,
      "torture": data?.torture || 0,
      "tell_law": data?.tell_law || 0,
      "tell_law_email": data?.tell_law_email || '',
      "tell_law_date_time": data?.tell_law_date && data?.tell_law_time ? dayjs(dayjs(data?.tell_law_date).format('YYYY-MM-DD') + "T" + data?.tell_law_time + ".000Z").subtract(7, 'hour') : '',
      "tell_law_time": data?.tell_law_time || '',
      "tell_law_date": data?.tell_law_date ? dayjs(data?.tell_law_date).subtract(7, 'hour').format('YYYY-MM-DD') : '',
      "tell_law_prosecutor": data?.tell_law_prosecutor || 0,
      "tell_law_prosecutor_email": data?.tell_law_prosecutor_email || '',
      "tell_law_prosecutor_date_time": data?.tell_law_prosecutor_date && data?.tell_law_prosecutor_time ? dayjs(dayjs(data?.tell_law_prosecutor_date).format('YYYY-MM-DD') + "T" + data?.tell_law_prosecutor_time + ".000Z").subtract(7, 'hour') : '',
      "tell_law_prosecutor_time": data?.tell_law_prosecutor_time || '',
      "tell_law_prosecutor_date": data?.tell_law_prosecutor_date ? dayjs(data?.tell_law_prosecutor_date).subtract(7, 'hour').format('YYYY-MM-DD') : '',
      "provincial_admin": data?.provincial_admin || 0,
      "is_not_record": data?.is_not_record || '',
      "police_station": data?.police_station || '',
      "employer_owner": data?.employer_owner || '',
      "truck_owner": data?.truck_owner || '',
      "factory_data": data?.factory_data || ''

    },
    rules: {}
  })
  const { handlerChange, values } = form

  console.log('form default', form?.initialValues?.truck_total_weight)

  const handleRadio1 = (radioID) => {
    setActiveRadio1(radioID);
    handlerChange({
      vehicle_tow_type: radioID
    })
  };
  const handleRadio2 = (radioID) => {
    setActiveRadio2(radioID);
    handlerChange({
      explain_1: '',
      explain_2: '',
      explain_3: '',
      weight_station_type: radioID
    })
  };
  const handleRadio3 = (radioID) => {
    setActiveRadio3(radioID);
    handlerChange({
      confesstion_other: '',
      confesstion: radioID
    })
  };

  const handleCheckboxUpdate = (checkboxID) => {
    setCheckboxStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      switch (checkboxID) {
        case 1:
          newStatus.checkbox1 = newStatus.checkbox1 == 1 ? 0 : 1;
          handlerChange({
            evidence: newStatus.checkbox1,
          })
          break;
        case 2:
          newStatus.checkbox2 = newStatus.checkbox2 == 1 ? 0 : 1;
          handlerChange({
            torture: newStatus.checkbox2,
          })
          break;
        case 3:
          newStatus.checkbox3 = newStatus.checkbox3 == 1 ? 0 : 1;
          handlerChange({
            tell_law: newStatus.checkbox3,
            tell_law_email: '',
            tell_law_date_time: ''

          })
          break;
        case 4:
          newStatus.checkbox4 = newStatus.checkbox4 == 1 ? 0 : 1;
          handlerChange({
            tell_law_prosecutor: newStatus.checkbox4,
            tell_law_prosecutor_date_time: '',
            tell_law_prosecutor_email: ''

          })
          break;
        case 5:
          newStatus.checkbox5 = newStatus.checkbox5 == 1 ? 0 : 1;
          handlerChange({
            provincial_admin: newStatus.checkbox5,
            is_not_record: ''
          })
          break;
        default:
          break;
      }
      return newStatus;
    });
  };




  const handlerGetDistrict = async (data) => {
    await apiGetDistrict('/api/v1/masters/districts', { page: 1, page_size: 2000000, province_id: data }, false)
  }

  const handlerGetSubDistrict = async (data) => {
    await apiGetSubDistrict('/api/v1/masters/subdistricts', { page: 1, page_size: 2000000, district_id: data }, false)
  }

  const handlerGetDistrict2 = async (data) => {
    await apiGetDistrict('/api/v1/masters/districts', { page: 1, page_size: 2000000, province_id: data }, false)
  }

  const handlerGetSubDistrict2 = async (data) => {
    await apiGetSubDistrict('/api/v1/masters/subdistricts', { page: 1, page_size: 2000000, district_id: data }, false)
  }

  useEffect(() => {
    // getSubDistrict('/api/v1/masters/subdistricts', { ...subDistrictData.overview.search, page_size: 2000000 }, false)
    apiGetProvince('/api/v1/masters/provinces', { page_size: 2000000 }, false)
    apiGetGoods(`/api/v1/masters/goods`, { page: 1, page_size: 2000000 }, false, {})

    setActiveRadio2(query?.type_id ? Number(query?.type_id) : 1)

    if (query?.is_arrested == 1) {
      console.log('This is Update')
      setActiveRadio1(form?.initialValues?.vehicle_tow_type)
      setActiveRadio3(form?.initialValues?.confesstion)
      setCheckboxStatus({
        checkbox1: form?.initialValues?.evidence,
        checkbox2: form?.initialValues?.torture,
        checkbox3: form?.initialValues?.tell_law,
        checkbox4: form?.initialValues?.tell_law_prosecutor,
        checkbox5: form?.initialValues?.provincial_admin,
      })
      if (form?.initialValues?.province != '') {
        apiGetDistrict('/api/v1/masters/districts', { page: 1, page_size: 2000000, province_id: form?.initialValues?.province }, false)
        setActiveProvince1(true)
      }

      if (form?.initialValues?.district != '') {
        apiGetSubDistrict('/api/v1/masters/subdistricts', { page: 1, page_size: 2000000, district_id: form?.initialValues?.district }, false)
        setShowDistrict1(true)
      }

      if (form?.initialValues?.locale_province != '') {
        apiGetDistrict('/api/v1/masters/districts', { page: 1, page_size: 2000000, province_id: form?.initialValues?.locale_province }, false)
        setActiveProvince2(true)
      }

      if (form?.initialValues?.locale_district != '') {
        apiGetSubDistrict('/api/v1/masters/subdistricts', { page: 1, page_size: 2000000, district_id: form?.initialValues?.locale_district }, false)
        setShowDistrict2(true)
      }
    } else {
      console.log('This is Create')
    }

  }, [])


  const SubDistrictOption = subDistrictData?.overview?.data?.map((item) => ({
    value: item?.id,
    label: item?.name_th,
  }));

  const DistrictOption = districtData?.overview?.data?.map((item) => ({
    value: item?.id,
    label: item?.name_th,
  }));

  const SubDistrictOption2 = subDistrictData2?.overview?.data?.map((item) => ({
    value: item?.id,
    label: item?.name_th,
  }));

  const DistrictOption2 = districtData2?.overview?.data?.map((item) => ({
    value: item?.id,
    label: item?.name_th,
  }));

  const Province = provinceData?.overview?.data?.map((item) => ({
    value: item?.id,
    label: item?.name_th,
  }));

  const Goods = goodsData?.overview?.data?.map((item) => ({
    value: String(item?.gid),
    label: item?.goods_name,
  }));



  const buildValue = async (values, next) => {
    console.log('Raw values', values)
    // console.log('tell_law_date_time', dayjs(values.tell_law_date_time).format('YYYY-MM-DD'))
    const body = {
      "tdid": values?.tdid ? Number(values?.tdid) : '',
      "record_no": values?.record_no || '',
      "record_location": values?.record_location || '',
      "record_date": values?.record_date ? dayjs(values?.record_date).format('YYYY-MM-DD') : null,
      "record_time": values?.record_time || null,
      "witness_fullname": values?.witness_fullname || '',
      "witness_race": values?.witness_race || '',
      "witness_nationality": values?.witness_nationality || '',
      "witness_ocupation": values?.witness_ocupation || '',
      "address_no": values?.address_no || '',
      "address_moo": values?.address_moo || '',
      "address_road": values?.address_road || '',
      "address_soi": values?.address_soi || '',
      "sub_district": values?.sub_district || null,
      "district": values?.district || null,
      "province": values?.province || null,
      "phone_number": values?.phone_number || '',
      "employer_fullname": values?.employer_fullname || '',
      "truck_brand": values?.truck_brand || '',
      "vehicle_registration_plate": values?.vehicle_registration_plate || '',
      "vehicle_type": values?.vehicle_type || '',
      "vehicle_axle": values?.vehicle_axle || '',
      "vehicle_type": values?.vehicle_type || '',
      "vehicle_axle": values?.vehicle_axle || '',
      "vehicle_rubber": values?.vehicle_rubber || '',
      "vehicle_tow_type": values?.vehicle_tow_type ? Number(values?.vehicle_tow_type) : null,
      "tow_vehicle_registration_plate_tail": values?.tow_vehicle_registration_plate_tail || '',
      "tow_type": values?.tow_type || '',
      "tow_axle": values?.tow_axle || '',
      "tow_rubber": values?.tow_rubber || '',
      "distance_kingpin": values?.distance_kingpin || '',
      "truck_carrier_type": values?.truck_carrier_type ? Number(values?.truck_carrier_type) : null,
      "rural_road_number": values?.rural_road_number || '',
      "source_province": values?.source_province || null,
      "destination_province": values?.destination_province || null,
      "weight_station_type": values?.weight_station_type ? Number(values?.weight_station_type) : null,
      "explain": (values?.explain_1 || values?.explain_2 || values?.explain_3) ? values?.explain_2 + values?.explain_1 + values?.explain_3 : '',
      "truck_total_weight": values?.truck_total_weight ? Number(values?.truck_total_weight.replace(/,/g, '')) : '',
      "over_weight": values?.over_weight ? Number(values?.over_weight.replace(/,/g, '')) : '',
      "legal_weight": values?.legal_weight ? Number(values?.legal_weight.replace(/,/g, '')) : '',
      "annoucement_no": values?.annoucement_no || '',
      "truck_registration_plate": values?.truck_registration_plate || '',
      "truck_registration_plate_copy": values?.truck_registration_plate_copy || '',
      "truck_license_type": values?.truck_license_type || '',
      "slip_weight_from_company": values?.slip_weight_from_company || '',
      "slip_weight_from_weight_unit": values?.slip_weight_from_weight_unit || '',
      "locale_rural_road_no": values?.locale_rural_road_no || '',
      "locale_km": values?.locale_km || '',
      "locale_sub_district": values?.locale_sub_district || null,
      "locale_district": values?.locale_district || null,
      "locale_province": values?.locale_province || null,
      "locale_date": values?.locale_date ? dayjs(values?.locale_date).format('YYYY-MM-DD') : null,
      "locale_time": values?.locale_time || null,
      "confesstion": values?.confesstion ? Number(values?.confesstion) : null,
      "confesstion_other": values?.confesstion_other || '',
      "evidence": values?.evidence || 0,
      "torture": values?.torture || 0,
      "tell_law": values?.tell_law || 0,
      "tell_law_email": values?.tell_law_email || '',
      "tell_law_date": values?.tell_law_date || null,
      "tell_law_time": values?.tell_law_time || null,
      "tell_law_prosecutor": values?.tell_law_prosecutor || 0,
      "tell_law_prosecutor_email": values?.tell_law_prosecutor_email || '',
      "tell_law_prosecutor_date": values?.tell_law_prosecutor_date || null,
      "tell_law_prosecutor_time": values?.tell_law_prosecutor_time || null,
      "provincial_admin": values?.provincial_admin || 0,
      "is_not_record": values?.is_not_record || '',
      "police_station": values?.police_station || '',
      "employer_owner": values?.employer_owner || '',
      "truck_owner": values?.truck_owner || '',
      "factory_data": values?.factory_data || ''
    }
    next(body)
  }

  const handlerSubmit = async (values) => {
    console.log('Body values', values)
    if (query?.is_arrested == 1) {
      // const response = await apiPost('/api/v1/news', values.article, {}, false)
      const response = await apiPut(`/api/v1/arrest_record/${query?.arrest_id}`, values, undefined, false);
      if (response?.success) {
        message.success('แก้ไขสำเร็จ')
        router.push({
          pathname: '/admin/information/overweight-vehicle/overview',
          query: {
            type: query.type,
            plan_year: query.plan_year,
            start_date: query.start_date,
            end_date: query.end_date,
            department_id: query.department_id,
            station_id: query.station_id,
            page: query.page
          }
        })
      } else {
        message.error('แก้ไขไม่สำเร็จ')
      }
    } else {
      const response = await apiPost('/api/v1/arrest_record', values, {}, false)
      if (response?.success) {
        message.success('บันทึกสำเร็จ')
        router.push({
          pathname: '/admin/information/overweight-vehicle/overview',
          query: {
            type: query.type,
            plan_year: query.plan_year,
            start_date: query.start_date,
            end_date: query.end_date,
            department_id: query.department_id,
            station_id: query.station_id,
            page: query.page
          }
        })
      } else {
        message.error('บันทึกไม่สำเร็จ')
      }
    }


  }


  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <p className={styles.text}>ข้อมูลบันทึกจับกุม</p>
          <Row className=" w-full">
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>เลขที่บันทึก</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='record_no' />
            </Col>
            <Col className={styles.colarres} span={3}>
              <p className={styles.parameterarres}>สถานที่บันทึก</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='record_location' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>วันที่บันทึก</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} name='record_date' /> */}
              <Field.DatePicker
                name='record_date'
                className='arres-date-picker'
                format="DD-MM-BBBB"
                onChange={(key, value) => {
                  if (value == null) {
                    handlerChange({
                      record_date: ''
                    })
                  } else {
                    handlerChange({
                      record_date: dayjs(value)
                    })
                  }
                  // console.log('date values',value)

                }}
                placeholder=''
              // onOk={onOk}
              />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarres}></p>
            </Col>
            <Col className={styles.colarres} span={6}>
              <p className={styles.parameterarres}>บันทึกนี้ทำไว้เป็นหลักฐานเพื่อนแสดงว่า</p>
            </Col>
            <Col className={styles.colarres} span={3}>
              <p className={styles.parameterarres}>วันนี้เวลาประมาณ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} name='record_time' /> */}
              <TimePicker
                className='arres-date-picker'
                // name='record_time' 
                format="HH:mm:ss"
                placeholder=""
                onChange={(item) => {

                  if (item == null) {
                    handlerChange({
                      record_time: ''
                    })
                  } else {
                    handlerChange({
                      record_time: dayjs(item).format("HH:mm:ss")
                    })
                  }


                }}
                defaultValue={values?.record_time != '' ? dayjs(values?.record_time, "HH:mm:ss") : ''}
              />

            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarrescenter}> น.</p>
            </Col>
            <Col className={styles.colarres} span={9}>
              <p className={styles.parameterarres}>เจ้าพนักงานทางหลวง ผู้มีรายชื่อท้ายบันทึกนี้ ได้ร่วมกันจับกุม</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>ผู้ต้องหา</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='witness_fullname' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เชื้อชาติ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='witness_race' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>สัญชาติ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='witness_nationality' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>อาชีพ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='witness_ocupation' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>บ้านเลขที่</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='address_no' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>หมู่ที่</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='address_moo' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ถนน</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='address_road' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ตรอก/ซอย</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='address_soi' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>จังหวัด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                name="province"
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                // variant="borderless"
                onChange={(key, value) => {
                  handlerChange({
                    province: value,
                    district: '',
                    sub_district: ''
                  })
                  handlerGetDistrict2(value)
                  setActiveProvince1(true)
                  setShowDistrict1(false)

                }}
                optKeys={['value', 'label']}
                options={Province}
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>อำเภอ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                name='district'
                showSearch
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                disabled={!activeProvince1}
                // onClick={() => { setShowDistrict1(true) }}

                onChange={(key, value) => {

                  handlerChange({
                    district: value,
                    sub_district: ''
                  })
                  handlerGetSubDistrict(value)
                  setActiveProvince1(true)
                  setShowDistrict1(true)

                }}
                optKeys={['value', 'label']}
                options={DistrictOption}
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ตำบล/แขวง</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                name='sub_district'
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                disabled={!showDistrict1}
                optKeys={['value', 'label']}

                options={SubDistrictOption}
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>โทรศัพท์</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='phone_number' />
            </Col>
          </Row>

          <Row className={styles.rowmargin2}>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}>ซึ่งนายจ้าง/ผู้ประกอบการขนส่ง</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='employer_fullname' />
            </Col>
            <Col className={styles.colarres} span={7}>
              <p className={styles.parameterarres}>พร้อมด้วยของกลางรถยนต์บรรทุกยี่ห้อ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='truck_brand' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>เลขทะเบียน</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='vehicle_registration_plate' disabled />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ชนิด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='vehicle_type' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เพลา</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='vehicle_axle' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ใช้ยาง</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='vehicle_rubber' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>และรถบรรทุก</p>
            </Col>
            <Col lassName={styles.colarres} span={4}>
              <div className='w-full h-full  flex items-end'>

                <div className='w-full !h-fit flex justify-end'>
                  <div className=' w-full h-fit flex gap-1'>
                    <div className=' flex items-center'>
                      <Radio
                        size="clamp(15px, 1.5vw, 25px)"
                        active={activeRadio1}
                        radioID={1}
                        onClick={handleRadio1}
                      />
                    </div>
                    <div className='flex items-center'>
                      <span className={styles.parameterarresstart}>พ่วง</span>
                    </div>
                    <div className=' flex items-center'>
                      <Radio
                        size="clamp(15px, 1.5vw, 25px)"
                        active={activeRadio1}
                        radioID={2}
                        onClick={handleRadio1}
                      />
                    </div>
                    <div className='flex items-center'>
                      <span className={styles.parameterarresstart}>กึ่งพ่วง</span>
                    </div>
                  </div>

                </div>
              </div>
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เลขทะเบียน</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='tow_vehicle_registration_plate_tail' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ชนิด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='tow_type' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เพลา</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='tow_axle' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}>ใช้ยาง</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='tow_rubber' />
            </Col>
            <Col className={styles.colarres} span={3}>
              <p className={styles.parameterarres}>ระยะ King Pin</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='distance_kingpin' />
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarres}>บรรทุกสินค้าประเภท</p>
            </Col>
            <Col className={styles.colinputarres} span={7}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                name='truck_carrier_type'
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                optKeys={['value', 'label']}
                options={Goods}
              />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}>มาตามทางหลวงชนบทหมายเลข</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='rural_road_number' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>จากจังหวัด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                name='source_province'
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                optKeys={['value', 'label']}
                options={Province}
              />
            </Col>
            <Col className={styles.colarres} span={3}>
              <p className={styles.parameterarres}>นำไปส่งจังหวัด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                name='destination_province'
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                optKeys={['value', 'label']}
                options={Province}
              />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}>ได้เข้าชั่งน้ำหนักโดยเครื่องชั่ง</p>
            </Col>
            <Col className={styles.inputarres} span={5}>
              <div className=' h-full flex items-end'>


                <div className='flex'>
                  {/* <Field.input type="radio" name="radio_station" value="พ่วง" className={styles.radioInput2} /> */}
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio2}
                    radioID={1}
                  // onClick={handleRadio2}
                  />
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>สถานีตรวจสอบน้ำหนักยานพาหนะ</span>
                  </div>
                  {/* <span className={styles.radioText}>สถานีตรวจสอบน้ำหนักยานพาหนะ</span> */}
                </div>
              </div>
            </Col>
            <Col className={styles.colinputarres} span={14}>
              <Field.Input className={styles.inputarresleft} name='explain_1' disabled={activeRadio2 != 1} />
            </Col>
          </Row>

          <Row className={styles.rowmargin0}>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.inputarres} span={7}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  {/* <Field.input type="radio" name="radio_station" value="พ่วง" className={styles.radioInput2} /> */}
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio2}
                    radioID={2}
                  // onClick={handleRadio2}
                  />
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>หน่วยตรวจสอบน้ำหนักยานพาหนะ (Sport Check)</span>
                  </div>
                  {/* <span className={styles.radioText}>หน่วยตรวจสอบน้ำหนักยานพาหนะ (Sport Check)</span> */}
                </div>
              </div>
            </Col>
            <Col className={styles.colinputarres} span={12}>
              <Field.Input className={styles.inputarresleft} name='explain_2' disabled={activeRadio2 != 2} />
            </Col>
          </Row>

          <Row className={styles.rowmargin0}>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.inputarres} span={5}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  {/* <Field.input type="radio" name="radio_station" value="พ่วง" className={styles.radioInput2} /> */}
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio2}
                    radioID={3}
                  // onClick={handleRadio2}
                  />
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>ระบบด่านชั่งน้ำหนักในขณะรถวิ่ง</span>
                  </div>
                  {/* <span className={styles.radioText}>หน่วยตรวจสอบน้ำหนักยานพาหนะ (Sport Check)</span> */}
                </div>
              </div>
            </Col>
            <Col className={styles.colinputarres} span={14}>
              <Field.Input className={styles.inputarresleft} name='explain_3' disabled={activeRadio2 != 3} />
            </Col>
          </Row>

          <Row className={styles.rowmargin2}>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={6}>
              <p className={styles.parameterarresstart}>ปรากฎว่ามีน้ำหนักรวมน้ำหนักรถบรรทุก</p>
            </Col>
            <Col className={styles.colinputarres} span={3}>
              <Field.Input className={styles.inputarres} name='truck_total_weight' disabled />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarrescenter}>กิโลกรัม</p>
            </Col>
            <Col className={styles.colarres} span={8}>
              <p className={styles.parameterarres}>ซึ่งมีน้ำหนักซึ่งมีน้ําหนักบรรทุกเกินกว่าอัตราที่กฎหมายกำหนดไว้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}>ที่</p>
            </Col>
            <Col className={styles.colinputarres} span={2}>
              <Field.Input className={styles.inputarres} name='over_weight' disabled />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarrescenter}>กิโลกรัม</p>
            </Col>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarres}>จึงเกินกว่าอัตราที่กฎหมายกำหนดไว้</p>
            </Col>
            <Col className={styles.colinputarres} span={3}>
              <Field.Input className={styles.inputarres} name='legal_weight' disabled />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarrescenter}>กิโลกรัม</p>
            </Col>
            <Col className={styles.colarres} span={6}>
              <p className={styles.parameterarresstart}>ตามประกาศของผู้อำนวยการทางหลวงชนบทฯ ข้อที่</p>
            </Col>
            <Col className={styles.colinputarres} span={3}>
              <Field.Input className={styles.inputarres} name='annoucement_no' />
            </Col>
          </Row>


          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonly}>โดยมีพยานหลักฐานในการกระทำความผิด ดังนี้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}>๑. รถบรรทุก หมายเลขทะเบียน</p>
            </Col>
            <Col className={styles.colinputarres} span={19}>
              <Field.Input className={styles.inputarresleft} name='truck_registration_plate' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}>๒. สำเนาทะเบียนรถ</p>
            </Col>
            <Col className={styles.colinputarres} span={19}>
              <Field.Input className={styles.inputarresleft} name='truck_registration_plate_copy' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}>๓. ใบขับขี่ประเภท</p>
            </Col>
            <Col className={styles.colinputarres} span={19}>
              <Field.Input className={styles.inputarresleft} name='truck_license_type' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstart}>๔. ใบชั่งน้ำหนักจากบริษัท</p>
            </Col>
            <Col className={styles.colinputarres} span={19}>
              <Field.Input className={styles.inputarresleft} name='slip_weight_from_company' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={12}>
              <p className={styles.parameterarresstart}>๕. ใบชั่งน้ำหนักจากหน่วยตรวจสอบน้ำหนักยานพาหนะ/สถานีตรวจสอบน้ำหนักยานพาหนะ</p>
            </Col>
            <Col className={styles.colinputarres} span={11}>
              <Field.Input className={styles.inputarresleft} name='slip_weight_from_weight_unit' />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonly}>จึงแจ้งข้อกล่าวหาให้ผู้ถูกจับกุมทราบว่า   กระทําความผิดฐาน ใช้ยานพาหนะที่มีน้ำหนักบรรทุก หรือน้ำหนักลงเพลาเกินกว่าที่ผู้อํานวยการทางหลวงชนบทกำหนด</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonly}>อันเป็นความผิดตามพระราชบัญญัติทางหลวง พ.ศ. ๒๕๓๘ แก้ไขเพิ่มเติมโดยพระราชบัญญัติทางหลวง (ฉบับที่ ๒) พ.ศ. ๒๕๔๙  มาตรา ๖๑  มาตรา ๗๓/๒ มีข้อความตามที่จะกล่าวต่อไปนี้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonly}>เหตุที่เจ้าพนักงานทางหลวงจับโดยไม่มีหมายจับ เพราะเมื่อบุคคลนั้นได้กระทำความผิดซึ่งหน้าดังได้บัญญัติไว้ในประมวลกฎหมายวิธีพิจารณาความอาญา มาตรา ๘๐</p>
            </Col>
          </Row>


          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={5}>
              <p className={styles.parameterarresstart}>เหตุเกิดที่ ทางหลวงชนบทหมายเลข</p>
            </Col>
            <Col className={styles.colinputarres} span={7}>
              <Field.Input className={styles.inputarres} name='locale_rural_road_no' />
            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarres}>กม.</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='locale_km' />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>จังหวัด</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                name='locale_province'
                showSearch
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                optKeys={['value', 'label']}
                options={Province}
                onChange={(key, value) => {
                  handlerChange({
                    locale_province: value,
                    locale_district: '',
                    locale_sub_district: ''
                  })
                  handlerGetDistrict(value)
                  setActiveProvince2(true)
                  setShowDistrict2(false)

                }}
              />
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>อำเภอ</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                name='locale_district'
                showSearch
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                onChange={(key, value) => {

                  handlerChange({
                    locale_district: value,
                    locale_sub_district: ''
                  })
                  handlerGetSubDistrict2(value)
                  setActiveProvince2(true)
                  setShowDistrict2(true)

                }}
                disabled={!activeProvince2}
                optKeys={['value', 'label']}
                options={DistrictOption2}
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>ตำบล/แขวง</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.Select
                // defaultValue="lucy"
                // onChange={handleChange}
                showSearch
                name='locale_sub_district'
                // variant="borderless"
                className={`${styles.selectarres} arres-input`}
                popupClassName={"arres-input"}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                dropdownMatchSelectWidth={false}
                disabled={!showDistrict2}
                optKeys={['value', 'label']}
                options={SubDistrictOption2}
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เมื่อวันที่</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} name='locale_date' /> */}
              <Field.DatePicker
                name='locale_date'
                className='arres-date-picker'
                format="DD-MM-BBBB"
                onChange={(key, value) => {
                  if (value == null) {
                    handlerChange({
                      locale_date: ''
                    })
                  } else {
                    handlerChange({
                      locale_date: dayjs(value)
                    })
                  }
                }}
                placeholder=''
              />
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarres}>เวลา</p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} name='locale_time' /> */}
              <TimePicker
                className='arres-date-picker'
                // name='locale_time'
                format="HH:mm:ss"
                placeholder=""
                onChange={(item) => {
                  if (item == null) {
                    handlerChange({
                      locale_time: ''
                    })
                  } else {
                    handlerChange({
                      locale_time: dayjs(item).format("HH:mm:ss")
                    })
                  }

                }}
                defaultValue={values?.locale_time != '' ? dayjs(values?.locale_time, "HH:mm:ss") : ''}
              />


            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstart}></p>
            </Col>
            <Col className={styles.colarres} span={22}>
              <p className={styles.parameterarresstartonly}>ในการจับกุมครั้งนี้ เจ้าพนักงานทางหลวงผู้จับกุมได้แจ้งข้อหาให้ผู้ต้องหา และแจ้งสิทธิตามมาตรา ๘๓ วรรคที่สอง แห่งประมวลกฎหมายความอาญาให้ทราบแล้ว ผู้ต้องหาให้การ ดังนี้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๑.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonly}>สิทธิที่จะไม่ให้การหรือให้การก็ได้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๒.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonly}>ถ้อยคำของผู้ต้องหานั้น อาจใช้เป็นพยานหลักฐานในการพิจารณาคดีได้</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๓.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonly}>สิทธิที่จะพบและปรึกษาทนายความ หรือผู้ซึ่งจะเป็นทนายความ</p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๔.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                สิทธิที่จะแจ้งให้ญาติหรือคนที่ไว้วางใจทราบถึง ผู้จับกุมมิได้ทำหรือจัดให้ทำการใด ซึ่งเป็นการให้ คำมั่นสัญญา จงใจ ขู่เข็ญ หลอกหลวง ทรมาน ใช้กําลังบังคับ
                ทําร้ายร่างกายผู้ต้องหา หรือกระทําโดยมิชอบ ประการใดในเรื่องที่เกี่ยวกับการจับกุม มิได้เรียก รับ หรือยอมรับทรัพย์สิน หรือประโยชน์อื่นใดสําหรับตนเอง หรือ ผู้อื่นใดโดยมิชอบ และมิได้ทําให้สูญหาย หรือเสียหายซึ่งทรัพย์สินอันเป็นพยานหลักฐานประกอบการจับกุม
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio3}
                    radioID={1}
                    onClick={handleRadio3}
                  />
                </div>
              </div>
            </Col>
            <Col className={styles.inputarres} span={22}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>ผู้ต้องหารับสารภาพตลอดข้อกล่าวหา </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio3}
                    radioID={2}
                    onClick={handleRadio3}
                  />
                </div>
              </div>
            </Col>
            <Col className={styles.inputarres} span={22}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>ผู้ต้องหาปฏิเสธข้อกล่าวหา </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <Radio
                    size="clamp(15px, 1.5vw, 25px)"
                    active={activeRadio3}
                    radioID={3}
                    onClick={handleRadio3}
                  />
                </div>
              </div>
            </Col>
            <Col className={styles.inputarres} span={1}>
              <div className=' h-full flex items-end'>
                <div className='flex !items-end'>
                  <div className='flex items-center'>
                    <span className={styles.parameterarresstart}>อื่นๆ </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className={styles.colinputarres} span={8}>
              <Field.Input className={styles.inputarresleft} name='confesstion_other' disabled={activeRadio3 != 3} />
            </Col>
          </Row>


          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              {/* <Checkbox  className={styles.checkbox}/> */}
              <CheckboxIcon
                size="clamp(15px, 1.5vw, 25px)"
                active={checkboxStatus.checkbox1}
                checkboxID={1}
                onClick={handleCheckboxUpdate}
              />
            </Col>
            <Col className={styles.colarres} span={22}>

              <p className={styles.parameterarresstartonlyprewarp}>
                ในการควบคุมตัวผู้ถูกจับกุม เจ้าหน้าที่ผู้จับกุมได้ทำการบันทึกภาพและเสียงอย่างต่อเพื่อเพื่อเรื่อง ในขณะจับและควบคุมตัวผู้ถูกจับในชั้นจับกุม จนกระทั่งส่งตัว
                พนักงานสอบสวน ตามมาตรา ๒๒ วรรคหนึ่ง แห่ง พ.ร.บ. ป้องกันและปราบปรามการพรมานและการกระทำให้สูญหาย พ.ศ. ๒๕๖๕
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              {/* <Checkbox  className={styles.checkbox}/> */}
              <CheckboxIcon
                size="clamp(15px, 1.5vw, 25px)"
                active={checkboxStatus.checkbox2}
                checkboxID={2}
                onClick={handleCheckboxUpdate}
              />
            </Col>
            <Col className={styles.colarres} span={22}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เจ้าหน้าที่ผู้จับกุมไม่ได้กระทำการใดๆอันเป็นการทรมาน การทำที่โหดร้าย ไร้มนุษยธรรม หรือย้ำยีศักดิ์ศรีความเป็นมนุษย์หรือกระทำให้บุคคลสูญหายแต่อย่างใด
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              {/* <Checkbox  className={styles.checkbox}/> */}
              <CheckboxIcon
                size="clamp(15px, 1.5vw, 25px)"
                active={checkboxStatus.checkbox3}
                checkboxID={3}
                onClick={handleCheckboxUpdate}
              />
            </Col>
            <Col className={styles.colarres} span={22}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เจ้าหน้าที่ผู้จับกุม ได้แจ้งข้อมูลเกี่ยวกับผู้ถูกควบคุมตัว ตามมาตรา 22 วรรคสอง แห่ง พ.ร.บ.ป้องกันและปราบปรามการทรมานและการกระทําให้สูญหาย พ.ศ.
                ๒๕๖๕
              </p>
            </Col>
            <Col className={styles.colarrestext} span={2}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colinputarres} span={8}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ไปยัง สำนักงานการสอบสวนสำนักงานอัยการสูงสุด ที่ E-mail
              </p>
            </Col>
            <Col className={styles.colinputarres} span={8}>
              <Field.Input className={styles.inputarresleft} name='tell_law_email' disabled={checkboxStatus.checkbox3 == 0} />
            </Col>
            <Col className={styles.colinputarres} span={2}>
              <p className={styles.parameterarresendonlyprewarp}>
                เมื่อวันที่
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} name='tell_law_date' /> */}
              <Field.DatePicker
                showTime
                name='tell_law_date_time'
                className='arres-date-picker'
                onChange={(name, value) => {
                  if (value == null) {
                    handlerChange({
                      tell_law_date_time: '',
                      tell_law_date: '',
                      tell_law_time: '',

                    })
                  } else {
                    handlerChange({
                      tell_law_date_time: value,
                      tell_law_date: dayjs(value).format('YYYY-MM-DD'),
                      tell_law_time: dayjs(value).format('HH:mm:ss'),

                    })
                  }

                }}
                placeholder=''
                disabled={checkboxStatus.checkbox3 == 0}
              // onOk={onOk}
              />
            </Col>
            <Col className={styles.colarrestext} span={2}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colinputarres} span={9}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เรียบร้อยแล้ว
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              {/* <Checkbox  className={styles.checkbox}/> */}
              <CheckboxIcon
                size="clamp(15px, 1.5vw, 25px)"
                active={checkboxStatus.checkbox4}
                checkboxID={4}
                onClick={handleCheckboxUpdate}
              />
            </Col>
            <Col className={styles.colarres} span={22}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เจ้าหน้าที่ผู้จับกุม ได้แจ้งข้อมูลเกี่ยวกับผู้ถูกควบคุมตัว ตามมาตรา 22 วรรคสอง แห่ง พ.ร.บ.ป้องกันและปราบปรามการทรมานและการกระทําให้สูญหาย พ.ศ. ๒๕๖๕
              </p>
            </Col>
            <Col className={styles.colarrestext} span={2}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colinputarres} span={9}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ไปยังผู้อำนวยการสำนักการสอบสวนและนิติการ กรมการปกครอง ที่
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='tell_law_prosecutor_email' disabled={checkboxStatus.checkbox4 == 0} />
            </Col>
            <Col className={styles.colinputarres} span={2}>
              <p className={styles.parameterarresendonlyprewarp}>
                เมื่อวันที่
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              {/* <Field.Input className={styles.inputarres} /> */}
              <Field.DatePicker
                showTime
                name='tell_law_prosecutor_date_time'
                className='arres-date-picker'
                onChange={(name, value) => {
                  if (value == null) {
                    handlerChange({
                      tell_law_prosecutor_date_time: '',
                      tell_law_prosecutor_date: '',
                      tell_law_prosecutor_time: '',

                    })
                  } else {
                    handlerChange({
                      tell_law_prosecutor_date_time: value,
                      tell_law_prosecutor_date: dayjs(value).format('YYYY-MM-DD'),
                      tell_law_prosecutor_time: dayjs(value).format('HH:mm:ss'),

                    })
                  }

                }}
                placeholder=''
                disabled={checkboxStatus.checkbox4 == 0}

              // onOk={onOk}
              />
            </Col>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colinputarres} span={2}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เรียบร้อยแล้ว
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.inputarres} span={1}>
              {/* <Checkbox  className={styles.checkbox}/> */}
              <CheckboxIcon
                size="clamp(15px, 1.5vw, 25px)"
                active={checkboxStatus.checkbox5}
                checkboxID={5}
                onClick={handleCheckboxUpdate}
              />
            </Col>
            <Col className={styles.colarres} span={22}>
              <p className={styles.parameterarresstartonlyprewarp}>
                มีเหตุสุดวิสัยที่ไม่สามารถบันทึกภาพและเสียง ตามมาตรา 22 วรรคหนึ่ง แห่ง พ.ร.บ. ป้องกัน และปราบปรามการทรมานและการกระทําให้สูญหาย พ.ศ. 2565
              </p>
            </Col>
            <Col className={styles.colarrestext} span={2}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={2}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เนื่องจาก
              </p>
            </Col>
            <Col className={styles.colinputarres} span={20}>
              <Field.Input className={styles.inputarresleft} name='is_not_record' disabled={checkboxStatus.checkbox5 == 0} />
            </Col>

          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                อนึ่งในการจับกุมครั้งนี้ เจ้าพนักงานทุกคนได้กระทําไปตามอํานาจหน้าที่โดยชอบ มิได้ทําหรือจัดให้ทําการใด ซึ่งเป็นการให้คํามั่นสัญญา จูงใจ หลอกลวง บังคับขู่เข็ญ ทําร้ายร่างกายหรือ
              </p>
            </Col>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonlyprewarp}>
                จิตใจผู้ต้องหา หรือกระทําการโดยมิชอบประการใดที่เกี่ยวกับการจับกุม มิได้เรียก รับ หรือยอมจะรับทรัพย์สิน หรือประโยชน์อื่นใดสําหรับตนเองหรือผู้อื่น โดยมิชอบ และมิได้ทําให้เสียหาย ทําลาย ซ่อนเร้น เอาไปเสีย ทําให้สูญหาย หรือไร้ประโยชน์ซึ่งทรัพย์สินอันเป็นพยานหลักฐานแต่อย่างใด
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={11}>
              <p className={styles.parameterarresstartonlyprewarp}>
                พร้อมทั้งได้นําผู้ต้องหาพร้อมเอกสารหลักฐานและของกลาง ส่งพนักงานสอบสวน สภ
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='police_station' />
            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstartonlyprewarp}>
              </p>
            </Col>
            <Col className={styles.colarres} span={7}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เพื่อดำเนินคดีตามกฎหมายต่อไป โดยขอให้เจ้าพนักงาน
              </p>
            </Col>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonlyprewarp}>
                สอบสวนตรวจสอบในพฤติการณ์เพิ่มเติมของผู้ต้องหา ดังนี้
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๑.</p>
            </Col>
            <Col className={styles.colarres} span={12}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ตรวจสอบข้อมูลของผู้ว่าจ้างขนส่ง คือ ห้างหุ้นส่วนจำกัด/บริษัทจำกัด/นาย/นาง/นางสาว
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='employer_owner' />
            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstartonlyprewarp}>
              </p>
            </Col>
            <Col className={styles.colarres} span={6}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ว่ารู้เห็นเป็นใจใจการกระทำความผิดนี้หรือไม่
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๒.</p>
            </Col>
            <Col className={styles.colarres} span={14}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ตรวจสอบข้อมูลของผู้ประกอบการขนส่งหรือเจ้าของรถ คือ ห้างหุ้นส่วนจำกัด/บริษัทจำกัด/นาย/นาง/นางสาว
              </p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='truck_owner' />
            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstartonlyprewarp}>
              </p>
            </Col>
            <Col className={styles.colarres} span={4}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ซึ่งเป็นผู้ขนส่งสินค้า
              </p>
            </Col>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={14}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ว่ารู้เห็นเป็นใจในการกระทำความผิดนี้หรือไม่
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๓.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ตรวจสอบข้อมูลโรงงานที่เป็นแหล่งวัสดุต่าง ๆ ตามกฎหมายโรงงาน หรือกฎหมายอื่น ๆ ที่เกี่ยวข้อง คือ ห้างหุ้นส่วนจำกัด/บริษัทจำกัด/นาย/นาง/นางสาว
              </p>
            </Col>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colinputarres} span={4}>
              <Field.Input className={styles.inputarres} name='factory_data' />
            </Col>
            <Col className={styles.colarres} span={1}>
              <p className={styles.parameterarresstartonlyprewarp}>
              </p>
            </Col>
            <Col className={styles.colarres} span={18}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ว่ารู้เห็นเป็นใจในการกระทำความผิดนี้หรือไม่
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๔.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                ขอให้พิจารณาถึงข้อกฎหมาย อื่น ๆ ที่เกี่ยวข้องเพิ่มเติมด้วย เช่น พ.ร.บ. โรงงานฯ, พ.ร.บ.เหมืองแร่ฯ รวมถึงข้อสัญญาที่ไม่เป็นธรรมอื่น ๆ อันป็นแรงจูงใจให้เกิดการ กระทำความผิดนี้ ฯลฯ
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}>๕.</p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                หากทางพนักงานสอบสวนได้สรุปสํานวนคดีต่าง ๆ เสร็จสิ้นกระบวนการแล้ว ขอความอนุเคราะห์แจ้งผลให้ สํานักงานบํารุงทาง กรมทางหลวงชนบท ทราบด้วยเบอร์โทรศัพท์ ๐๒๕๕๑ ๕๒๑๐ เพื่อประโยชน์ในการติดตามผลการดำเนินคดีตามกฎหมายต่อไป
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เจ้าพนักงานผู้จับกุมได้อ่านบันทึกให้ผู้ถูกจับกุมฟังแล้ว และผู้ถูกจับกุมได้อ่านด้วยตนเองแล้ว รับว่าถูกต้อง มีการดําเนินการตาม พ.ร.บ. ป้องกันและปราบปรามการทรมาน
              </p>
            </Col>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonlyprewarp}>
                และการกระทำให้สูญหาย พ.ศ.๒๕๖๕ มาตรา​ ๒๒ และได้มอบสำเนาบันทึกการจับกุมให้แก่ผู้ถูกจับกุมเรียบร้อย จึงได้ลงลายชื่อไว้เป็นหลักฐาน
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin1}>
            <Col className={styles.colarrestext} span={1}>
              <p className={styles.parameterarresendonly}></p>
            </Col>
            <Col className={styles.colarres} span={23}>
              <p className={styles.parameterarresstartonlyprewarp}>
                เจ้าพนักงานผู้จับกุมได้อ่านบันทึกให้ผู้ถูกจับกุมฟังแล้ว และผู้ถูกจับกุมได้อ่านด้วยตนเองแล้ว รับว่าถูกต้อง มีการดําเนินการตาม พ.ร.บ. ป้องกันและปราบปรามการทรมาน
              </p>
            </Col>
            <Col className={styles.colarres} span={24}>
              <p className={styles.parameterarresstartonlyprewarp}>
                และการกระทำให้สูญหาย พ.ศ.๒๕๖๕ มาตรา​ ๒๒ และได้มอบสำเนาบันทึกการจับกุมให้แก่ผู้ถูกจับกุมเรียบร้อย จึงได้ลงลายชื่อไว้เป็นหลักฐาน
              </p>
            </Col>
          </Row>

          <Row className={styles.rowmargin3}>
            <Col span={24} >
              <div className=" w-full flex justify-end gap-4">
                <button className={styles.canclebuttom}
                type="button"
                  onClick={() => router.push({
                    pathname: '/admin/information/overweight-vehicle/overview',
                    query: {
                      type: query.type,
                      plan_year: query.plan_year,
                      start_date: query.start_date,
                      end_date: query.end_date,
                      department_id: query.department_id,
                      station_id: query.station_id,
                      page: query.page
                    }
                  })}
                >ยกเลิก</button>
                <button className={styles.submitbuttom} htmlType='submit'>บันทึก</button>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <br />
        </div>

      </div>
    </Form>

  )
}

export default ArresForm
