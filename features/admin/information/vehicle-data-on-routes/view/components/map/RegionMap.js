import React from 'react'

const RegionMap = (props) => {
  const { } = props

  return (
    <figure className='rounded-lg h-full'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7961850.562943775!2d96.19554543607164!3d12.995989712473063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2z4Lib4Lij4Liw4LmA4LiX4Lio4LmE4LiX4Lii!5e0!3m2!1sth!2sth!4v1724125926554!5m2!1sth!2sth"
        width="100%"
        height="100%"
        frameborder="0"
        // style={{ border: 0 }}
        className='rounded-lg border-0'
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
        loading="lazy"
      />
    </figure>
  )
}

export default React.memo(RegionMap)
