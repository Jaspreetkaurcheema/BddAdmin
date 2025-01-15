import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
// import SocialLinkForm from './SocialLinkForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    user_role_id: Yup.string(),
    question: Yup.string(),
    answer: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const FaqForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
   
console.log(customer,'cussuussu');
    return (
        <Formik
            innerRef={ref}
            initialValues={{
                question: customer.question || '',
                answer: customer.answer || '',
                user_role_id: customer.user_role_id || '',
                // location: customer?.personalInfo?.location || '',
                // title: customer?.personalInfo?.title || '',
                // phoneNumber: customer?.personalInfo?.phoneNumber || '',
                // birthday:
                //     customer?.personalInfo?.birthday &&
                //     dayjs(
                //         customer.personalInfo.birthday,
                //         'DD/MM/YYYY'
                //     ).toDate(),
                // facebook: customer?.personalInfo?.facebook || '',
                // twitter: customer?.personalInfo?.twitter || '',
                // pinterest: customer?.personalInfo?.pinterest || '',
                // linkedIn: customer?.personalInfo?.linkedIn || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({  values, touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                {/* <TabNav value="personalInfo">
                                    Personal Info
                                </TabNav> */}
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

export default FaqForm
