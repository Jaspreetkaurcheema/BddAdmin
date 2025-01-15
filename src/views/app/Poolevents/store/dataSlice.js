import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
    apiGetAppPoolEvents,
    apDeleteEvent,
    apPutCrmEventPool,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'appEvents/data/getCustomers',
    async (params) => {
        const response = await apiGetAppPoolEvents(params)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        const response = await apPutCrmEventPool(data)
        return response.data
    }
)
export const deleteEvent = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        const response = await apDeleteEvent(data)
        console.log(response,'resssss')
        return response.data
    }
)
export const initialTableData = {
    pageNumber: 1,
    pageSize: 25,
    sportId: null,
    search: ''
    // sort: {
    //     order: '',
    //     key: '',
    // },
}
// "poolTypeId": 1,
// "sportId": 0,
// "is_programmed": true,
// "eventfilterType": 1,
// "pageSize": 0,
// "pageNumber": 0

export const initialFilterData = {
    sportId:null,
    is_programmed: true,
    eventfilterType: null,
    poolTypeId:null
}

const dataSlice = createSlice({
    name: 'appEvents/data',
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
