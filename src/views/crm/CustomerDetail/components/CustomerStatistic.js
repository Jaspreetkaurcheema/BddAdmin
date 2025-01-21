import React, { useEffect, useRef, useState } from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import PaymentHistory from '../components/PaymentHistory';
import {
    HiOutlineUserGroup,
    HiOutlineUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import useQuery from 'utils/hooks/useQuery';
import { useLocation } from 'react-router-dom';
import { getAccomplishList, getActivePoolList, getEntiesList, getFeaturedPoolList, getHistoryList, getPaymentPoolList, getPoolList, setTableData, getPoolStats } from '../store/dataSlice';
import { apiGetPoolStats } from 'services/CrmService';

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading, active = false, onClick } = props
    const avatarSize = 55

    console.log(active, 'activeactive')
    return (
        <div className={(active ? 'bg-black	 rounded-lg text-white ' : '') + ' cursor-pointer'}>
            <Card bordered onClick={onClick} active={active} className='bg-transparent w-full '>
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

                    <div className="flex items-center gap-4">
                        {/* <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        /> */}
                        <div className='text-center'>
                            <p className='whitespace-nowrap overflow-hidden overflow-ellipsis min-w-[98px] max-w-full lg:max-w-[100px]  xl:max-w-[125px]  2xl:max-w-[200px]'>{label}</p>
                        <div>
                            <h5 className={(active ? '  text-white ' : '') + ' cursor-pointer'} style={{ textAlign: 'center' }}> {value }
                                
                           <span className='ms-3'> Records</span>
                            </h5> 
                            </div>

                        </div>
                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}

                </Loading>
            </Card>
        </div>
    )
}

