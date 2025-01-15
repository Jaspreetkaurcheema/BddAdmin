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
import { getCustomer, getCustomers, getPoolEventDetails, getPoolTeamDetails } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'
import CustomerStatistic from './components/CustomerStatistic'
import BackButton from 'views/default/buttons/Backbutton'
import CustomersTableTools from './components/CustomersTableTools'
import { setTableData } from '../PoolEntries/store/dataSlice'
import PoolEventFilter from './components/PoolEventFilter'

injectReducer('poolEventDetails', reducer)

const CustomerDetail = () => {

    const dispatch = useDispatch()
    const [selectedData, setSelectedData] = useState({ key: 'pools' })
    const query = useQuery()

    const data = useSelector(
        (state) => state.poolEventDetails.data.profileData
    )

    const loadings = useSelector(
        (state) => state.poolEventDetails.data.loading
    )
    const loading = useSelector(
        (state) => state.poolEventDetails.data.loading1
    )
    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.poolEventDetails?.data.tableData
    )

    console.log( selectedData, "9999999999999")
    const id = query.get('id')
    const { season, eventfilterType, filterType, poolType } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )
    const {roundId,regionId} = useSelector(
        (state) => state.poolEventDetails.data.roundData
    )
    useEffect(() => {

        if (id > 0) dispatch(getCustomer({ id }))
    }, [id])
    useEffect(() => {

        fetchData()
        // Assuming this action resets the state to initial state

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData, season ,regionId , roundId])

    const fetchData = () => {



        if (selectedData?.key == 'pools') {
            dispatch(getCustomers({ pageNumber, pageSize, search: '', poolEventId: id, season, filterType, eventfilterType, poolType, sportId: null }))
            dispatch(setTableData({ pageNumber, pageSize, poolId: id, search: '' }))
            // dispatch(getPoolEventDetails({ pageNumber: 1, pageSize: 10, poolEventId: id, search: '' }))
            // dispatch(setTableData({ pageNumber: 1, pageSize: 10, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'games') {

            dispatch(getPoolEventDetails({ pageNumber, pageSize, poolEventId: id, search: '', season ,regionId,roundId}))
            dispatch(setTableData({ pageNumber, pageSize, poolId: id, search: '' }))
        }
        if (selectedData?.key == 'teams') {
            console.log('fgfgfghfghfhgh')
            dispatch(getPoolTeamDetails({ pageNumber, pageSize, poolEventId: id, search: '', season,regionId,roundId}))
            dispatch(setTableData({ pageNumber, pageSize, poolId: id, search: '' }))
            // dispatch(setTableData({ pageNumber: 1, pageSize: 10, poolId: id, search: '' }))

        }
    }

    console.log(loadings, 'loadingsloadings')
    console.log(loading, 'loadingsloadings 1')

    return (

        <Container className="h-full">

            <Loading loading={loadings}>
                {!isEmpty(data) && (
                    <div>
                        <div className='flex justify-between items-center'>
                            <div> <h2><h2>{data.data?.poolEventName} Detail </h2> </h2></div>
                            <div> <BackButton />
                                <PoolEventFilter />
                            </div>
                        </div>




                        <div className="flex flex flex-col xl:flex-row gap-8 my-10 gap-8 mt-5">
                            <div>
                                <CustomerProfile data={data} />
                            </div>
                            <div className='w-100' style={{ width: '100%' }}>   <CustomerStatistic setData={setSelectedData} selectedPool={selectedData} /> </div>

                        </div>




                        <div className="w-full">
                            <AdaptableCard>

                                <CustomersTableTools setData={setSelectedData} selectedPool={selectedData?.key} />
                                <Loading loading={loading}>
                                    <PaymentHistory PoolDetailData={selectedData?.data} selected={selectedData?.key} />

                                </Loading>
                                {/* <PaymentMethods  /> */}
                            </AdaptableCard>
                        </div>
                    </div>

                )}

                {isEmpty(data) && (
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="No user found!"
                        />
                        <h3 className="mt-8">No user found!</h3>
                    </div>
                )}
            </Loading>
        </Container>
    )
}

export default CustomerDetail
