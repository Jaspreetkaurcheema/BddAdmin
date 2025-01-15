import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/finance/SubscriptionOffersEdit'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmSubscriptionHistory.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmSubscriptionHistory.data.customerList.data)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
            subscription_id,
            offer_type,
            trial_period,
            discount_percentage,
            discount_duration,
            payment_type,
             img,
          
        } = values

        const basicInfo = {
            img, subscription_id, 
            offer_type,
            trial_period,
            discount_duration,
            discount_percentage,
            payment_type,
        }
        const personalInfo = {
            subscription_id,
            discount_duration,
            offer_type,
            trial_period,
            discount_percentage,
            payment_type,
           
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
        setTimeout(() => {
            dispatch(setDrawerClose())
            dispatch( getCustomers({  total: 0,
                pageIndex: 1,
                pageSize: 10,
                query: '',
                search: '', }));
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
