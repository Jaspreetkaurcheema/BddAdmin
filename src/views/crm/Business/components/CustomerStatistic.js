import React, { useEffect } from 'react'
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

const CustomerStatistic = ({setSelectedCard,selected}) => {
    const dispatch = useDispatch()
    const { pageNumber, pageSize, usertype,filterType, search } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    const total = useSelector((state) => state.crmCustomers.data.customerList.totalRows)
    const active = useSelector((state) => state.crmCustomers.data.customerList.
    totalActiveUsers
    )
    const totalfunds = useSelector((state) => state.crmCustomers.data.customerList.
    totalfunds
    )  || null

    console.log(totalfunds,'totalfunds')
    const data = useSelector((state) => state.crmCustomers.data.customerList.users)
        
    const statisticData = useSelector(
        (state) => state.crmCustomers.data.statisticData
    )
    const loading = useSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )
    useEffect(() => {
        if (selected?.key == 'Active') {
          dispatch(setTableData( {pageNumber: 1,pageSize: 10,search: '',userType:2 }))
           dispatch(setFilterData({filterType:2}))
            dispatch(getCustomers({ pageNumber, pageSize, usertype: 2, search, filterType: 2 }))
        }  if (selected?.key == 'All') {
            dispatch(setTableData( {pageNumber: 1,pageSize: 10,search: '',userType:2 }))
            dispatch(setFilterData({filterType:1}))
            dispatch(getCustomers({ pageNumber, pageSize, usertype: 2, search, filterType: 1 }))

        }
    }, [selected?.key])

       const handleCreatedPoolsClick = (key) => {
        setSelectedCard({data,key})
    };
    // useEffect(() => {
    //     dispatch(getCustomerStatistic())
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    console.log(statisticData, 'statisticDatastatisticData')
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
        <StatisticCard
            active={selected?.key === 'All'}
            icon={<HiOutlineUserGroup />}
            avatarClass="!bg-indigo-600"
            label="Total Users"
            value={total}
            growthRate={statisticData?.totalCustomers?.growShrink}
            loading={loading}
            onClick={()=>handleCreatedPoolsClick('All')}
        />
        <StatisticCard
         active={selected?.key === 'Active'}
            icon={<HiOutlineUsers />}
            avatarClass="!bg-blue-500"
            label="Active Users"
            value={active}
            growthRate={statisticData?.activeCustomers?.growShrink}
            loading={loading}
            onClick={()=>handleCreatedPoolsClick('Active')}
        />
          <StatisticCard
        //  active={selected?.key === 'Active'}
            icon={<HiOutlineUsers />}
            avatarClass="!bg-blue-500"
            label="Total Funds"
            value={totalfunds == null ? 0 :totalfunds?"$" +totalfunds:0 }
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
            onClick={()=>handleCreatedPoolsClick('newCustomers')}
        /> */}
    </div>
    )
}

export default CustomerStatistic