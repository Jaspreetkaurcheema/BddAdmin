import React, { useEffect, useMemo, useState } from 'react';
import { Table, Badge, Avatar } from 'components/ui';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import { DataTable, DoubleSidedImage } from 'components/shared';
import { GiConsoleController } from 'react-icons/gi';
import useThemeClass from 'utils/hooks/useThemeClass';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import useQuery from 'utils/hooks/useQuery';
import { getCustomers, getPoolEventDetails, getPoolTeamDetails, setTableData } from '../store/dataSlice';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const statusColor = {
    Active: 'bg-emerald-500',
    Deleted: 'bg-red-500',
};


// const teamscolumns = [
//     {
//         header: 'id',
//         accessorKey: 'sport_id',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                     <span className="cursor-pointer">{row.sport_id}</span>
//                 </div>
//             );
//         },
//     },

//     // {
//     //     header: 'Logo',
//     //     accessorKey: 'logo',
//     //     cell: (props) => {
//     //         const row = props.row.original;
//     //         return (
//     //             <div>
//     //             <span className="cursor-pointer">{row.logo}</span>
//     //         </div>

//     //         );
//     //     },
//     // },
//     {
//         header: 'Name',
//         accessorKey: 'name',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                     <span className="cursor-pointer">{row.name}</span>
//                 </div>
//             );
//         },
//     },

//     {
//         header: 'Score',
//         accessorKey: 'score',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                 <span className="cursor-pointer">{row.score}</span>
//             </div>

//             );
//         },
//     },
//     {
//         header: 'Display Name',
//         accessorKey: 'displayName',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                 <span className="cursor-pointer">{row.displayName}</span>
//             </div>

//             );
//         },
//     },
//      {
//         header: 'Location',
//         accessorKey: 'location',
//         cell: (props) => {
//             const row = props.row.original;
//             return (
//                 <div>
//                 <span className="cursor-pointer">{row.location}</span>
//             </div>

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
//     // const [selectedPool, setSelectedPool] = useState('created');
//     console.log (selected ,"uuuuuuuuuuuuuuu")
//     const [sorting, setSorting] = React.useState([]);    
//     const [tableColumns , setTableColumns] = React.useState({
//         data,
//         columns,
//         state: {
//             sorting,
//         },
//         onSortingChange: setSorting,

//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),

//     })

//     useEffect(()=>{
//         console.log("useeffect triggered !")
//         if(selected == 'Teams'){
//             setTableColumns({
//                 data,
//                 columns: teamscolumns,
//                 state: {
//                     sorting,
//                 },
//                 onSortingChange: setSorting,
//                 getCoreRowModel: getCoreRowModel(),
//                 getSortedRowModel: getSortedRowModel(),
//             })
//         }else{
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
//     },[selected])


//     let table = useReactTable(tableColumns);

//     return (
//         // <div className="mb-8">
//         //     <h6 className="mb-4">{selected}</h6>
//         //     {!isEmpty(data) && (
//         //         <Table>
//         //             <THead>
//         //                 {table?.getHeaderGroups().map((headerGroup) => (
//         //                     <Tr key={headerGroup.id}>
//         //                         {headerGroup.headers.map((header) => {
//         //                             return (
//         //                                 <Th
//         //                                     key={header.id}
//         //                                     colSpan={header.colSpan}
//         //                                 >
//         //                                     {header.isPlaceholder ? null : (
//         //                                         <div
//         //                                             {...{
//         //                                                 className:
//         //                                                     header.column.getCanSort()
//         //                                                         ? 'cursor-pointer select-none'
//         //                                                         : '',
//         //                                                 onClick:
//         //                                                     header.column.getToggleSortingHandler(),
//         //                                             }}
//         //                                         >
//         //                                             {flexRender(
//         //                                                 header.column.columnDef
//         //                                                     .header,
//         //                                                 header.getContext()
//         //                                             )}
//         //                                             {
//         //                                                 <Sorter
//         //                                                     sort={header.column.getIsSorted()}
//         //                                                 />
//         //                                             }
//         //                                         </div>
//         //                                     )}
//         //                                 </Th>
//         //                             );
//         //                         })}
//         //                     </Tr>
//         //                 ))}
//         //             </THead>
//         //             <TBody>
//         //                 {table?.getRowModel()?.rows.slice(0, 10)?.map((row) => {
//         //                         return (
//         //                             <Tr key={row.id}>
//         //                                 {row.getVisibleCells()?.map((cell) => {
//         //                                     return (
//         //                                         <Td key={cell.id}>
//         //                                             {flexRender(
//         //                                                 cell.column.columnDef.cell,
//         //                                                 cell.getContext()
//         //                                             )}
//         //                                         </Td>
//         //                                     );
//         //                                 })}
//         //                             </Tr>
//         //                         );
//         //                     })}
//         //             </TBody>
//         //         </Table>
//         //     )}

