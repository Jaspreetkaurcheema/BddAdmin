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
        header: 'Shortname',
        accessorKey: 'shortName',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.shortName)}
                </div>
            )
        },
    },
    {
        header: 'Season year',
        accessorKey: 'seasonYear',
    },
    // {
    //     header: 'Description',
    //     accessorKey: 'description',
    // },
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
    
    // {
    //     header: 'Created',
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
    {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]

const Customers = ({ setSelectedCard, selected }) => {

    console.log(selected.key,'hjdjdha')
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state)
    console.log(Alldata,"Alldata")
    const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmCustomers.data.customerList.data)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageNumber, pageSize,poolEventId,search } = useSelector(
        (state) => state.crmCustomers.data.tableData
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
        dispatch(getCustomers({ pageNumber:1, pageSize, poolEventId:selected.key,search}))
    }, [pageNumber, pageSize, poolEventId,search,  filterData,selected.key, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, filterData,poolEventId,search])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, poolEventId:selected.key ,search}),
        [pageNumber, pageSize,total,poolEventId,selected.key]
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
                pagingData={{ pageNumber, pageSize,total}}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                on={on}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
