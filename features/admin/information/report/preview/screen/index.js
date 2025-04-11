import React from 'react'
import { MainContent } from '../components/content'

const PreviewScreen = (props) => {
  const { id, description } = props

  return (
    <section>
      <MainContent
        id={id}
        description={description}
      />
    </section>
  )
}

export default React.memo(PreviewScreen)
