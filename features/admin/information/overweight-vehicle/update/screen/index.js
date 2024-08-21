import React from 'react'
import MainContent from '../components/content/MainContent'

const UpdateScreen = (props) => {
  const { id } = props

  return (
    <section>
      <MainContent/>
    </section>
  )
}

export default React.memo(UpdateScreen)
