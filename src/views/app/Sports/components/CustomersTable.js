import React, { useEffect, useCallback, useMemo, useState } from 'react'
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
import { Link, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import EventDeleteConfirmation from './EventDeleteConfirmation'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        console.log('rrrrrrrrrrrrrr', row)
        dispatch(setDrawerOpen())


        dispatch(setSelectedCustomer(row))
    }

    const onDelete = async () => {

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
    
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={"https://api.kingpool.app/images/sports/"+row.event_icon} />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={row.sport_name == "Basketball"?`/app/apps/poolevents/4`: row.sport_name == "Lacrosse"?`/app/apps/poolevents/6`:`/app/apps/poolevents/2`}
            >
                {row?.event_name}
            </Link>
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
        header: 'Sportname',
        accessorKey: 'sport_name',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {(row.sport_name)}
                </div>
            )
        },
    },

  
]

const Customers = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = location.pathname;
    const id = searchParams.match(/[^/]+$/)[0];
    const [filteredData, setFilteredData] = useState()
    const Alldata = useSelector((state) => state)
    console.log(Alldata, "Alldata")
    const total = useSelector((state) => state.appSports.data.customerList.total_rows_count)
    const data = useSelector((state) => state.appSports.data.customerList.data)
    const loading = useSelector((state) => state.appSports.data.loading)
    const filterData = useSelector(
        (state) => state.appSports.data.filterData
    )

    const { eventfilterType, poolTypeId, sportId, is_programmed } = useSelector(
        (state) => state.appSports.data.filterData
    )

    console.log(poolTypeId, 'poolTypeIdpoolTypeId')

    const { pageNumber, pageSize, search } = useSelector(
        (state) => state.appSports.data.tableData
    )
    // useEffect(() => {
    //     setFilteredData(Alldata.appSports.data.customerList.data)
    // }, [Alldata])



    const fetchData = useCallback(() => {
        dispatch(getCustomers(id))
    }, [id, dispatch])

    useEffect(() => {
        console.log(data, filteredData, "checkoint");
        fetchData()
    }, [fetchData, id])

    const tableData = useMemo(
        () => ({ pageNumber, pageSize, poolTypeId, sportId, eventfilterType, search, is_programmed }),
        [pageNumber, pageSize, total, poolTypeId, sportId, eventfilterType, search, is_programmed]
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
    console.log(data, 'daraaaa')
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
            // pagingData={{ pageNumber, pageSize, total }}
            // onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            // on={on}
            />
            {/* <CustomerEditDialog />
            <EventDeleteConfirmation/> */}
        </>
    )
}

export default Customers
