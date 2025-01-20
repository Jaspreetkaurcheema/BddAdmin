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
const PaymentHistory = ({ poolsData = {}, selected = 'B2b' }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const [total, setTotal] = useState({})
    let selector = useSelector((state) => state)
   

    const total= useSelector((state) => state.crmCustomerDetailss.data?.total_rows_count)
    const [data, setData] = useState(null);
    const id = searchParams.get('id');


    console.log(poolsData, 'pooool123')
    useEffect(() => {

     setData(poolsData.categoryData)


        // if (selected == 'Victory') {
        //     setData(poolsData?.data?.data?.pool_member_stats?.pool_victories_log);
        // } else {
        //     setData(poolsData?.data);
        // }

        // if (selected == 'Created' || selected == 'Joined') {
        //     setTotal(selector.crmCustomerDetailss?.data.poolList?.total_rows_count)
        // }
        // if (selected == 'Featured') {
        //     setTotal(selector.crmCustomerDetailss?.data.featurePoolList?.total_rows_count)

        // }
        // if (selected == 'Accomplishment') {
        //     setTotal(selector.crmCustomerDetailss.data.AccomplishList?.total_rows_count)
        // }

        // if (selected == 'Payment') {
        //     setTotal(selector.crmCustomerDetailss.data.paymentList?.total_rows_count)
        // }

        // if (selected == 'Entries') {
        //     setTotal(selector.crmCustomerDetailss.data.entriesList?.total_rows_count)
        // }
        // if (selected == 'History') {
        //     setTotal(selector.crmCustomerDetailss.data.pools_history?.total_rows_count)
        // }
        // if (selected == 'Active') {
        //     setTotal(selector.crmCustomerDetailss.data.activeList?.total_rows_count)
        // }
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
    let columns = [ ];

  
    if (selected == 'B2b') {
        columns = [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {
    
                    const row = props.row.original;
    
                    return <IdColumn row={row} />
                },
            },
            {
                header: 'company name',
                accessorKey: 'company_name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.company_name}</span>
                        </div>
                    );
                },
            },
    
            {
                header: 'contact person',
                accessorKey: 'contact_person',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.contact_person}</span>
                        </div>
                    );
                },
            },
            {
                header: 'contact email',
                accessorKey: 'contact_email',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.contact_email}</span>
                        </div>
                    );
                },
            },
            {
                header: 'business type',
                accessorKey: 'business_type',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.business_type}</span>
                        </div>
                    );
                },
            },
            {
                header: 'revenue',
                accessorKey: 'revenue',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.revenue}</span>
                        </div>
                    );
                },
            },
            {
                header: 'employee count',
                accessorKey: 'employee_count',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.employee_count}</span>
                        </div>
                    );
                },
            },
            {
                header: 'industry',
                accessorKey: 'industry',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.industry}</span>
                        </div>
                    );
                },
            },
            {
                header: 'established year',
                accessorKey: 'established_year',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.established_year}</span>
                        </div>
                    );
                },
            },
            {
                header: 'additional info',
                accessorKey: 'additional_info',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.additional_info}</span>
                        </div>
                    );
                },
            },
    
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center"  >
            //                 <ActionColumn row={props.row.original} />
            //             </div>
            //         )
            //     },
            // },
        ]
        // const planNameIndex = columns.findIndex(column => column.header === 'Created Date');
        // if (planNameIndex !== -1) {
        //     columns.splice(planNameIndex, 1);
        // }
        // let index = 1;
        // // Use splice to add the object at the specified index
        // columns.splice(index, 0, {
        //     header: 'Pool Owner',
        //     accessorKey: 'ownerName',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <div>
        //                 <span className="flex items-center">{row.ownerName}</span>
        //             </div>
        //         );
        //     },
        // },
        // );
        // columns.splice(5, 0, {
        //     header: 'Joining Date',
        //     accessorKey: 'date',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <div className="flex items-center">
        //                 {row.created_at ? dayjs(row.created_at).format('MM/DD/YYYY') : ''}

        //             </div>
        //         );
        //     },
        // },
        // );

        // console.log(arrayOfObjects);

    }


    if (selected == 'Finance') {
        columns = [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {
    
                    const row = props.row.original;
    
                    return <IdColumn row={row} />
                },
            },
            {
                header: 'income',
                accessorKey: 'income',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.income}</span>
                        </div>
                    );
                },
            },
            {
                header: 'expenses',
                accessorKey: 'expenses',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.expenses}</span>
                        </div>
                    );
                },
            },
            {
                header: 'savings',
                accessorKey: 'savings',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.savings}</span>
                        </div>
                    );
                },
            },
            {
                header: 'credit score',
                accessorKey: 'credit_score',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.credit_score}</span>
                        </div>
                    );
                },
            },
            {
                header: 'loan amount',
                accessorKey: 'loan_amount',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.loan_amount}</span>
                        </div>
                    );
                },
            },
            {
                header: 'loan term months',
                accessorKey: 'loan_term_months',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.loan_term_months}</span>
                        </div>
                    );
                },
            },
            {
                header: 'investment amount',
                accessorKey: 'investment_amount',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.investment_amount}</span>
                        </div>
                    );
                },
            },
       
            {
                header: 'asset value',
                accessorKey: 'asset_value',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.asset_value}</span>
                        </div>
                    );
                },
            },
            {
                header: 'liabilities value',
                accessorKey: 'liabilities_value',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.liabilities_value}</span>
                        </div>
                    );
                },
            },
    
            {
                header: 'net worth',
                accessorKey: 'net_worth',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.net_worth}</span>
                        </div>
                    );
                },
            },
            {
                header: 'additional info',
                accessorKey: 'additional_info',
                cell: (props) => {
                    const row = props.row.original;
            
                    return (
                        <div>
                            <span className="flex items-center">{row.additional_info}</span>
                        </div>
                    );
                },
            },
    
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center"  >
            //                 <ActionColumn row={props.row.original} />
            //             </div>
            //         )
            //     },
            // },
        ]
    }

   
    if (selected == 'Location') {
        columns = [

            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {

                    const row = props.row.original;

                    return <IdColumn row={row} />
                },
            },
        
            {
                header: 'city',
                accessorKey: 'city',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.city}</span>
                        </div>
                    );
                },
            },
       

            {
                header: 'state',
                accessorKey: 'state',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.state}</span>
                        </div>
                    );
                },
            },
            {
                header: 'country',
                accessorKey: 'country',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.country}</span>
                        </div>
                    );
                },
            },
            {
                header: 'postal code',
                accessorKey: 'postal_code',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.postal_code}</span>
                        </div>
                    );
                },
            },
            {
                header: 'latitude',
                accessorKey: 'latitude',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.latitude}</span>
                        </div>
                    );
                },
            },
            {
                header: 'longitude',
                accessorKey: 'longitude',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.longitude}</span>
                        </div>
                    );
                },
            },
            {
                header: 'region',
                accessorKey: 'region',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.region}</span>
                        </div>
                    );
                },
            },
            {
                header: 'neighborhood',
                accessorKey: 'neighborhood',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.neighborhood}</span>
                        </div>
                    );
                },
            },
            {
                header: 'landmark',
                accessorKey: 'landmark',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.landmark}</span>
                        </div>
                    );
                },
            },
            {
                header: 'source',
                accessorKey: 'source',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.source}</span>
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
            // {
            //     header: 'Status',
            //     accessorKey: 'is_joined',
            //     cell: (props) => {
            //         const row = props.row.original;
            //         return (
            //             <div>
            //                 {row.is_joined ? <Tag prefix prefixClass="bg-emerald-500"> Joined</Tag>
            //                     :
            //                     <Tag prefix prefixClass="bg-cyan-500">Available</Tag>
            //                 }
            //             </div>
            //         );
            //     },
            // },
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center"  >
            //                 <ActionColumn row={props.row.original} />
            //             </div>
            //         )
            //     },
            // },

        ];
    }

    if (selected == 'Activity') {
        columns = [

            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {

                    const row = props.row.original;

                    return <IdColumn row={row} />
                },
            },
            {
                header: 'app category id',
                accessorKey: 'app_category_id',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="grid justify-items-end " style={{ width: '45%' }}>{row.app_category_id}</span>
                        </div>
                    );
                },
            },
            {
                header: 'app name',
                accessorKey: 'app_name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.app_name}</span>
                        </div>
                    );
                },
            },
                {
                header: 'start_time',
                accessorKey: 'start_time',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.start_time}</span>
                        </div>
                    );
                },
            },
            {
                header: 'end time',
                accessorKey: 'end_time',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.end_time}</span>
                        </div>
                    );
                },
            },
            {
                header: 'total usage',
                accessorKey: 'total_usage',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="flex items-center">{row.total_usage}</span>
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
                accessorKey: 'start_time',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.start_time ? dayjs(row.start_time).format('MM/DD/YYYY') : ''}
                        </div>
                    );
                },
            },


        ];
    }
    // "social_media_type_id": "1",
    // "name": "Jaspreet",
    // "email": "jas@yopmail.com",
    // "gender": "Female",
    // "location": "chandigarh",
    // "updated_at": "2024-07-09T10:05:52.000Z",
    // "profile_url": "https://dummy.com/372819389498306",
    // "followers_count": "15",
    // "following_count": "5",
    // "posts_count": "3",
    // "likes_count": "45",
    // "friends_count": "2",
    // "description": "fgdfg",
    // "favourites_count": "12",
    // "follow_request_sent": "23",
    if (selected == 'Social') {
        columns =
            [
                {
                    header: 'ID',
                    accessorKey: 'id',
                    cell: (props) => {
    
                        const row = props.row.original;
    
                        return <IdColumn row={row} />
                    },
                },

                {
                    header: 'name',
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
                    header: 'email',
                    accessorKey: 'email',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.email}</span>
                            </div>
                        );
                    },
                },
                {
                    header: 'gender',
                    accessorKey: 'gender',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.gender}</span>
                            </div>
                        );
                    },
                },
                {
                    header: 'location',
                    accessorKey: 'location',
                    cell: (props) => {
                        const row = props.row.original;
                        return (
                            <div>
                                <span className="flex items-center">{row.location}</span>
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
   
    // const data = useSelector((state) => state.crmCustomerDetails?.data.poolList?.data)


    // const listJoinedORCreated = useSelector(
    //     (state) => state.crmUsers?.data.filterData.filterType
    // )


    const loading = useSelector((state) => state.crmCustomerDetailss?.data.loading2)

    const { pageNumber, pageSize,  userId, search } = useSelector(
        (state) => state.crmCustomerDetailss?.data.tableData
    )

    const { filter_type, paymentType } = useSelector(
        (state) => state.crmCustomerDetailss.data.filterHistory
    )
    console.log(pageNumber, pageSize, search, total, selected, 'set useeffedt')

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search, userId: id }),
        [pageNumber, pageSize, search, total, selected]
    )
    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber212')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page
        dispatch(setTableData(newTableData))
        console.log(newTableData, 'newTableData')
        // if (selected == 'B2b' ) {
        //     dispatch(getActivePoolList({ pageNumber: page, pageSize, search, userId: id , category_id:1}))

           
        // }
        // if (selected == 'Featured') {
        //     dispatch(getFeaturedPoolList({ pageNumber: page, pageSize, search, userId: id }))

        // }
        // if (selected == 'Active') {
        //     dispatch(getActivePoolList({ pageNumber: page, pageSize, search, userId: id , category_id:2}))


        // }
        // if (selected == 'Accomplishment') {

        //     dispatch(getAccomplishList({ pageNumber: page, pageSize, userId: id }))
        // }
        // if (selected == 'History') {
        //     dispatch(getHistoryList({ pageNumber, pageSize, userId: id, filter_type: filter_type }))
        // }
        // if (selected == 'Payment') {
        //     dispatch(getPaymentPoolList({ pageNumber: page, pageSize, userId: id, search: '', filterType: 1, paymentType }))
        // }
        // if (selected == 'Victory') {
        //     dispatch(getPoolStats({ id: id }))
        // }

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
    console.log(data, 'loadingloadingloading')
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
