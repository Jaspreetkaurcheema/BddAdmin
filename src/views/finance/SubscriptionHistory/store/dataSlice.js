import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apiGetFinanceCustomers,
    apPutCrmCustomer,
    apiGetSubscriptionCustomers,
    apiGetSubscriptionOffers,
    apiGetCrmCustomersStatistic,
    apPutSubscriptionOffer,
    apiGetSubscriptionHistory,
    apDeleteSubscriptionOffer,
    apPutSubscriptionCustomer,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmSubscriptionHistory/data/getCustomers',
    async (params) => {
        const response = await apiGetSubscriptionHistory(params)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmSubscriptionHistory/data/putCustomer',
    async (data) => {
        const response = await apPutSubscriptionOffer(data)
        return response.data
    }
)

export const deleteSubscriptionOffer = createAsyncThunk(
    'crmSubscriptionHistory/data/putCustomer',
    async (data) => {
        const response = await apDeleteSubscriptionOffer(data)
       
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
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
    name: 'crmSubscriptionHistory/data',
    initialState: {
        loading: false,
        customerList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
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

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
