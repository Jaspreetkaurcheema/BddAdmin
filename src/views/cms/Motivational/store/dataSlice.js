import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apPutMotivationalCustomer,
    apiGetCrmCustomersStatistic,
    apDeleteCrmMotivational,
    apiGetMotivationalCustomers
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmMotivational/data/getCustomers',
    async (params) => {
        const response = await apiGetMotivationalCustomers(params)
        return response.data
    }
)
export const deleteMotivational = createAsyncThunk(
    'crmMotivational/data/putCustomer',
    async (data) => {
        const response = await apDeleteCrmMotivational(data)
       
        return response.data
    }
)
export const putCustomer = createAsyncThunk(
    'crmMotivational/data/putCustomer',
    async (data) => {
        const response = await apPutMotivationalCustomer(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
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
    name: 'crmMotivational/data',
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
