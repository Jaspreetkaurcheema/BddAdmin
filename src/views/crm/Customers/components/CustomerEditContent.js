import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmUsers.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmUsers.data.customerList.users)
    // const { id } = customer
    const { user_id } = customer

    // console.log(user_id,'user_iduser_id')

  
    const onFormSubmit = (values) => {
        const {
            name,
            email,
            img,
            // location,
            // title,
            // phoneNumber,
            // facebook,
            // twitter,
            // pinterest,
            // linkedIn,

            
        } = values

        const basicInfo = { name, email, img }
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
                   if (elm.user_id === user_id) {
                        elm = {user_id:user_id, ...basicInfo }
                // elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                console.log(elm,'elmmm')
                editedCustomer = elm
            }
            return elm
        })

        if (!isEmpty(editedCustomer)) {
        
            dispatch(putCustomer(editedCustomer))
            dispatch(getCustomers({ pageNumber:1, pageSize:25, usertype: 1, search:'', filterType: 2 }))

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
