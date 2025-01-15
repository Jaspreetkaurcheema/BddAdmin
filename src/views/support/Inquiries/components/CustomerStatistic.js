import React, { useEffect } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic, getInquiry } from '../store/dataSlice'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = (props) => {

    const { icon, avatarClass, label, value, value1, growthRate, loading, active = false, onClick } = props

    const avatarSize = 55
    // const { Option } = Select;

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


                </Loading>
            </Card>
        </div>






    )
}

const CustomerStatistic = ({ setSelectedCard, selected }) => {

    const dispatch = useDispatch()

    const statisticData = useSelector(
        (state) => state.supportInquiries.data.customerList.totalInquries
    )


    const loading = useSelector(
        (state) => state.supportInquiries.data.statisticLoading
    )
    const data = useSelector((state) => state)
    const { pageNumber, pageSize,search } = useSelector(
        (state) => state.supportInquiries.data.tableData
    )

    useEffect(() => {
        // dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleCreatedPoolsClick = (key) => {
      
        dispatch(getInquiry({ pageNumber:1, pageSize,search}))
  
        setSelectedCard({ data, key })
    };
    console.log(statisticData, 'statisticDatastatisticData')
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                active={selected?.key === 'Active'}
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Corporate site inquiry"
                value={statisticData}
                growthRate={statisticData?.totalCustomers?.growShrink}
                loading={loading}
                onClick={() => handleCreatedPoolsClick('Active')}



            />
            {/* <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Active Customers"
                value={statisticData?.activeCustomers?.value}
                growthRate={statisticData?.activeCustomers?.growShrink}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="New Customers"
                value={statisticData?.newCustomers?.value}
                growthRate={statisticData?.newCustomers?.growShrink}
                loading={loading}
            /> */}
        </div>
    )
}

export default CustomerStatistic
