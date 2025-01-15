import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/CustomerForm'
import dayjs from 'dayjs'
import FaqForm from 'views/crm/FaqForm'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmCustomers.data.customerList.data
)

    const { id } = customer

    console.log(data,'datdaddat')
    const onFormSubmit = (values) => {
        console.log(values,'valuessss in sumbid')
        const {
            question,
            answer,
            user_role_id
        } = values

        const basicInfo = { question,
            answer,
            user_role_id}
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
                elm = { ...elm, ...basicInfo }
                // elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        if (!isEmpty(editedCustomer)) {
        
            dispatch(putCustomer(editedCustomer))
            dispatch(getCustomers({pageNumber:1,pageSize:25,search:'',userType:null}))
        }
        setTimeout(() => {
            dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
        dispatch(getCustomers({pageNumber:1,pageSize:25,search:'',userType:null}))

        }, 500);
   
    }

    return (
        <FaqForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent
