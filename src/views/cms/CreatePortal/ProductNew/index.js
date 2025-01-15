import React from 'react'
import ProductForm from 'views/cms/CreatePortal/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import {apiCreatePortal , apiCreatePortalVideo} from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {

        
        data.ismulti =true
        const response = await apiCreatePortal (data)
        
        const response1 = await apiCreatePortalVideo (data,true)

    
        return [response.data, response1.data]
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
                        Portal Video successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/cms/portal')
        }
    }

    const handleDiscard = () => {
        navigate('/app/cms/portal')
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
