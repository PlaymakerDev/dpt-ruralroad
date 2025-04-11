import React, { useCallback, useContext } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from 'next/router';
import { FormSearchNew } from "../../screen";

const FormSearchStationary = (props) => {
  // const { formSearch, setFormSearch, localVehicleMenuTab, setLocalVehicleMenuTab } = useContext(FormSearchNew);

  const { initialValues, apiGetData, clearData, station, setOpen, formSearch } = props;
  const { setFormSearch } = useContext(FormSearchNew);
  const { query } = useRouter();
  const router = useRouter();

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
      plan_year: query.plan_year ? dayjs(query.plan_year, 'YYYY') : reportYear(),
      start_date: query.start_date ? dayjs(query.start_date, 'YYYY-MM-DD') : dayjs(),
      end_date: query.end_date ? dayjs(query.end_date, 'YYYY-MM-DD') : dayjs(),
      station_id: Number(query.station_id)
    },
    rules: {},
  });

  const { handlerReset, handlerChange } = form;

  const buildValue = useCallback((values, next) => {
    const body = {
      plan_year: values.plan_year ? dayjs(values.plan_year).format('YYYY') : '',
      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
      ...(values?.station_id && { station_id: values.station_id }),
    };
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    setFormSearch({
      ...values,
      page: 1
    });

    apiGetData(`/api/v1/info/weight_arrest/station`, {
      ...values,
      page: 1,
      page_size: initialValues.page_size,
      order: 'ASC'
    }, false, {});


  }, [apiGetData, initialValues, setFormSearch]);

  const handlerClear = useCallback(async () => {
    await router.replace({
      pathname: '/admin/information/overweight-vehicle/overview',
      query: { type: query.type },
    });
    handlerChange({
      plan_year: reportYear(),
      start_date: dayjs(),
      end_date: dayjs(),
      station_id: '',
    });
    setFormSearch({
      plan_year: reportYear().format('YYYY'),
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      station_id: '',
      page: 1,
    })
    clearData();

  }, [handlerChange, clearData]);


  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='ปีงบประมาณ'
              name='plan_year'
              placeholder='ปีงบประมาณ'
              picker='year'
              format='BBBB'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='จากวันที่'
              name='start_date'
              placeholder='จากวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='ถึงวันที่'
              name='end_date'
              placeholder='ถึงวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.Select
              label='สถานี'
              name='station_id'
              placeholder='ทั้งหมด'
              optKeys={['station_id', 'station_name']}
              options={station.all}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={2}>
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
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="button"
                type='text'
                size='large'
                className='!w-full'
                onClick={handlerClear}

              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default React.memo(FormSearchStationary);
