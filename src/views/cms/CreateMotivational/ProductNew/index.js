import React from 'react'
import ProductForm from 'views/cms/CreateMotivational/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreateMotivational } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateMotivational (data)
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
                        Motivational Video successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/cms/motivational')
        }
    }

    const handleDiscard = () => {
        navigate('/app/cms/motivational')
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
