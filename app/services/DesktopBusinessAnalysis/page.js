import DesktopTemplate from '@/components/services/DesktopTemplate'
import DesktopBusinessAnalysisSection from '@/components/services/auxiliarComponents/DesktopBusinessAnalysisSection'
import React from 'react'

const DesktopBusinessAnalysis = () => {
  return (
    <DesktopTemplate footerImg='/services/FooterJirafe1.svg' icon='/services/Jirafe4.svg' media='/MediaPlayer.svg' >
      <DesktopBusinessAnalysisSection/>
    </DesktopTemplate>
  )
}

export default DesktopBusinessAnalysis