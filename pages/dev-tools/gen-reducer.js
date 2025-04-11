import React from 'react'
import { Input, Button } from 'antd'

const GenReducer = () => {
  return (
    <div>
      <form action={'/api/dev-tools/gen-reducer'} method='POST'>
        <label>Name</label>
        <Input name='name' />

        <Button htmlType='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default GenReducer