const CustomerStatistic = ({ setSelectedCard, selected }) => {


    console.log(selected, "seleehdihjdjhdfsjhsjdfhsd")
    const [stats, setStats] = useState(null)
    const location = useLocation();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await 
    //             apiGetPoolStats({ id: id });
    //             setStats(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching pools:', error);
    //             // Handle error
    //         }
    //     };

    //     fetchData();
    // }, []);



    console.log(selected.key, 'selecteduy')
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');



    const { pageNumber, pageSize, listJoinedORCreated, userId, search } = useSelector(
        (state) => state.crmCustomerDetailss?.data.tableData
    )

    const dispatch = useDispatch()
    const actionValue = searchParams.get('action');
    console.log(actionValue, 'actionValue')
    const data1 = useSelector(state => state.crmCustomerDetailss.data.profileData.data  );
    const count = useSelector(
        (state) => state.crmCustomerDetailss.data.activeList.count
    )
 
    const entriesCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data)
    const poolVictoriesCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data)
    const poolHistoryCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data)
    const activeCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data
    );
    const data2 = useSelector(state => state.crmCustomerDetailss.data.profileData.data);
    const data3 = useSelector(state => state.crmCustomerDetailss.data.profileData.data);
    const amount = useSelector(state => state.crmCustomerDetailss.data.profileData.data);
    const data = useSelector((state) => state)
    const paymentCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data);

    console.log(data3, 'data3data3')
    const activePoolCount = useSelector(
        (state) => state.crmCustomerDetailss.data.activeList.total_rows_count
    )
    const { filter_type, paymentType } = useSelector(
        (state) => state.crmCustomerDetailss.data.filterHistory
    )
    const FeaturedCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data
    );
    const AccomplishCount = useSelector(state => state.crmCustomerDetailss.data.profileData.data)
    console.log(AccomplishCount, 'activePoolCount');
    // useEffect(() => {
    //     if (selected?.key == 'Created') {
    //         console.log("hitted1", selected)
    //         // dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id  }))
    //         // dispatch(setFilterData({ listJoinedORCreated: true }))
    //     //    dispatch(getPoolList({ pageNumber:1, pageSize:10, search, listJoinedORCreated: true, userId: id }))
    //     }
    //     if (selected?.key == 'Joined') {
    //         console.log("hitted1", selected)
    // //  dispatch(getPoolList({ pageNumber, pageSize, search, listJoinedORCreated: true, userId: id }))
    //     }

    // }, [selected?.key,actionValue])
    // useEffect(() => {
    //     if (actionValue == 'No_Pay' ) { setData({ data: data3, key: 'Payments' }); }
    //     if (actionValue == 'created_pools_count') { setData({ data: data1, key: 'Created' }); }
    //     if (actionValue == 'joined_pool_count') { setData({ data: data2, key: 'Joined' }); }

    //     // setData({ data: data1, key: 'Created Pool' })
    //     // setData(selectedPool == 'created' ? { data: data1, key: 'Created Pool' } : { data: data2, key: 'Joined Pool' });
    // }, [actionValue]); // Empty dependency array ensures this effect runs only once, when the component mounts

    const handleClick = (key , category_id) => {

        console.log(key, 'keyyyyy')
        // setSelectedPool('created');
        //  dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: category_id }))
        //  dispatch(getActivePoolList({ pageNumber: 1, pageSize, search, userId: id , category_id: category_id}))
        
        // dispatch(getActivePoolList({ pageNumber: 1, pageSize, isJoined: true, search: '', userId: id }))

        setSelectedCard({ data, key });
    };

    const handlePaymentsClick = (key) => {
        dispatch(getPaymentPoolList({ pageNumber, pageSize, userId: id, search: '', filterType: 1, paymentType }))
        dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id  }))
        // setSelectedPool('payments');
        setSelectedCard({ data, key });
    };
  

    return (
        // <div className="grid  grid-cols-1 sm:grid-cols-1 grid-rows-2 md:grid-cols-3 lg:grid-cols-3   xl:grid-cols-3  2xl:grid-cols-3 gap-4">
        <>
            
                <div className="grid  grid-cols-1 sm:grid-cols-1 grid-rows-2 md:grid-cols-3 lg:grid-cols-3   xl:grid-cols-5  2xl:grid-cols-5 gap-4">
     <StatisticCard
                        active={selected?.key == 'B2b'}
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-600"
                        label="B2B Data"
                        value={count?.b2btotalRecord || 0}
                        onClick={() => handleClick('B2b', 1)}
                    />
                    <StatisticCard
                        active={selected?.key == 'Finance'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Finance Data"
                        value={count.fintotalRecord || 0}
                        onClick={() => handleClick('Finance', 2)}

                    />
                    {/* <StatisticCard
                        active={selected?.key == 'Featured'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Featured Pools"
                        value={FeaturedCount || 0}
                        onClick={() => handleFeaturedPoolsClick('Featured')}

                    /> */}

                    {/* <StatisticCard
                        active={selected?.key == 'Joined'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Joined pools"
                        value={data2?.length || 0}
                        onClick={() => handleJoinedPoolsClick('Joined')}
                    /> */}

                    {/* <StatisticCard
                        active={selected?.key == 'Created'}
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-600"
                        label="Created pools"
                        value={data1?.length || 0}
                        onClick={() => handleCreatedPoolsClick('Created')}
                    /> */}

                    <StatisticCard
                        active={selected?.key == 'Location'}
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-600"
                        label="Location Data"
                        value={count.loctotalRecord || 0}
                        onClick={() => handleClick('Location',3)}
                    />

                    <StatisticCard
                        active={selected?.key == 'Activity'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Activity Data"
                        value={count.acttotalRecord || 0}
                        onClick={() => handleClick('Activity', 4)}
                    />

                    <StatisticCard
                        active={selected?.key == 'Social'}
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label="Social Media Data"
                        value={count.socialRecord || 0}
                        onClick={() => handleClick('Social')}

                    />

                    {/* <StatisticCard
                        active={selected?.key == 'Victory'}
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-600"
                        label="Pool Victory"
                        value={poolVictoriesCount || 0}
                        onClick={() => handlePoolVictoriesClick('Victory')}
                    />

                    <StatisticCard
                        active={selected?.key == 'History'}
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-600"
                        label="Pool History"
                        value={poolHistoryCount||0}
                        onClick={() => handleHistoryPoolsClick('History')}
                    /> */}

                    {/* <StatisticCard
                        // active={selected?.key === 'Payments' }
                        icon={<HiOutlineUsers />}
                        avatarClass="!bg-blue-500"
                        label={selected?.key == 'Created' ? "Total Receive" : "Total Spend"}
                        value={selected?.key === 'Payments' ? (amount ? "$" + amount : 0) : (selected?.key === 'Created' ? ((data1?.length > 0 && data1[0]?.totalfunds) ? "$" + data1[0]?.totalfunds : 0) : ((data2?.length > 0 && data2[0].totalfund) ? "$" + data2[0].totalfunds : 0))}
                    // value={selected === 'Created' ? (data1?.length >0 ? "$" + data1[0]?.totalfunds : 0 ): data2?.length>0 ?"$" + data2[0].totalfunds : 0 }
                    // onClick={handlePaymentsClick}
                    /> */}
                    {/* <StatisticCard
                // active={selectedPool === 'payments'}
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Total Funds"
                value={amount? amount+" $":0
                }
            // onClick={handlePaymentsClick}
            /> */}

                </div>

            
        </>
    )
}

export default CustomerStatistic
