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
    subscription_id: Yup.string().required('  Subscription Name Required'),
    offer_type: Yup.string(),
    discount_duration: Yup.string(),
    discount_percentage:Yup.string(),
    payment_type:Yup.string(),
   
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
                subscription_id:customer. subscription_id || '',
                offer_type:customer.offer_type || '',
                discount_duration:customer.discount_duration || '',
                discount_percentage:customer.discount_percentage || '',
                payment_type:customer.payment_type || '',
               
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
