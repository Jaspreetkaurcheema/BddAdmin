import React from 'react'
import ProductForm from 'views/ManagedStaff/CreateStaff/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreateStaff } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateStaff (data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        values.id=10
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
                        Staff successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/staff/staff')
        }
    }

    const handleDiscard = () => {
        navigate('/app/staff/staff')
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