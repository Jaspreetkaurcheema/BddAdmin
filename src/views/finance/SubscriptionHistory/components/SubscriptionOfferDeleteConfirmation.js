import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import {     deleteSubscriptionOffer, getCustomers } from '../store/dataSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const SubscriptionOfferDeleteConfirmation = ({isVisible,setIsVisible}) => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmSubscriptionHistory.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.crmSubscriptionHistory.state.selectedCustomer
    )
    const tableData = useSelector(
        (state) => state.crmSubscriptionHistory.data.tableData
    )
   
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
        setIsVisible(false)
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await dispatch(deleteSubscriptionOffer({ id: selectedProduct.id, isDelete: true }))
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        if (success) {
            dispatch(getCustomers(tableData))
            setIsVisible(false)
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Subscription Offer successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={ dialogOpen || isVisible}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Subscription Offer "
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this Subscription Offer ? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default SubscriptionOfferDeleteConfirmation