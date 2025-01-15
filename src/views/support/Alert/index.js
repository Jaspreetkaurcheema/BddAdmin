import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'

import { injectReducer } from 'store/index'
import reducer from './store'
import CustomerStatistic from '../Customers/components/CustomerStatistic'
import CustomerTableFilter from './components/CustomerTableFilter'
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { HiPlusCircle } from 'react-icons/hi'
injectReducer('', reducer)

const Customers = () => {
    const navigate=useNavigate()
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className='flex justify-end w-full mb-4'>
                    {/* <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={()=>{navigate('/app/cms/addFaq')}}>
                        Add Faqs
                    </Button> */}
                </div>
                <CustomersTableTools />
                {/* <CustomerTableFilter/> */}
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
