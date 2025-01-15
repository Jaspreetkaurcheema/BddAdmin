import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'supportInquiries/state',
    initialState: {
        drawerOpen: false,
        selectedCustomer: {},
        newReplyDialog :false
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
        setReplyDialog : (state ,action) =>{
            state.newReplyDialog =  action.payload
        }
    },
})

export const {
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
    setReplyDialog
} = stateSlice.actions

export default stateSlice.reducer
