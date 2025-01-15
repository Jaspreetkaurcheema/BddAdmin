import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteFaq, deletePromo, getCustomers } from '../store/dataSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const FaqDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmCustomers.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const tableData = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    console.log(selectedProduct.id, 'sele')
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await dispatch(deleteFaq({ faqId: selectedProduct.id, isDelete: true }))
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
            title="Delete promocode"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this promocode? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default FaqDeleteConfirmation
