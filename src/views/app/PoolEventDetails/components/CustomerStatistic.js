import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import PaymentHistory from '../components/PaymentHistory';
import {
    HiOutlineUserGroup,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import { getCustomers, getPoolEventDetails, setTableData } from '../store/dataSlice';
import useQuery from 'utils/hooks/useQuery';

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
// "no_of_games": 67,
// "no_of_teams": 134,
// "no_of_pools": 0,
const CustomerStatistic = ({ setData, selectedPool }) => {
    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.poolEventDetails?.data.tableData
    )

    const dispatch = useDispatch();
    const query = useQuery()
    const data9 = useSelector(state => state.poolEventDetails.data.profileData

        )
        const {season ,eventfilterType,filterType,poolType} = useSelector(
            (state) => state.poolEventDetails.data.filterData
        )


    // const [selectedPool, setSelectedPool] = useState('events');
    const data1 = useSelector(state => state?.poolEventDetails.data.profileData.data.no_of_pools
    );
    const data2 = useSelector(state => state.poolEventDetails.data.profileData.data.no_of_games);
    const data3 = useSelector(state => state.poolEventDetails.data.profileData.data.no_of_teams);
    const data = useSelector(state => state.poolEventDetails)
    // useEffect(() => {
    //     setData(selectedPool === 'events' ? { data :data1 ,key:'Events'} : { data :data2,key:'Games'});
    // }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

    const handleCreatedPoolsClick = (key) => {
          setData({ data, key });
          dispatch(getCustomers({ pageNumber :pageNumber, pageSize, search: '',season, poolEventId: query.get('id'), filterType, eventfilterType, poolType , sportId: null }))
          dispatch(setTableData({ pageNumber :1, pageSize , poolEventId: query.get('id'), search: '' }))
        //   dispatch(getPoolEventDetails({ pageNumber: 1, pageSize: 10, poolEventId: query.get('id'), search: '' }))

    };

    const handleJoinedPoolsClick = (key) => {
        // setSelectedPool('games');
        dispatch(getPoolEventDetails({ pageNumber, pageSize, poolEventId: query.get('id'), search: '',season }))
        dispatch(setTableData({ pageNumber :1, pageSize , poolEventId: query.get('id'), search: '' }))
        setData({ data, key });
    };
    const handlePaymentsClick = (key) => {
        // setSelectedPool('teams');
        dispatch(setTableData({ pageNumber :1, pageSize, poolEventId: query.get('id'), search: '' }))
        setData({ data, key });
    };

    return (
        <div className="grid  grid-cols-1 sm:grid-cols-1 grid-rows-2 md:grid-cols-3 lg:grid-cols-3   xl:grid-cols-2  2xl:grid-cols-3 gap-4  ">
            <StatisticCard
                active={selectedPool?.key === 'pools'}
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Pools"
                value={data1 || 0}
                onClick={() => handleCreatedPoolsClick('pools')}

            // onClick={handleCreatedPoolsClick}
            />

            <StatisticCard
                active={selectedPool?.key === 'games'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Games"
                value={data2 || 0}
                onClick={() => handleJoinedPoolsClick('games')}
            />
            <StatisticCard
                active={selectedPool?.key === 'teams'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-green-500"
                label="Teams"
                value={data3 || 0}
                onClick={() => handlePaymentsClick('teams')}
            />
             
           
             

        </div>
    )
}

export default CustomerStatistic
