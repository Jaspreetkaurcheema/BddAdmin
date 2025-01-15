import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupons, putCustomer, setCouponsList } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm from 'views/crm/CustomerForm'
import dayjs from 'dayjs'
import CouponForm from 'views/finance/CouponEdit'
import CouponEditForm from 'views/finance/CouponEdit'

const CustomerEditContent = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCoupons.state.selectedCustomer
    )

   
    const data = useSelector((state) => state.crmCoupons.data.couponsList.data)

   
    const { id } = customer
    const commasaparated = (array1) => {
       
        const sumWithInitial = array1.reduce(
            (accumulator, currentValue, index) => {
                if (index === 0) {
                    return accumulator + currentValue.value;
                } else {
                    return accumulator + ',' + currentValue.value;
                }
            },
            ''
        );
        return sumWithInitial
    }
    const onFormSubmit = (values) => {
        const {

            coupon_name,
            coupon_code,
            coupon_description,
            coupon_type, coupon_off,
            max_number_of_usage,
            max_per_user_usage, min_order_amount,
            coupon_expiry_date,
            valid_to_event_id,
            valid_to_organizer_user_id,
            updated_by_user_id,
            usedCount,
        } = values
       
        const basicInfo = { id, coupon_name, coupon_code, coupon_description, usedCount,coupon_type, coupon_off, max_number_of_usage, max_per_user_usage, min_order_amount, coupon_expiry_date, valid_to_event_id, valid_to_organizer_user_id, updated_by_user_id }
        
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.id == id) {
                elm = { ...elm, ...basicInfo }

                editedCustomer = elm
            }
            return elm
        })
       
        if (!isEmpty(editedCustomer)) {
            editedCustomer.valid_to_event_id = commasaparated(valid_to_event_id)
            editedCustomer.valid_to_organizer_user_id = commasaparated(valid_to_organizer_user_id)
         
            dispatch(putCustomer(editedCustomer))
        }
        dispatch(setDrawerClose())
        dispatch(setCouponsList(newData))
        setTimeout(() => {
            dispatch(setDrawerClose())
            dispatch(getCoupons({pageIndex: props.pageIndex,pageSize: props.pageSize, search: '' }));
        }, 500);
       
    }

    return (
        <CouponEditForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
        />
    )
})

export default CustomerEditContent
