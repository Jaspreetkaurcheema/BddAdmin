import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'

const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
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
                to={`/app/crm/pool-details?id=${row.id}`}
            > */}
            <div className=' ml-2 rtl:mr-2 font-semibold'>
                {row.planName}
                </div>
            {/* </Link> */}
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
        header: 'Plan Name',
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
    {
        header: 'Number of Users',
        accessorKey: 'no_of_users',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end" style={{ width: '23%' }}>

                    {(row.no_of_users)}
                </div>
            )
        },
    },
    // {
    //     header: 'Currency',
    //     accessorKey: 'Currency',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.currency)}
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Amount Monthly',
    //     accessorKey: 'amount monthly',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.amount_montly)}
    //             </div>
    //         )
    //     },
    // },
    // {
    //     header: 'Amount Yearly',
    //     accessorKey: 'amount yearly',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div className="flex items-center">
    //                 {(row.amount_yearly)}
    //             </div>
    //         )
    //     },
    // },
    {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end" style={{ width: '20%' }}>
                    {"$"+(row.amount)}
                </div>
            )
        },
    },
    // {
    //     header: 'Pool Created',
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
    //     header: '',
    //     id: 'action',
    //     cell: (props) => <ActionColumn row={props.row.original} />,
    // },
]

const Customers = () => {
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state)
    console.log(Alldata,"Alldata")
    const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageNumber, pageSize,search } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )

    // {
    //     "isActive": true,
    //     "search": "string",
    //     "pageSize": 0,
    //     "pageNumber": 0,
    //     "usertype": 1
    //   }

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageNumber, pageSize,search }))
    }, [pageNumber, pageSize,  search, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, filterData])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize,  search }),
        [pageNumber, pageSize,  search,total]
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
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageNumber, pageSize,  search,total  }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                on={on}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
