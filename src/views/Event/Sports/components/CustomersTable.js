import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge, Button, Notification, toast } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData, getSportsEnabled, putSportTime } from '../store/dataSlice'
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
    const [enabled, setEnabled] = useState(row.enabled);

    const onEnable = () => {
        dispatch(getSportsEnabled(row)).then(() => {
            setEnabled(1);
            setTimeout(() => {
                dispatch(getCustomers({ pageIndex: 1, pageSize: 10, sort: {}, query: '', filterData: {} }));
            }, 1000);
        });
    };

    const onDisable = () => {
        // Replace this with the appropriate action to disable
        dispatch(getSportsEnabled(row)).then(() => {
            setEnabled(0);
            setTimeout(() => {
                dispatch(getCustomers({ pageIndex: 1, pageSize: 10, sort: {}, query: '', filterData: {} }));
            }, 1000);
        });
    };
    useEffect(() => {
        setEnabled(row.enabled);
    }, [row.enabled]);
    return (
        <div >
        
              <Button
          className="cursor-pointer select-none font-semibold"
          style={enabled === 1?{ color: "red" }:{ color: "green" }  }
          onClick={enabled === 1 ? onDisable : onEnable}
      >
          {enabled === 1 ? 'Disable' : 'Enable'}
      </Button>
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
    const data = useSelector((state) => state.crmSports.data.customerList) || null
    const [isVisible , setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmSports.data.loading)
    const filterData = useSelector(
        (state) => state.crmSports.data.filterData
    )

    const ScoreTimeInput = ({ initialValue }) => {
        const [scoreTime, setScoreTime] = useState(initialValue.max_time_to_update_score);
    
        const handleInputChange = (e) => {
            setScoreTime(e.target.value);
        };

        
        const handleBlur = () => {
            console.log(scoreTime.trim(),initialValue.max_time_to_update_score ,'hjfdjkd')
            if (scoreTime.trim() != initialValue.max_time_to_update_score) {
                dispatch(putSportTime({id:initialValue.id, time: scoreTime.trim() }));
                toast.push(
                    <Notification title={'Successfuly Updated'} type="success">
                       Update Successfuly
                    </Notification>
                )
                setTimeout(() => {
                    dispatch(getCustomers({ pageIndex: 1, pageSize: 10, sort: {}, query: '', filterData: {} }));
                }, 1000);
              

            }
        };
        return (
            <div className="flex items-center " style={{ width: '45%' }}>
                <input 
                    type="text" 
                    value={scoreTime} 
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-1"
                />
            </div>
        );
    };
    const columns = [
       
      
        {
            header: 'Sports Name',
            accessorKey: 'sportsname',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center">
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.sports_name}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Sports Type',
            accessorKey: 'sportstype',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center">
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.sports_type}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Player Per Team',
            accessorKey: 'playerperteam',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center justify-end" style={{ width: '45%' }}>
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.players_per_team}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Extra Member',
            accessorKey: 'extramember',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center justify-end" style={{ width: '45%' }}>
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.extra_members}
                        </span>
                    </div>
                )
            },
        },
         {
            header: 'League',
            accessorKey: 'league',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center justify-end" style={{ width: '45%' }}>
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.League}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Tournament',
            accessorKey: 'tournament',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center justify-end" style={{ width: '45%' }}>
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.Tournament}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'Time for score',
            accessorKey: 'max_time_to_update_score',
            cell: (props) => {
                const row = props.row.original
                return (
                    <ScoreTimeInput initialValue={row} />
                )
            },
        },
        {
            header: 'Funds Collected',
            accessorKey: 'totalfunds',
            cell: (props) => {
                const row = props.row.original
    
                return (
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>
                  
                        <span className="ml-2 rtl:mr-2 capitalize">
                            {'$' + row.Total_Funds}
                        </span>
                    </div>
                )
            },
        },

        {
             header: 'Action',
            id: 'action',
            cell: (props) => <ActionColumn row={props.row.original} setIsVisible={setIsVisible}  />,
         },
    ]
    
    let { pageIndex, pageSize, sort, total, search  } = useSelector(
        (state) => state.crmSports.data.tableData
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
                            <h3 className="mt-8">No Sports found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog pageIndex={pageIndex} pageSize={pageSize}/>
          
        </>
    )
}

export default Customers
