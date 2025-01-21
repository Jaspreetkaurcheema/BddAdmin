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
    const { id } = customer

    // console.log(id,'idid')

  
    const onFormSubmit = (values) => {
        const {
            name,
            email,
            username,
            phone,
            enabled,
            img
            // location,
            // title,
            // phoneNumber,
            // facebook,
            // twitter,
            // pinterest,
            // linkedIn,

            
        } = values
        const isValidImage = img && !img.startsWith('data:image/svg+xml;base64');
        const basicInfo = { name, email, username, phone , enabled, ...(isValidImage && { img }) // Include img only if it's valid
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
                        elm = {id:id, ...basicInfo }
                // elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                console.log(elm,'elmmm')
                editedCustomer = elm
            }
            return elm
        })
           console.log(editedCustomer,'editedCustomer')
        if (!isEmpty(editedCustomer)) {
        
            dispatch(putCustomer(editedCustomer))
            dispatch(getCustomers({ pageNumber:1, pageSize:10,  search:'', filterType: 0 }))

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
