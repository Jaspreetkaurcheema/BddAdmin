import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'

import { injectReducer } from 'store/index'
import reducer from './store'
import { Button } from 'components/ui'
import BackButton from 'views/default/buttons/Backbutton'
import { useNavigate } from 'react-router-dom'
import { HiPlusCircle } from 'react-icons/hi'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    const navigate=useNavigate()
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">

                {/* <div> <h2>Detail of Pool </h2></div> */}
                <div className='flex justify-end w-full mb-4'>
                    <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={()=>{navigate('/app/finance/addpromo')}}>
                        Add Promo Code
                    </Button>

               
                </div>



                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
