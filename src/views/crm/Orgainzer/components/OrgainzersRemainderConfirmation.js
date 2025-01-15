import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import { RemainderOrgainzer, getOrganizer } from '../store/dataSlice'
import { toggleRemainderConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const OrganizersRemainderConfirmation = ({ isVisible, setIsVisible }) => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmOrganizers.state.remainderConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.crmOrganizers.state.selectedCustomer
    )
 
    const tableData = useSelector(
        (state) => state.crmOrganizers.data.tableData
    )
    const onDialogClose = () => {
        dispatch(toggleRemainderConfirmation(false))
        setIsVisible(false)
    }
    
    const onRemainder = async () => {
        dispatch(toggleRemainderConfirmation(false))

        const success = await dispatch(RemainderOrgainzer({ id: selectedProduct.id }))

        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        if (success) {
            dispatch(getOrganizer({ id: 2, ...tableData }))
            setIsVisible(false)
            toast.push(
                <Notification
                    title={'Successfuly Remainder'}
                    type="success"
                    duration={2500}
                >
                    Organizer successfuly Remainder
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen || isVisible}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}

            title="Remainder Organizer"
            onCancel={onDialogClose}
            onConfirm={onRemainder}
            confirmButtonColor="red-600"
        >
            <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form, by injected humour, or randomised words which dont
                look even slightly believable.
            </p>
        </ConfirmDialog>
    )
}

export default OrganizersRemainderConfirmation
