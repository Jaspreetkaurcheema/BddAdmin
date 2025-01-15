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
import { Link ,useLocation} from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import FaqDeleteConfirmation from './FaqDeleteConfirmation'
const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
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
    const onDelete = async() => {
        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
         initialDispatch()
         setIsVisible(true)
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
            {/* <Avatar size={28} shape="circle" src={row.profile_pic} /> */}
           
                {row.id}
  
        </div>
    )
}


const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmFAQ.data.customerList.data)
    const [isVisible , setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmFAQ.data.loading)
    const filterData = useSelector(
        (state) => state.crmFAQ.data.filterData
    )
    const columns = [
        
      
        {
            header: ' Type',
            accessorKey: 'tutorial_video_type',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center">
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.type}
                        </span>
                    </div>
                )
            },
        },
         {
            header: 'Question',
            accessorKey: 'tutorial_video_question',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center">
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.tutorial_video_question}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Answer',
            accessorKey: 'tutorial_video_answer',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center">
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.tutorial_video_answer}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Faq_Created',
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
            cell: (props) => <ActionColumn row={props.row.original} setIsVisible={setIsVisible}  />,
        },
    ]
    
    let { pageIndex, pageSize, sort, total, search  } = useSelector(
        (state) => state.crmFAQ.data.tableData
    )
    const location = useLocation();
    const searchParams = location.pathname;
    const currentValue = searchParams.match(/[^/]+$/)[0];
    useEffect(()=>{
        pageIndex= 1;
        pageSize=10;
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = pageIndex
        dispatch(setTableData(newTableData))
    },[currentValue])
    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, filterData, search }))
    }, [pageIndex, pageSize, sort, filterData, search, dispatch])

    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
        console.log("bbbbbbb")
        }, 500)
        return () => clearTimeout(getData);
    }, [fetchData, pageIndex, pageSize, sort, search, filterData])



    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, total, search }),
        [pageIndex, pageSize, sort, total, search]
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
          <FaqDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible} />
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
                        pagingData={{ pageSize, sort, total, search, pageIndex }}
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
                            <h3 className="mt-8">No FAQ found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog pageIndex={pageIndex} pageSize={pageSize} />
          
        </>
    )
}

export default Customers

  