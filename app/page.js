import ImageEditor from '@/components/ImageEditor'
import Navbar from '@/components/Navbar'
import React from 'react'

function Home() {
  return (
    <div>Home
      <div>
        <Navbar/>
        <ImageEditor/>
      </div>
    </div>
  )
}

export default Home