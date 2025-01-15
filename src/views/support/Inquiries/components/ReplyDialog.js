import React from 'react'
import { Dialog } from 'components/ui'
import { setReplyDialog, toggleNewProjectDialog } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewReplyForm from './ReplyForm'

const NewReplyDialog = () => {
    const dispatch = useDispatch()

    const newReplyDialog = useSelector(
        (state) => state.supportInquiries.state.newReplyDialog
    )
  

    const onDialogClose = () => {
        dispatch(setReplyDialog(false))
    }

    return (
        <Dialog
            isOpen={newReplyDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Reply</h4>
            <div className="mt-4">
                <NewReplyForm />
            </div>
        </Dialog>
    )
}

export default NewReplyDialog
