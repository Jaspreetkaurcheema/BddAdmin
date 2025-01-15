import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apiGetFinanceCustomers,
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
    apiUpdateEnabledCustomers,
    apDeleteCharges,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmCharges/data/getCustomers',
    async (params) => {
        const response = await apiGetFinanceCustomers(params)
        return response.data
    }
)
export const getEnabled = createAsyncThunk(
    'crmCharges/data/putCustomer',
    async (data) => {
        const response = await apiUpdateEnabledCustomers (data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCharges/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)
export const deleteCharges = createAsyncThunk(
    'crmSubscriptionOffer/data/putCustomer',
    async (data) => {
        const response = await apDeleteCharges(data)
       
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmCharges/data',
    initialState: {
        loading: false,
        customerList: null,
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
            state.customerList = action.payload.data
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
