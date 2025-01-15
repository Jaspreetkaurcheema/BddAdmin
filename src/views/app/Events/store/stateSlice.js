import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmCustomers/state',
    initialState: {
        drawerOpen: false,
        deleteConfirmation: false,
        selectedCustomer: {},
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
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
    toggleDeleteConfirmation,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
