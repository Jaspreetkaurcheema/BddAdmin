import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable, DoubleSidedImage } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            // onClick={onEdit}
        >
            Edit
        </div>
    )
}

const NameColumn = ({ row }) => {
    
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {/* <Avatar size={28} shape="circle" src={row.profile_picture} /> */}
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.user_id}`}
            > */}
                {row.
name
}
            {/* </Link> */}
        </div>
    )
}
const IdColumn = ({ row }) => {
    
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
                 <Avatar size={28} shape="circle" src={row?.profile_picture} />
        <Link
            className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
            to={`/app/crm/customer-details?id=${row.user_id}`}
        >
            {row.userName}
            
        </Link>
        </div>
    )
}
const columns = [

    // {
    //     header: 'User ID',
    //     accessorKey: 'id',
    //     cell: (props) => {
    //         const row = props?.row?.original
    //         return (
    //             <div>
    //                 <span className="cursor-pointer">{row?.
    //                     user_id}</span>
    //             </div>
    //         )
    //     },
    // },
    {
        header: 'User Name',
        accessorKey: 'user name',
        cell: (props) => {
            const row = props?.row?.original
            return <IdColumn row={row} />
        
        },
    },
    {
        header: 'Email',
        accessorKey: 'email',
        cell: (props) => {
            const row = props?.row?.original
            return (
                <div>
                    <span className="flex items-center">{row?.email
                    }</span>
                </div>
            )
        },
    },

      {
        header: ' Pool Name',
        accessorKey: 'pool name',
        cell: (props) => {
            const row = props?.row?.original
            return (
                <div className="flex items-center">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row?.poolName
                        }
                    </span>
                </div>
            )
        },
    },

    {
        header: 'Plan name',
        accessorKey: 'plan',
        cell: (props) => {
            const row = props?.row?.original;
            return (
                <div className="flex items-center">
                    {(row.plan_name)}
                </div>
            );
        },
    },
    {
        header: 'Total Amount',
        accessorKey: 'total_amount',
        cell: (props) => {
            const row = props?.row?.original;
            return (
                <div  className="grid justify-items-end "style={{ width: '63%' }}>
                    {(row.total_amount)}
                </div>
            );
        },
    },
    // {
    //     header: 'Pool Subscription',
    //     accessorKey: 'pool subscription',
    //     cell: (props) => {
    //         const row = props?.row?.original
    //         return (
    //             <div className="flex items-center">
    //                 {/* <Badge className={statusColor[row.status]} /> */}
    //                 <span className="ml-2 rtl:mr-2 capitalize">
    //                     {row?.pool_subscription_plan_id}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Premium Subscription',
    //     accessorKey: 'premium subscription',
    //     cell: (props) => {
    //         const row = props?.row?.original
    //         return (
    //             <div className="flex items-center">
    //                 {/* <Badge className={statusColor[row.status]} /> */}
    //                 <span className="ml-2 rtl:mr-2 capitalize">
    //                     {row?.
    //                         premium_pool_subscription_plan}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Promo Code',
    //     accessorKey: 'promocode',
    //     cell: (props) => {
    //         const row = props?.row?.original
    //         return (
    //             <div className="flex items-center">
    //                 {/* <Badge className={statusColor[row.status]} /> */}
    //                 <span className="ml-2 rtl:mr-2 capitalize">
    //                     {row?.promo_code
    //                     }
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Pool Subscription',
    //     accessorKey: 'pool subscription',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 <NumberFormat
    //                     displayType="text"
    //                     value={(Math.round(row.amount * 100) / 100).toFixed(2)}
    //                     prefix={'$'}
    //                     thousandSeparator={true}
    //                 />
    //             </div>
    //         )
    //     },
    // },
]
// const columns = [
//     {
//         header: 'Name',
//         accessorKey: 'name',
//         cell: (props) => {
//             const row = props.row.original
//             return <NameColumn row={row} />
//         },
//     },
//     {
//         header: 'Shortname',
//         accessorKey: 'shortName',
//         cell: (props) => {
//             const row = props.row.original
//             return (
//                 <div className="flex items-center">
//                     {(row.shortName)}
//                 </div>
//             )
//         },
//     },
//     {
//         header: 'Season year',
//         accessorKey: 'seasonYear',
//     },
//     // {
//     //     header: 'Description',
//     //     accessorKey: 'description',
//     // },
//     // {
//     //     header: 'Status',
//     //     accessorKey: 'status',
//     //     cell: (props) => {
//     //         const row = props.row.original

//     //         return (
//     //             <div className="flex items-center">
//     //                 <Badge className={statusColor[row.status]} />
//     //                 <span className="ml-2 rtl:mr-2 capitalize">
//     //                     {row.status}
//     //                 </span>
//     //             </div>
//     //         )
//     //     },
//     // },
    
//     // {
//     //     header: 'Created',
//     //     accessorKey: 'lastOnline',
//     //     cell: (props) => {
//     //         const row = props.row.original
//     //         return (
//     //             <div className="flex items-center">
//     //                 {dayjs(row.created_at).format('MM/DD/YYYY')}
//     //             </div>
//     //         )
//     //     },
//     // },
//     {
//         header: '',
//         id: 'action',
//         cell: (props) => <ActionColumn row={props.row.original} />,
//     },
// ]

const Customers = ({ setSelectedCard, selected }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const poolid = searchParams.get('id');
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state)
    console.log(Alldata,"Alldata")
    const total = useSelector((state) => state.poolsEntries.data.customerList.total_rows_count)
    const data = useSelector((state) => state.poolsEntries.data.customerList.data)
    const loading = useSelector((state) => state.poolsEntries.data.loading)
    // const filterData = useSelector(
    //     (state) => state.crmCustomers.data.filterData
    // )
   
    const { pageNumber, pageSize, poolId,search } = useSelector(
        (state) => state.poolsEntries.data.tableData
    )


    console.log(pageSize,'pageSize')
    // {
    //     "isActive": true,
    //     "search": "string",
    //     "pageSize": 0,
    //     "pageNumber": 0,
    //     "usertype": 1
    //   }
    // {
    //     "poolTypeId": 2,
    //     "sportId": 1,
    //     "pageSize": 10,
    //     "pageNumber": 1
    //   }
    const fetchData = useCallback(() => {
    let pollid = poolid || null
    console.log(pollid , "checking teh ");
        dispatch(getCustomers({ pageNumber:1, pageSize, poolId:pollid,search}))
    }, [pageNumber, pageSize, poolId,search,   dispatch])

    useEffect(() => {
      
        fetchData()
    }, [fetchData, pageNumber, pageSize, poolId,search])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, poolId:null ,search}),
        [pageNumber, pageSize,total,poolId]
    )

    const onPaginationChange = (page) => {
        console.log(page,'pageNumber')
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

    return (
        <>
        {!!(data != null && (data.length || data == undefined)) ?
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={data == undefined ? true : loading}
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
                    <h3 className="mt-8">No Pool Entries Found</h3>
                </div>
            )
        }
       
    </>
        // <>
        //     <DataTable
        //         columns={columns}
        //         data={data}
        //         skeletonAvatarColumns={[0]}
        //         skeletonAvatarProps={{ width: 28, height: 28 }}
        //         loading={loading}
        //         pagingData={{ pageNumber, pageSize,total}}
        //         onPaginationChange={onPaginationChange}
        //         onSelectChange={onSelectChange}
        //         on={on}
        //     />
            // {/* <CustomerEditDialog /> */}
        // </>
        
    )
}

export default Customers
