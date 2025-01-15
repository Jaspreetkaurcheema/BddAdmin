import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'crmOrganizers/state',
    initialState: {
        drawerOpen: false,
        deleteConfirmation:false,
        selectedCustomer: {},
        remainderConfirmation:false,
        statusConfirmation: false,

    },
    reducers: {
        toggleStatusConfirmation: (state, action) => {
            state.statusConfirmation = action.payload
        },
        toggleRemainderConfirmation: (state, action) => {
            state.remainderConfirmation = action.payload
        },
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
    toggleStatusConfirmation,
    toggleRemainderConfirmation,
    toggleDeleteConfirmation,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
