import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Avatar, Badge, Select } from 'components/ui'
import { DataTable, DoubleSidedImage, Loading } from 'components/shared'
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
import { apiGetCrmGames, apiGetCrmOrganizer } from 'services/CrmService'
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

const selectedOption = (selected, list, key) => {

    let result = [];
    const selectedIds = selected?.split(',').map(id => parseInt(id.trim(), 10));

    list?.forEach(item => {
        if (selectedIds?.includes(item.id)) {
            result.push({ value: item.id.toString(), label: item[key] });
        }

    });

    return result;
}


const MultiSelection = ({ type, row }) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let selectedValues = [];
            let optionsList = [];

            if (type === 'organizer') {
                const response = await apiGetCrmOrganizer();
                selectedValues = await selectedOption(row?.valid_to_organizer_user_id, response.data.data, "organizer_name");
                optionsList = response.data.data?.map(item => ({ value: item.id.toString(), label: item.organizer_name }));
            } else if (type === 'Games') {
                const response = await apiGetCrmGames();
                selectedValues = await selectedOption(row?.valid_to_event_id, response.data.data, "game_title");
                optionsList = response.data.data?.map(item => ({ value: item.id.toString(), label: item.game_title }));
            }

            setOptions(optionsList);
            setSelected(selectedValues);
        };

        fetchData();
    }, [type, row]);


    return (
        <div>
            {selected.length && options.length && <Select
                isDisabled
                isMulti
                placeholder="Please Select"
                defaultValue={selected}
            // options={options}
            />}
        </div>
    );
};



const Customers = (props) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCoupons.data.couponsList.data) || null

    const [isVisible, setIsVisible] = useState(false)
    const loading = useSelector((state) => state.crmCoupons.data.loading)
    const filterData = useSelector(
        (state) => state.crmCoupons.data.filterData
    )
    const { row } = props
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const [data1, setData1] = useState(null)
    const [data2, setData2] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetCrmOrganizer();
                const response1 = await apiGetCrmGames();

                //    let temp =selectedOption(values.valid_to_event_id, response1.data.data , "game_title" )
                //     let temp1=selectedOption(values.valid_to_organizer_user_id,response.data.data,"organizer_name")

                //  console.log( temp, temp1,'values.valid_to_event_id')
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();


    }, []);




    const columns = [
       
        {
            header: ' Name',
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
            header: 'type',
            accessorKey: 'coupon_type',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.coupon_type}
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
                    <div className="flex items-center justify-end" style={{ width: '75%' }}>

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row && row.coupon_type === 'Percentage' ? `${row.coupon_off}%` : row && row.coupon_type === 'Fixed Amount' ? `$${row.coupon_off}` : ''}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'max per user',
            accessorKey: 'max_per_user_usage',
            cell: (props) => {
                const row = props.row.original

                return (
                    <div className="flex items-center">

                        <span className="ml-2 rtl:mr-2 capitalize">
                            {row.max_per_user_usage}
                        </span>
                    </div>
                )
            },
        },
        {
            header: 'max no. of usage',
            accessorKey: 'max_number_of_usage',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {(row.max_number_of_usage)}
                    </div>
                )
            },
        },
        {
            header: 'Valid event id',
            accessorKey: 'valid_to_event_id',
            cell: (props) => {
                const row = props?.row.original
                return (
                    // <div className="flex items-center">
                    //     {(row.valid_to_event_id)}
                    // </div>
                    <>{row.valid_to_event_id == null || row.valid_to_event_id == 0 || row.valid_to_event_id === "" ? <>NO Event SELECTED</> : <MultiSelection
                        row={row}
                        type="Games"
                    />} </>

                )
            },
        },
        {
            header: 'Valid Organizer',
            accessorKey: 'valid_to_organizer_user_id',
            cell: (props) => {
                const row = props?.row.original
                return (
                    
                    <>{row.valid_to_organizer_user_id == null || row.valid_to_organizer_user_id == 0 || row.valid_to_organizer_user_id === "" ? <>NO Orgainzer SELECTED</> : <MultiSelection
                        row={row}
                        type="organizer"
                    />} </>
                )
            },
        },
        {
            header: 'min order amount',
            accessorKey: 'min_order_amount',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {'$' + (row.min_order_amount !== null ? row.min_order_amount : 0)}
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
            header: 'ACTIONS',
            id: 'action',
            cell: (props) => <ActionColumn row={props.row.original} />,
        },
    ]



    let { pageIndex, pageSize, sort, query, search, total } = useSelector(
        (state) => state.crmCoupons.data.tableData
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
                                alt="No coupon found!"
                            />
                            <h3 className="mt-8">No Coupon found!</h3>
                        </div>
                    )
                }</>} </>
            <CustomerEditDialog  pageIndex={pageIndex} pageSize={pageSize} />
        </>
    )
}

export default Customers
