import React from 'react'
import ProductForm from 'views/CreateFAQ/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateCoupon } from 'services/SalesService'
import CouponForm from '../CouponForm'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateCoupon(data)
        return response.data
    }

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
    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const { valid_to_event_id, valid_to_organizer_user_id } = values
        values.valid_to_event_id = await commasaparated(valid_to_event_id)
        values.valid_to_organizer_user_id = await commasaparated(valid_to_organizer_user_id)
        

        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Promo code successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/finance/coupons')
        }
    }

    const handleDiscard = () => {
        navigate('/app/finance/coupons')
    }

    return (
        <>
            <CouponForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
