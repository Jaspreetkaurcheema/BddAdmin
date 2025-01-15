// import React, { useEffect, useCallback, useState, useMemo } from 'react';
// import { Table, Badge, Avatar } from 'components/ui'
// import cloneDeep from 'lodash/cloneDeep'
// import { DataTable } from 'components/shared'

// import {
//     flexRender,
//     getCoreRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from '@tanstack/react-table'
// import NumberFormat from 'react-number-format'
// import { batch, useDispatch, useSelector } from 'react-redux'
// import dayjs from 'dayjs'
// import isEmpty from 'lodash/isEmpty'
// import { DoubleSidedImage } from 'components/shared'
// import useThemeClass from 'utils/hooks/useThemeClass'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { Button } from 'components/ui'
//     ;
// import { getCustomers, setTableData } from '../store/dataSlice';

// const { Tr, Th, Td, THead, TBody, Sorter } = Table

// const statusColor = {
//     paid: 'bg-emerald-500',
//     pending: 'bg-amber-400',
// }


// const PaymentHistory = ({ selected }) => {
//     console.log(selected, 'selectedselectedselectedselectedselected')
//     useEffect(() => {
//         console.log('useffect  5')
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     const data12 = useSelector((state) => state.crmCustomerDetails)
//     console.log(data12, '')
//     const total = useSelector((state) => state.crmCustomerDetails.data?.customerList?.total_rows_count)
//     const data = useSelector((state) => state.crmCustomerDetails.data?.customerList?.data)
//     console.log(data12, '5454554545')
//     const columns = [

//         // {
//         //     header: 'User ID',
//         //     accessorKey: 'id',
//         //     cell: (props) => {
//         //         const row = props?.row?.original
//         //         return (
//         //             <div>
//         //                 <span className="cursor-pointer">{row?.
//         //                     user_id}</span>
//         //             </div>
//         //         )
//         //     },
//         // },
//         {
//             header: 'User Name',
//             accessorKey: 'user name',
//             cell: (props) => {
//                 const row = props?.row?.original
//                 return <IdColumn row={row} />

//             },
//         },
//         {
//             header: 'Email',
//             accessorKey: 'email',
//             cell: (props) => {
//                 const row = props?.row?.original
//                 return (
//                     <div>
//                         <span className="flex items-center">{row?.email
//                         }</span>
//                     </div>
//                 )
//             },
//         },

//         // {
//         //     header: ' Pool Name',
//         //     accessorKey: 'pool name',
//         //     cell: (props) => {
//         //         const row = props?.row?.original
//         //         return (
//         //             <div className="flex items-center">

//         //                 <span className="ml-2 rtl:mr-2 capitalize">
//         //                     {row?.poolName
//         //                     }
//         //                 </span>
//         //             </div>
//         //         )
//         //     },
//         // },

