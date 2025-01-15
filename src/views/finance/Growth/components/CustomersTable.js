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
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.user_id}`}
            >
                {row.
                    username
                }
            </Link>
        </div>
    )
}

const columns =
    [
        {
            header: 'User Name',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original
                return <NameColumn row={row} />
            },
        },

        {
            header: 'transactionid',
            accessorKey: 'transaction_id',
            cell: (props) => {
                const row = props.row.original;
                return (
                    row.receipt_url ?   <div>
                        <a href={row.receipt_url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            {row.transaction_id}
                        </a>

                    </div> :   <div>
                    {/* <a href={row.receipt_url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> */}
                        {row.transaction_id}
                    {/* </a> */}

                </div>
                 
                );
            },
        },
        {
            header: 'Transaction Date',
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
        // {
        //     header: 'currency',
        //     accessorKey: 'currency',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <div>
        //                 <span className="flex items-center">{row.currency}</span>
        //             </div>
        //         );
        //     },
        // },

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

        // {
        //     header: 'receipt_url',
        //     accessorKey: 'receipt_url',
        //     cell: (props) => {
        //         const row = props.row.original;
        //         return (
        //             <a href={row.receipt_url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        //                 Receipt
        //             </a>

        //         );
        //     },
        // },
        {
            header: 'paymentstatus',
            accessorKey: 'payment_status',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div>
                        <span className="flex items-center">{row.payment_status}</span>
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
            header: '',
            id: 'action',
            cell: (props) => <ActionColumn row={props.row.original} />,
        },
    ]

const Customers = () => {
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state)

    const total = useSelector((state) => state.financeGrowth.data.customerList.total_rows_count)
    const data = useSelector((state) => state.financeGrowth.data.customerList.data)
    const loading = useSelector((state) => state.financeGrowth.data.loading)
    const filterData = useSelector(
        (state) => state.financeGrowth.data.filterData
    )

    const { pageNumber, pageSize, search, filterType, user_id } = useSelector(
        (state) => state.financeGrowth.data.tableData
    )



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
        dispatch(getCustomers({ pageNumber, pageSize, search, filterType, user_id }))
    }, [pageNumber, pageSize, search, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, filterData, search])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search }),
        [pageNumber, pageSize, total]
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
            {/* <CustomerEditDialog /> */}
        </>
    )
}

export default Customers
