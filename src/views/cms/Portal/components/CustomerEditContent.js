import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/cms/Portal/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmPortal.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmPortal.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
           type,
           video_link,
           support_phone,
           support_email,
            img,
            
            facebook,
            twitter,
            pinterest,
            linkedIn,
        } = values

        const basicInfo = { type, video_link, support_email,support_phone , img }
        const personalInfo = {
            type,
            video_link,
            support_email,
            support_phone,
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
                dispatch(getCustomers({
                 pageIndex: props.pageIndex,
                 pageSize:  props.pageSize,
                 total: 0,
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