//         // {
//         //     header: 'Pool Subscription',
//         //     accessorKey: 'pool subscription',
//         //     cell: (props) => {
//         //         const row = props?.row?.original
//         //         return (
//         //             <div className="flex items-center">
//         //                 {/* <Badge className={statusColor[row.status]} /> */}
//         //                 <span className="ml-2 rtl:mr-2 capitalize">
//         //                     {row?.pool_subscription_plan_id}
//         //                 </span>
//         //             </div>
//         //         )
//         //     },
//         // },
//         // {
//         //     header: 'Premium Subscription',
//         //     accessorKey: 'premium subscription',
//         //     cell: (props) => {
//         //         const row = props?.row?.original
//         //         return (
//         //             <div className="flex items-center">
//         //                 {/* <Badge className={statusColor[row.status]} /> */}
//         //                 <span className="ml-2 rtl:mr-2 capitalize">
//         //                     {row?.
//         //                         premium_pool_subscription_plan}
//         //                 </span>
//         //             </div>
//         //         )
//         //     },
//         // },
//         // {
//         //     header: 'Promo Code',
//         //     accessorKey: 'promocode',
//         //     cell: (props) => {
//         //         const row = props?.row?.original
//         //         return (
//         //             <div className="flex items-center">
//         //                 {/* <Badge className={statusColor[row.status]} /> */}
//         //                 <span className="ml-2 rtl:mr-2 capitalize">
//         //                     {row?.promo_code
//         //                     }
//         //                 </span>
//         //             </div>
//         //         )
//         //     },
//         // },
//         // {
//         //     header: 'Pool Subscription',
//         //     accessorKey: 'pool subscription',
//         //     cell: (props) => {
//         //         const row = props.row.original
//         //         return (
//         //             <div className="flex items-center">
//         //                 <NumberFormat
//         //                     displayType="text"
//         //                     value={(Math.round(row.amount * 100) / 100).toFixed(2)}
//         //                     prefix={'$'}
//         //                     thousandSeparator={true}
//         //                 />
//         //             </div>
//         //         )
//         //     },
//         // },
//     ]
//     if (selected == 'Pool Entries') {
//         columns.push(
//             {
//                 header: 'Plan name',
//                 accessorKey: 'plan',
//                 cell: (props) => {
//                     const row = props?.row?.original;
//                     return (
//                         <div className="flex items-center">
//                             {(row.plan_name)}
//                         </div>
//                     );
//                 },
//             },
//             {
//                 header: 'Total Amount',
//                 accessorKey: 'total_amount',
//                 cell: (props) => {
//                     const row = props?.row?.original;
//                     return (
//                         <div className="grid justify-items-end " style={{ width: '63%' }}>
//                             {row.amount?("$" + row.amount):0}
//                         </div>
//                     );
//                 },
//             },)
//     }
//     console.log(selected, 'selectedselected')
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const dispatch = useDispatch()


//     // const id = searchParams.get('id');



//     // const [sorting, setSorting] = React.useState([])
//     // const navigate = useNavigate()
//     // const table = useReactTable({
//     //     data,
//     //     columns,
//     //     state: {
//     //         sorting,
//     //     },
//     //     onSortingChange: setSorting,
//     //     getCoreRowModel: getCoreRowModel(),
//     //     getSortedRowModel: getSortedRowModel(),
//     // })

//     // useEffect(()=>{
//     // },[selected])
//     // const Onclickijng = () => {
//     //     if (selected == 'Pool Members') {
//     //         navigate(`/app/apps/poolMembers?id=${id}`)
//     //     } else if (selected == 'Pool Requests') {
//     //         navigate(`/app/apps/poolRequests?id=${id}&&action=${"pool-Req"}`)
//     //     }
//     //     else
//     //         navigate(`/app/apps/poolEntries?id=${id}`)
//     // }

//     // return (
//     //     <div className="mb-8">

//     //         <h6 className="mb-4">{selected}</h6>
//     //         {/* <div className="mb-4">
//     //             <Button size="sm" onClick={Onclickijng} >
//     //                 View All
//     //             </Button>
//     //         </div> */}
//     //         {!isEmpty(data) && (
//     //             <Table>

