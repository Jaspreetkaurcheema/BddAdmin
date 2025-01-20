import React, { useEffect, useState } from 'react'
import {
    AdaptableCard,
    Loading,
    Container,
    DoubleSidedImage,
} from 'components/shared'
import CustomerProfile from './components/CustomerProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAccomplishList, getActivePoolList, getCustomer, getEntiesList, getFeaturedPoolList, getHistoryList, getPaymentPoolList, getPoolList, getPoolStats, getPoolVictoriesList, setTableData } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'
import CustomerStatistic from './components/CustomerStatistic'
import BackButton from 'views/default/buttons/Backbutton'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerTableFilter from './components/CustomerTableFilter'

injectReducer('crmCustomerDetailss', reducer)

const CustomerDetail = () => {

    const dispatch = useDispatch()
    const [selected, setSelected] = useState({ key: 'B2b' })
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('type');

    const data = useSelector(
        (state) => state.crmCustomerDetailss.data.activeList.users
    )
 
    const totalData = useSelector(
        (state) => state.crmCustomerDetailss.data.activeList.count
    )
    // const [selectedData, setSelectedData] = useState({})
    const query = useQuery()

    const poolList = useSelector(
        (state) => state.crmCustomerDetailss.data.poolList
    )
    const activePoolList = useSelector(
        (state) => state.crmCustomerDetailss.data.activeList
    )
    const FeaturedList = useSelector(
        (state) => state.crmCustomerDetailss.data.featurePoolList
    )
    const AccomplishList = useSelector(
        (state) => state.crmCustomerDetailss.data.AccomplishList
    )
    const HistoryList = useSelector(
        (state) => state.crmCustomerDetailss.data.historyList
    )
    const PaymentList = useSelector(
        (state) => state.crmCustomerDetailss.data.
        paymentList
        
    )
    const EntriesList = useSelector(
        (state) => state.crmCustomerDetailss.data.
        entriesList
        
    )
    const poolStats = useSelector(
        (state) => state.crmCustomerDetailss.data.
        poolStats
        
    )
    const loading = useSelector(
        (state) => state.crmCustomerDetailss.data.loading2
    )

    const loadings = useSelector(
        (state) => state.crmCustomerDetailss.data.loading1
    )
    const { filter_type ,paymentType} = useSelector(
        (state) => state.crmCustomerDetailss.data.filterHistory
    )


    console.log(poolList, 'hfghgjhgjguju')


    const id = query.get('id')
    useEffect(() => {

        // if (id > 0) dispatch(getCustomer({ id }))
    }, [id])

    useEffect(() => {
        fetchData()

    }, [selected,filter_type,paymentType])

    const { pageNumber, pageSize, isJoined, userId, search } = useSelector(
        (state) => state.crmCustomerDetailss?.data.tableData
    )
 


    const fetchData = () => {

        if (selected.key == 'B2b') {
            dispatch(getActivePoolList({ pageNumber, pageSize, search, userId: id , category_id:1}))
             dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: 1 }))

            // dispatch(setTableData({ pageNumber, pageSize, isJoined: true, search: '', userId: id }))

        }
        if (selected.key == 'Finance') {
            dispatch(getActivePoolList({ pageNumber, pageSize, search, userId: id , category_id:2}))
             dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: 2 }))
            // dispatch(setTableData({ pageNumber, pageSize, isJoined: false, search: '', userId: id }))

        }
        if (selected.key == 'Location') {
            dispatch(getActivePoolList({ pageNumber, pageSize, search, userId: id , category_id:3}))
             dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: 3 }))
            // dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        }
        if (selected.key == 'Activity') {
            dispatch(getActivePoolList({ pageNumber, pageSize, search, userId: id , category_id:4}))
             dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: 4 }))
            // dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        }
        if (selected.key == 'Social') {
            dispatch(getActivePoolList({ pageNumber, pageSize, search, userId: id , category_id:5}))
             dispatch(setTableData({ pageNumber, pageSize, search, userId: id , userId: id , category_id: 5 }))
            // dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        }
        // if (selected.key == 'History') {
        //     dispatch(getHistoryList({ pageNumber, pageSize, userId: id,filter_type:filter_type }))
        //     dispatch(setTableData({ pageNumber: 1, pageSize, search: '', filter_type:filter_type, userId: id }))
        // }
        // if (selected.key == 'Payment') {
        //     dispatch(getPaymentPoolList({ pageNumber, pageSize, userId: id,search:'',filterType:1,paymentType}))
        //     dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        // }
        // if (selected.key == 'Entries') {
        //     dispatch(getEntiesList({ pageNumber, pageSize, userId: id,search:''}))
        //     dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        // }
        // if (selected.key == 'Victory') {
        //     dispatch(getPoolStats({ id: id}))
        //     dispatch(setTableData({ pageNumber: 1, pageSize, search: '', userId: id }))

        // }


    }

    const currentSelectedList = (selected) => {
        if (selected === 'Created' || selected === 'Joined') return poolList
        if (selected === 'Featured') return FeaturedList
        if(selected === 'History') {
            return HistoryList;
        }
        if (selected === 'Accomplishment') return AccomplishList
        if (selected === 'Entries') return EntriesList
        if (selected === 'Payment') {
            return PaymentList;
        }
        if (selected === 'Victory') {
            return poolStats;
        }
        else return activePoolList
    }

   console.log(loading,'fgfgfgfg')
    return (
 data == null ? 
 <Loading loading={loading}>
        </Loading> :
    <Container className="h-full">
       

               
    <div>
        {/* <div className='flex justify-between items-center'>
            <div> <h2>Detail of {data.data.user_details?.username} </h2></div>
            <BackButton />
            
<CustomerTableFilter/>
            </div> */}
            <div className='flex justify-between items-center'>
            <div> <h3>User  Details </h3></div>

            {/* <div> <h3> {`${userType?.toUpperCase()} USER DETAIL`} </h3></div> */}
            <div> <BackButton />
                {/* <CustomerTableFilter /> */}
            </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-8 my-10">

            <div>
                <CustomerProfile data={data[0]} total={totalData}  />
            </div>

            <div className="w-full">
                <CustomerStatistic setSelectedCard={setSelected} selected={selected} />
                {/* <CurrentSubscription /> */}
            </div>
        </div>

        <div className="w-full">
            <AdaptableCard>

                {/* <CustomersTableTools setSelectedCard={setSelected} selected={selected} /> */}
                <Loading loading={loading}>
                    <PaymentHistory poolsData={currentSelectedList(selected.key)} selected={selected?.key} />

                </Loading>
                <PaymentMethods />
            </AdaptableCard>
        </div>

    </div>




</Container>
 
    
    )
}

export default CustomerDetail