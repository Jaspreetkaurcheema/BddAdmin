import React, { useEffect } from 'react'
import { Select, Badge } from 'components/ui'
import { getCustomers, setFilterData, setTableData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'

const { Control } = components

const options = [
    { value: 0, label: 'All', color: 'bg-gray-500' },
    { value: 1, label: 'Active', color: 'bg-emerald-500' },
    { value: 2, label: 'Inactive', color: 'bg-red-500' },
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
                <Badge innerClass={data.color} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
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

const CustomerTableFilter = ({ setSelectedCard, selected }) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state)

    const { filterType } = useSelector(
        (state) => state.crmUsers.data.filterData
    )
    useEffect(() => {
        dispatch(setFilterData({ filterType: 0 }))
    }, [])
    const onStatusFilterChange = (selected) => {
        setSelectedCard({ data, selected })
        dispatch(setFilterData({ filterType: selected.value }))
        // dispatch(setTableData({ pageNumber: 1, pageSize: 10, search: '', userType: 1 }))
    }

    return (           
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
    )
}

export default CustomerTableFilter
