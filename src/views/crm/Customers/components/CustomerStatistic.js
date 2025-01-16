import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic, getCustomers, setFilterData, setTableData } from '../store/dataSlice'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = (props) => {

    const { icon, avatarClass, label, value, growthRate, loading, active = false, onClick } = props

    const avatarSize = 55

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

                </Loading>
            </Card>
        </div>
    )
}

const CustomerStatistic = ({ setSelectedCard, selected }) => {
    const dispatch = useDispatch()


    const { pageNumber, pageSize, usertype, search } = useSelector(
        (state) => state.crmUsers.data.tableData
    )
    // const total = useSelector((state) => state.crmCustomers.data.AllList.total_rows_count)

    const total = useSelector((state) => state.crmUsers.data.customerList.total_rows_count)
    const statisticData = useSelector(
        (state) => state.crmUsers.data
    )
    const totalActive = useSelector((state) => state.crmUsers.data.customerList.totalActiveUsers)
    const totalfunds = useSelector((state) => state.crmUsers.data.customerList?.totalfunds) || null
    const data = useSelector((state) => state)
    console.log(totalfunds, 'checking 22')
    const loading = useSelector(
        (state) => state.crmUsers.data.statisticLoading
    )
    const { filterType } = useSelector(
        (state) => state.crmUsers.data.filterData
    )

    useEffect(() => {
        if (selected?.key == 'Active') {
            // dispatch(setTableData({ pageNumber: 1, pageSize: 25, search: '', userType: 1 }))
            dispatch(setFilterData({ filterType: 1 }))
            // dispatch(getCustomers({ pageNumber, pageSize, usertype: 1, search, filterType: 1 }))
        }
        if (selected?.key == 'All') {
            // dispatch(setTableData({ pageNumber: 1, pageSize: 25, search: '', userType: 1 }))
            dispatch(setFilterData({ filterType: 0 }))
            // dispatch(getCustomers({ pageNumber, pageSize, usertype: 1, search, filterType: 0 }))
        }
        
    }, [selected?.key,filterType])

    // useEffect(()=>{
    //     setPageNo(pageNumber)
    // },[pageNumber])



    const handleCreatedPoolsClick = (key) => {
        setSelectedCard({ data, key })
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                active={selected?.key === 'All'}
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Total Users"
                value={total}
                growthRate={statisticData?.totalCustomers?.growShrink}
                loading={loading}
                onClick={() => handleCreatedPoolsClick('All')}
            />
            <StatisticCard
                active={selected?.key === 'Active'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Active Users"
                value={totalActive}
                growthRate={statisticData?.activeCustomers?.growShrink}
                loading={loading}
                onClick={() => handleCreatedPoolsClick('Active')}
            />
            <StatisticCard
                //  active={selected?.key === 'Active'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Total Funds"
                value={totalfunds==null? <Loading loading={loading} />: "$" + totalfunds}
                // growthRate={statisticData?.activeCustomers?.growShrink}
                loading={loading}
            // onClick={()=>handleCreatedPoolsClick('Active')}
            />
            {/* <StatisticCard
                active={selected?.key === 'newCustomers'}
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="New Customers"
                value={statisticData?.newCustomers?.value}
                growthRate={statisticData?.newCustomers?.growShrink}
                loading={loading}
                onClick={() => handleCreatedPoolsClick('newCustomers')}
            /> */}
        </div>
    )
}

export default CustomerStatistic
