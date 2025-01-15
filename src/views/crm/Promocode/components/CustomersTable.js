import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
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
import { setDeleteMode } from 'views/sales/OrderList/store/stateSlice'
import { RowSelection } from '@tanstack/react-table'
import PromoDeleteConfirmation from './PromoDeleteConfirmation'

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
    const onDelete = () => {
        dispatch(setDeleteMode('single'))
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
    console.log(row, 'rororoorroorroro')
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {/* <Avatar size={28} shape="circle" src={row.profile_picture} /> */}
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                // to={`/app/crm/customer-details?id=${row.user_id}`}
            > */}
            {row.name}
            {/* </Link> */}
        </div>
    )
}


// {
//     "amount": 100,
//     "code": "NEWENTRY",
//     "end_date": "2024-12-12T00:00:00+00:00",
//     "name": "New Entry",
//     "once_per_customer_limit": 0,
//     "specific_pool_ids": null,
//     "start_date": "2023-08-28T00:00:00+00:00",
//     "total_usage_limit": 0,
//     "type": "percentage"
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
        header: 'Code',
        accessorKey: 'code',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.code)}
                </div>
            )
        },
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end" style={{ width: '70%' }}>
                {"$"+(row.amount)}
            </div>
          
            )
        },
    },
    {
        header: 'free entries',
        accessorKey: 'free_entries',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="grid justify-items-end" style={{ width: '80%' }}>
                    {row.free_entries}
                </div>
            )
        },
    },
    {
        header: 'Type',
        accessorKey: 'type',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row.type}
                </div>
            )
        },
    },
    {
        header: 'pools',
        accessorKey: 'poolName',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row.poolName}
                </div>
            )
        },
    },
    {
        header: 'start date',
        accessorKey: 'start_date',
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
        header: 'end date',
        accessorKey: 'end_date',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs(row.end_date).format('MM/DD/YYYY')}
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
    const Alldata = useSelector((state) => state)
    console.log(Alldata, "Alldata")
    const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmCustomers.data.customerList.pools) 
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageNumber, pageSize, search } = useSelector(
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
        dispatch(getCustomers({ pageNumber, pageSize, search: '' }))
    }, [pageNumber, pageSize, search])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, search])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search }),
        [pageNumber, pageSize, search]
    )

    const onPaginationChange = (page) => {
        // console.log(page,'pageNumber')
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
                pagingData={{ pageNumber, pageSize, search, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                on={on}
            /> : (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No Promo code found!</h3>
                </div>
            )
        }
            <CustomerEditDialog />
            <PromoDeleteConfirmation/>
        </>
    )
}

export default Customers
