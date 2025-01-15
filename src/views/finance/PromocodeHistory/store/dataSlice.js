import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apiGetFinanceCustomers,
    apPutCrmCustomer,
    apiGetSubscriptionCustomers,
    apiGetCrmCustomersStatistic,
    apiGetCoupons,
    apPutCrmCoupon,
    apiGetPromocodeHistory,
    apDeleteCrmCoupons,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCoupons = createAsyncThunk(
    'crmCouponsHistory/data/getCoupons',
    async (params) => {
        const response = await apiGetPromocodeHistory(params)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCouponsHistory/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCoupon(data)
        return response.data
    }
)
export const deleteCoupons = createAsyncThunk(
    'crmCouponsHistory/data/putCustomer',
    async (data) => {
        const response = await apDeleteCrmCoupons(data)
        
        return response.data
    }
)

export const initialTableData = {
    pageIndex: 1,
    pageSize: 10,
    search: '',
    
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmCouponsHistory/data',
    initialState: {
        loading: false,
        couponsList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCouponsList: (state, action) => {
            state.couponsList= action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCoupons.fulfilled]: (state, action) => {
            state.couponsList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCoupons.pending]: (state) => {
            state.loading = true
        },
        [getCustomerStatistic.pending]: (state) => {
            state.statisticLoading = true
        },
        [getCustomerStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    },
})

export const { setTableData, setCouponsList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
