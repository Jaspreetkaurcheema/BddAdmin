import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import { Button } from 'components/ui'
import reducer from './store'
import { useNavigate } from 'react-router-dom'
injectReducer('crmCharges', reducer)

const Customers = () => {
    const navigate=useNavigate()
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className='flex justify-end w-full mb-4'>
                    <Button variant="solid" onClick={()=>{navigate('/app/finance/addCharges')}}>
                        Update Charges
                    </Button>
                </div>
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
