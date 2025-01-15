import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    const [selected, setSelected] = useState({})
    return (
        <>
            {/* <CustomerStatistic /> */}
            <CustomerStatistic setSelectedCard={setSelected} selected={selected} />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable setSelectedCard={setSelected} selected={selected} />
            </AdaptableCard>
        </>
    )
}

export default Customers
