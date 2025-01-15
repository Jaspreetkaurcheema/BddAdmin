import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmPools', reducer)

const Customers = () => {
    const [selected, setSelected] = useState({})

    console.log('abc123', selected);

    return (
        <>
            <CustomerStatistic setSelectedCard={setSelected} selected={selected} />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools setSelectedCard={setSelected} selected={selected}/>
                <CustomersTable setSelectedCard={setSelected} selected={selected}/>
            </AdaptableCard>
        </>
    )
}

export default Customers
