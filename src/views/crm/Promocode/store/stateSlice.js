import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmCustomers/state',
    initialState: {
        drawerOpen: false,
        deleteConfirmation: false,
        selectedCustomer: {},
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
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
    toggleDeleteConfirmation,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
