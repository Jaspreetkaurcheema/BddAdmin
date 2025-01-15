import React, { useState } from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import { statusOrgainzer, getCustomers } from '../store/dataSlice'
import { toggleStatusConfirmation } from '../store/stateSlice'
// import { deleteProduct, getProducts } from '../store/dataSlice'

const IndividualsStatusConfirmation = ({status_id, isVisible,setIsVisible}) => {

    const [remarks,setRemark]=useState('')
   
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.crmIndividuals?.state?.statusConfirmation
    )
    const selectedProduct = useSelector(
        (state) =>  state.crmIndividuals?.state?.selectedCustomer
    )
    const tableData = useSelector(
        (state) => state.crmIndividuals?.data?.tableData
    )
    
    const onDialogClose = () => {
        dispatch(toggleStatusConfirmation(false))
        setIsVisible(false)
    }
    
    const onStatus = async () => {
        dispatch(toggleStatusConfirmation(false))
       
        const success = await dispatch(statusOrgainzer ({ id: selectedProduct.id, status_id, remarks }))
     
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        if (success) {
            dispatch(getCustomers({id:8,...tableData}))
            setIsVisible(false)
            toast.push(
                <Notification
                    title={'Successfuly'}
                    type="success"
                    duration={2500}
                >
                    Individual successfuly Status
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
        title="Enter Remarks"
        onCancel={onDialogClose}
        onConfirm={onStatus}
        confirmButtonColor="red-600"
    >
       
        <textarea
        style={{ marginTop: '10px',
        width: '400px', 
        height: '200px',
        border: '2px solid black',
         }}
            type="text"
            autoComplete="off"
            name="remarks"
            placeholder="Enter Remarks"
            onChange={(e) => 
                        setRemark(e.target.value)
                
            }
        />
    </ConfirmDialog>
    
    )
}

export default IndividualsStatusConfirmation
