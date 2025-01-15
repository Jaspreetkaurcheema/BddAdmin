import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
    apiGetCrmPoolDetails,
    apiGetAppPoolEntries,
    apiGetAppPoolMembers,
    apiGetAppPoolLeader,
    apiGetAppPoolAnalytic,
} from 'services/CrmService'

export const getCustomer = createAsyncThunk(
    'crmCustomerDetails/data/getCustomer',
    async (data) => {
        const response = await apiGetCrmCustomerDetails(data)
        return response.data
    }
)
export const getPool = createAsyncThunk(
    'crmCustomerDetails/data/getCustomer',
    async (data) => {
        const response = await apiGetCrmPoolDetails(data)
        return response.data
    }
)
export const getPoolMembers = createAsyncThunk(
    'crmCustomerDetails/data/getPoolMembers',
    async (params) => {
        const response = await apiGetAppPoolMembers(params)
        return response.data
    }
)
export const getPoolLeader = createAsyncThunk(
    'crmCustomerDetails/data/getPoolLeader',
    async (params) => {
        const response = await apiGetAppPoolLeader(params)
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmCustomerDetails/data/getCustomers',
    async (params) => {
        const response = await apiGetAppPoolEntries(params)
        return response.data
    }
)
export const getPoolAnalytic = createAsyncThunk(
    'crmCustomerDetails/data/getPoolAnalytic',
    async (params) => {
        const response = await apiGetAppPoolAnalytic(params)
        return response.data
    }
)
export const deleteCustomer = createAsyncThunk(
    'crmCustomerDetails/data/deleteCustomer',
    async (data) => {
        const response = await apiDeleteCrmCustomer(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomerDetails/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const initialTableData = {
    pageSize: 25,
    search: '',
    pageNumber: 1,
    poolId: null,

}
export const intialFilterData={
    roundId:null
}

const dataSlice = createSlice({
    name: 'crmCustomerDetails/data',
    initialState: {
        loading: false,
        loading1: false,
        profileData: {},
        customerList: [],
        memberList: [],
        leaderList: [],
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: [],
        tableData: initialTableData,
        filterData:intialFilterData
    },
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setMemberList: (state, action) => {
            state.memberList = action.payload
        },
        setleaderList: (state, action) => {
            state.leaderList = action.payload
        },
        setAnalyticList: (state, action) => {
            state.AnalyticList = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },


    extraReducers: {
        [getPoolLeader.fulfilled]: (state, action) => {
            state.leaderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getPoolLeader.pending]: (state) => {
            state.loading = true;
        },

        [getPoolAnalytic.fulfilled]: (state, action) => {

            state.AnalyticList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getPoolAnalytic.pending]: (state) => {
            state.loading = true
        },
        [getPoolMembers.fulfilled]: (state, action) => {

            state.memberList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getPoolMembers.pending]: (state) => {
            state.loading = true
        },

        [getCustomers.fulfilled]: (state, action) => {
            console.log('getCustomers fulfilled', action.payload);
            state.customerList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [getCustomer.fulfilled]: (state, action) => {
            state.loading = false
            state.profileData = action.payload
            state.subscriptionData = action.payload?.subscription || []
            state.paymentHistoryData = action.payload?.orderHistory || []
            state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [deleteCustomer.fulfilled]: () => { },
        [putCustomer.fulfilled]: () => { },
        [getCustomer.pending]: (state) => {
            state.loading = true
        },
        [getPool.fulfilled]: (state, action) => {
            state.loading1 = false
            state.profileData = action.payload
            // state.subscriptionData = action.payload?.subscription || []
            // state.paymentHistoryData = action.payload?.orderHistory || []
            // state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [getPool.pending]: (state) => {
            state.loading1 = true
        },
    },
})

export const { updatePaymentMethodData, updateProfileData, setTableData, setCustomerList, setMemberList, setleaderList, setAnalyticList ,setFilterData} = dataSlice.actions

export default dataSlice.reducer
