import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers, initialTableData, initialFilterData } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'

import dayjs from 'dayjs'

import CustomerForm from 'views/app/PoolEditForm'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.appEvents.state.selectedCustomer
    )
    const data = useSelector((state) => state.appEvents.data.customerList.data)
    const { id } = customer
console.log(id,'iddididiidid')
    const onFormSubmit = (values) => {
        const {
            poolTypeId,
            sportId,
            name,
            description,
            how_to_win,
            start_date,
            end_date,
            is_programmed,
        } = values

        const basicInfo = {
            poolTypeId,
            sportId,
            name,
            description,
            how_to_win,
            start_date,
            end_date,
            is_programmed
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
                elm = {id,  ...basicInfo }
                // elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        console.log(editedCustomer,'edirrrr')
        if (!isEmpty(editedCustomer)) {

            dispatch(putCustomer(editedCustomer))
            dispatch(getCustomers(initialTableData,initialFilterData))
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
