import React, { useEffect, useState } from 'react'
import { Select, Badge } from 'components/ui'
import { setFilterData, setRoundData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import { apiGetRegion, apiGetRound, apiGetSeason, apiGetSport } from 'services/SalesService'
import useQuery from 'utils/hooks/useQuery'

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

const PoolRoundFilter = ({setData = {}, selectedPools } ) => {
    const dispatch = useDispatch()
    const query = useQuery()
    const [pools, setPools] = useState(null);
    const [region, setRegion] = useState(null);
    const { season, eventfilterType, filterType, poolType } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )
    const {roundId,regionId} = useSelector(
        (state) => state.poolEventDetails.data.roundData
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetRound(query.get('id'));
                const response1 = await apiGetRegion();
                console.log(response.data.data.data, 'response.data.data')
                setPools(response.data.data.data);
                setRegion(response1.data.data)
            } catch (error) {
                console.error('Error fetching pools:', error);
                // Handle error
            }
        };

        fetchData();
        dispatch(setRoundData({roundId:null,regionId :null}))
    }, []);
    const onStatusFilterChange = (selected) => {
        console.log(selected.value, 'valueeee')
        dispatch(setRoundData({roundId:null,regionId :selected.value}))
        dispatch(setFilterData({ season, filterType, eventfilterType, sportId: null, poolType }))
    }
    const onStatusFilterChanges = (selected) => {
        console.log(selected.value, 'valueeee')
        dispatch(setRoundData({roundId:selected.value,regionId :null}))
        dispatch(setFilterData({ season, filterType, eventfilterType, sportId: null, poolType }))
    }

    console.log(selectedPools, 'selectedPool21')

    return (
        <>
        {
        query.get('id') == "8" ?
        selectedPools == 'teams'?
        <Select
            options={region?.map(item => ({ value: item.id, label: item.name }))}
            size="sm"
            className="mb-4 min-w-[20px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={region?.map(item => ({ value: item.id, label: item.name })).filter((option) => option.value === regionId)}
        /> :
        <Select
            options={pools?.map(item => ({ value: item.id, label: item.name }))}
            size="sm"
            className="mb-4 min-w-[20px]"
            onChange={onStatusFilterChanges}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={pools?.map(item => ({ value: item.id, label: item.name })).filter((option) => option.value === roundId)}
        />:

        selectedPools == 'teams'?
        <Select
        options={region?.map(item => ({ value: item.id, label: item.name }))}
        size="sm"
        className="mb-4 min-w-[20px]"
        onChange={onStatusFilterChange}
        components={{
            Option: CustomSelectOption,
            Control: CustomControl,
        }}
        value={region?.map(item => ({ value: item.id, label: item.name })).filter((option) => option.value === regionId)}
    />:<></>
        }
            

              

            


        </>


    )
}

export default PoolRoundFilter
