import React, { useEffect, useState } from 'react'
import { Select, Badge } from 'components/ui'
// import { getCustomers, setFilterData, setTableData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import { setFilterData } from '../store/dataSlice'

const { Control } = components

const options = [
    { value: 1, label: 'Member' },
    { value: 2, label: 'Admin' },
    // { value: 3, label: 'Deleted', color: 'bg-red-500' },
]

const option = [
    { value: 1, label: 'All', color: 'bg-gray-500' },
    { value: 2, label: 'Growth donation', color: 'bg-emerald-500' },
    { value: 3, label: 'Purchased with donation', color: 'bg-red-500' },
    { value: 4, label: 'Purchased without donation', color: 'bg-red-500' },
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

    const [selectedOption, setSelectedOption] = useState(1);
    const { filter_type, paymentType } = useSelector(
        (state) => state.crmCustomerDetailss.data.filterHistory
    )
    console.log(selectedOption, 'selectedOption')
    const handleChange = (selectedOption) => {

        setSelectedOption(selectedOption);
        dispatch(setFilterData({ filter_type: selectedOption.value, paymentType }))



    };
    const handleFileterChange = (selectedOption) => {

        dispatch(setFilterData({ filter_type, paymentType: selectedOption.value }))


    };

    console.log(paymentType, 'vvvvvvvvv')
    console.log(filter_type, 'filter_type')
    useEffect(() => {
        dispatch(setFilterData({ filter_type: 1, paymentType :1}))
    }, [])
    const onStatusFilterChange = (selected) => {

        // dispatch(setFilterData({ filterType: selected.value }))
        // dispatch(setTableData({ pageNumber: 1, pageSize: 10, search: '', userType: 1 }))
        if (selected.value == 3) {
            setSelectedCard({})
        }
    }

    return (
        <>{selected.key == 'History' ? <Select
            options={options}
            size="sm"
            className="mb-4 min-w-[130px]"
            onChange={handleChange}
            defaultValue={options[0]}
        /> : <Select
            options={option}
            size="sm"
            className="mb-4 min-w-[220px]"
            onChange={handleFileterChange}
            value={option.filter((option) => option.value == paymentType)}

        />}</>

    )
}

export default CustomerTableFilter
