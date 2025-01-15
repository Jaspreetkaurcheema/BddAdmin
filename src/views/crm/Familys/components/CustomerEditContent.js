import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/FamilyForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmFamily.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmFamily.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
            enabled,
            username,
            firstname,
            lastname,
            contact_number,
            gender,
            password_hashed,
            email,
            img,
            location,
            title,
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        } = values

        const basicInfo = { username, email, firstname,lastname,contact_number,gender,password_hashed, img,  enabled }
        const personalInfo = {
            enabled,
            location,
            title,
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
            setTimeout(()=>{
                dispatch(getCustomers({ total: 0,
                 pageIndex: props.pageIndex,
                 pageSize: props.pageSize,
                 search: '',
                 enabled: '',
             id:6 }))
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
