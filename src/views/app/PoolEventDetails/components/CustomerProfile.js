import React, { useState } from 'react'
import { Card, Avatar, Button, Notification, toast } from 'components/ui'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../store/dataSlice'
import { openEditCustomerDetailDialog } from '../store/stateSlice'
import EditCustomerProfile from './EditCustomerProfile'
import dayjs from 'dayjs'

const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span className="text-gray-700 dark:text-gray-200 font-semibold">{title}</span>
            <p >
                {value}
            </p>
        </div>
    )
}

const CustomerProfileAction = ({ id }) => {

    const dispatch = useDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setDialogOpen(true)
    }

    const onDelete = () => {
        setDialogOpen(false)
        dispatch(deleteCustomer({ id }))
        navigate('/app/crm/personal-users')
        toast.push(
            <Notification title={'Successfuly Deleted'} type="success">
                Customer successfuly deleted
            </Notification>
        )
    }

    const onEdit = () => {
        dispatch(openEditCustomerDetailDialog())
    }

    return (
        <>
            {/* <Button block icon={<HiOutlineTrash />}disabled={dialogOpen} >
                Delete
            </Button>
            <Button
                icon={<HiPencilAlt />}
                block
                variant="solid"
                disabled={dialogOpen} 
            >
                Edit
            </Button> */}
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                type="danger"
                title="Delete customer"
                onCancel={onDialogClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this customer? All record
                    related to this customer will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
            {/* <EditCustomerProfile /> */}
        </>
    )
}

const CustomerProfile = ({ data = {} }) => {
    console.log(data, 'customerprofileprofile')
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex  items-center gap-4">
                    <Avatar size={90} shape="circle"  src={"https://api.kingpool.app/images/sports/"+data.data?.sport_icon}/>
                    <h4 className="font-bold">{data.data?.poolEventName}</h4>
                </div>
                <div className="flex   w-100 mt-10;                          ">
                            <div className='flex-1 mr-2 ' >
                                <CustomerInfoField title="Sport Name" value={data.data?.sport_name} />

                            </div>
                            <div className='flex-1   '>
                                <CustomerInfoField title="Pool Type" value={data.data?.pool_type} />

                            </div>
                        </div>
                <div className="mt-3" style={{width:'519px'}}>

                <CustomerInfoField title="Description" value={data.data?.poolEventDescription} />

                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <CustomerProfileAction id={data.personalInfo?.id} />
                </div>
            </div>
        </Card>
    )
}

export default CustomerProfile
