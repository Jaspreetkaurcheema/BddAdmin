import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import {  deleteFaq, getCustomers } from '../store/dataSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const FaqDeleteConfirmation = ({isVisible,setIsVisible}) => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmGames.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.crmGames.state.selectedCustomer
    )
    const tableData = useSelector(
        (state) => state.crmGames.data.tableData
    )
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
        setIsVisible(false)
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
      
        const success = await dispatch(deleteFaq({ id: selectedProduct.id, isDelete: true }))
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
                    Faq successfuly deleted
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
            title="Delete FAQ"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this FAQ ? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default FaqDeleteConfirmation
