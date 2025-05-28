import React, { useCallback } from 'react'
import { Form, Field, useForm } from '@/components/form'
import dayjs from 'dayjs'
import { useDashboardContext } from '../context'
// import { name } from 'dayjs/locale/th'

const FormSearchDashboard = (props) => {
  const { refSubmit } = props
  const { onSubmit } = useDashboardContext()

  const form = useForm({
    initialValues: {
      date: dayjs()
    },
    rules: {}
  })

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    onSubmit(values)
  }, [])

  const onChangeDate = useCallback(async (name, value) => {
    await handlerChange({
      [name]: value
    })
    await refSubmit.current.click()
  }, [])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Field.DatePicker
        name='date'
        placeholder='วันที่'
        format={'DD MMMM BBBB'}
        className='!w-56'
        onChange={(name, value) => onChangeDate(name, value)}
        allowClear={false}
        hideRequired
      />
      {/* <Field.Select
        // label='เลือกปีงบประมาณ'
        name='year_budget'
        placeholder='เลือกการแสดงงบประมาณ'
        optKeys={['id', 'name']}
        options={[
          {
            id: 'day',
            name: 'รายวัน'
          },
          {
            id: 'month',
            name: 'รายเดือน'
          },
          {
            id: 'year',
            name: 'รายปี'
          },
        ]}
        allowClear={false}
        hideRequired
        // SEARCHABLE
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        className='!w-48'
        onChange={(name, value) => onChangeYearBudget(name, value)}
      /> */}
      <button type='submit' hidden ref={refSubmit} />
    </Form>
  )
}

export default React.memo(FormSearchDashboard)
