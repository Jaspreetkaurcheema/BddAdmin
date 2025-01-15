import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'
import { values } from 'lodash'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name Required'),
    code: Yup.string().required('Code Required'),
    amount: Yup.number(),
    once_per_customer_limit: Yup.number(),
    specific_pool_ids: Yup.array(),
    start_date: Yup.date(),
    total_usage_limit: Yup.number(),
    type: Yup.string(),
    end_date: Yup.date(),
    free_entries:Yup.number(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
   

    console.log(dayjs(customer?.start_date).format('YYYY-MM-DD'),'fffffdfdfdfdgdgdghty')

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: customer.name || '',
                code: customer.code || '',
                amount: customer.amount || '',
                once_per_customer_limit: customer?.once_per_customer_limit || '',               
                specific_pool_ids:customer?.specific_pool_ids || [],                
                title: customer?.title || '',
                start_date:  dayjs(customer?.start_date).format('YYYY-MM-DD')|| '',
                end_date: dayjs(customer?.end_date).format('YYYY-MM-DD') || '',
                total_usage_limit:customer.total_usage_limit,
                type:customer.type,
                free_entries:customer.free_entries || ''

            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({values, touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Personal Info
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
                                {/* <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent> */}
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default CustomerForm
