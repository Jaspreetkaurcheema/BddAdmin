import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge, Tooltip } from 'components/ui'
import { DataTable, DoubleSidedImage , Loading} from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizer, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
    toggleDeleteConfirmation,
    toggleRemainderConfirmation,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import OrganizersDeleteConfirmation from './OrgainzersDeleteConfirmation'
import OrganizersRemainderConfirmation from './OrgainzersRemainderConfirmation'
import { FaEdit } from "react-icons/fa";
const statusColor = {
    Active: 'bg-emerald-500',
    NotVerified: 'bg-red-500',
    Suspended: 'bg-blue-500',
}

const ActionColumn = ({ row, setIsVisible }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const onEdit = () => {
        dispatch(setDrawerOpen())
        
        dispatch(setSelectedCustomer(row))
    }
    
    const onView = useCallback(() => {
        const userId = (row.id);
        const adminToken = (selector.auth.session.token);
        const queryParams = `${encodeURIComponent(userId)}&${encodeURIComponent(adminToken)}`;
        const encodedParams = btoa(queryParams);
        const newTab = window.open(`https://app.giuteamconnect.com?auth=${encodedParams}`, '_blank');
        newTab.focus();
    }, [row]);

    const initialDispatch = () => {
        dispatch(toggleDeleteConfirmation(true))
    }

    const onDelete = useCallback(() => {

        dispatch(setSelectedCustomer(row))
        initialDispatch()
        setIsVisible(true)  


    })
    return (

        <div className="flex  items-center justify-between">
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

           <iv> <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span></iv>

        </div>

    )
}

const ReminderColumn = ({ row, setIsVisible }) => {
    const dispatch = useDispatch()
    let data1 = useSelector((state) => state.crmOrganizers.data.customerList.currentCharges
    )
    const initialDispatch = () => {
        dispatch(toggleRemainderConfirmation(true))
    }
   
    // Assuming team_charge, tax, and transaction_charges are available in the row object


    let charge = row.total_teams * data1[0].team_charge;

    let taxCollected = charge * (data1[0].tax / 100);
    let transactionChargeCollected = charge * (data1[0].transaction_charges / 100);
   
    // Calculate total payment due by adding up charge, tax, and transaction charges
    let totalPaymentDue = charge + taxCollected + transactionChargeCollected;
    const onRemainder = useCallback(() => {
       
        dispatch(setSelectedCustomer(row))
        initialDispatch()
        setIsVisible(true)


    })
    const remainderLinkStyle = {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer',
    };
    return (
        <div className="flex items-center" style={{ width: '75%' }}>
        <div className="flex items-center gap-5">
            <div><span className=" capitalize ">
                {"$" + Math.ceil(totalPaymentDue)}
            </span></div>
           
            <div><span style={remainderLinkStyle} onClick={onRemainder}>
                {"Reminder" + ""}
            </span></div>
        </div>
    </div>
    );
}

const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={row.profile_pic} />


            {row.username}

        </div>
    )
}
const Customers = (row) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmOrganizers.data.customerList.data) || null
    const data1 = useSelector((state) => state.crmOrganizers.data.customerList.currentCharges
    )

    const [isVisible, setIsVisible] = useState(false)
    const selector = useSelector(state => state)
    const loading = useSelector((state) => state.crmOrganizers.data.loading) 
    const filterData = useSelector(
        (state) => state.crmOrganizers.data.filterData
    )|| null


    const columns = [
       {
            header: 'Username',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original;
                const fullName = `${row.firstname} ${row.lastname}`;
                return (
                    <div>
                        <NameColumn row={row} />
                        <span>{fullName}</span>
                        <br />
                        <span>{row.email}</span>
                    </div>
                );
            },
        },
        {
            header: 'Leagues',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.leagues}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Tournaments',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.tournaments}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Due Payment',
            accessorKey: 'name',
            cell: (props) => <ReminderColumn row={props.row.original} />,
        },


        {
            header: 'Paid Payment',
            accessorKey: 'name',
            cell: (props) => {
                const row = props.row.original;

                // Convert amount_received to a number and round it to 2 decimal places
                const amount = Number(row.amount_received).toFixed(2);

                return (
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>
                        <span className="ml-2 rtl:mr-2 capitalize">{"$" + amount}
                        </span>

                    </div>
                );
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
            header: 'action',
            id: 'action',
            cell: (props) => <ActionColumn row={props.row.original} />,
        },
    ]


    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmOrganizers.data.tableData
    )
    const location = useLocation();
    const searchParams = location.pathname;
    const id = searchParams.match(/[^/]+$/)[0];
    useEffect(() => {
        pageIndex = 1;
        pageSize = 10;
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = pageIndex
        dispatch(setTableData(newTableData))
    }, [id])        

    const fetchData = useCallback(() => {
          console.log("jjjjjj")
        dispatch(getOrganizer({ pageIndex, pageSize, sort, query, search, filterData, id: 2 }))
    }, [pageIndex, pageSize, sort, search, filterData, dispatch])

    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
              }, 500)
        return () => clearTimeout(getData);
    }, [fetchData, pageIndex, pageSize, sort, search, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, search, total }),
        [pageIndex, pageSize, sort, search, total]
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

            <OrganizersDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible} />
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
                        pagingData={{ pageIndex, pageSize, sort, search, total }}
                        onPaginationChange={onPaginationChange}
                        onSelectChange={onSelectChange}
                    // on={onSort}
                    /> : (
                        <div className="h-full flex flex-col items-center justify-center">
                            <DoubleSidedImage
                                src="/img/others/img-2.png"
                                darkModeSrc="/img/others/img-2-dark.png"
                                alt="No orgainzer found!"
                            />
                            <h3 className="mt-8">No Organizer found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog  pageIndex={pageIndex} pageSize={pageSize} />
            <OrganizersRemainderConfirmation isVisible={isVisible} setIsVisible={setIsVisible} />
        </>
    )
}

export default Customers
