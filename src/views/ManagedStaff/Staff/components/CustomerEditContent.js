import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/ManagedStaff/Staff/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmStaff.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmStaff.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
            name,
            birthday,
            email,
            lastname,
            firstname,
            username,
            img,
            location,
            title,
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        } = values

        const basicInfo = { name, email, img, firstname, lastname,username }
        const personalInfo = {
            location,
            title,
            username,
            firstname,
            lastname,
            email,
            birthday: dayjs(birthday).format('DD/MM/YYYY'),
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        }   
        let newData = cloneDeep(data.data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        if (!isEmpty(editedCustomer)) {
        
            dispatch(putCustomer(editedCustomer))
            // dispatch(getCustomers({ pageNumber: 1, pageSize: 10, total: 0, search: '' }))
            setTimeout(()=>{
                dispatch(getCustomers({ total: 0,
                    pageIndex: props.pageIndex,
                    pageSize: props.pageSize,
                 search: '',
              }))
             },1000)
        }
        dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
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
