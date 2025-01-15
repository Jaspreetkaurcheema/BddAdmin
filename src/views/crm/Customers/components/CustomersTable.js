import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge, Tooltip } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineEye } from 'react-icons/hi'
import { left } from '@popperjs/core'

const statusColor = {
    Active: 'bg-emerald-500',
    Deleted: 'bg-red-500',
}

console.log(statusColor, 'hhfjdfjdfjhdf')

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }
    const onView = useCallback(() => {
        navigate(`/app/crm/customer-details?id=${row.user_id}&type=personal&action=${"created_pools_count"}`)
    }, [navigate, row])
    return (
        <div className="flex justify-end ">

            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 text-lg hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />

                </span>
            </Tooltip>
            {/* <div
                className={`${textTheme} cursor-pointer p-1 select-none  font-semibold whitespace-nowrap`}
                onClick={onEdit}
            >
                Edit
            </div> */}
        </div>
    )
}




const NameColumn = ({ row, style }) => {


    const { textTheme } = useThemeClass(); // assuming this is defined somewhere

    return (
        <div className={`flex items-center relative ml-5`} style={{ ...style }}>
            <Avatar size={28} shape="circle" src={row.profile_picture} />
            <div className="items-center ml-3 "> {/* Added relative class here */}
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}&type=personal&action=${"created_pools_count"}`}
                >
                    {row.name}
                </Link>
                <div className='font-semibold'><a href="mailto:this.guy@gmail.com?subject=Test">{row.email}</a></div>
                <div className="flex "> {/* Added relative class here */}
                    {/* Ribbon Code Here */}
                    {row.current_plan ? (row.current_plan == "Premium" ? <div className="">
                        <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-91px', lineHeight: '15px', color: '#f0f0f0', background: '#e43 ', top: '4px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium </div>
                    </div> :
                        <div className="">
                            <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-90px', lineHeight: '15px', color: '#f0f0f0', background: '#FF9800 ', top: '6px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium  yearly</div>
                        </div>) : <></>}
                </div>
            </div>
        </div>


    )
}




const columns = [

    {
        header: <span style={{ marginLeft: '1.25rem' }}>User name</span>, // Applying margin to the header
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original;
            return <NameColumn row={row} style={{ marginLeft: '1.25rem' }} />; // Applying margin to the cell
        },
    },
    // {
    //     header: 'Current Plan',
    //     accessorKey: 'plan',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex ">
    //                 {(row.current_plan)}
    //             </div>
    //         )
    //     },
    // },

    {
        header: 'No. of payments',
        accessorKey: 'number_of_payments',
        className: '',
        // with:'43%',
        cell: (props) => {
            const row = props.row.original
            return (
                <Link className={` mr-5 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}&type=personal&action=${"No_Pay"}`}
                >
                    <div className="grid justify-items-end  " style={{ width: '93%' }} >
                        {/* <div className="grid justify-items-end " style={{ width: '43%' }}> */}
                        {(row.number_of_payments)}
                    </div></Link>
            )
        },
    },
    {
        header: 'Created pools',
        accessorKey: 'created_pools_count',
        cell: (props) => {
            const row = props.row.original
            return (
                <Link className={` mr-5 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}&type=personal&action=${"created_pools_count"}`}
                >
                    <div className="grid justify-items-end" style={{ width: '93%' }}>

                        {(row.created_pools_count)}
                    </div></Link>


            )
        },
    },
    {
        header: 'Joined pools',
        accessorKey: 'joined_pool_count',
        cell: (props) => {
            const row = props.row.original
            return (
                <Link className={` mr-5 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}&type=personal&action=${"joined_pool_count"}`}
                >
                    <div className="grid justify-items-end" style={{ width: '93%' }} >

                        {(row.joined_pool_count)}
                    </div></Link>
            )
        },
    },
    {
        header: 'Active pools',
        accessorKey: 'joined_pool_count',
        cell: (props) => {
            const row = props.row.original
            return (
                <Link className={` mr-5 rtl:mr-2 font-semibold`}
                // to={`/app/crm/customer-details?id=${row.user_id}&&action=${"joined_pool_count"}`}
                >
                    <div className="grid justify-items-end" style={{ width: '93%' }} >

                        {(row.number_of_activepools)}
                    </div></Link>
            )
        },
    },
    // {
    //     header: 'Featured pools',
    //     accessorKey: 'joined_pool_count',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <Link className={` mr-5 rtl:mr-2 font-semibold`}
    //                 // to={`/app/crm/customer-details?id=${row.user_id}&&action=${"joined_pool_count"}`}
    //             >
    //                 <div className="grid justify-items-end" style={{ width: '93%' }} >

    //                     {(row.number_of_featuredpools)}
    //                 </div></Link>
    //         )
    //     },
    // },
    {
        header: 'Total Amount',
        accessorKey: 'amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end mr-5 rtl:mr-2 font-semibold" >
                    {(row.amount) ? "$" + (row.amount) : 0}
                </div>
            )
        },
    },
    {
        header: 'Registered On',
        accessorKey: 'lastOnline',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center" >
                    {dayjs(row.created_at).format('MM/DD/YYYY')}
                </div>
            )
        },
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center">
                    <Badge className={statusColor[row.status]} />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Action',
        id: 'action',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center"  >
                    <ActionColumn row={props.row.original} />
                </div>
            )
        },
    },


]

const Customers = () => {
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state.crmUsers.data.customerList)

    const total = useSelector((state) => state.crmUsers.data.customerList?.total_rows_count)
    const data = useSelector((state) => state.crmUsers.data.customerList?.users) || []
    const loading = useSelector((state) => state.crmUsers.data.loading)


    const filterType = useSelector(
        (state) => state.crmUsers.data.filterData.filterType
    )

    console.log(filterType, 'filterType')

    const { pageNumber, pageSize, usertype, search } = useSelector(
        (state) => state.crmUsers.data.tableData
    )


    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageNumber, pageSize, usertype: 1, search, filterType }))
    }, [pageNumber, pageSize, search, filterType, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, usertype, filterType])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, usertype, search, filterType }),
        [pageNumber, pageSize, search, total]
    )

    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageNumber = 1
        dispatch(setTableData(newTableData))
    }

    const on = () => {
        const newTableData = cloneDeep(tableData)
        // newTableData. = 
        dispatch(setTableData(newTableData))
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {data?.length > 0 ?
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ width: 28, height: 28 }}
                    loading={loading}
                    pagingData={{ pageNumber, pageSize, total }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                // on={onSort}
                /> : (
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="No user found!"
                        />
                        <h3 className="mt-8">No Users found!</h3>
                    </div>
                )
            }
            <CustomerEditDialog />
        </>
    )
}

export default Customers