//         //     {isEmpty(data) && (
//         //         <div className="h-full flex flex-col items-center justify-center">
//         //             <DoubleSidedImage
//         //                 src="/img/others/img-2.png"
//         //                 darkModeSrc="/img/others/img-2-dark.png"
//         //                 alt="No user found!"
//         //             />
//         //             <h3 className="mt-8">No {selected} found!</h3>
//         //         </div>
//         //     )}
//         // </div>
//     );
// };
const PaymentHistory = ({ PoolDetailData = {}, selected = 'pools' }) => {

    const query = useQuery()
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(0);

    const selector = useSelector(state => state)
    // const selectors=useSelector(state=>state.poolEventDetails.data.memberList)

    const poolid = new URLSearchParams(window.location.search).get('id');
    const { season, eventfilterType, filterType, poolType } = useSelector(
        (state) => state.poolEventDetails.data.filterData
    )
    const { roundId, regionId } = useSelector(
        (state) => state.poolEventDetails.data.roundData
    )
    // useEffect(() => {

    //     console.log('useeeeee 12',selected ,PoolDetailData?.data)
    //     if(selected == 'Pool Entries'){
    //     setData(selector?.poolEventDetails.data.customerList?.data)
    // }
    // if(selected == 'Pool Members'){
    //     setData(selector?.poolEventDetails.data.memberList?.data)
    // }
    // }, [data,selected]);
    useEffect(() => {

        if (selected == 'pools') {
            setData(selector?.poolEventDetails.data.poolList?.pools)
            setTotal(selector?.poolEventDetails.data.poolList?.total_rows_count)
        }
        if (selected == 'games') {

            setData(selector?.poolEventDetails.data.gameList?.data)
            setTotal(selector?.poolEventDetails.data.gameList?.total_rows_count)

        }
        if (selected == 'teams') {
            setData(selector?.poolEventDetails.data.teamList?.data)
            setTotal(selector?.poolEventDetails.data.teamList?.total_rows_count)

        }
    }, [selector, selected, season]);
    console.log('232323232323', selector?.poolEventDetails.data)
    // const IdColumn = ({ row }) => {
    //     
    //     const { textTheme } = useThemeClass()


    //     return (
    //         <div className="flex items-center">
    //             <Avatar size={28} shape="circle" src={row?.profile_picture} />
    //             <Link
    //                 className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
    //                 to={`/app/crm/customer-details?id=${row.user_id}`}
    //             >
    //                 {row.username || row.poolMember}

    //             </Link>
    //         </div>
    //     )
    // }
    // const ActionColumn = ({ row }) => {

    //     const { textTheme } = useThemeClass()
    //     const dispatch = useDispatch()
    //     // const navigate = useNavigate()



    //     // const onView = useCallback(() => {
    //     //     // navigate(`/app/crm/customer-details?id=${row.user_id}`)
    //     // }, [navigate, row])
    //     return (
    //         <div className="flex justify-end ">

    //             {/* <Tooltip title="View">
    //                 <span
    //                     className={`cursor-pointer p-2 text-lg hover:${textTheme}`}
    //                     // onClick={onView}
    //                 >
    //                     <HiOutlineEye/>

    //                 </span>
    //             </Tooltip> */}
    //             {/* <div
    //             className={`${textTheme} cursor-pointer p-1 select-none font-semibold whitespace-nowrap`}
    //         onClick={onEdit}
    //         >
    //             Edit
    //         </div> */}
    //         </div>
    //     )
    // }
    let columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div>
                        <span className="cursor-pointer">{row?.eventId}</span>
                    </div>
                );
            },
        },
        {
            header: 'Name',
            accessorKey: 'eventName',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">
                        {row?.logo ? <Avatar size={28} shape="circle" src={row?.logo} /> : <></>}
                        <span className="cursor-pointer">{row?.eventName}</span>
                    </div>
                );
            },
        },

        // {
        //     header: 'Date',
        //     accessorKey: 'date',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <div className="flex items-center">
        //                 {dayjs(row.created_at).format('MM/DD/YYYY')}
        //             </div>
        //         );
        //     },
        // },
        {
            header: 'ShortName',
            accessorKey: 'shortname',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row?.shortName}
                        </span>
                    </div>
                );
            },
        },
        {
            header: 'Region name',
            accessorKey: 'region_name',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {(row.region_name)}
                    </div>
                )
            },
        },
        {
            header: 'Round name',
            accessorKey: 'round_name',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {(row.round_name)}
                    </div>
                )
            },
        },
        {
            header: 'Season Year',
            accessorKey: 'season year',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row?.seasonYear}
                        </span>
                    </div>
                );
            },
        },

    ];

    if (selected == 'teams') {
        columns = [
            {
                header: 'Display Name',
                accessorKey: 'displayName',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row?.logo ? <Avatar size={28} shape="circle" src={row?.logo} /> : <></>}

                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row?.displayName}
                            </span>
                        </div>
                    );
                },
            },

            {
                header: 'abbreviation',
                accessorKey: 'abbreviation',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="cursor-pointer">{row?.abbreviation
                            }</span>
                        </div>
                    );
                },
            },

            {
                header: 'score',
                accessorKey: 'score',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">
                            {row.score}
                        </div>
                    );
                },
            },
            {
                header: 'Competitor name',
                accessorKey: 'competitor_name',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="flex items-center">

                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row?.competitor_name}
                            </span>
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
                        <div className="flex items-center">

                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row?.location}
                            </span>
                        </div>
                    );
                },
            },

            {
                header: 'seed',
                accessorKey: 'seed',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div className="grid justify-items-end" style={{ width: '77%' }}>
                            {row.seed}
                        </div>
                    );
                },
            },

            {
                header: 'Winner status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <div>
                            <span className="cursor-pointer">{row?.status}</span>
                        </div>
                    );
                },
            },

        ];
    }

    if (selected == 'pools') {
        columns = [{
            header: 'Pool Name',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        <Avatar size={28} shape="circle" src={row?.profile_picture} />
                        <div className=' ml-2 rtl:mr-2 font-semibold'>
                            {row?.name}
                        </div>
                    </div>)
            },

        },
        // {
        //     header: 'Email',
        //     accessorKey: 'email',
        // },
