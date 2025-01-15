import React, { useEffect, useCallback, useMemo } from 'react'
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
import FaqDeleteConfirmation from './FaqDeleteConfirmation'

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
    const onDelete = async() => {

        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
         
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedCustomer(row))
    }

    return (
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
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                // to={`/app/crm/customer-details?id=${row.user_id}`}
            > */}
                {row.question}
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
        header: 'Question',
        accessorKey: 'question',
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
    // {
    //     "id": 20,
    //     "question": "How do pool entry fees work?",
    //     "answer": "KingPool charges a $0.99 service fee per pool entry for personal user pools. However, there are plenty of opportunities to circumvent this service fee. Every user starts with 2 free entries, users earn free entries if they purchase enough pool entries, and business admin pools are free for users to join!",
    //     "display_order": 1,
    //     "user_role_id": 1,
    //     "created_at": "2024-01-30T05:24:54Z"
    // },
    {
        header: 'Answer',
        accessorKey: 'answer',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.answer)}
                </div>
            )
        },
    },
   
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
    const Alldata = useSelector((state) => state)
    console.log(Alldata,"Alldata")
    // const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)
    const data = useSelector((state) => state.crmCustomers.data?.customerList?.data
    )
    const total = useSelector((state) => state.crmCustomers.data.customerList.total_rows_count)

    const loading = useSelector((state) => state.crmCustomers.data.loading)
  const {userType} = useSelector(
   ( state)=> state.crmCustomers.data.filterData
  )
    const { pageNumber, pageSize,  search } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )

    

    // console.log(filterData,'filterssss')
 
 
    // {
    //     "search": "string",
    //     "pageSize": 0,
    //     "pageNumber": 0,
    //     "userType": 0
    //   }
    const fetchData = useCallback(() => {
        dispatch(getCustomers({pageNumber:1,pageSize,search:'',userType}))
    }, [ pageNumber, pageSize, userType,dispatch])
    useEffect(() => {
        fetchData()
    }, [fetchData, pageNumber, pageSize, userType])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, userType, search, }),
        [pageNumber, pageSize, userType,  search, total]
    )


    console.log(tableData,'tablllll')
    const onPaginationChange = (value) => {
        // console.log(page,'pageNumber')
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageNumber = 1
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

        console.log(newTableData,'neww')
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
            <FaqDeleteConfirmation/>
        </>
    )
}

export default Customers
