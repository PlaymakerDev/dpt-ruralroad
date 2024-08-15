import React from 'react'
import OspBreadcrump from '../components/OspBreadcrump'
import OspSearchbox from '../components/OspSearchbox'
import OpsTable from '../components/OpsTable'

const OrgSetupPlanScreen = () => {
  return (
    <>
      <main>
        <OspBreadcrump />
        <section className='min-h-screen'>
          <OspSearchbox /> 
          <OpsTable />
        </section>
      </main>
    </>
  )
}

export default OrgSetupPlanScreen