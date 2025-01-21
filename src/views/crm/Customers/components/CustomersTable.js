import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge, Tooltip } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { left } from '@popperjs/core'
import { FaEdit } from 'react-icons/fa'
import { generateImage } from 'components/template/UserDropdown'

const statusColor = {
    Active: 'bg-emerald-500',
    Deleted: 'bg-red-500',
}

console.log(statusColor, 'hhfjdfjdfjhdf')

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }
    const tableData = useSelector(
        (state) => state.crmUsers.data.tableData
    )
    const onView = useCallback(() => {
       
        const newTableData = cloneDeep(tableData)
        newTableData.pageNumber = 1
        newTableData.search = ''
        dispatch(setTableData(newTableData))
        navigate(`/app/crm/customer-details?id=${row.id}`)
    }, [navigate, row])
      return (

        <div className="flex  items-center gap-2 ">
            <div
                className={`${textTheme} cursor-pointer select-none font-semibold`}
                onClick={onEdit}
            >
              <FaEdit />

            </div>
           <div>
           <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiOutlineEye />
            </span>
           </div>

           {/* <iv> <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                // onClick={onDelete}
            >
                <HiOutlineTrash />
            </span></iv> */}

        </div>

    )
}




const NameColumn = ({ row, style }) => {


    const { textTheme } = useThemeClass(); // assuming this is defined somewhere

    return (
        <div className={`flex items-center relative ml-5`} style={{ ...style }}>
            <Avatar size={28} shape="circle" src={row.profile_pic?  row.profile_pic : generateImage(row.full_name ?row.full_name :''   )} />
            <div className="items-center ml-3 "> {/* Added relative class here */}
                <Link
                    className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                    to={`/app/crm/customer-details?id=${row.id}`}
                >
                    
                    {row.full_name}
                </Link>
                <div className='font-semibold'><a href="mailto:this.guy@gmail.com?subject=Test">{row.email}</a></div>
                <div className="flex "> {/* Added relative class here */}
                    {/* Ribbon Code Here */}
                    {row.current_plan ? (row.current_plan == "Premium" ? <div className="">
                        <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-91px', lineHeight: '15px', color: '#f0f0f0', background: '#e43 ', top: '4px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium </div>
                    </div> :
                        <div className="">
                            <div className="corner-ribbon  sticky  text-white shadow-lg  " style={{ width: '155px', left: '-90px', lineHeight: '15px', color: '#f0f0f0', background: '#FF9800 ', top: '6px', transform: 'rotate(-45deg) ', position: 'absolute', textAlign: 'center', fontSize: '10px' }}>Premium  yearly</div>
                        </div>) : <></>}
                </div>
            </div>
        </div>


    )
}




const columns = [

    {
        header: <span style={{ marginLeft: '1.25rem' }}>User</span>, // Applying margin to the header
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original;
            return <NameColumn row={row} style={{ marginLeft: '1.25rem' }} />; // Applying margin to the cell
        },
    },
    {
        header: 'social type',
        accessorKey: 'social_type',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex ">
                    {(row.social_type)}
                </div>
            )
        },
    },

    // {
    //     header: 'Featured pools',
    //     accessorKey: 'joined_pool_count',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <Link className={` mr-5 rtl:mr-2 font-semibold`}
    //                 // to={`/app/crm/customer-details?id=${row.user_id}&&action=${"joined_pool_count"}`}
    //             >
    //                 <div className="grid justify-items-end" style={{ width: '93%' }} >

    //                     {(row.number_of_featuredpools)}
    //                 </div></Link>
    //         )
    //     },
    // },

    {
        header: 'Registered On',
        accessorKey: 'created_at',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center" >
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
        header: 'action',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },


]

const Customers = () => {
    const dispatch = useDispatch()
    const Alldata = useSelector((state) => state.crmUsers.data.customerList?.users)
    const [isFirstEffectDone, setIsFirstEffectDone] = React.useState(false);
    const total = useSelector((state) => state.crmUsers.data.customerList?.total_rows_count)
    const data = useSelector((state) => state.crmUsers.data.customerList?.users) || null
    const loading = useSelector((state) => state.crmUsers.data.loading)


    const filterType = useSelector(
        (state) => state.crmUsers.data.filterData.filterType
    )

    console.log(filterType, 'filterType')

    const { pageNumber, pageSize,  search } = useSelector(
        (state) => state.crmUsers.data.tableData
    )

  

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageNumber, pageSize, search, filterType }))
    }, [pageNumber, pageSize, search, filterType, dispatch])


    // First useEffect: Dispatches the getCustomers action
    useEffect(() => {
        dispatch(setTableData({ pageNumber: 1, pageSize: 10, search: ""}));
        setIsFirstEffectDone(true); // Set to true after dispatch completes
    }, [dispatch]);

    // Second useEffect: Fetch data only after the first effect completes
    useEffect(() => {
        if (isFirstEffectDone) {
            fetchData();
        }
    }, [isFirstEffectDone, fetchData, pageNumber, pageSize, filterType]);

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, search, filterType }),
        [pageNumber, pageSize, search, total]
    )

    const onPaginationChange = (page) => {
        console.log(page, 'pageNumber')
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

    // if (loading) {
    //     return <Loading />;
    // }
console.log(data,'loading')
    return (
        <>
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
                        pagingData={{ pageNumber, pageSize, search, total }}
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
                            <h3 className="mt-8">No User found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog />
        </>
    )
}

export default Customers
