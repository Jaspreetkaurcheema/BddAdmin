import React, { useEffect, useRef } from 'react'
import { Button } from 'components/ui'
// import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
// import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
// import { getCustomers, setFilterData, setTableData } from 'views/crm/Customers/store/dataSlice'
import CustomerTableFilter from 'views/crm/Customers/components/CustomerTableFilter'
import { getPoolMembers, getCustomers, setTableData, getPoolLeader, getPoolAnalytic } from '../store/dataSlice'
import PoolRoundFilter from './RoundFilter'

const CustomersTableTools = ({ setSelectedCard, selected }) => {

    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmCustomerDetails?.data.tableData)


    console.log(tableData,'tableer')
    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }
    useEffect(() => {
        inputRef.current.value = ''
    }, [selected.key])

    const selectedKey = (data) => {
        if (selected?.key == 'Pool Entries') return dispatch(getCustomers(data))


        if (selected?.key == 'Pool Members') return dispatch(getPoolMembers(data))


        if (selected?.key == 'Pool Requests') dispatch(getPoolMembers(data))

        if (selected?.key == 'Pool Leaders') return dispatch(getPoolLeader(data))

        else return dispatch(getPoolAnalytic(data))


    }
    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(selectedKey(data))

    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = ''
        inputRef.current.value = ''
        // dispatch(setFilterData({ filterType: 2 }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {selected?.key == 'Pool AnalyticList'?<PoolRoundFilter /> :<></> }
                {/* <CustomerTableFilter /> */}
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default CustomersTableTools
