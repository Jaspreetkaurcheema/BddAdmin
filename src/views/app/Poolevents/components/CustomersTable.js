import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
    toggleDeleteConfirmation,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import EventDeleteConfirmation from './EventDeleteConfirmation'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        console.log('rrrrrrrrrrrrrr',row)
        dispatch(setDrawerOpen())

      
        dispatch(setSelectedCustomer(row))
    }

    const onDelete = async () => {

      dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedCustomer(row))
    }

    return (
        // <div
        //     className={`${textTheme} cursor-pointer select-none font-semibold`}
        //     onClick={onEdit}
        // >
        //  Edit


        // </div>

        <div >
            <div className='flex items-center'>
                <span
                    className={`${textTheme} cursor-pointer select-none font-semibold`}
                    onClick={onEdit}
                >
                    Edit
                </span>

                <span
                    className="cursor-pointer p-6 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </div>


        </div>
    )
}

const NameColumn = ({ row }) => {
    
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {/* <Avatar size={28} shape="circle" src={row.profile_picture} /> */}
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/apps/poolevent-details?id=${row?.id}`}
            >
                {row?.eventname
                }
            </Link>
        </div>
    )
}

const columns = [
    {
        header: 'Name',
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
    },
    {
        header: 'Sportname',
        accessorKey: 'sportname',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.sportname)}
                </div>
            )
        },
    },
    {
        header: 'How to win',
        accessorKey: 'how_to_win',
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    // {
    //     header: 'Status',
    //     accessorKey: 'status',
    //     cell: (props) => {
    //         const row = props.row.original

    //         return (
    //             <div className="flex items-center">
    //                 <Badge className={statusColor[row.status]} />
    //                 <span className="ml-2 rtl:mr-2 capitalize">
    //                     {row.status}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    {
        header: 'Created',
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
    const [filteredData, setFilteredData] = useState()
    const Alldata = useSelector((state) => state)
    console.log(Alldata, "Alldata")
    const total = useSelector((state) => state.appEvents.data.customerList.total_rows_count)
    const data = useSelector((state) => state.appEvents.data.customerList.data)
    const loading = useSelector((state) => state.appEvents.data.loading)
    const filterData = useSelector(
        (state) => state.appEvents.data.filterData
    )

    const { eventfilterType, poolTypeId, sportId, is_programmed } = useSelector(
        (state) => state.appEvents.data.filterData
    )

    console.log(poolTypeId, 'poolTypeIdpoolTypeId')

    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.appEvents.data.tableData
    )
    useEffect(() => {
        setFilteredData(Alldata.appEvents.data.customerList.data)
    }, [Alldata])

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
        dispatch(getCustomers({ pageNumber, pageSize, poolTypeId, sportId, search, eventfilterType, is_programmed }))
    }, [pageNumber, pageSize, poolTypeId, sportId, search, eventfilterType, is_programmed, dispatch])

    useEffect(() => {
        console.log(data, filteredData, "checkoint");
        fetchData()
    }, [fetchData, pageNumber, pageSize, search, poolTypeId, sportId, eventfilterType, is_programmed])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, poolTypeId, sportId, eventfilterType, search, is_programmed }),
        [pageNumber, pageSize, total, poolTypeId, sportId, eventfilterType, search, is_programmed]
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
    console.log(data, 'daraaaa')
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageNumber, pageSize, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                on={on}
            />
            <CustomerEditDialog />
            <EventDeleteConfirmation/>
        </>
    )
}

export default Customers
