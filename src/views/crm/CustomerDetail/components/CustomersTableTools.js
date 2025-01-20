import React, { useEffect, useRef } from 'react'
import { Button } from 'components/ui'
// import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
// import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
// import { getCustomers, setFilterData, setTableData } from 'views/crm/Customers/store/dataSlice'
// import CustomerTableFilter from 'views/crm/Customers/components/CustomerTableFilter'
import { getAccomplishList, getActivePoolList, getEntiesList, getFeaturedPoolList, getHistoryList, getPaymentPoolList, getPoolList, setTableData } from '../store/dataSlice'
import CustomerTableFilter from './CustomerTableFilter'
import { functions } from 'lodash'
// import CustomerTableFilter from './CustomerTableFilter'
// import CustomerTableFilter from 'views/crm/Customers/components/CustomerTableFilter'

const CustomersTableTools = ({ setSelectedCard, selected }) => {

    console.log(selected.key, 'selectekdjfkfgljfgl')
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmCustomerDetailss?.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        newTableData.pageIndex = 10
        newTableData.pageNumber = 1

        

        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }
    const currentSelectedList = (data) => {
        if (selected.key === 'Created' || selected.key === 'Joined') return dispatch(getPoolList(data))
        // if (selected === 'Featured') return FeaturedList
        // if(selected === 'History') return HistoryList
        // if (selected === 'Accomplishment') return AccomplishList
        // if (selected === 'Entries') return EntriesList
        // if (selected === 'Payment') return PaymentList
        // else return activePoolList
    }

    const selectedKey = (data) => {

        // if (selected.key === 'Created' || selected.key === 'Joined') return getPoolList(data)
        // if (selected.key === 'Featured') return getFeaturedPoolList(data)
        // if (selected.key === 'History') return getHistoryList(data)
        // if (selected.key === 'Accomplishment') return getAccomplishList(data)
        // if (selected.key === 'Entries') return getEntiesList(data)
        // if (selected.key === 'Payment') return getPaymentPoolList(data)
        // else return getActivePoolList(data)
    }

    useEffect(() => {
        onClearAll()
    }, [selected.key])

    const functionCall = (value) => {
        const func = functions[value];
        if (func) {
            func();
        } else {
            console.log("Function not found");
        }
    };
    const fetchData = (data) => {
        dispatch(setTableData(data))
        // currentSelectedList(data)
        console.log("sjdkjsdk")
        dispatch(selectedKey(data))

        // dispatch(getPoolList(data))
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
                {selected.key == 'History' || selected.key == 'Payment'  ?
                  
                    <CustomerTableFilter setSelectedCard={setSelectedCard} selected={selected}/> :  <></>}

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
