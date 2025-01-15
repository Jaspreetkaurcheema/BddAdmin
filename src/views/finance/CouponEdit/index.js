import React, { forwardRef, useEffect, useState } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
// import SocialLinkForm from './SocialLinkForm'
import { useLocation } from 'react-router-dom'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    coupon_name: Yup.string().required(' Name Required'),
    coupon_code:  Yup.string().required(' Coupon code Required'),
    coupon_description: Yup.string(),
    coupon_type: Yup.string(),
    coupon_off:Yup.string(),
    max_number_of_usage: Yup.number(),
    max_per_user_usage: Yup.number(),
    min_order_amount: Yup.number(),
    coupon_expiry_date: Yup.string(),
    valid_to_event_id: Yup.array(),
    valid_to_organizer_user_id: Yup.array(),
    usedCount: Yup.number(),
})


const { TabNav, TabList, TabContent } = Tabs

const CouponEditForm = forwardRef((props, ref) => {
    const { customer,initialData, onFormSubmit } = props
    const [selectedTitle , setSelectedTitle] = useState('')
    const info = ['', '', 'Orgainzer Info', 'Coach Info','Player Info', 'Referee Info','Family Info', 'Business Info', 'Individual Info','Team Mom Info']
    const location = useLocation();
    const searchParams = location.pathname;
    const id = searchParams.match(/[^/]+$/)[0];
  
    useEffect(()=>{
        setSelectedTitle(info[id])
    },[id])




    return (
        <Formik
            innerRef={ref}
            initialValues={{
                coupon_name:customer.coupon_name || '',
                coupon_code: customer.coupon_code || '',
                coupon_description:customer.coupon_description || '',
                coupon_type:customer.coupon_type || '',
                coupon_off:customer.coupon_off || '',
                max_number_of_usage: customer.max_number_of_usage || '',
                max_per_user_usage: customer.max_per_user_usage || '',
                min_order_amount: customer.min_order_amount || '',
                usedCount: customer.usedCount || 0,
                coupon_expiry_date:  dayjs(customer?.coupon_expiry_date).format('YYYY-MM-DD') || '',
                valid_to_event_id: customer.valid_to_event_id != null ? customer.valid_to_event_id : 0,
                valid_to_organizer_user_id: customer.valid_to_organizer_user_id != null ? customer.valid_to_organizer_user_id : 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
         
                setSubmitting(false)
            }}
        >
            {({ touched, values,errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    {selectedTitle}
                                </TabNav>
                                {/* <TabNav value="social">Social</TabNav> */}
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </TabContent>
                           
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default CouponEditForm
