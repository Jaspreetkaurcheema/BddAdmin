import React, {useCallback} from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'
injectReducer('crmOrganizers', reducer)

const Customers = () => {
    const navigate=useNavigate()
    const onView = useCallback(() => {
        const newTab = window.open(`https://app.giuteamconnect.com/register`, '_blank');
        newTab.focus(); // Optional: bring the new tab to focus
    }, []);
    return (
        <>
            {/* <CustomerStatistic /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
            <div className='flex justify-end w-full mb-4'>
                    <Button variant="solid" onClick={onView}>
                        Register
                    </Button>
                </div>
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