//     //                 <THead>
//     //                     {table.getHeaderGroups().map((headerGroup) => (
//     //                         <Tr key={headerGroup.id}>
//     //                             {headerGroup.headers.map((header) => {
//     //                                 return (
//     //                                     <Th
//     //                                         key={header.id}
//     //                                         colSpan={header.colSpan}
//     //                                     >
//     //                                         {header.isPlaceholder ? null : (
//     //                                             <div
//     //                                                 {...{
//     //                                                     className:
//     //                                                         header.column.getCanSort()
//     //                                                             ? 'cursor-pointer select-none'
//     //                                                             : '',
//     //                                                     onClick:
//     //                                                         header.column.getToggleSortingHandler(),
//     //                                                 }}
//     //                                             >
//     //                                                 {flexRender(
//     //                                                     header.column.columnDef
//     //                                                         .header,
//     //                                                     header.getContext()
//     //                                                 )}
//     //                                                 {
//     //                                                     // <Sorter
//     //                                                     //     sort={header.column.getIsSorted()}
//     //                                                     // />
//     //                                                 }
//     //                                             </div>
//     //                                         )}
//     //                                     </Th>
//     //                                 )
//     //                             })}
//     //                         </Tr>
//     //                     ))}
//     //                 </THead>
//     //                 <TBody>
//     //                     {table
//     //                         .getRowModel()
//     //                         .rows
//     //                         .map((row) => {
//     //                             return (
//     //                                 <Tr key={row.id}>
//     //                                     {row.getVisibleCells().map((cell) => {
//     //                                         return (
//     //                                             <Td key={cell.id}>
//     //                                                 {flexRender(
//     //                                                     cell.column.columnDef.cell,
//     //                                                     cell.getContext()
//     //                                                 )}
//     //                                             </Td>
//     //                                         )
//     //                                     })}
//     //                                 </Tr>
//     //                             )
//     //                         })}
//     //                 </TBody>
//     //             </Table>
//     //         )}
//     //         {isEmpty(data) && (
//     //             <div className="h-full flex flex-col items-center justify-center">
//     //                 <DoubleSidedImage
//     //                     src="/img/others/img-2.png"
//     //                     darkModeSrc="/img/others/img-2-dark.png"
//     //                     alt="No user found!"
//     //                 />
//     //                 <h3 className="mt-8">No {selected} found!</h3>
//     //             </div>
//     //         )}
//     //     </div>
//     // )
//     const poolid = searchParams.get('id');
// const { pageNumber, pageSize, listJoinedORCreated, poolId, search } = useSelector(
//     (state) => state.crmCustomerDetails?.data.tableData
// )
//     const fetchData = useCallback(() => {
//         if (selected == 'Pool Entries') {
//             batch(() => {
//                 dispatch(getCustomers({ pageNumber: 1, pageSize, poolId: poolid, search }))
//             });
//         }


//     }, [pageNumber, pageSize, search, total, selected])
//     const loading = useSelector((state) => state.crmCustomerDetails?.data.loading)
//     useEffect(() => {
//         console.log("hitted44444")
//         fetchData()
//     }, [pageNumber, pageSize, search, total, selected])
//     console.log({ pageNumber, pageSize, search, total, selected }, "pageNumber, pageSize, search, total, selected")

//     const tableData = useMemo(
//         () => ({ pageNumber: 1, pageSize, poolId: poolid, search }),
//         [pageNumber, pageSize, search, total]
//     )
//     const onPaginationChange = (page) => {
//         console.log(page, 'pageNumber')
//         const newTableData = cloneDeep(tableData)
//         newTableData.pageNumber = page
//         // dispatch(setTableData(newTableData))
//         // dispatch(getPoolList({ pageNumber, pageSize, search, listJoinedORCreated: (selected =='Created')? true:false, userId: id }))
//     }

//     const onSelectChange = (value) => {
//         const newTableData = cloneDeep(tableData)
//         newTableData.pageSize = Number(value)
//         newTableData.pageNumber = 1
//         dispatch(setTableData(newTableData))
//     }

//     const on = () => {
//         const newTableData = cloneDeep(tableData)
//         // newTableData. = 
//         dispatch(setTableData(newTableData))
//     }
//     console.log(total, 'dadtdtdtaatsdyyd123')
//     return (
//         <>
//             {!!(data != null && (data.length || data == undefined)) ?
//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     skeletonAvatarColumns={[0]}
//                     skeletonAvatarProps={{ width: 28, height: 28 }}
//                     loading={data == undefined ? true : loading}
//                     pagingData={{ pageNumber, pageSize, total }}
//                     onPaginationChange={onPaginationChange}
//                     onSelectChange={onSelectChange}
//                 // on={onSort}
//                 /> : (
//                     <div className="h-full flex flex-col items-center justify-center">
//                         <DoubleSidedImage
//                             src="/img/others/img-2.png"
//                             darkModeSrc="/img/others/img-2-dark.png"
//                             alt="No user found!"
//                         />
//                         <h3 className="mt-8">No Users found!</h3>
//                     </div>
//                 )
//             }
//             {/* <CustomerEditDialog /> */}
//         </>
//     )
// }

