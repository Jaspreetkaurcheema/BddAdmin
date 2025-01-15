import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { round } from 'lodash'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
    apiGetCrmPoolEventDetails,
    apiGetPoolEventDetail,
    apiGetCrmPoolTeamDetails,
    apiGetCrmPools,
} from 'services/CrmService'

export const getCustomer = createAsyncThunk(
    'poolEventDetails/data/getCustomer',
    async (data) => {
        const response = await apiGetPoolEventDetail(data)
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
export const getCustomers = createAsyncThunk(
    'poolEventDetails/data/getCustomers',
    async (params) => {
        const response = await apiGetCrmPools(params)
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

export const getPoolEventDetails = createAsyncThunk(
    'poolEventDetails/data/getPoolEventDetails',
    async (data) => {
        const response = await apiGetCrmPoolEventDetails(data)
        
        console.log(response.data , "djshjshd response")
        return response.data
    }
)
export const getPoolTeamDetails = createAsyncThunk(
    'poolEventDetails/data/getPoolTeamDetails',
    async (data) => {
        const response = await apiGetCrmPoolTeamDetails(data)
        return response.data
    }
)
export const initialTableData = {
    pageSize: 25,
    search:'',
    pageNumber: 1,
    poolEventId:null,
  
}
export const initialFilterData = {
    season:null,
    filterType: 2,
    eventfilterType: 4,
    sportId:null,
    poolType: null,

  
}
export const initialData = {
    roundId:null,
    regionId:null
  
}
const dataSlice = createSlice({
    name: 'poolEventDetails/data',
    initialState: {
        loading: false,
        loading1: false,
        loading2:false,
        loading3:false,
        profileData: {},
        teamList:[],
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: [],
        tableData: initialTableData,
        filterData:initialFilterData,
        roundData:initialData,
        gameList:[],
        poolList:[],
    },
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            console.log(action,'jdsjfhskdfj')
            state.filterData = action.payload
        },
        setRoundData: (state, action) => {
            state.roundData = action.payload
        },
        setPoolList: (state, action) => {
            state.poolList= action.payload
        },
        setgameList: (state, action) => {
            state.gameList = action.payload
        },
        setteamList: (state, action) => {
            state.teamList = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.poolList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading3 = false
        },
        [getCustomers.pending]: (state) => {
            state.loading3 = true
        },
        [getPoolEventDetails.fulfilled]:(state,action)=>{
            state.gameList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading1 = false
        },
        [getPoolEventDetails.pending]: (state) => {
            state.loading1 = true
        },
        [getPoolTeamDetails.fulfilled]:(state,action)=>{
            state.teamList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading2 = false
        },
        [getPoolTeamDetails.pending]: (state) => {
            state.loading2 = true
        },
        [getCustomer.fulfilled]: (state, action) => {
            state.loading = false
            state.profileData = action.payload
            state.subscriptionData = action.payload?.subscription || []
            state.paymentHistoryData = action.payload?.orderHistory || []
            state.paymentMethodData = action.payload?.paymentMethod || []

        },
        // [getPoolEventDetails.fulfilled]:(state,action)=>{
        //     console.log(action , action.payload , "kdkljdk")
        //     state.profileData = action.payload
        // },
        [deleteCustomer.fulfilled]: () => {},
        [putCustomer.fulfilled]: () => {},
        [getCustomer.pending]: (state) => {
            state.loading = true
        },
    },
})


export const { updatePaymentMethodData, updateProfileData ,setgameList,setteamList,setTableData,setFilterData,setRoundData,setPoolList} = dataSlice.actions

export default dataSlice.reducer
