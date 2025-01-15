import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge, Select } from 'components/ui'
import { DataTable , DoubleSidedImage, Loading} from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupons, setTableData } from '../store/dataSlice'
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
import { Field } from 'formik'
import CouponDeleteConfirmation from './CouponDeleteConfirmation'
// import { apiGetCrmGames, apiGetCrmOrganizer } from 'services/CrmService'
const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row, setIsVisible }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
        
    }
    const initialDispatch = () => {
        dispatch(toggleDeleteConfirmation(true))
    }
    const onDelete = useCallback(() => {

        dispatch(setSelectedCustomer(row))
       
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        initialDispatch()
        setIsVisible(true)


    })

    return (
       
        <div >
            <div className='flex items-center'>
                <span
                    className={`${textTheme} cursor-pointer select-none font-semibold`}
                    onClick={onEdit}
                >

                </span>

                <span
                    className="cursor-pointer p-6 hover:text-red-500"
                    onClick={onDelete}
                >
                    {/* <HiOutlineTrash /> */}
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

const Customers = (props) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCouponsHistory.data.couponsList.data)
    
    const [isVisible, setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmCouponsHistory.data.loading)
    const filterData = useSelector(
        (state) => state.crmCouponsHistory.data.filterData
    )
    const { row } = props
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    // const [data1, setData1] = useState(null)
    // const [data2, setData2] = useState(null)

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
            } catch (error) {
                console.error('Error fetching faqs:', error);
                
            }
        };

        fetchData();


    }, []);



    function calculateInitialValue(finalValue, discountPercentage) {
       
        // Convert discount percentage to a decimal
        const discountDecimal = discountPercentage / 100;
        // Calculate the initial value
        const initialValue = finalValue / (1 - discountDecimal);
        return initialValue;
    }
    
    const columns = [
      
        {
            header: 'Organizer',
            accessorKey: 'organizer',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.organizerName}
                            < br />
                            <span>{row.email}</span>
                            < br />
                            <span>{row.contact_number}</span>
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Coupon Name',
            accessorKey: 'coupon_name',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.coupon_name}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'code',
            accessorKey: 'coupon_code',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.coupon_code}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'description',
            accessorKey: 'coupon_description',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.coupon_description}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'couponoff',
            accessorKey: 'coupon_off',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center justify-end" style={{ width: '100%' }}>

                        <span className="ml-2 rtl:mr-2 capitalize">
                        {row && row.coupon_type === 'Percentage' ? `${row.coupon_off}%` : row && row.coupon_type === 'Fixed Amount' ? `$${row.coupon_off}` : ''}
                        </span> 
                    </div>
                )
            },
        },

        {
            header: 'Event',
            accessorKey: 'event',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.gametype}

                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Payable Amount',
            accessorKey: 'payableamount',
            cell: (props) => {
                const row = props.row.original;
               let initialValue = calculateInitialValue(row.order_amount, row.coupon_off);
              
                if(row.coupon_type  === 'Fixed Amount')initialValue =Number(row.order_amount) + Number(row.coupon_off)

                return (
                    <div className="flex items-center">
                        <span className="ml-2 rtl:mr-2 capitalize justify-end" style={{ width: '100%' }}>
                            {'$' + initialValue.toFixed(2)} {/* Display the initial value with two decimal places */}
                        </span>
                    </div>
                );
            },
        },
        {
            header: 'Discount Payable Amount',
            accessorKey: 'payableamount',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize justify-end" style={{ width: '100%' }}>
                            {'$' + row.order_amount}

                        </span>
                    </div>
                )
            },
        },
     {
            header: ' Coupon Expiry date',
            accessorKey: 'coupon_expiry_date',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {dayjs(row.coupon_expiry_date).format('MM/DD/YYYY')}
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



    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmCouponsHistory.data.tableData
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
        dispatch(getCoupons({ pageIndex, pageSize, sort, query, search, filterData }))
    }, [pageIndex, pageSize, sort, query, search, filterData, dispatch])

    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
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
            < CouponDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible} />
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
                        <h3 className="mt-8">No PromocodeHistory found!</h3>
                    </div>
                )
            }</>} </>
        <CustomerEditDialog />
        </>
    )
}

export default Customers
