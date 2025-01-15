import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteOrgainzer, getOrganizer } from '../store/dataSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const OrganizersDeleteConfirmation = ({isVisible,setIsVisible}) => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmOrganizers.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) =>  state.crmOrganizers.state.selectedCustomer
    )
     
    const tableData = useSelector(
        (state) => state.crmOrganizers.data.tableData
    )
    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
        setIsVisible(false)
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
       
        const success = await dispatch(deleteOrgainzer ({ id: selectedProduct.id, isDelete: true }))
     
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        if (success) {
            dispatch(getOrganizer({id:2,...tableData}))
            setIsVisible(false)
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Organizer successfuly deleted
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
            title="Delete Organizer"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this Organizer ? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default OrganizersDeleteConfirmation
