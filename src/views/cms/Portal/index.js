import React, { useEffect, useState }  from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'
injectReducer('crmPortal', reducer)

const Customers = () => {
    const navigate=useNavigate()
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className='flex justify-end w-full mb-4'>
                    <Button variant="solid" onClick={()=>{navigate('/app/finance/addPortal')}}>
                        Add Portal Video
                    </Button>
                </div>
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
