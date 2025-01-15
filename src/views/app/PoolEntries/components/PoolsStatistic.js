import React, { useEffect } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic, getCustomers } from '../store/dataSlice'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = (props) => {

    const { icon, avatarClass, label, value, growthRate, loading,onClick } = props

    const avatarSize = 55

    return (
        <Card bordered onClick={onClick} >
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
                <div className="flex justify-between items-center  cursor-pointer">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>


                                {value}


                            </h3>
                        </div>
                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = ({ setSelectedCard, selected }) => {
    const dispatch = useDispatch()
    const { pageNumber, pageSize,poolId, search } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    const statisticData = useSelector(
        (state) => state.crmCustomers.data.statisticData.data)
    const loading = useSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )

   
    useEffect(() => {
        console.log({ pageNumber, pageSize, poolId, search } ,"{ pageNumber, pageSize, poolEventId, filterType,search }");
        dispatch(getCustomerStatistic()); // Always fetch statistic data
        if (selected?.key === 'Active') {
            console.log("Seelelelelelelle", selected,pageNumber,{ pageNumber:1, pageSize, poolId: 3, search, filterType: 2 } )
            dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 }));
        } else if (selected?.key === 3 || selected?.key === 8 || selected?.key === 12) {
            console.log("Seelelelelelelle1", selected,pageNumber , { pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 } )
            dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: selected?.key, search, filterType: 2 }));
        } else if(selected?.key == 'All'){
            console.log("Seelelelelelelle2", selected,{ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 2 } )
            dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId: 3, search, filterType: 1 }));
        }
    }, [selected?.key]);
    const data = useSelector((state) => state)

    const handleCreatedPoolsClick = (key) => {
        console.log(key, 'pooleventpoolevent')
        setSelectedCard({ data, key })
    };
    console.log(statisticData, 'statisticDatastatisticData')
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {statisticData?.map(item => (
                <StatisticCard
                    key={item.id} // You should provide a unique key for each mapped element
                    active={selected?.key === item.id}
                    icon={<HiOutlineUserAdd />}
                    avatarClass="!bg-emerald-500"
                    label={item.eventName}
                    value={item.sportName}
                    //  growthRate={statisticDat}
                    loading={loading}
                    onClick={() => handleCreatedPoolsClick(item.id)}
                />
            ))}
        </div>
    )
}

export default CustomerStatistic
