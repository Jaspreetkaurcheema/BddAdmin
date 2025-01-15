import React, { useState } from 'react'
import { Select, Badge } from 'components/ui'
import { setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import { useEffect } from 'react'
import { apiGetSeason, apiGetSport } from 'services/SalesService'

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
const CustomSelectOptions = ({ innerProps, label, data, isSelected }) => {
    console.log(innerProps, 'labellldfdfkf')
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
const CustomControls = ({ children, ...props }) => {
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

    const { filterType, eventfilterType, poolType } = useSelector(
        (state) => state.crmPools.data.filterData
    )
    const { season } = useSelector(
        (state) => state.crmPools.data.filterData
    )
    const [pools, setPools] = useState(null);
    const { sportId } = useSelector(
        (state) => state.crmPools.data.filterData
    )

    const data = useSelector((state) => state)

    
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


    useEffect(() => {
        dispatch(setFilterData({ filterType, eventfilterType, poolType, sportId, season }))
        // dispatch(setFiltersData({eventfilterType: 1}))
        // dispatch(setPoolData({poolType:1 }))


    }, [])

    const onStatusFilterChange = (selected) => {
        // const key = getSelectedKey(selected);
        setSelectedCard({ data, selected })
        dispatch(setFilterData({ filterType: selected.value, eventfilterType, poolType, sportId, season }))
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
    // const onStatusFilterChanges = (selected) => {
    //     dispatch(setFilterData({ filterType: 2, eventfilterType: 2, poolType: 1, sportId: selected.value }))
    // }
    const onStatusFilterChanges = (selected) => {
        console.log(selected.value, 'valueeee')
        dispatch(setFilterData({ filterType, eventfilterType, poolType, sportId, season: selected.value }))

    }
    // const onFilterChange = (selected) => {

    //     console.log(selected.value,'sellele')
    //     dispatch(setFilterData({eventfilterType: selected.value }))
    // }
    // const onPoolChange = (selected) => {

    //     console.log(selected.value,'sellele')
    //     dispatch(setFilterData({poolType: selected.value }))
    // }

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
            <Select
                options={pools?.map(item => ({ value: item.seasonYear, label: item.seasonYear }))}
                size="sm"
                className="mb-4 min-w-[15px]"
                onChange={onStatusFilterChanges}
                components={{
                    Option: CustomSelectOptions,
                    Control: CustomControls,
                }}
                value={pools?.map(item => ({ value: item.seasonYear, label: item.seasonYear }))
                    .filter((option) => option.value == season)}
                placeholder="Season Year"
            />
            {/* <Select
                options={pools?.map(item => ({ value: item.id.toString(), label: item.name }))}
                size="sm"
                className="mb-4 min-w-[150px]"
                onChange={onStatusFilterChanges}
                components={{
                    Option: CustomSelectOption,
                    // Control: CustomControl,
                }}
                value={pools?.map(item => ({ value: item.id.toString(), label: item.name })).filter((option) => option.value === sportId)  }
            /> */}
            {/* <Select
                options={poolOptions}
                size="sm"
                className="mb-4 min-w-[130px]"
                onChange={onFilterChange}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={poolOptions.filter((option) => option.value === eventfilterType)}
            /> */}
            {/* <Select
                options={usertype}
                size="sm"
                className="mb-4 min-w-[130px]"
                onChange={onPoolChange}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={usertype.filter((option) => option.value === poolType)}
            /> */}
        </>

    )
}

export default CustomerTableFilter