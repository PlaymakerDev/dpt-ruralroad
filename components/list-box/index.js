import React from 'react'

const ListBox = (props) => {
  const { title = '', children, ...containerProps } = props

  return (
    <div className='p-4 rounded-lg' {...containerProps}>
      <h1 className='text-xl font-bold'>{title}</h1>
      <section className='mt-3 h-44 flex flex-col gap-3 overflow-x-hidden overflow-auto'>
        {children}
      </section>
    </div>
  )
}

export default React.memo(ListBox)
