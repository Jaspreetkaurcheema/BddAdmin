import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/PromoCodeFolder'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )

    console.log(customer, 'ffffffff')
    const data = useSelector((state) => state.crmCustomers.data.customerList.pools)
    const { id } = customer
    console.log(id, 'idsddsd')
    const commasaparated = (array1) => {
        console.log(array1, 'arrrrr')
        const sumWithInitial = array1.reduce(
            (accumulator, currentValue, index) => {
                if (index === 0) {
                    return accumulator + currentValue.value;
                } else {
                    return accumulator + ',' + currentValue.value;
                }
            },
            ''
        );
        return sumWithInitial
    }
    const onFormSubmit = (values) => {
        const {
            amount,
            code,
            end_date,
            name,
            once_per_customer_limit,
            specific_pool_ids,
            start_date,
            total_usage_limit,
            type,
            free_entries
        } = values

        const basicInfo = {
            amount,
            code,
            end_date,
            name,
            once_per_customer_limit,
            specific_pool_ids,
            start_date,
            total_usage_limit,
            type,
            free_entries
        }
        // const personalInfo = {
        //     location,
        //     title,
        //     birthday: dayjs(birthday).format('DD/MM/YYYY'),
        //     phoneNumber,
        //     facebook,
        //     twitter,
        //     pinterest,
        //     linkedIn,
        // }
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo, ...id }
                // elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        if (!isEmpty(editedCustomer)) {
            editedCustomer.specific_pool_ids = commasaparated(specific_pool_ids)
            dispatch(putCustomer(editedCustomer))
            dispatch(getCustomers({ pageNumber: 1, pageSize: 10, search: '' }))

        }
         setTimeout(() => {
            dispatch(setDrawerClose())
            dispatch(setCustomerList(newData))
            dispatch(getCustomers({ pageNumber: 1, pageSize: 10, search: '' }))
        }, 500);
   
    }

    return (
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent
