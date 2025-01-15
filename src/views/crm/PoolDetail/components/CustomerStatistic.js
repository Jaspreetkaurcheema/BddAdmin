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
import { getCustomers, getPoolAnalytic, getPoolLeader, getPoolMembers, setTableData } from '../store/dataSlice';

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading, active = false, onClick } = props
    const avatarSize = 55
    console.log(active, 'activeactive')

    return (
        <div className={(active ? 'bg-indigo-300 rounded-lg text-white ' : '') + ' cursor-pointer'}>
            <Card bordered onClick={onClick} active={active} className='bg-transparent '>
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

                    <div className="flex items-center  gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                        <p className='whitespace-nowrap overflow-hidden overflow-ellipsis min-w-[50px] max-w-full md:max-w-[72px] lg:max-w-[100px]  xl:max-w-[85px]  2xl:max-w-[200px]'>{label}</p>
                        <span className={`${active ? 'bg-indigo-300 rounded-lg text-white' : ''} cursor-pointer text-lg font-semibold leading-8 text-black`} style={{fontSize: '24px'}}>{value}</span>


                        </div>
                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}

                </Loading>
            </Card>
        </div>
    )
}


const CustomerStatistic = ({ setSelectedCard, selected }) => {

    const dispatch = useDispatch();
    const poolid = new URLSearchParams(window.location.search).get('id');

    useEffect(() => {
        console.log('useffect 2')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const [selectedPool, setSelectedPool] = useState('pool_entries');
    const { pageNumber, pageSize, poolId, search } = useSelector(
        (state) => state.crmCustomerDetails?.data.tableData
    )
    const { roundId } = useSelector(
        (state) => state.crmCustomerDetails.data.filterData
    )
    console.log(useSelector(state => state.crmCustomerDetails.data.profileData.data), 'countttc')
    // const data1 = useSelector(state => state.crmCustomerDetails.data.profileData.data.pool_entries
    // );
    const data = useSelector(state => state.crmCustomerDetails);
    const totalAnalytic = useSelector(state => state?.crmCustomerDetails.data.profileData.data.pool_analytics_count)
    const data2 = useSelector(state => state.crmCustomerDetails.data.profileData.data.pool_members_count);
    const data3 = useSelector(state => state.crmCustomerDetails.data.profileData.data.pool_joining_requests_count);
    const data1 = useSelector((state) => state.crmCustomerDetails.data.profileData.data.pool_entries)
    const amount = useSelector(state => state.crmCustomerDetails.data.profileData.data.total_amount)
    // useEffect(() => {
    //     setData(selectedPool === 'pool_entries' ? { data: data1, key: 'Pool Entries' } : { data: data2, key: 'Pool Members' });
    // }, []); // Empty dependency array ensures this effect runs only once, when the component mounts
    // const { pageNumber, pageSize, poolId,search } = useSelector(
    //     (state) => state.crmCustomerDetails?.data.tableData
    // )
    const handleCreatedPoolsClick = (key) => {
        // setSelectedPool('pool_entries');
        dispatch(getCustomers({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        dispatch(setTableData({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        setSelectedCard({ data, key });
    };

    const handleJoinedPoolsClick = (key) => {
        // setSelectedPool('pool_members');
        dispatch(getPoolMembers({ pageNumber: 1, pageSize, poolId: poolid, search: '', joined: true }))
        dispatch(setTableData({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        setSelectedCard({ data, key });
    };
    const handlePaymentsClick = (key) => {
        // setSelectedPool('pool_joining_requests_count');
        dispatch(getPoolMembers({ pageNumber: 1, pageSize, poolId: poolid, search: '', joined: false }))
        dispatch(setTableData({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        setSelectedCard({ data, key });
    };
    const handleLeadersClick = (key) => {
        console.log(key, 'keyeyeyeyeyeyeyeyey')
        // setSelectedPool('pool_joining_requests_count');
        dispatch(getPoolLeader({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        dispatch(setTableData({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        setSelectedCard({ data, key });
    };
    const handleAnalyticClick = (key) => {
        // setSelectedPool('pool_joining_requests_count');
        dispatch(getPoolAnalytic({ pageNumber, pageSize, poolId: poolid, search: '', roundId }))
        dispatch(setTableData({ pageNumber: 1, pageSize, poolId: poolid, search: '' }))
        setSelectedCard({ data, key });
    };
    console.log(selected, 'selected?.key')
    return (
        <div className="grid  grid-cols-1 sm:grid-cols-1 grid-rows-2 md:grid-cols-3 lg:grid-cols-3   xl:grid-cols-3  2xl:grid-cols-3 gap-4  ">
            <StatisticCard
                active={selected?.key == 'Pool Entries'}
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label=" Pool Entries"
                value={data1?.length || 0}
                onClick={() => handleCreatedPoolsClick('Pool Entries')}
            />

            <StatisticCard
                active={selected?.key == 'Pool Members'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label=" Pool Members"
                value={data2 || 0}
                onClick={() => handleJoinedPoolsClick('Pool Members')}
            />
            <StatisticCard
                active={selected?.key === 'Pool Requests'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-green-500"
                label=" Pool Requests"
                value={data3?.length || 0}
                onClick={() => handlePaymentsClick('Pool Requests')}
            />
            <StatisticCard
                active={selected?.key === 'Pool Leaders'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-green-500"
                label=" Leader board"
                value={data1?.length || 0}
                onClick={() => handleLeadersClick('Pool Leaders')}
            />
            <StatisticCard
                active={selected?.key === 'Pool AnalyticList'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-green-500"
                label=" Pool Analytic"
                value={totalAnalytic || 0}
                onClick={() => handleAnalyticClick('Pool AnalyticList')}
            />
            <StatisticCard
                // active={selectedPool === 'pool_joining_requests_count'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-green-500"
                label="Total Funds"
                value={amount ? "$" + amount : 0}
            // onClick={handlePaymentsClick}
            />

        </div>
    )
}

export default CustomerStatistic