,

      
        {
            header: 'Pool Entries',
            accessorKey: 'poolentries',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="grid justify-items-end" style={{ width: '95%' }} >
                        {(row.pool_entries_count)}
                    </div>
                )
            },
        },
        {
            header: 'Pool Members',
            accessorKey: 'poolmembers',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="grid justify-items-end" style={{ width: '95%' }}>
                        {(row.pool_members_count)}
                    </div>
                )
            },
        },
        {
            header: 'Pool Joining',
            accessorKey: 'pooljoining',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="grid justify-items-end" style={{ width: '95%' }}>
                        {(row.pool_joining_requests_count)}
                    </div>
                )
            },
        },
        {
            header: 'Total Amount',
            accessorKey: 'amount',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="grid justify-items-end" style={{ width: '97%' }}>
                        {(row.total_amount) ? "$" + (row.total_amount) : 0}
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
            // {
            //     header: 'Action',
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
        ]
    }

    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.poolEventDetails?.data.tableData
    )



    // const fetchData = useCallback(() => {

    // }, [data]);

    // Define other dependencies such as pageSize and search
    // const total = useSelector((state) => state.poolEventDetails.data.poolList.total_rows_count)

    console.log(total, 'totall')
    const loading = useSelector(
        (state) => state.poolEventDetails.data.loading1
    )
    // const data = useSelector((state) => state.poolEventDetails.data.customerList.data)

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search }),
        [pageNumber, pageSize, total]
    )
    const tableDatas = useMemo(
        () => ({ pageNumber, pageSize, search, joined: true }),
        [pageNumber, pageSize, total]
    )
    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber in pagination')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page

        if (selected == 'pools') {
            dispatch(setTableData(newTableData))
            dispatch(getCustomers({ pageNumber: page, pageSize, search: '', poolEventId: query.get('id'), season, filterType, eventfilterType, poolType, sportId: null }))

        }
        if (selected == 'games') {
            dispatch(setTableData(newTableData))
            dispatch(getPoolEventDetails({ pageNumber: page, pageSize, poolEventId: query.get('id'), season, search: '', regionId, roundId }))
        }
        if (selected == 'teams') {
            dispatch(setTableData(newTableData))
            dispatch(getPoolTeamDetails({ pageNumber: page, pageSize, poolEventId: query.get('id'), season, search: '', regionId, roundId }))
        }

        // if (selected == 'Pool Members') {
        //     const newTableDatas = cloneDeep(tableDatas)
        //     newTableDatas.pageNumber = page
        //     // dispatch(setTableData(newTableDatas))
        //     // dispatch(getPoolMembers({ pageNumber, pageSize, poolId: poolid, search: '', joined: true }))
        // }
        // dispatch(getPool({ pageNumber, pageSize, search, isJoined: (selected =='Created')? true:false, userId: id }))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageNumber = 1
        dispatch(setTableData(newTableData))

    }
    console.log(data, 'datarrr')
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
                        <h3 className="mt-8">No {selected}  found!</h3>
                    </div>
                )
            }
            {/* <CustomerEditDialog /> */}
        </>
    );
};

export default PaymentHistory;
