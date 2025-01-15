import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
    apiGetAppPoolEvents,
    apiGetAppPoolGames,
    apiGetAppInquiries,
    apiAddInquiry,
    apiGetAppReply,
    apiGetCorInquiries,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'supportInquiries/data/getCustomers',
    async (params) => {
        const response = await apiGetAppInquiries(params)
        return response.data
    }
)
export const getInquiry = createAsyncThunk(
    'supportInquiries/data/getInquiry',
    async (data) => {
        console.log(data,'psjdkfjkdfjklf')
        const response = await apiGetCorInquiries(data)
        return response.data
    }
)
export const getReply = createAsyncThunk(
    'supportInquiries/data/getReply',
    async (params) => {
        const response = await apiGetAppReply(params)

        console.log(response.data,'responce data')
        return response.data
    }
)

export const replyInquiry = createAsyncThunk(
    'supportInquiries/data/replyInquiry',
    async (data) => {
        const response = await apiAddInquiry(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const initialTableData = {

    search:'',
    pageNumber: 1,

    pageSize: 25,
    poolEventId:null,
      // sort: {
    //     order: '',
    //     key: '',
    // },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'supportInquiries/data',
    initialState: {
        loading: false,
        customerList: [],
        statisticData: {},
        replyList:[],
        inquiryList:[],
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
        setReplyData:(state,action)=>{
            state.replyList = action.payload
        },
        setInquiryData:(state,action)=>{
            state.inquiryList=action.payload
        }
    },
    extraReducers: {
        [getInquiry.fulfilled]: (state, action) => {    
            state.inquiryList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getInquiry.pending]: (state) => {
            state.loading = true
        },
        [getReply.fulfilled]: (state, action) => {
    
            state.replyList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getReply.pending]: (state) => {
            state.loading = true
        },
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

export const { setTableData, setCustomerList, setFilterData,setReplyData ,setInquiryData} =
    dataSlice.actions

export default dataSlice.reducer
