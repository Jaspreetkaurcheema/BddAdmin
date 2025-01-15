import React, { useEffect, useRef } from 'react'
import { Button } from 'components/ui'
// import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'

import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
// import { getCustomers, setFilterData, setTableData } from 'views/crm/Customers/store/dataSlice'

import PoolFilter from './PoolFilter'
import PoolRoundFilter from './PoolRoundFilter'
import { getCustomers, getPoolEventDetails, getPoolTeamDetails, setFilterData, setRoundData, setTableData } from '../store/dataSlice'
import useQuery from 'utils/hooks/useQuery'
import CustomerTableFilter from './PoolfilterType'
// import { getPoolMembers,getCustomers,setTableData } from '../store/dataSlice'

const CustomersTableTools = ({ setData = {}, selectedPool  }) => {
    const query = useQuery()
    const dispatch = useDispatch()
console.log(selectedPool,'selectedselected12323')
    const inputRef = useRef()

    const tableData = useSelector((state) => state.poolEventDetails?.data.tableData)
console.log(tableData,'tableDatatableData')
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
    }, [selectedPool])
    const selectedKey = (data) => {
        if (selectedPool == 'pools') return dispatch(getCustomers(data))
            // dispatch(getCustomers({ pageNumber, pageSize, search: '', poolEventId: id, season, filterType, eventfilterType, poolType, sportId: null }))

        if (selectedPool == 'games') return  dispatch(getPoolEventDetails(data))
         
        
        if (selectedPool == 'teams') return  dispatch(getPoolTeamDetails(data))
           
            // dispatch(setTableData({ pageNumber: 1, pageSize: 10, poolId: id, search: '' }))

        
        // if (selected?.key == 'Pool Members') return dispatch(getPoolMembers(data))


        // if (selected?.key == 'Pool Requests') dispatch(getPoolMembers(data))

        // if (selected?.key == 'Pool Leaders') return dispatch(getPoolLeader(data))

        // else return dispatch(getPoolAnalytic(data))


    }
    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(selectedKey(data))

        // dispatch(getPoolMembers(data))
        // dispatch(getCustomers(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = ''
        inputRef.current.value = ''
        dispatch(setRoundData({roundId:null,regionId :null}))
        dispatch(setFilterData({ season: null, filterType:2,eventfilterType:4, sportId:null, poolType:null}))

        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {
                    selectedPool == 'pools'? <CustomerTableFilter/>:
                    selectedPool !== 'pools' && query.get('id') !== "3"  ? <PoolRoundFilter setData={setData} selectedPools={selectedPool} /> : <></>
                }

            </div>
            <div className="mb-4">

                <div className="md:flex items-center justify-between gap-4">


                    <div className="md:flex items-center justify-between gap-4">
                        <div className="mb-4">
                            <PoolFilter /></div>

                        <div className="mb-4 ">
                            <Button size="sm" onClick={onClearAll}>
                                Clear All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomersTableTools