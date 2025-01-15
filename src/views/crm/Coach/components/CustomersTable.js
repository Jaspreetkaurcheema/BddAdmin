import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge, Drawer,Button, Select, DatePicker,Card, toast} from 'components/ui'
import Notification from 'components/ui/Notification'
import { DataTable, DoubleSidedImage, Loading} from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
    toggleDeleteConfirmation
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import {useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash  } from 'react-icons/hi'
import CoachDeleteConfirmation from './CoachDeleteConfirmation'

import { apiAddSubscription, apiGetSubscriptionList } from 'services/SalesService'
const statusColor = {
    Active: 'bg-emerald-500',
    notVerified: 'bg-red-500',
    Suspended:'bg-blue-500',
}

const ActionColumn = ({ row, setIsVisible }) => {
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

export const SliderOpen  = ({name , row, dispatch, userType=3}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [list , setList] = useState([])
    const [selected , setSelectedValue] = useState([])
    const [previousPlan , setPreviousPlan] = useState()
    const openDrawer = () => {
        setIsOpen(true)
    }
    const onDrawerClose = (e) => {
        setIsOpen(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await  apiGetSubscriptionList ();
                setList(response.data.data);
                const selectedSubscription = list?.find(item => item.id == row.subscription_id);
                const selectedOption = selectedSubscription?.id >0 ? { value:  selectedSubscription.id.toString(), label: `${selectedSubscription.subscription_name}/${selectedSubscription.subscription_period}`,} : null;
                setSelectedValue(selectedOption)
                setPreviousPlan(selectedOption)
            } catch (error) {
                console.error('Error fetching subscription:', error);
            }
        };
        if(list.length>0){
            const selectedSubscription = list?.find(item => item.id == row.subscription_id);
            const selectedOption = selectedSubscription?.id >0 ? { value:  selectedSubscription.id.toString(), label: `${selectedSubscription.subscription_name}/${selectedSubscription.subscription_period}`,} : null;
            setSelectedValue(selectedOption)
            setPreviousPlan(selectedOption)
        }else{
        fetchData();
        }
       
    }, []);


    function closeAfter2000ms(msg) {
        toast.push(
            <Notification closable type="success" duration={2000}>
                {msg}
            </Notification>
        )
    }

const handleUpdate = async ()=>{
await apiAddSubscription({id:row.user_id ,payment_status_id:2,subscription_id:selected.value }).then(data=>{
    if(data.data.status == true){
        closeAfter2000ms("Subscription Updated Successfully")
        dispatch()
    }
})
}


    return (
        <div>

            <Button onClick={() => openDrawer()}>{name}</Button>
            <Drawer
                title="Update Subscription Changes "
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out mb-4"
                onClick={(e) => console.log('Card Clickable', e)}
            >
                <h5>User Info:</h5>
                <p className="mt-2">
                 <ul>
                    <li>{row.firstname}</li>
                    <li>{row.email}</li>
                    <li>{row.contact_number}</li>
                    <li>{previousPlan?.label ||  "No Subscription Available"}</li>
                    <li>{row?.formated_expiry_date}</li>
                 </ul>
                </p>
            </Card>
            
            <label>Change Plan To :</label>
            <Select
                size="sm"
                className="mb-4"
                placeholder="Please Select"
                value={selected}
                options={list?.map(item => ({ value: item.id.toString(), label:  `${item.subscription_name}/${item.subscription_period}`}))}
                onChange={option => setSelectedValue(option)}
            ></Select>

          
            <Button onClick={handleUpdate}>Update Subscription</Button>
            </Drawer>
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
               <span className='m-5'> {row.username} </span>
            {/* </Link> */}
        </div>
    )
}
const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCoach.data.customerList.data)
    const [isVisible , setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmCoach.data.loading)
    const filterData = useSelector(
        (state) => state.crmCoach.data.filterData
    )
    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmCoach.data.tableData
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
                   <SliderOpen name={"Update Plan"} subscription_id={row.subscription_id} row={row} dispatch ={()=>dispatch(getCustomers({ pageIndex, pageSize, sort, query, search, filterData ,id:3})) } userType={3}  />
                    
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
        header: 'Joined Teams',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center justify-end"style={{ width: '75%' }}>
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.joinedTeams
}
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Teams Created',
        cell: (props) => {
            const row = props.row.original

            return (
                <div className="flex items-center justify-end"style={{ width: '75%' }}>
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.createdTeams}
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
        header: 'action',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original}  />,
    },
]



 
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
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, search, filterData ,id:3}))
    }, [pageIndex, pageSize, sort, query,search, filterData, dispatch])

    useEffect(() => {   
        const getData = setTimeout(() => {
        fetchData()
        console.log("bbbbbbb")
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
         <CoachDeleteConfirmation isVisible={isVisible} setIsVisible={setIsVisible}    />
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
                        on={onSort}
                    /> : (
                        <div className="h-full flex flex-col items-center justify-center">
                            <DoubleSidedImage
                                src="/img/others/img-2.png"
                                darkModeSrc="/img/others/img-2-dark.png"
                                alt="No user found!"
                            />
                            <h3 className="mt-8">No Coach found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog pageIndex={pageIndex} pageSize={pageSize} />
        </>
    )
}

export default Customers
