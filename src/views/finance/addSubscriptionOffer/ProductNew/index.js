import React from 'react'
import ProductForm from 'views/finance/addSubscriptionOffer/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreateSubscription } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateSubscription (data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Subscription Offer successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/finance/subscriptionoffers')
        }
    }

    const handleDiscard = () => {
        navigate('/app/finance/subscriptionoffers')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew