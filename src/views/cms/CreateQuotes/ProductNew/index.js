import React from 'react'
import ProductForm from 'views/cms/CreateQuotes/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreateMotivationalQuotes } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateMotivationalQuotes (data)
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
                        Motivational Quotes successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/cms/quotes')
        }
    }

    const handleDiscard = () => {
        navigate('/app/cms/quotes')
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
