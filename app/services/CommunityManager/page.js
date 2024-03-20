import ServiceTemplate from '@/components/services/ServiceTemplate'
import CommunityManagerSection from '@/components/services/auxiliarComponents/CommunityManagerSection'
import React from 'react'

const CommunityManager = () => {
  return (
    <ServiceTemplate icon='/services/Jirafe6.svg' leftTitle='Dale vida a tu negocio'>
      <CommunityManagerSection/>
    </ServiceTemplate>
  )
}

export default CommunityManager