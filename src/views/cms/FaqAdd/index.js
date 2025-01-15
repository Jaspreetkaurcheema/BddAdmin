import React from 'react'
import ProductForm from 'views/sales/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateFaq, apiCreateSalesProduct } from 'services/SalesService'
import FaqForm from '../FaqForm'

const ProductNew = () => {
    const navigate = useNavigate()

    // const addProduct = async (data) => {
    //     const response = await apiCreateSalesProduct(data)
    //     return response.data
    // }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await apiCreateFaq(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                   Faq successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/cms/faqs')
        }
    }

    const handleDiscard = () => {
        navigate('/app/cms/faqs') 
    }

    return (
        <>
            <FaqForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
