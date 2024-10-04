import About from '@/components/about/About'
import BasicTemplate from '@/components/BasicTemplate'
import React from 'react'

const AboutPage = () => {
  return (
    <BasicTemplate>
      <div className="w-full overflowX-hidden">
      <About/>
      </div>
    </BasicTemplate>
  )
}

export default AboutPage