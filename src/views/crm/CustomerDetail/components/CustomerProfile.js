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
            <Button block icon={<HiOutlineTrash />} disabled={dialogOpen}  >
                Delete
            </Button>
            <Button
                icon={<HiPencilAlt />}
                block
                variant="solid"
            // onClick={onEdit}
            >
                Edit
            </Button>
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
            <EditCustomerProfile />
        </>
    )
}

const CustomerProfile = ({ data = {}, total={} }) => {
    console.log(data, 'dataper1')
    return (
        <Card className='overflow-hidden h-[210px] '>
            <div className="flex flex-col xl:justify-between  relative h-full 2xl:min-w-[400px] mx-auto ml-16 ">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                        <Avatar size={90} shape="circle" src={data.profile_pic ?data.profile_pic:''} />
                        <div>
                            <h4 className="font-bold">{data.full_name}</h4>
                            <CustomerInfoField value={data.email} />
                            {data.website_url ? <CustomerInfoField

                                value={total.total}
                            /> : <></>}
                        </div>
                        
                    </div>
                                        {/* <CustomerInfoField
                        title="Date of birth"
                        value=
                        {total.total}
                    /> */}
                    <div>


                        {/* <CustomerInfoField title="Plan Name" value={data.data?.user_details?.planName} /> */}
                    </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">

                    {/* <Button variant="solid" size="sm" >
                        Pool stats
                    </Button> */}
                    {/* <CustomerInfoField title="Name" value={data.data.user_details?.firstname} /> */}

                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                Total records : {total.total}
                {/* <CustomerInfoField
                        title="Total records"
                        value= {total.total}
                        /> */}
                </div>
            </div>
        </Card>
    )
}

export default CustomerProfile
