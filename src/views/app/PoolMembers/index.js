import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import PoolsMembers from './components/PoolMembers'
import PoolMembersTools from './components/PoolMembersTools'
import PoolsStatistic from './components/PoolsStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('poolsMembers', reducer)

const Customers = () => {
    const [selected, setSelected] = useState({})
    return (
        <>
            {/* <CustomerStatistic /> */}
            {/* <PoolsStatistic setSelectedCard={setSelected} selected={selected} /> */}
            <AdaptableCard className="h-full" bodyClass="h-full">
                <PoolMembersTools />
                <PoolsMembers setSelectedCard={setSelected} selected={selected} />
            </AdaptableCard>
        </>
    )
}

export default Customers
