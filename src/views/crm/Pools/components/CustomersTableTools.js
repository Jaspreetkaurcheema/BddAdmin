import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getPools, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import PoolFilter from './PoolFilter'

const CustomersTableTools = ({ setSelectedCard, selected }) => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmPools.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        newTableData.pageNumber = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {

        console.log(data, 'fdfdfdfdfdfdfdf')
        dispatch(setTableData(data))
        dispatch(getPools(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = ''
        inputRef.current.value = ''
        dispatch(setFilterData({
            season: null,
            filterType: 2,
            eventfilterType: 4,
            sportId: null,
            poolType: 0,
        }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter setSelectedCard={setSelectedCard} selected={selected} />
            </div>
            <div className="md:flex items-center justify-between gap-4">
                        <div className="mb-4">
                            <PoolFilter /></div>

                        <div className="mb-4 ">
                            <Button size="sm" onClick={onClearAll}>
                                Clear All
                            </Button>
                        </div>
                    </div>
            {/* <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div> */}
        </div>
    )
}

export default CustomersTableTools
