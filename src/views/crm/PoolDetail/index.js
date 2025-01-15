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
import { getCustomer, getCustomers, getPool, getPoolAnalytic, getPoolLeader, getPoolMembers, setTableData } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'
import CustomerStatistic from './components/CustomerStatistic'
import BackButton from 'views/default/buttons/Backbutton'
import CustomersTableTools from './components/CustomersTableTools'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const [selectedData, setSelectedData] = useState({ key: 'Pool Entries' })

    const query = useQuery()

    const data = useSelector(
        (state) => state.crmCustomerDetails.data.profileData
    )
    const { pageNumber, pageSize, poolId, search } = useSelector(
        (state) => state.crmCustomerDetails?.data.tableData
    )
    const loading = useSelector(
        (state) => state.crmCustomerDetails.data.loading
    )
    const loadings = useSelector(
        (state) => state.crmCustomerDetails.data.loading1
    )
    const PoolDetail = useSelector((state) => state.crmCustomerDetails.data.customerList)
    const memberDetail = useSelector((state) => state.crmCustomerDetails.data.memberList)
    const { roundId } = useSelector(
        (state) => state.crmCustomerDetails.data.filterData
    )
    console.log(memberDetail, 'memberDetailmemberDetail')
    const id = query.get('id')
    useEffect(() => {

        if (id > 0) dispatch(getPool({ id }))
    }, [id])
    useEffect(() => {
        // memberDetail = selector.crmCustomerDetails.data.memberList
        console.log('useffect index')
        fetchData()
        return () => {
            // Clear previous data from the state
            dispatch(setTableData({
                pageSize,
                search: '',
                pageNumber: 1,
                poolId: null,

            })); // Assuming this action resets the state to initial state
        };
    }, [selectedData?.key, roundId])

    console.log("selector", selector);
    const fetchData = () => {
        if (selectedData?.key == 'Pool Entries') {
            console.log("selector 1", selectedData?.key);
            dispatch(getCustomers({ pageNumber: 1, pageSize, poolId: id, search: '' }))
            dispatch(setTableData({ pageNumber: 1, pageSize, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'Pool Members') {
            console.log("selector 1", selectedData?.key);
            dispatch(getPoolMembers({ pageNumber: 1, pageSize, poolId: id, search: '', joined: true }))
            dispatch(setTableData({ pageNumber: 1, pageSize, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'Pool Requests') {
            console.log("selector 1", selectedData?.key);
            dispatch(getPoolMembers({ pageNumber: 1, pageSize, poolId: id, search: '', joined: false }))
            dispatch(setTableData({ pageNumber: 1, pageSize, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'Pool Leaders') {
            console.log("selector 1", selectedData);
            dispatch(getPoolLeader({ pageNumber: 1, pageSize, poolId: id, search: '' }))
            dispatch(setTableData({ pageNumber: 1, pageSize, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'Pool AnalyticList') {
            console.log("selector 1", selectedData?.key);
            dispatch(getPoolAnalytic({ pageNumber, pageSize, poolId: id, search: '', roundId }))
            dispatch(setTableData({ pageNumber: 1, pageSize, poolId: id, search: '' }))
        }

    }


    return (

        <Container className="h-full">
            <Loading loading={loadings}>
                {!isEmpty(data) && (
                    <div >
                        <div className='flex justify-between items-center'>
                            <div> <h3> POOL DETAIL </h3></div>
                            <div> <BackButton /></div></div>

                        <div className="flex flex-col xl:flex-row gap-8 mt-8">


                            <div>
                                <CustomerProfile data={data} />
                            </div>
                            <div className="w-full" >
                                <CustomerStatistic setSelectedCard={setSelectedData} selected={selectedData} />
                                {/* <CustomerStatistic data={data} setData={setSelectedData} /> */}
                                {/* <CurrentSubscription /> */}

                            </div>
                        </div>


                        <div className="w-full mt-5">
                            <AdaptableCard>
                                <CustomersTableTools setSelectedCard={setSelectedData} selected={selectedData} />


                                <Loading loading={loading} >
                                    <PaymentHistory PoolDetailData={selectedData?.key == 'Pool Entries' ? PoolDetail : memberDetail} selected={selectedData?.key} />
                                </Loading>
                                {/* <PaymentMethods  /> */}
                            </AdaptableCard>
                        </div>
                    </div>

                )
                }

                {
                    isEmpty(data) && (
                        <div className="h-full flex flex-col items-center justify-center">
                            <DoubleSidedImage
                                src="/img/others/img-2.png"
                                darkModeSrc="/img/others/img-2-dark.png"
                                alt="No user found!"
                            />
                            <h3 className="mt-8">No user found!</h3>
                        </div>
                    )
                }
            </Loading>

        </Container >
    )
}

export default CustomerDetail
