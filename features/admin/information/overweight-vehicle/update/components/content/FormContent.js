import React, { useCallback, useContext } from "react";
import { useForm, Form } from "@/components/form";
import {
  DriverInformation,
  VehicleInformation,
  ArrestInformation,
  ImprisonmentInformation,
} from "../form";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import usePutAPI from "@/utils/hooks/api/usePutAPI";
import usePostAPI from "@/utils/hooks/api/usePostAPI";
import dayjs from "dayjs";

const FormContent = (props) => {
  const { id, data, extra, query } = props;
  const router = useRouter();
  const [apiPut, loadingPut] = usePutAPI("overlay");
  const [apiPost, loadingPost] = usePostAPI("overlay");

  const form = useForm({
    initialValues: {
      td_id: id || data?.td_id || '',
      driver_name: data?.driver_name || '',
      address_no: data?.address_no || '',
      moo: data?.moo || '',
      soi: data?.soi || '',
      road: data?.road || '',
      subdistrict: Number(data?.subdistrict) || '',
      district: Number(data?.district) || '',
      province: Number(data?.province) || '',
      officer1: data?.officer1 || '',
      officer2: data?.officer2 || '',
      witness1: data?.witness1 || '',
      witness2: data?.witness2 || '',
      witness_sender: data?.witness_sender || '',
      book_no: data?.book_no || '',
      police_station: data?.police_station || '',
      copy_lp_no: data?.copy_lp_no || '',
      driver_license_type: data?.driver_license_type || '',
      weight_slip_from_company: data?.weight_slip_from_company || '',
      process: data?.process === '1' ? [true] : [false],
      consider: data?.consider === '1' ? [true] : [false],
      asset_value: data?.asset_value || '',
      parole_year: data?.parole_year || '',
      jail_month: data?.jail_month || '',
      imprison_month: data?.imprison_month || '',
      probation_year: data?.probation_year || '',
      fine: data?.fine || '',
      sequestrate_list: data?.sequestrate_list || '',
      case_number: data?.case_number || '',
      case_date_time: data?.case_date_time ? dayjs(data?.case_date_time, 'DD/MM/YYYY') : '',
      // EXTRA
      police_station_province_id: Number(data?.police_station_province_id) || '',
      police_station_district_id: Number(data?.police_station_district_id) || '',
      police_station_subdistrict_id: Number(data?.police_station_subdistrict_id) || '',
      // IS ARREST
      is_arrested: extra?.is_arrested || '',
      //Vehicle Data From Table
      brand: data?.brand || '',
      lp_head_no: query?.lp_head_no || '-',
      lp_head_province_id: query?.lp_head_province_id == 0 ? 0 : Number(query?.lp_head_province_id) || null,
      lp_tail_no: query?.lp_tail_no || '-',
      lp_tail_province_id: Number(query?.lp_tail_province_id) || null,

      // brand: null || '',
      // lp_head_no: null || '-',
      // lp_head_province_id: null,
      // lp_tail_no: null || '-',
      // lp_tail_province_id: null,

    },
    rules: {},
    blackList: [ 'lp_head_no', 'lp_head_province_id', 'lp_tail_no', 'lp_tail_province_id']
  });

  const { handlerChange, values, errors } = form;

  const buildValue = useCallback((values, next) => {
    const submitValue = {
      check_value: {
        is_arrested: values.is_arrested
      },
      submit_value: {
        td_id: values.td_id,
        driver_name: values.driver_name,
        address_no: values.address_no,
        moo: values.moo,
        soi: values.soi,
        road: values.road,
        subdistrict: values.subdistrict,
        district: values.district,
        province: values.province,
        brand: values.brand,
        officer1: values.officer1,
        officer2: values.officer2,
        witness1: values.witness1,
        witness2: values.witness2,
        witness_sender: values.witness_sender,
        book_no: values.book_no,
        police_station: values.police_station,
        copy_lp_no: values.copy_lp_no,
        driver_license_type: values.driver_license_type,
        weight_slip_from_company: values.weight_slip_from_company,
        process: values.process[0] ? true : false,
        consider: values.consider[0] ? true : false,
        asset_value: values.asset_value,
        parole_year: values.parole_year,
        jail_month: values.jail_month,
        imprison_month: values.imprison_month,
        probation_year: values.probation_year,
        fine: values.fine,
        sequestrate_list: values.sequestrate_list,
        case_number: values.case_number,
        case_date_time: values.case_date_time ? dayjs(values.case_date_time).format("DD/MM/YYYY") : '',
        // EXTRA
        lp_head_no: values.lp_head_no,
        lp_head_province_id: values.lp_head_province_id,
        lp_tail_no: values.lp_tail_no,
        lp_tail_province_id: values.lp_tail_province_id,
        police_station_province_id: values.police_station_province_id,
        police_station_district_id: values.police_station_district_id,
        police_station_subdistrict_id: values.police_station_subdistrict_id
      }
    };
    next(submitValue);
  }, []);

  const handlerUpdate = useCallback(async (values, next) => {
    if (id && !!values.check_value.is_arrested) {
      const response = await apiPut(`/api/v1/info/arrest_logs/by_transaction/${id}`, values.submit_value, undefined, false);
      if (response?.success) {
        message.success("แก้ไขข้อมูลสำเร็จ");
        router.push({
          pathname: `/admin/information/overweight-vehicle/overview`,
          query: {
            ...router.query
          },
        })
      } else {
        message.error("ไม่สามารถแก้ไขข้อมูลได้");
      }
    } else {
      next(values);
    }
  }, [id, apiPut, router]);

  const handlerCreate = useCallback(async (values) => {
    const response = await apiPost(`/api/v1/info/arrest_logs`, values.submit_value, undefined, false);
    if (response?.success) {
      message.success("บันทึกข้อมูลสำเร็จ");
      router.push({
        pathname: `/admin/information/overweight-vehicle/overview`,
        query: {
          ...router.query
        },
      })
    } else {
      message.error("ไม่สามารถบันทึกข้อมูลได้");
    }
  }, [apiPost, router]);

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerUpdate, handlerCreate]}>
      <section>
        <DriverInformation
          values={values}
          errors={errors}
          handlerChange={handlerChange}
        />
      </section>
      <section className="mt-5">
        <VehicleInformation
          values={values}
          errors={errors}
          handlerChange={handlerChange}
        />
      </section>
      <section className="mt-5">
        <ArrestInformation
          values={values}
          errors={errors}
          handlerChange={handlerChange}
        />
      </section>
      <section className="mt-5">
        <ImprisonmentInformation
          values={values}
          errors={errors}
          handlerChange={handlerChange}
        />
      </section>
      <section className="mt-5 lg:text-right">
        <div className="flex items-center flex-wrap gap-3 lg:justify-end">
          <Button
            type="text"
            htmlType="button"
            size="large"
            className="!w-full lg:!w-auto"
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
            disabled={loadingPost || loadingPut}
          >
            ยกเลิก
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="!w-full lg:!w-auto"
            loading={loadingPost || loadingPut}
          >
            บันทึก
          </Button>
        </div>
      </section>
    </Form>
  );
};

export default React.memo(FormContent);
