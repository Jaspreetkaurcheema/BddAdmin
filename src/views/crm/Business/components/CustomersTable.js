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

const statusColor = {
    Active: 'bg-emerald-500',
    Deleted: 'bg-red-500',
}


const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }
    const onView = useCallback(() => {
        navigate(`/app/crm/customer-details?id=${row.user_id}&type=business&action=${"created_pools_count"}`)
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
            <div
                className={`${textTheme} cursor-pointer p-1 select-none font-semibold whitespace-nowrap`}
            //  onClick={onEdit}
            >
                Edit
            </div>
        </div>
    )
}

// const NameColumn = ({ row,style }) => {

//     const { textTheme } = useThemeClass()

//     return (
//         <div className={`flex items-center relative ml-5`} style={{ ...style }}>
//         <Avatar size={28} shape="circle" src={row.profile_picture} />
//         <div className="items-center ml-3 "> {/* Added relative class here */}
//             <Link
//                 className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
//                 to={`/app/crm/customer-details?id=${row.user_id}&&action=${"created_pools_count"}`}
//             >
//                 {row.name}
//             </Link>
//             <div className='font-semibold'><a href="mailto:this.guy@gmail.com?subject=Test">{row.email}</a></div>
//             <div className="flex "> {/* Added relative class here */}
//                 {/* Ribbon Code Here */}
//                 {row.current_plan ? (row.current_plan == "Premium" ? <div className="">
//                     <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-130px', lineHeight: '15px', color: '#f0f0f0', background: '#e43 ', top: '11px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium </div>
//                 </div> :
//                     <div className="">
//                         <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-130px', lineHeight: '15px', color: '#f0f0f0', background: '#FF9800 ', top: '11px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium  yearly</div>
//                     </div>) : <></>}
//                 {/* End of Ribbon Code */}
//                 {/* Previous Code */}
//                 {/* {row.current_plan ? (row.current_plan == 'Premium' )?   <div className="absolute top-2 Premium" style={{ transform: 'rotate(318deg) ', left:'-90px' }}> 
//       <div className="bg-gradient-to-r rounded-lg text-white from-cyan-500 to-blue-500 text-xs px-1">
//           {row.current_plan}
//       </div>
//   </div> : <div className="absolute top-2 PremiumYear " style={{ transform: 'rotate(318deg) ', left:'-90px' }}> 
//   <div className="bg-gradient-to-r rounded-lg text-white from-cyan-500 to-blue-500 text-xs px-1">
//       {row.current_plan}
//   </div>
// </div> :<></>} */}
//                 {/* End of Previous Code */}
//             </div>
//         </div>
//     </div>
//     )
// }
const NameColumn = ({ row, style }) => {


    const { textTheme } = useThemeClass(); // assuming this is defined somewhere

    return (
        <div className={`flex items-center relative ml-5`} style={{ ...style }}>
            <Avatar size={28} shape="circle" src={row.profile_picture} />
            <div className="items-center ml-3 "> {/* Added relative class here */}
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}&type=business&action=${"created_pools_count"}`}
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
    //     header: 'Email',
    //     accessorKey: 'email',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return <div className='font-semibold'><a href="mailto:this.guy@gmail.com?subject=Test">{row.email}</a></div>
    //     },
    // },


    {
        header: 'Business Name',
        accessorKey: 'business_name',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.business_name)}
                </div>
            )
        },
    },
    {
        header: 'Website url',
        accessorKey: 'website_url',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.website_url)}
                </div>
            )
        },
    },

    // {
    //     header: 'hash payments',
    //     accessorKey: 'number_of_payments',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="grid justify-items-end">
    //                 <Link className={` ml-2 rtl:mr-2 font-semibold`}
    //                     to={`/app/crm/customer-details?id=${row.user_id}&&action=${"No_Pay"}`}
    //                 >{(row.number_of_payments)}</Link>
    //             </div>
    //         )
    //     },
    // },

    // {
    //     header: 'pools',
    //     accessorKey: 'created_pools_count',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="grid justify-items-end">
    //                 <Link className={` ml-2 rtl:mr-2 font-semibold`}
    //                     to={`/app/crm/customer-details?id=${row.user_id}&&action=${"created_pools_count"}`}
    //                 >   {(row.created_pools_count)}</Link>
    //             </div>
    //         )
    //     },
    // },
    {
        header: 'Total Amount',
        accessorKey: 'amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end" style={{ width: '77%' }}>
                    {(row.amount) ? "$" + (row.amount) : 0}
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
        header: 'Registered On',
        accessorKey: 'lastOnline',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs(row.created_at).format('MM/DD/YYYY')}
                </div>
            )
        },
    },
    {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]

const Customers = () => {
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state.crmCustomers.data.customerList)

    const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmCustomers.data.customerList?.users) || null
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterType = useSelector(
        (state) => state.crmCustomers.data.filterData.filterType
    )

    const { pageNumber, pageSize, usertype, isActive, search } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    console.log(data, 'datdtdaadadtadda')
    // {
    //     "isActive": true,
    //     "search": "string",
    //     "pageSize": 0,
    //     "pageNumber": 0,
    //     "usertype": 1
    //   }

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageNumber, pageSize, usertype: 2, isActive, search, filterType }))
    }, [pageNumber, pageSize, usertype, search, filterType, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, usertype, filterType])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, usertype: 2, search, }),
        [pageNumber, pageSize, usertype, filterType, search, total]
    )

    const onPaginationChange = (page) => {

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
