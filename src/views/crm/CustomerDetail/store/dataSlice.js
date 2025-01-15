import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
    apiGetCrmPoolList,
    apiGetCrmActivePoolList,
    apiGetCrmFeaturedPoolList,
    apiGetCrmAccomplishList,
    apiGetHistoryList,
    apiGetCrmPaymentPoolList,
    apiGetEntriesList,
    apiGetPoolStats,
} from 'services/CrmService'

export const getCustomer = createAsyncThunk(
    'crmCustomerDetailss/data/getCustomer',
    async (data) => {
        const response = await apiGetCrmCustomerDetails(data)
        return response.data
    }
)
export const getPoolList = createAsyncThunk(
    'crmCustomerDetailss/data/getPoolList',
    async (params) => {
        const response = await apiGetCrmPoolList(params)
        return response.data
    }
)
export const getActivePoolList = createAsyncThunk(
    'crmCustomerDetailss/data/getActivePoolList',
    async (params) => {
        const response = await apiGetCrmActivePoolList(params)
        return response.data
    }
)
export const getFeaturedPoolList = createAsyncThunk(
    'crmCustomerDetailss/data/getFeaturedPoolList',
    async (params) => {
        const response = await apiGetCrmFeaturedPoolList(params)
        return response.data
    }
)
export const getPaymentPoolList = createAsyncThunk(
    'crmCustomerDetailss/data/getPaymentPoolList',
    async (params) => {
        const response = await apiGetCrmPaymentPoolList(params)
        return response.data
    }
)
export const getAccomplishList = createAsyncThunk(
    'crmCustomerDetailss/data/getAccomplishList',
    async (params) => {
        const response = await apiGetCrmAccomplishList(params)
        return response.data
    }
)
export const getEntiesList = createAsyncThunk(
    'crmCustomerDetailss/data/getEntiesList',
    async (params) => {
        const response = await apiGetEntriesList(params)
        return response.data
    }
)
export const getPoolStats = createAsyncThunk(
    'crmCustomerDetailss/data/getPoolStats',
    async (params) => {
        const response = await apiGetPoolStats(params)
        return response.data
    }
)
export const getHistoryList = createAsyncThunk(
    'crmCustomerDetailss/data/getHistoryList',
    async (params) => {
        const response = await apiGetHistoryList(params)
        return response.data
    }
)
export const deleteCustomer = createAsyncThunk(
    'crmCustomerDetailss/data/deleteCustomer',
    async (data) => {
        const response = await apiDeleteCrmCustomer(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomerDetailss/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)

        return response.data
    }
)
export const initialTableData = {
    isJoined: true,
    pageNumber: 1,
    pageSize: 25,
    search: ''

}

export const initialFilterData = {
    isJoined: true,
}
export const initialData = {
    filter_type: 1,
    paymentType:1
}
const dataSlice = createSlice({
    name: 'crmCustomerDetailss/data',
    initialState: {
        loading1: false,
        loading2: false,
        profileData: {},
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: [],
        tableData: initialTableData,
        poolList: [],
        activeList: [],
        featurePoolList: [],
        AccomplishList: [],
        paymentList: [],
        entriesList: [],
        historyList: [],
        poolStats: {},
        filterData: initialFilterData,
        filterHistory: initialData
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setPoolList: (state, action) => {
            state.poolList = action.payload
        },
        setPaymentList: (state, action) => {
            state.paymentList = action.payload
        },
        setEnriesList: (state,action) => {
            state.entriesList = action.payload
        },
        setPoolStats: (state,action) => {
            state.poolStats = action.payload
        },
        setPoolHistoryList: (state, action) => {
            state.historyList = action.payload
        },
        setFeaturePoolList: (state, action) => {
            state.featurePoolList = action.payload
        },
        setActivePoolList: (state, action) => {
            state.activeList = action.payload
        },
        setAcomplishList: (state, action) => {
            state.AccomplishList = action.payload
        },
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterHistory = action.payload
        },
    },
    extraReducers: {
        [getEntiesList.fulfilled]: (state, action) => {
            state.entriesList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getEntiesList.pending]: (state) => {
            state.loading2 = true
        },
        [getPoolStats.fulfilled]: (state, action) => {
            state.poolStats = action.payload
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getPoolStats.pending]: (state) => {
            state.loading2 = true
        },
        [getPaymentPoolList.fulfilled]: (state, action) => {
            state.paymentList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getPaymentPoolList.pending]: (state) => {
            state.loading2 = true
        },
        [getHistoryList.fulfilled]: (state, action) => {
            state.historyList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getHistoryList.pending]: (state) => {
            state.loading2 = true
        },
        [getPoolList.fulfilled]: (state, action) => {
            state.poolList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getPoolList.pending]: (state) => {
            state.loading2 = true
        },
        [getFeaturedPoolList.fulfilled]: (state, action) => {
            state.featurePoolList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getFeaturedPoolList.pending]: (state) => {
            state.loading2 = true
        },
        [getAccomplishList.fulfilled]: (state, action) => {
            state.AccomplishList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getAccomplishList.pending]: (state) => {
            state.loading2 = true
        },
        [getActivePoolList.fulfilled]: (state, action) => {
            console.log(action.payload, 'ppphsjdhjsd')
            state.activeList = action.payload.data
            state.tableData.total = action.payload?.total
            state.loading2 = false
        },
        [getActivePoolList.pending]: (state) => {
            state.loading2 = true
        },
        [getCustomer.fulfilled]: (state, action) => {

            state.loading1 = false
            state.profileData = action.payload
            state.subscriptionData = action.payload?.subscription || []
            state.paymentHistoryData = action.payload?.orderHistory || []
            state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [deleteCustomer.fulfilled]: () => { },
        [putCustomer.fulfilled]: () => { },
        [getCustomer.pending]: (state) => {
            state.loading1 = true
        },

    },
})

export const { updatePaymentMethodData, updateProfileData, setPoolList, setTableData, setActivePoolList, setFeaturePoolList, setAcomplishList, setPoolHistoryList, setFilterData, setPaymentList ,setEnriesList, setPoolStats} = dataSlice.actions

export default dataSlice.reducer
