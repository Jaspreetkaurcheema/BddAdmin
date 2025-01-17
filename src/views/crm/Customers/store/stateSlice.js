import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmUsers/state',
    initialState: {
        drawerOpen: false,
        selectedCustomer: {},
        statusConfirmation:false
    },
    reducers: {
        toggleStatusConfirmation: (state, action) => {
            state.statusConfirmation = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
})

export const {
    toggleStatusConfirmation,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
