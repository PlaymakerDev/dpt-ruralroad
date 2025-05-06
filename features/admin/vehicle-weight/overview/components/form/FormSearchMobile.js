import React, { useCallback, useMemo, useState, useContext} from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DateContext } from "../tab-content/MobileWeighingUnit";
import { getDepartment } from "@/store/features/masterSlice";
import { useAppSelector } from "@/store/hooks";

const FormSearchMobile = (props) => {
  const { setOpen, initialValues, apiGetData, clearData, department, dateRange } = props;
  const { setDateRange } = useContext(DateContext)
  // const departments = useAppSelector(state => state.master.departments.overview.data)

  const form = useForm({
    initialValues: {
      start_date: dayjs(dateRange[0]),
      end_date: dayjs(dateRange[1]),
      branch: ''
    },
    rules: {},
  });

  const { handlerReset, handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
      branch: values.branch ? Number(values.branch) : '',
      // branch: values.branch ? (values.branch).toString() : '',
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    setDateRange([values.start_date, values.end_date])
    apiGetData(`/api/v1/weight/mobile_master`, { ...values, page: 1, page_size: initialValues.page_size }, false, {})
  }, [initialValues, apiGetData, setDateRange]);

  const handlerClear = useCallback(() => {
    handlerChange({
      start_date: dayjs().startOf('month'),
      end_date: dayjs(),
      branch: ''
    })
    clearData()
  }, [handlerChange, clearData])

  // const options = useMemo(() => {
  //   const dropdown = departments?.map(item => {
  //     return {
  //       label: item.name,
  //       value: item.id
  //     }
  //   })
  //   return dropdown
  // }, [departments])

  const renderDepartment = useMemo(() => {
    let data = []
    if (!!department.all.data) {
      data = department.all.data?.map(item => ({
        ...item,
        id: String(item.id)
      }))
    }
    return data
  }, [department])

  // const updateData = department.all.data.data ? department.all.data.data.map(item => ({
  //   ...item,
  //   id: String(item.id)
  // })) : [];
  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={4}>
            <Field.DatePicker
              label='จากวันที่'
              name='start_date'
              placeholder='จากวันที่'
              format='DD MMMM BBBB'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={4}>
            <Field.DatePicker
              label='ถึงวันที่'
              name='end_date'
              placeholder='ถึงวันที่'
              format='DD MMMM BBBB'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={4}>
            <Field.Select
              label='หน่วยงาน'
              name='branch'
              placeholder='ทั้งหมด'
              optKeys={['id', 'name']}
              options={renderDepartment || []}
              // options={department.all.data || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={8} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="submit"
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                className='!w-full'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={8} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="button"
                type='text'
                size='large'
                className='!w-full'
                onClick={() => handlerClear()}
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8} className='2xl:!text-right'>
            <fieldset>
              <label className='block'>&nbsp;</label>
              <Button
                type='primary'
                size='large'
                icon={<PlusOutlined />}
                className='!w-full 2xl:!w-auto'
                onClick={() => setOpen({ open: true })}
              >
                เพิ่มข้อมูล
              </Button>
            </fieldset>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default React.memo(FormSearchMobile);
