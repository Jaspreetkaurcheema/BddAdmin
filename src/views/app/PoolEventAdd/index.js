import React from 'react'
import ProductForm from 'views/sales/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateFaq, apiCreateSalesProduct, apiCreateSportEvent } from 'services/SalesService'
import EventForm from '../EventForm'

const ProductNew = () => {
    const navigate = useNavigate()

    // const addProduct = async (data) => {
    //     const response = await apiCreateSalesProduct(data)
    //     return response.data
    // }

    const handleFormSubmit = async (values, setSubmitting) => {
        console.log(values,'valuesss12121')
        setSubmitting(true)
        const success = await apiCreateSportEvent(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                   Pool Event successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/apps/poolevents')
        }
    }

    const handleDiscard = () => {
        navigate('/app/apps/poolevents') 
    }

    return (
        <>
            <EventForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
