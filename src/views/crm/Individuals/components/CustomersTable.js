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
import IndividualsDeleteConfirmation from './IndividualsDeleteConfirmation'
import { SliderOpen } from 'views/crm/Coach/components/CustomersTable'
const statusColor = {
    Active: 'bg-emerald-500',
    notVerified: 'bg-red-500',
    Suspended:'bg-blue-500',
}

const ActionColumn = ({ row,setIsVisible }) => {
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
            <Avatar size={28} shape="circle" src={row.profile_pic} />
            {/* <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            > */}
                {row.username}
            {/* </Link> */}
        </div>
    )
}
const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmIndividuals.data.customerList.data)
    const [isVisible , setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmIndividuals.data.loading)
    const filterData = useSelector(
        (state) => state.crmIndividuals.data.filterData
    )
const columns = [
    {
        header: 'Username',
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
    },
    {
        header: 'User Info',
        accessorKey: 'Userinfo',
        cell: (props) => {
            const row = props.row.original;
            return (
                <div>
                    <span>{row.firstname}</span>
                    <br />
                    <span>{row.email}</span>
                    <br/>
                    <span>{row.contact_number}</span>
                </div>
            );
        },
    },
    {
        header: 'Plan ',
        accessorKey: 'subscriptionplan',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.subscriptionplan || 'No Plans'}
                    </span>
                   <SliderOpen name={"Update Plan"} subscription_id={row.subscription_id} row={row} dispatch ={()=>dispatch(getCustomers({ pageIndex, pageSize, sort, query, search, filterData ,id:8})) } userType={8}  />
                    
                </div>
            )
        },
    },
    {
        header: 'Valid  Up to',
        accessorKey: 'expiry_date',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.formated_expiry_date || ''}
                    </span>
                </div>
            )
        },
    },
   
    {
        header: 'Account Created',
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



    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmIndividuals.data.tableData
    )
    const location = useLocation();
    const searchParams = location.pathname;
    const id = searchParams.match(/[^/]+$/)[0];
    useEffect(()=>{
        pageIndex= 1;
        pageSize=10;
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = pageIndex
        dispatch(setTableData(newTableData))
    },[id])

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, search, filterData ,id:8}))
    }, [pageIndex, pageSize, sort, query,search, filterData, dispatch])

    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
        }, 500)
        return () => clearTimeout(getData);
    }, [fetchData, pageIndex, pageSize, sort, search, filterData])


    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query,search, total }),
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
          <IndividualsDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible}    />
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
                            <h3 className="mt-8">No Individuals found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog  pageIndex={pageIndex} pageSize={pageSize} />
        </>
    )
}

export default Customers
