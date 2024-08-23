import React from 'react'
import { MainContent } from '../components/content'

const PreviewScreen = (props) => {
  const { id } = props

  return (
    <section>
      <MainContent />
    </section>
  )
}

export default React.memo(PreviewScreen)
