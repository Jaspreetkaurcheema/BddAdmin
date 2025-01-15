import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/CustomerForm'
import dayjs from 'dayjs'
import NewReplyForm from './ReplyForm'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.supportInquiries.state.selectedCustomer
    )
    const data = useSelector((state) => state.supportInquiries.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
            name,
            birthday,
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

        const basicInfo = { name, email, img }
        const personalInfo = {
            location,
            title,
            birthday: dayjs(birthday).format('DD/MM/YYYY'),
            phoneNumber,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        }
        let newData = cloneDeep(data)
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
        }
        dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
    }

    return (
        <NewReplyForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent
