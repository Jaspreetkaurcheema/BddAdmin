import React, { useEffect, useState } from 'react'
import { Select, Badge } from 'components/ui'
import { setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import { apiGetSeason, apiGetSport } from 'services/SalesService'

const { Control } = components

const options = [
    { value: '', label: 'All', color: 'bg-gray-500' },
    { value: 'active', label: 'Active', color: 'bg-emerald-500' },
    { value: 'blocked', label: 'Blocked', color: 'bg-red-500' },
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
                {/* <Badge innerClass={data.color} /> */}
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
            {/* {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    // innerClass={selected.color}
                />
            )} */}
            {children}
        </Control>
    )
}

const PoolEventFilter = () => {
    const dispatch = useDispatch()
    const [pools, setPools] = useState(null);
    const {season ,eventfilterType,filterType,poolType} = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetSeason();
                setPools(response.data.data);
            } catch (error) {
                console.error('Error fetching pools:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    const onStatusFilterChange = (selected) => {
        console.log(selected.value,'valueeee')
        dispatch(setFilterData({ season: selected.value, filterType,eventfilterType, sportId:null, poolType}))
    }

console.log(pools,'poolspools')

    return (
        <Select
            options={pools?.map(item => ({ value: item.seasonYear, label: item.seasonYear }))}
            size="sm"
            className="mb-4 min-w-[15px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={pools?.map(item => ({ value: item.seasonYear, label: item.seasonYear })).filter((option) => option.value === season)}
        />
    )
}

export default PoolEventFilter
