import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apPutCrmCustomer,
    apiGetCrmOrganizerList,
    apDeleteCrmOrgainzer,
    apiGetCrmCustomersStatistic,
    apRemainderCrmOrgainzer,
    apStatusCrmOrgainzer,
} from 'services/CrmService'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getOrganizer = createAsyncThunk(
    'crmOrganizers/data/getOrganizer',
    async (params) => {
        const response = await apiGetCrmOrganizerList(params)
        return response.data
    }
)
export const deleteOrgainzer = createAsyncThunk(
    'crmOrganizers/data/putCustomer',
    async (data) => {
      
        const response = await apDeleteCrmOrgainzer(data)
      
        
        return response.data
    }
)
export const RemainderOrgainzer = createAsyncThunk(
    'crmOrganizers/data/putCustomer',   
    async (data) => {
    
        const response = await apRemainderCrmOrgainzer(data)
      
        
        return response.data
    }
)
export const statusOrgainzer = createAsyncThunk(
    'crmOrganizers/data/putCustomer',
    async (data) => {
     
        const response = await apStatusCrmOrgainzer(data)
      
       
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmOrganizers/data/putCustomer',
    async (data) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    search: '',
    enabled: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmOrganizers/data',
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
            console.log(setTableData, "mmmmmm")
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getOrganizer.fulfilled]: (state, action) => {
            state.customerList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrganizer.pending]: (state) => {
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
