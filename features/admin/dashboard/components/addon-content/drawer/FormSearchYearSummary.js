import React, { useCallback, useMemo, useRef } from "react";
import { Form, Field, useForm } from "@/components/form";
import dayjs from "dayjs";

const FormSearchYearSummary = (props) => {
  const { apiGetData } = props;
  const submitRef = useRef();
  const yearOption = [
    { label: "ทั้งหมด", value: '' },
    { label: "ปีปัจจุบัน", value: '0' },
  ];
  for (let index = 1; index <= 10; index++) {
   yearOption.push( { label: `ย้อนหลัง ${index} ปี ( ${new Date().getFullYear() + 543 - index} - ${new Date().getFullYear() + 543 } )`, value: index },)
  }
  const form = useForm({
    initialValues: {
      previous_year:'',
    },
    rules: {},
  });

  const { handlerChange } = form;

  const onChangeYearSummary = useCallback(async (name, value) => {
    await handlerChange({
      [name]: value,
    });
    await submitRef.current?.click();
  }, []);

  const buildValue = useCallback((values, next) => {
    const body = values;
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    apiGetData(values);
  }, []);

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Field.Select
        label="เลือกปี"
        name="previous_year"
        placeholder="ทั้งหมด"
        optKeys={["value", "label"]}
        options={yearOption}
        allowClear
        // SEARCHABLE
        onChange={onChangeYearSummary}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        hideRequired
      />
      <button ref={submitRef} type="submit" hidden />
    </Form>
  );
};

export default React.memo(FormSearchYearSummary);
