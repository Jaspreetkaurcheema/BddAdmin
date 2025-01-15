import React from 'react'
import ProductForm from 'views/sales/ProductForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateSalesProduct(data)
        return response.data
    }
    const commasaparated = (array1) => {
        console.log(array1, 'arrrrr')
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
        const { specific_pool_ids } = values
        values.specific_pool_ids = await commasaparated(specific_pool_ids)

        console.log(values,'valuessdsd')
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
            navigate('/app/finance/promo')
        }
    }

    const handleDiscard = () => {
        navigate('/app/finance/promo') 
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
