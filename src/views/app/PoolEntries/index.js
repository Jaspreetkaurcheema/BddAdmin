import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import PoolEntriesTable from './components/PoolEntriesTable'
import PoolsTableTools from './components/PoolEntriesTools'
import PoolsStatistic from './components/PoolsStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('poolsEntries', reducer)

const Customers = () => {
    const [selected, setSelected] = useState({})
    return (
        <>
            {/* <CustomerStatistic /> */}
            {/* <PoolsStatistic setSelectedCard={setSelected} selected={selected} /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
                <PoolsTableTools />
                <PoolEntriesTable setSelectedCard={setSelected} selected={selected} />
            </AdaptableCard>
        </>
    )
}

export default Customers
