import React from 'react'
import BackgroundImage from '/Background_image.png'

function Background() {
  return (
    <section className='w-full bg-cover'>
        <img src={BackgroundImage} alt="Yashly background image" />
    </section>
  )
}
export {Background}
