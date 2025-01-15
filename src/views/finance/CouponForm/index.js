import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
// import PricingFields from './PricingFields'
// import OrganizationFields from './OrganizationFields'

import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    coupon_name: Yup.string().required(' Name Required'),
    coupon_code:  Yup.string().required(' Coupon code Required'),
    coupon_description: Yup.string().required(' Description Required'),
    coupon_type: Yup.string().required(' Type Required'),
    coupon_off:Yup.string().required(' Coupon off Required'),
    max_number_of_usage: Yup.number().required(' Max Number Required'),
    max_per_user_usage: Yup.number().required(' Max Per User Required'),
    min_order_amount: Yup.number().required(' Min Order Required'),
    coupon_expiry_date: Yup.string().required(' Coupon Expriy Date Required'),
    valid_to_event_id: Yup.array().required('Event Id Required'),
    valid_to_organizer_user_id: Yup.array().required(' Organizer User Id Required'),

    // "created_by_user_id": "1",
    // "updated_by_user_id": "1"
})

const DeleteProductButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Delete product"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const CouponForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

    const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
         
                    const formData = cloneDeep(values)

                    
                  
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    {/* <PricingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> */}
                                </div>
                                <div className="lg:col-span-1">
                                    {/* <ProductImages
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> */}
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

CouponForm.defaultProps = {
    type: 'edit',
    initialData: {
    coupon_name:'',
    coupon_code: '',
    coupon_description:'',
    coupon_type:'',
    coupon_off:'',
    max_number_of_usage: '',
    max_per_user_usage: '',
    min_order_amount: '',
    coupon_expiry_date: '',
    valid_to_event_id: [],
    valid_to_organizer_user_id: [],
    },
}

export default CouponForm
