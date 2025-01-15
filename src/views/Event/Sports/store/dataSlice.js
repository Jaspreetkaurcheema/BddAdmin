import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    // apiGetCrmCustomers,
    apPutFaqCustomer,
    apDeleteCrmFaq,
    apPutSportsCustomer,
    apiGetCrmCustomersStatistic,
    apiGetSportsCustomers,
    apiUpdateSportsEnabledCustomers,
    apPutSportsTime
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmSports/data/getCustomers',
    async (params) => {
        const response = await apiGetSportsCustomers(params)
        return response.data
    }
)
export const deleteFaq = createAsyncThunk(
    'crmSports/data/putCustomer',
    async (data) => {
        const response = await apDeleteCrmFaq(data)

        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmSports/data/putCustomer',
    async (data) => {
        const response = await apPutSportsCustomer(data)
        return response.data
    }
)
export const putSportTime = createAsyncThunk(
    'crmSports/data/putCustomer',
    async (data) => {
        const response = await apPutSportsTime(data)
        return response.data
    }
)
export const getSportsEnabled = createAsyncThunk(
    'crmCharges/data/putCustomer',
    async (data) => {
        const response = await apiUpdateSportsEnabledCustomers (data)
        return response.data
    }
)
export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    search: '',

}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmSports/data',
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
