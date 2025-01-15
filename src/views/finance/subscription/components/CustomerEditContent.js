import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer, getCustomers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/finance/subscriptionView'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmSubscription.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmSubscription.data.customerList)
    const { id } = customer

    const onFormSubmit = (values) => {
        const {
            max_group_limit,
            max_teams_limit,
            view_schedule,
            view_standings,
            create_team_chat,
            max_video_limit,
            max_video_size,
            upload_video,
            direct_message,
            accept_documents,
            max_chat_video_limit,
            max_chat_video_size,
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

        const basicInfo = { name, email, img, max_group_limit,
            max_teams_limit,
            view_schedule,
            view_standings,
            create_team_chat,
            max_video_limit,
            max_video_size,
            upload_video,
            direct_message,
            accept_documents,
            max_chat_video_limit,
            max_chat_video_size }
        const personalInfo = {
            max_group_limit,
            max_teams_limit,
            view_schedule,
            view_standings,
            create_team_chat,
            max_video_limit,
            max_video_size,
            upload_video,
            direct_message,
            accept_documents,
            max_chat_video_limit,
            max_chat_video_size,
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
            dispatch(getCustomers({ pageIndex: props.pageIndex, pageSize: props.pageSize, total: 0, query: '' }))
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
