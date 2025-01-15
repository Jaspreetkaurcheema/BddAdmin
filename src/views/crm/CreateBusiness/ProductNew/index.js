import React from 'react'
import ProductForm from 'views/crm/CreateOrganizer/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreateOrganizer } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateOrganizer (data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        values.id=7
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
                    Business successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/crm/business/7')
        }
    }

    const handleDiscard = () => {
        navigate('/app/crm/business/7')
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
