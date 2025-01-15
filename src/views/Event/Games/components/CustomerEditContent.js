import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/cms/FAQ/CustomerForm'


const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmGames.state.selectedCustomer
    )


    const data = useSelector((state) => state.crmGames.data.customerList)
    
    const { id } = customer
  
    const onFormSubmit = (values) => {
        const {
            tutorial_video_question,
            tutorial_video_answer,
            tutorial_video_id,
            img,
            facebook,
            twitter,
            pinterest,
            linkedIn,
        } = values

        const basicInfo = { tutorial_video_question, tutorial_video_answer, tutorial_video_id, img }
        const personalInfo = {
            tutorial_video_question,
            tutorial_video_answer,
            tutorial_video_id,
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
            dispatch(getCustomers({ pageIndex: props.pageIndex,  pageSize: props.pageSize, total: 0, query: '' }))

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
