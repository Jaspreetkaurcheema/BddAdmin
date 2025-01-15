import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { Card, Avatar, Button, Notification, toast, Dialog } from 'components/ui'
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
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaChessQueen } from "react-icons/fa";


const Profile = ({ data }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <Button variant="solid" onClick={() => openDialog()}>


                <span className="flex items-center gap-4"> <FaUserCircle style={{ fontSize: '23px' }} /> Owner info</span>
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Card>
                    <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                        <h4 className="font-bold flex xl:flex-col items-center pb-4">Pool Owner Info</h4>
                        <div className="flex xl:flex-col items-center gap-4">
                            <Avatar size={90} shape="circle" src={data.data.pool_owner_detail ? data.data.pool_owner_detail[0]?.profile_picture : <></>} />
                            <h4 className="font-bold">{data.data.pool_owner_detail ? data.data.pool_owner_detail[0]?.pool_owner : ''}</h4>
                        </div>

                        <div className="flex   w-100 mt-10;                          ">
                            <div className='flex-1 mr-2 ' >
                                <CustomerInfoField title="User Type" value={data.data?.pool_owner_detail ? data.data?.pool_owner_detail[0]?.user_type : ''} />

                            </div>
                            <div className='flex-1   '>
                                <CustomerInfoField title="Pool Owner Email" value={data.data?.pool_owner_detail ? data.data?.pool_owner_detail[0]?.pool_owner_email : ''} />

                            </div>
                        </div>
                        <div className="mt-4 flex flex-col xl:flex-row gap-2">

                        </div>
                    </div>
                </Card>
                {/* <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div> */}
            </Dialog>
        </div>
    )
}

const Setting = ({ data }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {

        setIsOpen(false)
    }

    const onDialogOk = () => {

        setIsOpen(false)
    }

    return (
        <div>
            <Button variant="solid" onClick={() => openDialog()}>
                <span className="flex items-center gap-4">   <IoSettings style={{ fontSize: '23px' }} /> Pool info </span>
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Card>
                    <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                        <div className="flex xl:flex-col items-center gap-2">
                            {/* <Avatar size={90} shape="circle" src={data.data.pool_owner_detail[0]?.profile_picture} /> */}
                            <h4 className="font-bold pb-4">Pool Setting Info</h4>
                        </div>
                        {data.data?.pool_settings.map((item) =>
                        (
                            <div key={item.setting_key_label} className="flex  justify-between w-100 ;                          ">
                                <div className='flex-1 mr-2 text-xs' >
                                    <CustomerInfoField value={item?.setting_key_label} />
                                </div>
                                <div className='flex-1  text-xs text-right'>
                                    <CustomerInfoField value={item?.setting_value} />
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 flex flex-col xl:flex-row gap-2">
                            {/* <CustomerProfileAction id={data.personalInfo?.id} /> */}
                        </div>
                    </div>
                </Card>
                {/* <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div> */}
            </Dialog>
        </div>
    )
}








const Winner = ({ data }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {

        setIsOpen(false)
    }

    const onDialogOk = () => {

        setIsOpen(false)
    }

    return (
        <div>
            <Button variant="solid" disabled={data.data?.pool_winner_detail ? false : true} onClick={() => openDialog()}>
                <span className="flex items-center gap-4"><FaChessQueen style={{ fontSize: '20px' }} />  Winner</span>
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Card>
                    Winner
                </Card>
                {/* <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div> */}
            </Dialog>
        </div>
    )
}








const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span className="text-gray-700 dark:text-gray-50 font-semibold">{title}</span>
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
            <Button block icon={<HiOutlineTrash />} disabled={dialogOpen}>
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

const CustomerProfile = ({ data = {} }) => {



    return (
        // <Card>
        //     <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        //         <div className="flex xl:flex-col items-center gap-4">
        //             <Avatar size={90} shape="circle" src={data.data?.profile_picture} />
        //             <h4 className="font-bold">{data.data?.name}</h4>
        //         </div>
        //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">

        //             <CustomerInfoField title="Pool Type" value={data.data?.pool_type} />
        //             {/* <CustomerInfoField
        //                 title="Pool Event"
        //                 value={data.data?.pool_event} */}
        //             {/* // /> */}
        //             {/* <CustomerInfoField
        //                 title="Bio"
        //                 value={data.data?.bio}
        //             /> */}
        //             {/* <CustomerInfoField
        //                 title="Date of birth"
        //                 value=
        //                 {dayjs(data.personalInfo?.dob).format('MM/DD/YYYY')}
        //             /> */}
        //             <CustomerInfoField
        //                 title="Pool Owner"
        //                 value={data.data?.pool_owner_email}
        //             />
        //             {/* <CustomerInfoField
        //                 title="Event Name"
        //                 value={data.data?.eventname}
        //             /> */}
        //             {/* <div className="mb-7">
        //                 <span>Social</span>
        //                 <div className="flex mt-4">
        //                     <Button
        //                         className="mr-2"
        //                         shape="circle"
        //                         size="sm"
        //                         icon={
        //                             <FaFacebookF className="text-[#1773ea]" />
        //                         }
        //                     />
        //                     <Button
        //                         className="mr-2"
        //                         shape="circle"
        //                         size="sm"
        //                         icon={<FaTwitter className="text-[#1da1f3]" />}
        //                     />
        //                     <Button
        //                         className="mr-2"
        //                         shape="circle"
        //                         size="sm"
        //                         icon={
        //                             <FaLinkedinIn className="text-[#0077b5]" />
        //                         }
        //                     />
        //                     <Button
        //                         className="mr-2"
        //                         shape="circle"
        //                         size="sm"
        //                         icon={
        //                             <FaPinterestP className="text-[#df0018]" />
        //                         }
        //                     />
        //                 </div>
        //             </div> */}
        //         </div>
        //         <div className="mt-4 flex flex-col xl:flex-row gap-2">
        //             <CustomerProfileAction id={data.personalInfo?.id} />
        //         </div>
        //     </div>

        // </Card>

        <>
            <Card>
                <div className="flex flex-col xl:justify-between h-full  2xl:min-w-[509px] ">
                    <div className="flex  items-center justify-between gap-4">
                        <div className="flex  items-center justify-between gap-4 mb-3">
                            <Avatar size={90} shape="circle" src={data.data?.profile_picture} />
                            <h4 className="font-bold">{data.data?.name}</h4>
                        </div>

                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${data.data?.sport_icon}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{data.data?.sportName}</div>
                                <div className='font-normal'>{data.data?.pool_event}</div>
                                <div className='font-bold'>{data.data?.pool_type}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex  items-center justify-between gap-3  mt-5">
                        <Profile data={data} />
                        <Setting data={data} />
                        <Winner data={data} />


                    </div>
                    {/* <div className="mt-4 flex flex-col xl:flex-row gap-2">
                        <CustomerProfileAction id={data.personalInfo?.id} />
                    </div> */}
                </div>
                {/* <div style={{ marginBottom: '20px' }}></div> */}
                {/* <Card>
                    <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                        <h4 className="font-bold flex xl:flex-col items-center pb-4">Pool Owner Info</h4>
                        <div className="flex xl:flex-col items-center gap-4">
                            <Avatar size={90} shape="circle" src={data.data.pool_owner_detail[0]?.profile_picture} />
                            <h4 className="font-bold">{data.data.pool_owner_detail[0]?.pool_owner}</h4>
                        </div>
                        
                        <div className="flex   w-100 mt-10;                          ">
                            <div className='flex-1 mr-2 ' >
                                <CustomerInfoField title="User Type" value={data.data?.pool_owner_detail[0].user_type} />

                            </div>
                            <div className='flex-1   '>
                                <CustomerInfoField title="Pool Owner Email" value={data.data?.pool_owner_detail[0]?.pool_owner_email} />

                            </div>
                        </div>
                        <div className="mt-4 flex flex-col xl:flex-row gap-2">
                           
                        </div>
                    </div>
                </Card> */}
                {/* "pool_winner_detail": {
            "winner_user_id": 132,
            "winner_user_name": "taran",
            "total_points": null,
            "competitor_id": 23,
            "team_logo": "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png",
            "team_name": "Pittsburgh Steelers"
        }, */}

            </Card>
            {/* <div style={{ marginBottom: '20px' }}></div>
          
            <Card>
                <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <div className="flex xl:flex-col items-center gap-2">
                     
                        <h4 className="font-bold pb-4">Pool Setting Info</h4>
                    </div>
                    {data.data?.pool_settings.map((item) =>
                    (
                        <div key={item.setting_key_label} className="flex  justify-between w-100 ;                          ">
                            <div className='flex-1 mr-2 text-xs' >
                                <CustomerInfoField value={item?.setting_key_label} />
                            </div>
                            <div className='flex-1  text-xs text-right'>
                                <CustomerInfoField value={item?.setting_value} />
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 flex flex-col xl:flex-row gap-2">
                     
                    </div>
                </div>
            </Card>
            <div style={{ marginBottom: '20px' }}></div> */}
            {/* {data.data.pool_winner_detail ? 
            <Card>
                <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <h4 className="font-bold flex xl:flex-col items-center pb-4">Pool Winner Info</h4>
                    <div className="flex xl:flex-col items-center gap-4">
                        <Avatar size={90} shape="circle" src={data.data.pool_winner_detail?.team_logo} />
                        <h4 className="font-bold">{data.data.pool_winner_detail?.winner_user_name}</h4>
                    </div>
                 
                    <div className="flex  justify-between w-100 mt-10;                          ">
                        <div className='flex-1 mr-2 ' >
                            <CustomerInfoField title="Team Name" value={data.data?.pool_winner_detail.team_name} />

                        </div>
                        <div className='flex-1   text-right'>
                            <CustomerInfoField title="Points" value={data.data?.total_points?.total_points} />

                        </div>
                    </div>
                    <div className="mt-4 flex flex-col xl:flex-row gap-2">
                     
                    </div>
                </div>
            </Card> : <></>} */}


        </>


    )
}

export default CustomerProfile
