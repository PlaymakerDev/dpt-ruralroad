import React, { useCallback } from 'react'
import { Form, Field, useForm } from '@/components/form'
import { useWIMContext } from '../../context'
// import { name } from 'dayjs/locale/th'

const FormSearchWIMDashboard = (props) => {
  const { refSubmit, stationId } = props
  const { onSubmit } = useWIMContext()

  const form = useForm({
    initialValues: {
      year_budget: 'day'
    },
    rules: {}
  })

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    onSubmit(values, stationId)
  }, [stationId])

  const onChangeYearBudget = useCallback(async (name, value) => {
    await handlerChange({
      [name]: value
    })
    await refSubmit.current.click()
  }, [])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Field.Select
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
      />
      <button type='submit' hidden ref={refSubmit} />
    </Form>
  )
}

export default React.memo(FormSearchWIMDashboard)
