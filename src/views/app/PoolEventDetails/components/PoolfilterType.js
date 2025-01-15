import React, { useState } from 'react'
import { Select, Badge } from 'components/ui'
import { getCustomers, setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import { useEffect } from 'react'
import { apiGetSeason, apiGetSport } from 'services/SalesService'
import { setTableData } from 'views/app/Events/store/dataSlice'
import useQuery from 'utils/hooks/useQuery'

const { Control } = components

const options = [
    { value: 1, label: 'All', color: 'bg-gray-500' },
    { value: 2, label: 'Active', color: 'bg-emerald-500' },
    { value: 3, label: 'Deleted', color: 'bg-red-500' },
]


const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {

    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${isSelected
                ? 'bg-gray-100 dark:bg-gray-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                {data.color ? <Badge innerClass={data.color} /> : <></>}

                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}


const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]

    console.log(selected,'jhjjsdjfjdhd')
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    innerClass={selected.color}
                />
            )}
            {children}
        </Control>
    )
}

const CustomerTableFilter = () => {
    const dispatch = useDispatch()
    const query = useQuery()
    const { filterType, eventfilterType, poolType } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )
    const { season } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )

    const { sportId } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )

    const data = useSelector((state) => state)

    console.log(filterType, 'filterType12')



    useEffect(() => {
        dispatch(setFilterData({ filterType, eventfilterType, poolType, sportId, season }))
        dispatch(setTableData({ pageSize: 25, search:'',    pageNumber: 1,    poolEventId:query.get('id')}) )
    
    }, [])

    const onStatusFilterChange = (selected) => {
        dispatch(setFilterData({ filterType: selected.value, eventfilterType, poolType, sportId, season }))
        dispatch(setTableData({ pageSize: 25, search:'',    pageNumber: 1,    poolEventId:query.get('id')}) )
        dispatch(getCustomers({ pageNumber :1 , pageSize:25, search: '', poolEventId: query.get('id'), season, filterType:selected.value, eventfilterType, poolType, sportId: null }))

    }

    const getSelectedKey = (selected) => {
        switch (selected.value) {
            case 1:
                return 'All';
            case 2:
                return 'Active';
            case 3:
                return 'Deleted';

        }
    }



    return (
        <>
            <Select
                options={options}
                size="sm"
                className="mb-4 min-w-[130px]"
                onChange={onStatusFilterChange}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={options.filter((option) => option.value === filterType)}
            />
        
    
        </>

    )
}

export default CustomerTableFilter