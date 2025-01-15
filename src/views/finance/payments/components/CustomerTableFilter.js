import React from 'react'
import { Select, Badge } from 'components/ui'
import { setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'

const { Control } = components

const option = [
    { value: 1, label: 'All', color: 'bg-gray-500' },
    { value: 2, label: 'Growth donation', color: 'bg-emerald-500' },
    { value: 3, label: 'Purchased with donation', color: 'bg-red-500' },
    { value: 4, label: 'Purchased without donation', color: 'bg-red-500' },
]

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
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

const CustomerTableFilter = () => {
    const dispatch = useDispatch()
    const { paymentType }  = useSelector(
        (state) => state.crmCustomers.data.filterData
    )
  

    const onStatusFilterChange = (selected) => {
        dispatch(setFilterData({ paymentType: selected.value }))
    }

    return (
        <Select
            options={option}
            size="sm"
            className="mb-4 min-w-[130px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={option.filter((option) => option.value == paymentType)}

        />
    )
}

export default CustomerTableFilter
