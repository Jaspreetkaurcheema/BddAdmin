import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
    toggleDeleteConfirmation
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import SubscriptionOfferDeleteConfirmation from './SubscriptionOfferDeleteConfirmation'
const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row, setIsVisible, i }) => {
    console.log(i, "llll")
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const selector = useSelector(state=>state)
    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }
    const initialDispatch = ()=>{
        dispatch(toggleDeleteConfirmation(true))
    }
    const onDelete = async() => {
        dispatch(setSelectedCustomer(row))
     
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        initialDispatch()
        setIsVisible(true)
       
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

            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            >
                {row.id}
            </Link>
        </div>
    )
}

const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmSubscriptionOffer.data.customerList.data)|| null
    const [isVisible , setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmSubscriptionOffer.data.loading)
    const filterData = useSelector(
        (state) => state.crmSubscriptionOffer.data.filterData
    )
const columns = [
      
    {
        header: ' Subscription_Name',
        accessorKey: 'subscriptionname',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.subscription_name}
                    </span>
                </div>
            )
        },
    },

    {
        header: 'Offer_Type',
        accessorKey: 'offertype',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center ">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.
                            offer_type
                        }
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Payment_Type',
        accessorKey: 'payment_type',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center ">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.
                            payment_type

                        }
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Trail_Period',
        accessorKey: 'discount_duration',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center ">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.discount_duration +' Weeks'
                        }
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Discount %',
        accessorKey: 'discount',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center ">

                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.

                            discount_percentage + '%'


                        }
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Action',
        id: 'action',
        cell: (props, i) => <ActionColumn row={props.row.original} i = {i} />,
    },
]



    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmSubscriptionOffer.data.tableData
    )
    const location = useLocation();
    const searchParams = location.pathname;
    const currentValue = searchParams.match(/[^/]+$/)[0];
    useEffect(() => {
        pageIndex = 1;
        pageSize = 10;
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = pageIndex
        dispatch(setTableData(newTableData))
    }, [currentValue])
    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, search, filterData }))
    }, [pageIndex, pageSize, sort, query, search, filterData, dispatch])
    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
        console.log("bbbbbbb")
        }, 500)
        return () => clearTimeout(getData);
    }, [fetchData, pageIndex, pageSize, sort, search, filterData])


    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, search, total }),
        [pageIndex, pageSize, sort, query, search, total]
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
  < SubscriptionOfferDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible} />
            <>{data == null ? <>
                <Loading loading={true} />

            </> :
                <>{data.length ?
                    <DataTable
                        columns={columns}
                        data={data}
                        skeletonAvatarColumns={[0]}
                        skeletonAvatarProps={{ width: 28, height: 28 }}
                        loading={loading}
                        pagingData={{ pageIndex, pageSize, sort, query, search, total }}
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
                            <h3 className="mt-8">No Subscriptions found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog  pageIndex={pageIndex} pageSize={pageSize} />
        </>
    )
}

export default Customers
