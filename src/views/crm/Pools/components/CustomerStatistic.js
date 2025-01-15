import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic, getPools, setFilterData, setFiltersData, setTableData } from '../store/dataSlice'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import { number } from 'yup'
import { Select, Badge } from 'components/ui'
import Total from 'components/ui/Pagination/Total'

const StatisticCard = (props) => {

    const { icon, avatarClass, label, value, value1, growthRate, loading, active = false, onClick } = props

    const avatarSize = 55
    const { Option } = Select;

    return (
        <div className={(active ? 'bg-indigo-300 rounded-lg text-white  border-white' : '') + '  cursor-pointer'}>
            <Card bordered onClick={onClick} active={active} className='bg-transparent ' >
                <Loading
                    loading={loading}
                    customLoader={
                        <MediaSkeleton
                            avatarProps={{
                                className: 'rounded',
                                width: avatarSize,
                                height: avatarSize,
                            }}
                        />
                    }
                >
                    {/* <div className="nflex justify-between items-ceter"> */}
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3 className={(active ? ' text-white ' : '') + '  cursor-pointer'}>

                                {value}


                            </h3>
                        </div>
                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
                    {/* <Select className="mt-5 " style={{ width: '100%' }} defaultValue="Select an option" onChange={(selectedValue) => console.log(selectedValue)}>
                        <Option value="option1">Option 1</Option>
                        <Option value="option2">Option 2</Option>
                        <Option value="option3">Option 3</Option>
                    </Select> */}

                </Loading>
            </Card>
        </div>






    )
}
const StatisticCards = ({ selectedSport, setSelectedSport, ...props }) => {
    const dispatch = useDispatch()
    const { icon, avatarClass, label, value, value1, growthRate, loading, active = false, onClick } = props

    const avatarSize = 55
    const { Option } = Select;
    // const [selectedSport, setSelectedSport] = useState('');
    const { pageNumber, pageSize, poolEventId, sort, search } = useSelector(
        (state) => state.crmPools.data.tableData
    )
    const { season, filterType, eventfilterType, poolType } = useSelector(
        (state) => state.crmPools.data.filterData
    )
    const handleSportChange = (event) => {
        console.log(event.target.value, 'event.target.value')
        setSelectedSport(event.target.value);
        dispatch(setTableData({ pageNumber: 1, pageSize, search: '', poolEventId: event.target.value ? event.target.value : null }))
        dispatch(getPools({ pageNumber, pageSize, poolEventId: event.target.value ? event.target.value : null, search, filterType, eventfilterType, poolType, sportId: null, season }));
        // You can perform any additional actions here based on the selected sport
    };

    console.log(selectedSport, 'jhdfdjfhsdfkjdf')


    const statisticData = useSelector(
        (state) => state.crmPools.data.statisticData.data)

    return (
        <div className={(active ? 'bg-indigo-300 rounded-lg text-white  border-white' : '') + '  cursor-pointer'}>
            <Card bordered onClick={onClick} active={active} className='bg-transparent ' >
                <Loading
                    loading={loading}
                    customLoader={
                        <MediaSkeleton
                            avatarProps={{
                                className: 'rounded',
                                width: avatarSize,
                                height: avatarSize,
                            }}
                        />
                    }
                >
                    {/* <div className="nflex justify-between items-ceter"> */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar
                                className={avatarClass}
                                size={avatarSize}
                                icon={icon}
                            />
                            <div>
                                <span>{label}</span>
                                <h3 className={(active ? ' text-white ' : '') + '  cursor-pointer'}>

                                    {value}


                                </h3>
                            </div>
                        </div>
                        {/* <div className='w-100'>
                            <form class="max-w-sm mx-auto">
                                {/* <label for="large" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Large select</label> */}
                        {/* <select id="large" class="block w-full px-6 py-2 font-extrabold text-base text-gray-900rounded-lg bg-gray-50 focus:ring-blue-500  focus:outline-0 outline-none  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="US">NFL Football </option>
                                    <option value="CA">Basketball</option>
                                    <option value="FR">Cards</option>
                                    <option value="DE"> hockey</option>
                                </select> */}
                        {/* <select
                                    id="large"
                                    className="block w-full px-6 py-2 font-extrabold text-base text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-0 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    {statisticData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.sportName}
                                        </option>
                                    ))}
                                </select> */}

                        {/* </form> */}


                        {/* </div> */}

                        <div className="your-container">
                            <select
                                id="large"
                                className={selectedSport == '' || selectedSport == null ? "block w-full px-6 py-2 font-extrabold text-base text-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-0 outline-none dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "block w-full px-6 py-2 font-extrabold text-base text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-0 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                value={selectedSport}
                                onChange={handleSportChange}
                            >
                                <option value=''>Select Event</option> {/* Corrected value here */}

                                {statisticData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.sportName + " - " + item.poolTypeName + " - " + item.eventName}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}

                </Loading>
            </Card>
        </div>






    )
}



const CustomerStatistic = ({ setSelectedCard, selected }) => {
    const dispatch = useDispatch()
    const [selectedSport, setSelectedSport] = useState(null);
    const { pageNumber, pageSize, poolEventId, sort, search } = useSelector(
        (state) => state.crmPools.data.tableData
    )
    const { filterType, eventfilterType, poolType, sportId } = useSelector(
        (state) => state.crmPools.data.filterData
    )
    console.log(selectedSport, 'selectedSport12')
    // const total = useSelector((state) => state.crmPools.data.AllList.total_rows_count)

    const total = useSelector((state) => state.crmPools.data.customerList.totalRows)

    const { season } = useSelector(
        (state) => state.crmPools.data.filterData
    )

    const statisticData = useSelector(
        (state) => state.crmPools.data.statisticData.data)
    console.log(statisticData, 'stststst212', selectedSport)
    let eventname = statisticData?.find(event => event.id == selectedSport)
    console.log(eventname, 'gdhjdfhjkdsf')

    const totalActive = useSelector((state) => state.crmPools.data.customerList.
        totalActivepools
    )
    const totalLivepools = useSelector((state) => state.crmPools.data.customerList.
        totalLivepools
    )

    const data = useSelector((state) => state)

    const loading = useSelector(
        (state) => state.crmPools.data.statisticLoading
    )

    useEffect(() => {
        dispatch(getCustomerStatistic())
        if (selected?.key == 'Active') {
            dispatch(setTableData({ pageNumber: 1, pageSize, search: '', poolEventId }))
            dispatch(setFilterData({ filterType:2, eventfilterType:4, poolType, sportId, season }))
            dispatch(getPools({ pageNumber, pageSize, poolEventId, search, filterType:2, eventfilterType:4, poolType, sportId, season }))
        }
        // if (selected?.key == 3 || selected?.key == 8 || selected?.key == 12) {
        //     dispatch(setFilterData({ filterType: 2, eventfilterType: 1, poolType: 1 }))

        //     dispatch(getCustomers({ pageNumber, pageSize, poolEventId: selected?.key, search, filterType: 2, eventfilterType: 1, poolType: 1, sportId: null ,season}));
        // } 
        if (selected?.key == 'All') {
            dispatch(setTableData({ pageNumber: 1, pageSize, search: '', poolEventId }))
            dispatch(setFilterData({ filterType: 1, eventfilterType: 1, poolType: 1, sportId: null }))

            dispatch(getPools({ pageNumber, pageSize, poolEventId, search, filterType: 1, eventfilterType: 1, poolType: 1, sportId: null, season }))

        }
        if (selected?.key == 'Live') {
            dispatch(setTableData({ pageNumber: 1, pageSize, search: '', poolEventId }))
            dispatch(setFilterData({ filterType, eventfilterType: 1, poolType, sportId, season }))

            dispatch(getPools({ pageNumber, pageSize, poolEventId, search, filterType, eventfilterType: 1, poolType, sportId, season }))
        }
    }, [selected?.key])

    // useEffect(() => {
    //     console.log({ pageNumber, pageSize, poolEventId, filterType,search } ,"{ pageNumber, pageSize, poolEventId, filterType,search }");
    //     dispatch(getCustomerStatistic()); // Always fetch statistic data
    //     if (selected?.key === 'Active') {
    //         console.log("Seelelelelelelle", selected,pageNumber,{ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 } )
    //         dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 }));
    //     } else if (selected?.key === 3 || selected?.key === 8 || selected?.key === 12) {
    //         console.log("Seelelelelelelle1", selected,pageNumber , { pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 } )
    //         dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: selected?.key, search, filterType: 2 }));
    //     } else if(selected?.key == 'All'){
    //         console.log("Seelelelelelelle2", selected,{ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 } )
    //         dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 1 }));
    //     }
    // }, [selected?.key]);

    // useEffect(() => {
    //     console.log({ pageNumber, pageSize, poolEventId, filterType,search } ,"{ pageNumber, pageSize, poolEventId, filterType,search }");
    //     dispatch(getCustomerStatistic()); // Always fetch statistic data
    //     if (selected?.key === 'Active') {
    //         console.log("Seelelelelelelle", selected,pageNumber )
    //         dispatch(getCustomers({ pageNumber, pageSize, poolEventId: 3, search, filterType: 2 }));
    //     } else if (selected?.key === 3 || selected?.key === 8 || selected?.key === 12) {
    //         console.log("Seelelelelelelle1", selected,pageNumber )
    //         dispatch(getCustomers({ pageNumber, pageSize, poolEventId: selected?.key, search, filterType: 2 }));
    //     } else if(selected?.key == 'All'){
    //         console.log("Seelelelelelelle2", selected )
    //         dispatch(getCustomers({ pageNumber, pageSize, poolEventId: 3, search, filterType: 1 }));
    //     }
    // }, [pageNumber, pageSize, search, filterType]);












    const handleCreatedPoolsClick = (key) => {
        console.log(key, 'pooleventpoolevent')
        setSelectedCard({ data, key })
    };

    return (
        <div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-6 ">
                {/* <div  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-6"> */}


                <div>
                    <StatisticCards
                        selectedSport={selectedSport}
                        setSelectedSport={setSelectedSport}
                        // active={selected?.key === 'Live'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label={"Total Pools"}
                        value={total}
                        growthRate={statisticData?.activeCustomers?.growShrink}
                        loading={loading}
                    // onClick={() => handleCreatedPoolsClick('Live')}
                    />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-2 gap-4 mb-6 ">


                    {/* <StatisticCard
                    active={selected?.key === 'All'}
                    icon={<HiOutlineUserGroup />}
                    avatarClass="!bg-indigo-600"
                    label="Total Pools"
                    value={total}
                    growthRate={statisticData?.totalCustomers?.growShrink}
                    loading={loading}
                    onClick={() => handleCreatedPoolsClick('All')}
                         /> */}
                    <StatisticCard
                        active={selected?.key === 'Active'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Active Pools"
                        value={totalActive}
                        growthRate={statisticData?.activeCustomers?.growShrink}
                        loading={loading}
                        onClick={() => handleCreatedPoolsClick('Active')}
                    />
                    <StatisticCard
                        active={selected?.key === 'Live'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Live Pools"
                        value={totalLivepools}
                        growthRate={statisticData?.activeCustomers?.growShrink}
                        loading={loading}
                        onClick={() => handleCreatedPoolsClick('Live')}
                    />
                </div>
            </div>

        </div>




    )


}

export default CustomerStatistic