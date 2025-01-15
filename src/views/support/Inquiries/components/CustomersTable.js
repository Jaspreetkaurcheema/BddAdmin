import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getInquiry, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
    setReplyDialog,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import NewReplyDialog from './ReplyDialog'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        // dispatch(setReplyDialog(true))
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            Reply
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
                    name
                }
            </Link>
        </div>
    )
}



const Customers = ({ setSelectedCard, selected }) => {

    console.log(selected.key, 'selectedselected')
    const dispatch = useDispatch()
    const [data1, setData] = useState(null)
    const [total1, setTotal] = useState(0)
    const Alldata = useSelector((state) => state)
    console.log(Alldata, "Alldata")
    let total = useSelector((state) => state.supportInquiries.data.customerList.total_rows_count)
    const data = useSelector((state) => state.supportInquiries.data.customerList.data)
    const loading = useSelector((state) => state.supportInquiries.data.loading)
    const filterData = useSelector(
        (state) => state.supportInquiries.data.filterData
    )
    let columns = [
        // {
        //     header: 'Name',
        //     accessorKey: 'name',
        //     cell: (props) => {
        //         const row = props.row.original
        //         return <NameColumn row={row} />
        //     },
        // },
        {
            header: 'Inquiery id',
            accessorKey: 'inquiry_id',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {(row.inquiry_id)}
                    </div>
                )
            },
        },
        {
            header: 'Inquiry Type',
            accessorKey: 'inquiryType',
        },

        {
            header: 'Description',
            accessorKey: 'description',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'User name',
            accessorKey: 'username'
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
    if (selected?.key == 'Active') {
        columns = [
            {
                header: 'Inquiery id',
                accessorKey: 'inquiry_id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {(row.inquiry_id)}
                        </div>
                    )
                },
            },


            {
                header: 'first name',
                accessorKey: 'first_name',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Phone number',
                accessorKey: 'phone_no'
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ]
    }

    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.supportInquiries.data.tableData
    )

    useEffect(() => {
        setData(Alldata.supportInquiries.data.inquiryList.data)
        setTotal(Alldata.supportInquiries.data.inquiryList.total_rows_count)
    
    }, [selected?.key, Alldata])

    console.log(data1, 'dshbjhdjdsfh')
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
        dispatch(getCustomers({ pageNumber, pageSize, search }))
    }, [pageNumber, pageSize, search, filterData, dispatch])

    useEffect(() => {

        console.log('Inside usefffer')
        fetchData()
    }, [fetchData, pageNumber, pageSize, filterData, search])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search }),
        [pageNumber, pageSize, total]
    )

    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber')
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = page
        dispatch(setTableData(newTableData))

        if(selected.key == 'Active'){
            const newTableData = cloneDeep(tableData)
            newTableData.pageNumber = page
        dispatch(setTableData(newTableData))
        dispatch(getInquiry({ pageNumber:page, pageSize:25,search}))


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

    return (
        <>
            <DataTable
                columns={columns}
                data={selected.key == 'Active' ? data1 : data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={selected.key == 'Active' ? { pageNumber, pageSize, total1 } : { pageNumber, pageSize, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                on={on}
            />
            <CustomerEditDialog />
            {/* <NewReplyDialog /> */}
        </>
    )
}

export default Customers