// export default PaymentHistory

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCustomers } from ; // Assuming the correct path for action
import { DataTable, DoubleSidedImage } from 'components/shared';
import cloneDeep from 'lodash/cloneDeep';
import { getCustomers, getPoolAnalytic, getPoolMembers, setTableData } from '../store/dataSlice';
import { Avatar, Tooltip } from 'components/ui';
import { Link, useNavigate } from 'react-router-dom';
import useThemeClass from 'utils/hooks/useThemeClass';
import { getMembers } from 'views/project/ProjectList/store/dataSlice';
import dayjs from 'dayjs'
import { HiOutlineEye } from 'react-icons/hi';
import { useStateManager } from 'react-select';
const PaymentHistory = ({ PoolDetailData = {}, selected = 'Pool Entries' }) => {


    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(null)

    const selector = useSelector(state => state)
    // const selectors=useSelector(state=>state.crmCustomerDetails.data.memberList)

    const poolid = new URLSearchParams(window.location.search).get('id');

    // useEffect(() => {

    //     console.log('useeeeee 12',selected ,PoolDetailData?.data)
    //     if(selected == 'Pool Entries'){
    //     setData(selector?.crmCustomerDetails.data.customerList?.data)
    // }
    // if(selected == 'Pool Members'){
    //     setData(selector?.crmCustomerDetails.data.memberList?.data)
    // }
    // }, [data,selected]);
    useEffect(() => {

        console.log('useeeeee 12', selected, PoolDetailData?.data)
        if (selected == 'Pool Entries') {
            setData(selector?.crmCustomerDetails.data.customerList?.data)
            setTotal(selector?.crmCustomerDetails.data.customerList?.total_rows_count)

        }
        if (selected == 'Pool Members') {
            setData(selector?.crmCustomerDetails.data.memberList?.data)
            setTotal(selector?.crmCustomerDetails.data.memberList?.total_rows_count)

        }
        if (selected == 'Pool Leaders') {
            setData(selector?.crmCustomerDetails.data.leaderList?.data)
            setTotal(selector?.crmCustomerDetails.data.leaderList?.total_rows_count)
        }
        if (selected == 'Pool AnalyticList') {
            setData(selector?.crmCustomerDetails.data.AnalyticList?.data)
            setTotal(selector?.crmCustomerDetails.data.AnalyticList.total_rows_count)
        }
    }, [selector, selected]);
    console.log(data, 'datadtadatdatt', selector?.crmCustomerDetails.data
    )
    const IdEntryColumn = ({ row }) => {

        const { textTheme } = useThemeClass()


        return (
            <div className="flex items-center">
                <Avatar size={28} shape="circle" src={row?.profile_picture} />
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}`}
                >
                    {row.username || row.poolMember}

                </Link>
            </div>
        )
    }
    const IdColumn = ({ row }) => {

        const { textTheme } = useThemeClass()


        return (
            <div className="flex items-center">
                <Avatar size={28} shape="circle" src={row?.championship_winner_team_logo} />
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}`}
                >
                    {row.username || row.poolMember}

                </Link>
            </div>
        )
    }
    const IdColumns = ({ row }) => {

        const { textTheme } = useThemeClass()


        return (
            <div className="flex items-center">
                {/* <Avatar size={28} shape="circle" src={row?.championship_winner_team_logo} />
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.user_id}`}
                > */}
                {row.logo}

                {/* </Link> */}
            </div>
        )
    }
    const ActionColumn = ({ row }) => {

        const { textTheme } = useThemeClass()
        const dispatch = useDispatch()
        const navigate = useNavigate()



        const onView = useCallback(() => {
            navigate(`/app/crm/customer-details?id=${row.user_id}`)
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
                className={`${textTheme} cursor-pointer p-1 select-none font-semibold whitespace-nowrap`}
            onClick={onEdit}
            >
                Edit
            </div> */}
            </div>
        )
    }
    let columns = [

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
            header: 'Name',
            accessorKey: 'poolEntry',
            cell: (props) => {
                const row = props?.row?.original
                return (
                    <div>
                        <span className="flex items-center">{row?.poolEntry
                        }</span>
                    </div>
                )
            },
        },
        {
            header: 'Username',
            accessorKey: 'user name',
            cell: (props) => {
                const row = props?.row?.original
                return (
                    <div className="flex items-center">
                        <Avatar size={28} shape="circle" src={row?.profile_picture} />
                        <div style={{ marginLeft: '10px' }}>
                            <div>{row?.username}</div>
                            <div><a href="mailto:this.guy@gmail.com?subject=Test">{row?.email}</a></div>
                        </div>
                    </div>
                )

            },
        },

        {
            header: 'Winner',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">
                        {row?.winner_team_logo && <Avatar size={28} shape="circle" src={row?.winner_team_logo} />}
                        <div style={{ marginLeft: '10px' }}>
                            <div className='font-light'>{row?.winner_team_name}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            header: 'Tie breaker points',
            accessorKey: 'lastOnline',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {row?.predicted_total_championship_points}
                    </div>
                )
            },
        },
        {
            header: 'Created_at',
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
            header: 'Action',
            id: 'action',
            cell: (props) => {
                // const row = props.row.original
                return (
                    <div className="flex items-center"  >
                        <ActionColumn row={props.row.original} />
                    </div>
                )
            },
        },

    ]
    if (selected === 'Pool Members') {
        const poolEntryIndex = columns.findIndex(column => column.header === 'Pool Entry');
        if (poolEntryIndex !== -1) {
            columns.splice(poolEntryIndex, 1);
        }
        const poolWinnerIndex = columns.findIndex(column => column.header === 'Predicted Winner team');
        if (poolWinnerIndex !== -1) {
            columns.splice(poolWinnerIndex, 1);
        }
        const poolTieIndex = columns.findIndex(column => column.header === 'Tie breacker points');
        if (poolTieIndex !== -1) {
            columns.splice(poolTieIndex, 1);
        }
        const poolidIndex = columns.findIndex(column => column.header === 'predicted winner team id');
        if (poolidIndex !== -1) {
            columns.splice(poolidIndex, 1);
        }
        // Remove "Plan Name" column
        const planNameIndex = columns.findIndex(column => column.header === 'Plan Name');
        if (planNameIndex !== -1) {
            columns.splice(planNameIndex, 1);
        }
        const planCreated = columns.findIndex(column => column.header === 'Created_at');
        if (planCreated !== -1) {
            columns.splice(planCreated, 1);
        }
        // columns.splice(2, 0,{
        //     header: 'Pool Owner',
        //     accessorKey: 'ownerName',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <div>
        //                 <span className="flex items-center">{row.poolOwner}</span>
        //             </div>
        //         );
        //     },
        // },
        // );
        columns.splice(2, 0, {
            header: 'Number Of Entries',
            accessorKey: 'numbers_of_entries',
            cell: (props) => {
                const row = props?.row?.original
                return (
                    <div>
                        <span className="grid justify-items-end " style={{ width: '72%' }}>{row?.numbers_of_entries || 0
                        }</span>
                    </div>
                )
            },
        },
        );
        columns.splice(3, 0, {
            header: 'Joining Date',
            accessorKey: 'joining_date',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">
                        {row.joining_date ? dayjs(row.joining_date).format('MM/DD/YYYY') : ''}
                    </div>
                );
            },
        },
        );
        // columns.pop()
        // columns = columns.filter(column => column.header !== 'Pool Entry' && column.header !== 'Plan Name');
        ;
    }
    if (selected == 'Pool Leaders') {
        columns = [

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
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props?.row?.original
                    return (<div className="flex items-center">
                        <Avatar size={28} shape="circle" src={row?.user_profile.profile_picture} />
                        <div className=' ml-2 rtl:mr-2 font-semibold'>
                            {row?.name}
                        </div>
                    </div>)

                },
            },
            {
                header: 'User Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="flex items-center">{row?.user_profile.email
                            }</span>
                        </div>
                    )
                },
            },

            {
                header: 'max. points',
                accessorKey: 'total_points',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '75%' }}>{row?.total_points ? row?.total_winning_points : + 0
                            }</span>
                        </div>
                    )
                },
            },
            {
                header: 'winning points',
                accessorKey: 'total_winning_points',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '75%' }}>{row?.total_winning_points ? row?.total_winning_points : + 0
                            }</span>
                        </div>
                    )
                },
            },

            {
                header: 'Predicted total points',
                accessorKey: 'predicted_total_championship_points',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '75%' }}>{row?.predicted_total_championship_points ? row?.predicted_total_championship_points : + 0
                            }</span>
                        </div>
                    )
                },
            },

            {
                header: 'User Name',
                accessorKey: 'username',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="flex items-center">{row?.username
                            }</span>
                        </div>
                    )
                },
            },
            // {
            //     header: 'Created_at',
            //     accessorKey: 'lastOnline',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 {dayjs(row.created_at).format('MM/DD/YYYY')}
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => {
            //         // const row = props.row.original
            //         return (
            //             <div className="flex items-center"  >
            //                 <ActionColumn row={props.row.original} />
            //             </div>
            //         )
            //     },
            // },

        ]
    }


    // {
    //     "id": "2226",
    //     "logo": "https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png",
    //     "name": "Owls",
    //     "seed": 8,
    //     "region_id": 1,
    //     "region_name": "EAST",
    //     "picked_percentage": 66.67
    // },
    if (selected == 'Pool AnalyticList') {
        columns = [

            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props?.row?.original
                    return (<div className="flex items-center">
                        <Avatar size={28} shape="circle" src={row?.logo} />
                        <div className=' ml-2 rtl:mr-2 font-semibold'>
                            {row?.name}
                        </div>
                    </div>)

                },
            },


            {
                header: 'picked %',
                accessorKey: 'picked_percentage',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '25%' }}>{row?.picked_percentage ? row?.picked_percentage + "%" : "0%"
                            }</span>
                        </div>
                    )
                },
            },
            {
                header: 'Seed',
                accessorKey: 'seed',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '25%' }}>{row?.seed ? row?.seed : + 0
                            }</span>
                        </div>
                    )
                },
            },



            // {
            //     header: 'Created_at',
            //     accessorKey: 'lastOnline',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 {dayjs(row.created_at).format('MM/DD/YYYY')}
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => {
            //         // const row = props.row.original
            //         return (
            //             <div className="flex items-center"  >
            //                 <ActionColumn row={props.row.original} />
            //             </div>
            //         )
            //     },
            // },

        ]
    }

    const { pageNumber, pageSize, poolId, search } = useSelector(
        (state) => state.crmCustomerDetails?.data.tableData
    )



    // const fetchData = useCallback(() => {

    // }, [data]);

    // Define other dependencies such as pageSize and search

    const loading = useSelector(
        (state) => state.crmCustomerDetails.data.loading
    )
    const { roundId } = useSelector(
        (state) => state.crmCustomerDetails.data.filterData
    )
    // const data = useSelector((state) => state.crmCustomerDetails.data.customerList.data)

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, poolId: null, search }),
        [pageNumber, pageSize, total, poolId]
    )
    const tableDatas = useMemo(
        () => ({ pageNumber, pageSize, poolId: null, search }),
        [pageNumber, pageSize, total, poolId]
    )
    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page

        if (selected == 'Pool Entries') {
            dispatch(setTableData(newTableData))
            dispatch(getCustomers({ pageNumber, pageSize, poolId: poolid, search: '' }))
        }
        if (selected == 'Pool Members') {
            const newTableDatas = cloneDeep(tableDatas)
            newTableDatas.pageNumber = page
            dispatch(setTableData(newTableDatas))
            dispatch(getPoolMembers({ pageNumber: page, pageSize, poolId: poolid, search: '', joined: true }))
        }
        if (selected == 'Pool AnalyticList') {
            const newTableDatas = cloneDeep(tableDatas)
            newTableDatas.pageNumber = page
            dispatch(getPoolAnalytic({ pageNumber: page, pageSize, poolId: poolid, search: '', roundId }))
            dispatch(setTableData(newTableDatas))
        }

        // dispatch(getPool({ pageNumber, pageSize, search, isJoined: (selected =='Created')? true:false, userId: id }))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageNumber = 1
        dispatch(setTableData(newTableData))

    }
    console.log(total, 'tttttttttt')
    return (
        <>
            {!!(data != null && (data.length || data == undefined)) ?
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
                        <h3 className="mt-8">No {selected} found!</h3>
                    </div>
                )
            }
            {/* <CustomerEditDialog /> */}
        </>
    );
};

export default PaymentHistory;
