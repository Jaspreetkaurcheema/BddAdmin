import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Table, Badge, Tooltip, Avatar } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux'
// import {  setTableData } from '../store/dataSlice'
import cloneDeep from 'lodash/cloneDeep'
import { DataTable } from 'components/shared'
import Tag from 'components/ui/Tag'


import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty'
import { DoubleSidedImage } from 'components/shared';
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getAccomplishList, getActivePoolList, getFeaturedPoolList, getHistoryList, getPaymentPoolList, getPoolList, getPoolStats, setTableData } from '../store/dataSlice';
import { HiOutlineEye } from 'react-icons/hi';
const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const statusColor = {
    paid: 'bg-emerald-500',
    pending: 'bg-amber-400',
};

const IdColumn = ({ row }) => {

    const { textTheme } = useThemeClass()

    return (
        <div>
            <span className="cursor-pointer">
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/pool-details?id=${row?.id}`}
                >
                    {row.id}
                </Link>
            </span>
        </div>
    )
}



// const paycolumns = [
//     {
//         header: 'id',
//         accessorKey: 'pool_subscription_plan_id',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                     <span className="cursor-pointer">{row.pool_subscription_plan_id}</span>
//                 </div>
//             );
//         },
//     },


//     {
//         header: 'Plan Name',
//         accessorKey: 'pool_subscription_plan_name',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div className="flex items-center">
//                     {row.pool_subscription_plan_name}
//                 </div>
//             );
//         },
//     },
//     {
//         header: 'Amount',
//         accessorKey: 'amount',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div className="flex items-center" >
//                     {"$" + row.amount}
//                 </div>
//             );
//         },
//     },


//     {
//         header: 'Transaction id',
//         accessorKey: 'transaction_id',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div className="flex items-center">
//                     {row.transaction_id}
//                 </div>
//             );
//         },
//     },
//     // {
//     //     header: 'Mobile Detail',
//     //     accessorKey: 'mobile_details',
//     //     cell: (props) => {
//     //         const row = props.row.original;
//     //         return (
//     //             <div>
//     //                 <span className="cursor-pointer">{row.mobile_details}</span>
//     //             </div>

//     //         );
//     //     },
//     // },
//     {
//         header: 'status',
//         accessorKey: 'payment_status',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                     <span className="cursor-pointer">{row.payment_status}</span>
//                 </div>
//             );
//         },
//     },
//     // {
//     //     header: 'Bio',
//     //     accessorKey: 'amount',
//     //     cell: (props) => {
//     //         const row = props.row.original;
//     //         return (
//     //             <div className="flex items-center">
//     //                 <NumberFormat
//     //                     displayType="text"
//     //                     value={row.bio}
//     //                     prefix={'$'}
//     //                     thousandSeparator={true}
//     //                 />
//     //             </div>
//     //         );
//     //     },
//     // },
// ];

// const PaymentHistory = ({ data = {}, selected }) => {
//   console.log(selected,'selectedselected')
//     console.log(data, 'datadata')
//     // const [selectedPool, setSelectedPool] = useState('created');
//     const [sorting, setSorting] = React.useState([]);
//     const [tableColumns, setTableColumns] = React.useState({
//         data,
//         columns,
//         state: {
//             sorting,
//         },
//         onSortingChange: setSorting,

//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),

//     })

//     useEffect(() => {
//         console.log("useeffect triggered !", selected)
//         if (selected == 'Payments') {
//            const obj = {
//             data,
//             state: {
//                 sorting,
//             },
//             onSortingChange: setSorting,
//             getCoreRowModel: getCoreRowModel(),
//             getSortedRowModel: getSortedRowModel(),
//         }
//         console.log({...obj, columns: paycolumns}, "elses")

//         console.log({...obj, columns: paycolumns},'objjjjj')
//         setTableColumns({...obj, columns: paycolumns})
//         } else {
//             console.log({
//                 data,
//                 columns,
//                 state: {
//                     sorting,
//                 },
//                 onSortingChange: setSorting,
//                 getCoreRowModel: getCoreRowModel(),
//                 getSortedRowModel: getSortedRowModel(),
//             }, "else")
//             setTableColumns({
//                 data,
//                 columns,
//                 state: {
//                     sorting,
//                 },
//                 onSortingChange: setSorting,
//                 getCoreRowModel: getCoreRowModel(),
//                 getSortedRowModel: getSortedRowModel(),
//             })
//         }
//     }, [selected,data?.length])

// console.log(tableColumns,'tableColumns')
//     let table = useReactTable(tableColumns);

//     return (
//         <div className="mb-8">
//             <h6 className="mb-4">{selected}</h6>
//             {!isEmpty(data) && (
//                 <Table>
//                     <THead>
//                         {table?.getHeaderGroups().map((headerGroup) => (
//                             <Tr key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <Th
//                                             key={header.id}
//                                             colSpan={header.colSpan}
//                                         >
//                                             {header.isPlaceholder ? null : (
//                                                 <div
//                                                     {...{
//                                                         className:
//                                                             header.column.getCanSort()
//                                                                 ? 'cursor-pointer select-none'
//                                                                 : '',
//                                                         onClick:
//                                                             header.column.getToggleSortingHandler(),
//                                                     }}
//                                                 >
//                                                     {flexRender(
//                                                         header.column.columnDef
//                                                             .header,
//                                                          header.getContext()
//                                                     )}
//                                                     {
//                                                         <Sorter
//                                                             sort={header.column.getIsSorted()}
//                                                         />
//                                                     }
//                                                 </div>
//                                             )}
//                                         </Th>
//                                     );
//                                 })}
//                             </Tr>
//                         ))}
//                     </THead>
//                     <TBody>
//                         {table?.getRowModel()?.rows.map((row) => {
//                             return (
//                                 <Tr key={row.id}>
//                                     {row.getVisibleCells()?.map((cell) => {
//                                         return (
//                                             <Td key={cell.id}>
//                                                 {flexRender(
//                                                     cell.column.columnDef.cell,
//                                                     cell.getContext()
//                                                 )}
//                                             </Td>
//                                         );
//                                     })}
//                                 </Tr>
//                             );
//                         })}
//                     </TBody>
//                 </Table>
//             )}

//             {isEmpty(data) && (
//                 <div className="h-full flex flex-col items-center justify-center">
//                     <DoubleSidedImage
//                         src="/img/others/img-2.png"
//                         darkModeSrc="/img/others/img-2-dark.png"
//                         alt="No user found!"
//                     />
//                     <h3 className="mt-8">No {selected} found!</h3>
//                 </div>
//             )}
//         </div>
//     );
// };
const PaymentHistory = ({ poolsData = {}, selected = 'Created' }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [total, setTotal] = useState({})
    let selector = useSelector((state) => state)

    const [data, setData] = useState(null);
    const id = searchParams.get('id');


    console.log(poolsData?.data, 'pooool123')
    useEffect(() => {

        if (selected == 'Victory') {
            setData(poolsData?.data?.data?.pool_member_stats?.pool_victories_log);
        } else {
            setData(poolsData?.data);
        }

        if (selected == 'Created' || selected == 'Joined') {
            setTotal(selector.crmCustomerDetailss?.data.poolList?.total_rows_count)
        }
        if (selected == 'Featured') {
            setTotal(selector.crmCustomerDetailss?.data.featurePoolList?.total_rows_count)

        }
        if (selected == 'Accomplishment') {
            setTotal(selector.crmCustomerDetailss.data.AccomplishList?.total_rows_count)
        }

        if (selected == 'Payment') {
            setTotal(selector.crmCustomerDetailss.data.paymentList?.total_rows_count)
        }

        if (selected == 'Entries') {
            setTotal(selector.crmCustomerDetailss.data.entriesList?.total_rows_count)
        }
        if (selected == 'History') {
            setTotal(selector.crmCustomerDetailss.data.pools_history?.total_rows_count)
        }
        if (selected == 'Active') {
            setTotal(selector.crmCustomerDetailss.data.activeList?.total_rows_count)
        }
    }, [data, selector])

    const dispatch = useDispatch()
    const ActionColumn = ({ row }) => {
        const { textTheme } = useThemeClass()
        const dispatch = useDispatch()
        const navigate = useNavigate()



        const onView = useCallback(() => {
            navigate(`/app/crm/pool-details?id=${row?.id}`)
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

        {
            header: 'ID',
            accessorKey: 'id',
            cell: (props) => {

                const row = props.row.original;

                return <IdColumn row={row} />
            },
        },
        {
            header: 'Pool Name',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div>
                        <span className="flex items-center">{row.name}</span>
                    </div>
                );
            },
        },

        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: (props) => {
                const row = props.row.original;

                return (
                    <div>
                        <span className="grid justify-items-end " style={{ width: '40%' }}>{row.amount ? "$" + row.amount : "$" + 0}</span>
                    </div>
                );
            },
        },
        {
            header: 'Pool Members',
            accessorKey: 'number_of_users',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div>
                        <span className="grid justify-items-end " style={{ width: '45%' }}>{row.number_of_users}</span>
                    </div>
                );
            },
        },

        {
            header: 'Created Date',
            accessorKey: 'created_at',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">
                        {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}
                    </div>
                );
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

    ];
    if (selected == 'Joined') {
        const planNameIndex = columns.findIndex(column => column.header === 'Created Date');
        if (planNameIndex !== -1) {
            columns.splice(planNameIndex, 1);
        }
        let index = 1;
        // Use splice to add the object at the specified index
        columns.splice(index, 0, {
            header: 'Pool Owner',
            accessorKey: 'ownerName',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div>
                        <span className="flex items-center">{row.ownerName}</span>
                    </div>
                );
            },
        },
        );
        columns.splice(5, 0, {
            header: 'Joining Date',
            accessorKey: 'date',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">
                        {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}

                    </div>
                );
            },
        },
        );

        // console.log(arrayOfObjects);

    }
    if (selected == 'Active') {
        columns = [

            // {
            //     header: 'ID',
            //     accessorKey: 'id',
            //     cell: (props) => {

            //         const row = props.row.original;

            //         return <IdColumn row={row} />
            //     },
            // },
            {
                header: 'Pool Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },



            // {
            //     header: 'Amount',
            //     accessorKey: 'amount',
            //     cell: (props) => {
            //         const row = props.row.original;

            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '40%' }}>{row.amount ? "$" + row.amount : "$" + 0}</span>
            //             </div>
            //         );
            //     },
            // },
            {
                header: 'Pool Owner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_owner_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_owner_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Event',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${row?.pool_event?.split(',')?.[3]}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.pool_event?.split(',')?.[0]}</div>
                                <div className='font-normal'>{row?.pool_event?.split(',')?.[1]}</div>
                                <div className='font-bold'>{row?.pool_event?.split(',')?.[2]}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                header: 'Members Count',
                accessorKey: 'members_count',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.pool_members}</span>
                        </div>
                    );
                },
            },

            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}
                        </div>
                    );
                },
            },
            {
                header: 'Status',
                accessorKey: 'is_joined',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            {row?.status === 'ADMIN' && <Tag prefix prefixClass="bg-cyan-500">{row.status}</Tag>}
                            {row?.status === 'JOINED' && <Tag prefix prefixClass="bg-emerald-500">{row.status}</Tag>}
                            {row?.status === 'REQUESTED' && <Tag prefix prefixClass="bg-yellow-500">{row.status}</Tag>}
                        </div>
                    );
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

        ];
    }
    if (selected == 'Featured') {
        columns = [

            // {
            //     header: 'ID',
            //     accessorKey: 'id',
            //     cell: (props) => {

            //         const row = props.row.original;

            //         return <IdColumn row={row} />
            //     },
            // },
            {
                header: 'Pool Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Owner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_owner_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_owner_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Event',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${row?.pool_event?.split(',')?.[3]}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.pool_event?.split(',')?.[0]}</div>
                                <div className='font-normal'>{row?.pool_event?.split(',')?.[1]}</div>
                                <div className='font-bold'>{row?.pool_event?.split(',')?.[2]}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                header: 'Members Count',
                accessorKey: 'members_count',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.pool_members}</span>
                        </div>
                    );
                },
            },
            // {
            //     header: 'Entries Count',
            //     accessorKey: 'members_count',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         return (
            //             <div>
            //                 <span className="flex items-center">{row.pool_entries}</span>
            //             </div>
            //         );
            //     },
            // },

            // {
            //     header: 'Amount',
            //     accessorKey: 'amount',
            //     cell: (props) => {
            //         const row = props.row.original;

            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '40%' }}>{row.amount ? "$" + row.amount : "$" + 0}</span>
            //             </div>
            //         );
            //     },
            // },


            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}
                        </div>
                    );
                },
            },
            {
                header: 'Status',
                accessorKey: 'is_joined',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            {row.is_joined ? <Tag prefix prefixClass="bg-emerald-500"> Joined</Tag>
                                :
                                <Tag prefix prefixClass="bg-cyan-500">Available</Tag>
                            }
                        </div>
                    );
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

        ];
    }
    if (selected == 'Accomplishment') {
        columns = [

            {
                header: 'icon',
                accessorKey: 'icon',
                cell: (props) => {

                    const row = props.row.original;

                    return (<div className="flex items-center">
                        {row?.icon ? <Avatar size={28} shape="circle" src={row?.icon} /> : <></>}


                    </div>)
                },
            },
            {
                header: 'message',
                accessorKey: 'message',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.message}</span>
                        </div>
                    );
                },
            },

            // {
            //     header: 'Amount',
            //     accessorKey: 'amount',
            //     cell: (props) => {
            //         const row = props.row.original;

            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '40%' }}>{row.amount ? "$" + row.amount : "$" + 0}</span>
            //             </div>
            //         );
            //     },
            // },


            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}
                        </div>
                    );
                },
            },


        ];
    }
    if (selected == 'Payment') {
        columns =
            [

                {
                    header: 'transactionid',
                    accessorKey: 'transaction_id',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            row.receipt_url ? <div>
                                <a href={row.receipt_url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                    {row.transaction_id}
                                </a>

                            </div> : <div>
                                {/* <a href={row.receipt_url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> */}
                                {row.transaction_id}
                                {/* </a> */}

                            </div>

                        );
                    },
                },
                {
                    header: 'currency',
                    accessorKey: 'currency',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.currency}</span>
                            </div>
                        );
                    },
                },

                {
                    header: 'payment method',
                    accessorKey: 'payment_method',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.payment_method}</span>
                            </div>
                        );
                    },
                },

                {
                    header: 'payment mode',
                    accessorKey: 'payment_mode',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.payment_mode}</span>
                            </div>
                        );
                    },
                },


                {
                    header: 'Donation Amount',
                    accessorKey: 'donation_amount',
                    cell: (props) => {
                        const row = props.row.original;

                        return (
                            <div>
                                <span className="grid justify-items-end " style={{ width: '90%' }}>{row.donation_amount ? "$" + row.donation_amount : "$" + 0}</span>
                            </div>
                        );
                    },
                },

                {
                    header: 'Purchase Amount',
                    accessorKey: 'purchase_amount',
                    cell: (props) => {
                        const row = props.row.original;

                        return (
                            <div>
                                <span className="grid justify-items-end " style={{ width: '90%' }}>{row.purchase_amount ? "$" + row.purchase_amount : "$" + 0}</span>
                            </div>
                        );
                    },
                },
                {
                    header: 'Total Amount',
                    accessorKey: 'amount',
                    cell: (props) => {
                        const row = props.row.original;

                        return (
                            <div>
                                <span className="grid justify-items-end " style={{ width: '90%' }}>{row.amount ? "$" + row.amount : "$" + 0}</span>
                            </div>
                        );
                    },
                },
                {
                    header: 'pool Name',
                    accessorKey: 'poolName',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.poolName}</span>
                            </div>
                        );
                    },
                },
                {
                    header: 'Created At',
                    accessorKey: 'created_at',
                    cell: (props) => {
                        const row = props.row.original
                        return (
                            <div className="flex items-center">
                                {dayjs(row.created_at
                                ).format('MM/DD/YYYY')}
                            </div>
                        )
                    },
                },
                {
                    header: 'status',
                    accessorKey: 'payment_status',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                {
                                    row?.payment_status === 'succeeded' || row?.payment_status === 'paid' ?
                                        <Tag prefix prefixClass="bg-emerald-500">succeeded</Tag> :
                                        <Tag prefix prefixClass="bg-rose-500">{row.payment_status}</Tag>
                                }
                            </div>
                        );
                    },
                },
                // {
                //     header: '',
                //     id: 'action',
                //     cell: (props) => <ActionColumn row={props.row.original} />,
                // },
            ]

    }
    if (selected == 'Entries') {
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
                accessorKey: 'poolEntry',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="flex items-center">{row?.name
                            }</span>
                        </div>
                    )
                },
            },

            {
                header: 'Pool Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },

            {
                header: 'Pool Owner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_owner_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_owner_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Event',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${row?.pool_event?.split(',')?.[3]}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.pool_event?.split(',')?.[0]}</div>
                                <div className='font-normal'>{row?.pool_event?.split(',')?.[1]}</div>
                                <div className='font-bold'>{row?.pool_event?.split(',')?.[2]}</div>
                            </div>
                        </div>
                    );
                },
            },

            // {
            //     header: 'Amount',
            //     accessorKey: 'amount',
            //     cell: (props) => {
            //         const row = props?.row?.original
            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '75%' }}>{row?.amount ? "$" + row?.amount : "$" + 0
            //                 }</span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Tie breaker points',
            //     accessorKey: 'predicted_total_championship_points',
            //     cell: (props) => {
            //         const row = props?.row?.original
            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '75%' }}>{row?.predicted_total_championship_points ? row?.predicted_total_championship_points : 0
            //                 }</span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'predicted winner team id',
            //     accessorKey: 'predicted_championship_winner_id',
            //     cell: (props) => {
            //         const row = props?.row?.original
            //         return (
            //             <div>
            //                 <span className="grid justify-items-end " style={{ width: '95%' }}>{row?.predicted_championship_winner_id ? row?.predicted_championship_winner_id : 0
            //                 }</span>
            //             </div>
            //         )
            //     },
            // },

            // {
            //     header: 'Predicted Winner team',
            //     accessorKey: 'displayName',
            //     cell: (props) => {
            //         const row = props?.row?.original
            //         return (
            //             <div className="items-center flex justify-items-center flex-col ml-3 ">
            //                 {row?.logo ? <Avatar size={28} shape="circle" src={row?.logo} /> : <></>}
            //                 <div className='ml-2 rtl:mr-2'></div>
            //                 <div className='font-semibold'>
            //                     {row?.displayName}
            //                 </div>
            //             </div>
            //         )
            //     },
            // },
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
                header: 'Created At',
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
    }

    if (selected == 'Victory') {
        columns = [
            {
                header: 'Pool Entry',
                accessorKey: 'poolEntry',
                cell: (props) => {
                    const row = props?.row?.original
                    return (
                        <div>
                            <span className="flex items-center">{row?.pool_entry_name
                            }</span>
                        </div>
                    )
                },
            },
            {
                header: 'Pool',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_image} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.pool_id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Owner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_owner_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_owner_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },

            {
                header: 'Pool Event',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${row?.sport_icon}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.sport_name}</div>
                                <div className='font-normal'>{row?.pool_event_name}</div>
                                <div className='font-bold'>{row?.pool_type}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                header: 'Winner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.winner_pic} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.winner_team_name}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                header: 'Total Points',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <div className='font-light'>{row?.total_points}</div>
                        </div>
                    );
                },
            },
            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.created_at
                            ).format('MM/DD/YYYY')}
                        </div>
                    )
                },
            },
        ]
    }

    if (selected == 'History') {
        columns = [
            {
                header: 'Pool',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },
            {
                header: 'Pool Owner',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={row?.pool_owner_profile_picture} />
                            <Link
                                to={`/app/crm/pool-details?id=${row?.id}`}
                            >
                                <div className=' ml-2 rtl:mr-2 font-semibold'>
                                    {row?.pool_owner_name}
                                </div>
                            </Link>
                        </div>
                    );
                },
            },

            {
                header: 'Pool Event',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Avatar size={28} shape="circle" src={`https://api.kingpool.app/images/sports/${row?.pool_event?.sport?.icon}`} />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='font-light'>{row?.pool_event?.sport?.name}</div>
                                <div className='font-normal'>{row?.pool_event?.name}</div>
                                <div className='font-bold'>{row?.pool_event?.pool_type?.name}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                header: 'Members Count',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                             <span className="flex items-center">{row?.pool_members_count
                            }</span>
                        </div>
                    );
                },
            },
            {
                header: 'Created At',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}
                        </div>
                    );
                },
            },
        ]
    }
    // const data = useSelector((state) => state.crmCustomerDetails?.data.poolList?.data)


    // const listJoinedORCreated = useSelector(
    //     (state) => state.crmUsers?.data.filterData.filterType
    // )


    const loading = useSelector((state) => state.crmCustomerDetailss?.data.loading2)

    const { pageNumber, pageSize, isJoined, userId, search } = useSelector(
        (state) => state.crmCustomerDetailss?.data.tableData
    )

    const { filter_type, paymentType } = useSelector(
        (state) => state.crmCustomerDetailss.data.filterHistory
    )
    console.log(pageNumber, pageSize, search, total, selected, 'set useeffedt')

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search, isJoined: true, userId: id }),
        [pageNumber, pageSize, search, total, selected]
    )
    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber212')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page
        dispatch(setTableData(newTableData))
        console.log(newTableData, 'newTableData')
        if (selected == 'Created' || selected == 'Joined') {
            dispatch(getPoolList({ pageNumber: page, pageSize, search, isJoined: (selected == 'Created') ? true : false, userId: id }))
        }
        if (selected == 'Featured') {
            dispatch(getFeaturedPoolList({ pageNumber: page, pageSize, search, userId: id }))

        }
        if (selected == 'Active') {
            dispatch(getActivePoolList({ pageNumber: page, pageSize, search, userId: id }))


        }
        if (selected == 'Accomplishment') {

            dispatch(getAccomplishList({ pageNumber: page, pageSize, userId: id }))
        }
        if (selected == 'History') {
            dispatch(getHistoryList({ pageNumber, pageSize, userId: id, filter_type: filter_type }))
        }
        if (selected == 'Payment') {
            dispatch(getPaymentPoolList({ pageNumber: page, pageSize, userId: id, search: '', filterType: 1, paymentType }))
        }
        if (selected == 'Victory') {
            dispatch(getPoolStats({ id: id }))
        }

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
    console.log(loading, 'loadingloadingloading')
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
                        <h3 className="mt-8">No data found</h3>
                    </div>
                )
            }
            {/* <CustomerEditDialog /> */}
        </>
    )
}

export default PaymentHistory;
