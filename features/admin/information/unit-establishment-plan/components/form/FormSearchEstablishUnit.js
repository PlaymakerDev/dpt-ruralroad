import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import { allowAdmin } from "@/utils/allowAdmin";

const FormSearchEstablishUnit = (props) => {
  const { initialValues, apiGetData, clearData, setOpen, department, role } = props;

  const reportYear = () => {
    const planDate = dayjs(`30/09/${dayjs().year()}`, 'DD/MM/YYYY');
    const currentDate = dayjs();
    if (currentDate.isAfter(planDate)) {
      return (dayjs().add(1, 'year'))
    } else {
      return (dayjs())
    }
  }

  const form = useForm({
    initialValues: {
      yearly_budget: reportYear(),
      department: '',
    },
    rules: {},
  });

  const { handlerReset, handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      plan_year: values.yearly_budget ? dayjs(values.yearly_budget).format('YYYY') : dayjs().format('YYYY'),
    };

    if (values.department) {
      body.department_id = Number(values.department);
    }

    next(body);
  }, []);


  const handlerSubmit = useCallback((values) => {
    apiGetData(`/api/v1/info/workplan_way`, { ...values, page: 1, page_size: initialValues.page_size, order: initialValues.order, year_type: initialValues.year_type }, false, {})
  }, [initialValues, apiGetData]);

  const handlerClear = useCallback(() => {
    handlerChange({
      yearly_budget: reportYear(),
      department: null,
    })
    clearData()
  }, [handlerChange, clearData])

  const updateData = department?.data?.map(item => ({
    ...item,
    id: String(item.id)
  }));

  return (
    <>
      {/* <Typography.Title level={5}>ค้นหา</Typography.Title> */}
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='ปีงบประมาณ'
              name='yearly_budget'
              placeholder='ปีงบประมาณ'
              hideRequired
              picker="year"
              format='BBBB'
              allowClear={false}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Field.Select
              label='หน่วยงาน'
              name='department'
              placeholder='หน่วยงาน'
              optKeys={['id', 'name']}
              options={updateData}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={3} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="submit"
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={3} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                type='text'
                size='large'
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
                onClick={() => handlerClear()}
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={4} xxl={10} className='lg:!text-right'>
            {/* {allowAdmin(role) && */}
              <fieldset>
                <label className='block'>&nbsp;</label>
                <Button
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  className='!w-full lg:!w-auto'
                  onClick={() => setOpen({ open: true, is_updatable: false, info: {} })}
                >
                  เพิ่มข้อมูล
                </Button>
              </fieldset>
             {/* } */}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default React.memo(FormSearchEstablishUnit);
