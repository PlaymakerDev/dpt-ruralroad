import React, { useCallback } from 'react'
import { useForm, Form } from '@/components/form'
import { DriverInformation, VehicleInformation, ArrestInformation, ImprisonmentInformation } from '../form'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const FormContent = (props) => {
  const { } = props
  const router = useRouter()

  const form = useForm({
    // DRIVER INFO
    name: '',
    house_no: '',
    village_no: '',
    alley: '',
    road: '',
    district: '',
    sub_district: '',
    province: '',
    // VEHICLE INFORMATION
    vehicle_model: '',
    tractor_unit_license_plate: '',
    tractor_unit_province: '',
    trailer_license_plate: '',
    trailer_province: '',
    // ARREST INFORMATION
    arrest_officer_name: '',
    arrest_witness_1: '',
    arrest_witness_2: '',
    delivery_witness: '',
    is_prosecution: false,
    incident_location: '',
    incident_location_district: '',
    incident_location_sub_district: '',
    incident_location_province: '',
    property_involved_value: '',
    is_in_review: false,
    ref_kk: '',
    copied_of_driver_license: '',
    driver_license_type: '',
    company_weight_cetificate: '',
    // IMPRISONMENT
    suspended_sentence_by_year: '',
    imprisonment_by_month: '',
    custody_by_month: '',
    probation_by_year: '',
    fine_by_baht: '',
    asset_forfeiture_list: '',
    case_number: '',
    case_number_date: ''
  })

  const { values, errors } = form

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <section>
        <DriverInformation />
      </section>
      {/* <section className='mt-5'>
        <VehicleInformation />
      </section> */}
      <section className='mt-5'>
        <ArrestInformation />
      </section>
      <section className='mt-5'>
        <ImprisonmentInformation />
      </section>
      <section className='mt-5 lg:text-right'>
        <div className='flex items-center flex-wrap gap-3 lg:justify-end'>
          <Button
            type='text'
            htmlType='button'
            size='large'
            className='!w-full lg:!w-auto'
            onClick={() => router.push('/admin/information/overweight-vehicle/overview')}
          >
            ยกเลิก
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className='!w-full lg:!w-auto'
          >
            บันทึก
          </Button>
        </div>
      </section>
    </Form>
  )
}

export default React.memo(FormContent)
