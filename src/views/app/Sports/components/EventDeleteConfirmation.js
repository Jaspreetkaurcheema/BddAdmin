import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'

import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteEvent, getCustomers } from '../store/dataSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const EventDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.appEvents.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.appEvents.state.selectedCustomer
    )
    const tableData = useSelector(
        (state) => state.appEvents.data.tableData
    )
    console.log(selectedProduct.id, 'sele12')
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await dispatch(deleteEvent({ poolEventId: selectedProduct.id, isDelete: true }))
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        if (success) {
            dispatch(getCustomers(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Promo code successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete PoolEvent"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this PoolEvent? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default EventDeleteConfirmation
