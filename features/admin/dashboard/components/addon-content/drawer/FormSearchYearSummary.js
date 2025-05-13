import React, { useCallback, useMemo, useRef } from 'react'
import { Form, Field, useForm } from "@/components/form";
import dayjs from 'dayjs';

const FormSearchYearSummary = (props) => {
  const { apiGetData } = props
  const submitRef = useRef()

  const form = useForm({
    initialValues: {
      year_range: [dayjs(), dayjs()]
    },
    rules: {}
  })

  const { handlerChange } = form;

  const onChangeYearSummary = useCallback(async (name, value) => {
    await handlerChange({
      [name]: value
    })
    await submitRef.current?.click()
  }, [])

  const buildValue = useCallback((values, next) => {
    const body = {
      start_year: dayjs(values.year_range[0]).format('BBBB'),
      end_year: dayjs(values.year_range[1]).format('BBBB')
    }
    next(body)
  }, [])

  const handlerSubmit = useCallback((values) => {
    apiGetData(values)
  }, [])

  return (
    <Form
      form={form}
      handlerSubmit={[buildValue, handlerSubmit]}
    >
      <Field.RangePicker
        label='ปีงบประมาณ'
        name='year_range'
        placeholder={['เริ่มต้น', 'สิ้นสุด']}
        format={'BBBB'}
        picker='year'
        // SEARCHABLE
        hideRequired
        onChange={(name, value) => onChangeYearSummary(name, value)}
        allowClear={false}
      />
      <button ref={submitRef} type="submit" hidden />
    </Form>
  )
}

export default React.memo(FormSearchYearSummary)
