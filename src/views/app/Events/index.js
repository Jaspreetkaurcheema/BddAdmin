import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'
import { HiPlusCircle } from 'react-icons/hi'
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import useQuery from 'utils/hooks/useQuery'

injectReducer('appEvents', reducer)

const Customers = () => {
    const navigate = useNavigate()
    const query = useQuery()
    const id=query.get('id')
   console.log(id,'gggg')
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className='flex justify-end w-full mb-4'>
                    {/* <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={() => { navigate('/app/apps/Addpoolevents') }}>
                        Add Pool Event
                    </Button> */}


                </div>
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
