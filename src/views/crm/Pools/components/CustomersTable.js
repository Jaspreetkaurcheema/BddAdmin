import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge, Tooltip } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getPools, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { name } from 'dayjs/locale/es'
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
            //  onClick={onEdit}
            >
                Edit
            </div> */}
        </div>
    )
}

const NameColumn = ({ row }) => {

    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={row?.profile_picture} />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/pool-details?id=${row?.id}`}
            >
                <div className=' ml-2 rtl:mr-2 font-semibold'>
                    {row?.name}
                </div>
            </Link>
        </div>
    )
}

// {
//     "id": 153,
//     "pool_event_id": 3,
//     "user_id": 57,
//     "pool_type": null,
//     "name": "Jake Test Pool 1",
//     "bio": "Test Test!",
//     "profile_picture": "",
//     "status": 1,
//     "created_at": "2023-10-27T14:22:54Z",
//     "updated_at": "2023-10-27T14:22:54Z",
//     "deleted_at": "0001-01-01T00:00:00",
//     "is_delete": 0
// },

const columns = [
    {
        header: 'Name',
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },

    },
    // {
    //     header: 'Email',
    //     accessorKey: 'email',
    // },
    // {
    //     header: 'Sport Name',
    //     accessorKey: 'sport_name',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.sport_name)}
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Pool Type',
    //     accessorKey: 'pool_type',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.pool_type)}
    //             </div>
    //         )
    //     },
    // },

    // {
    //     header: 'Pool Event Name',
    //     accessorKey: 'event_name',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.event_name)}
    //             </div>
    //         )
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
        header: 'Pool Sport Event',
        accessorKey: 'name',
        maxSize: 1000,
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
        header: 'Joining Requests',
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
        header: 'Total Funds',
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
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]

const Customers = ({ setSelectedCard, selected }) => {

    console.log(selected, 'fffff')
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state)
    console.log(Alldata, "Alldata")
    const total = useSelector((state) => state.crmPools.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmPools.data.customerList?.pools) || null
    const loading = useSelector((state) => state.crmPools.data.loading)
    const { filterType, eventfilterType, poolType, sportId } = useSelector(
        (state) => state.crmPools.data.filterData
    )


    const { pageNumber, pageSize, search, sort, poolEventId } = useSelector(
        (state) => state.crmPools.data.tableData
    )

    const { season } = useSelector(
        (state) => state.crmPools.data.filterData
    )
    console.log(pageNumber, 'pageNumber')
    // {
    //     "isActive": true,
    //     "search": "string",
    //     "pageSize": 0,
    //     "pageNumber": 0,
    //     "usertype": 1
    //   }

    const fetchData = useCallback(() => {
        dispatch(getPools({ pageNumber, pageSize, search, sort, poolEventId, filterType, eventfilterType, poolType, sportId, season }))
    }, [pageNumber, pageSize, search, sort, filterType, eventfilterType, poolType, sportId, season, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, sort, filterType, eventfilterType, poolType, sportId])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, sort, search, poolEventId, eventfilterType, poolType }),
        [pageNumber, pageSize, sort, search, total]
    )

    const onPaginationChange = (page) => {

        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page
        console.log(page, 'pageNumber', newTableData)
        dispatch(setTableData({ pageNumber: page, pageSize, search: '', poolEventId: null }))
        dispatch(getPools({ pageNumber: page, pageSize, search, sort, poolEventId, filterType, eventfilterType, poolType, sportId, season }))

    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageNumber = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort // Assuming sort is an object containing information about the column to sort by and the sorting direction
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
                    // onSort={onSort}  
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
            <CustomerEditDialog />
        </>
    )
}

export default Customers