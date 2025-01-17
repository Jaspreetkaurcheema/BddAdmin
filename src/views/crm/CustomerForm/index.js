import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'
import { generateImage } from 'components/template/UserDropdown'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string(),
    phone: Yup.string(),
    username:Yup.string().nullable(),
    enabled: Yup.string().required('Dropdown Required'),
    // location: Yup.string(),
    // title: Yup.string(),
    // phoneNumber: Yup.string().matches(
    //     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
    //     'Phone number is not valid'
    // ),
    // birthday: Yup.string(),
    // facebook: Yup.string(),
    // twitter: Yup.string(),
    // pinterest: Yup.string(),
    // linkedIn: Yup.string(),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
   
console.log(customer,'cussuussu');
    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: customer.full_name || '',
                email: customer.email || '',
                username:customer.username || '',
                phone_number: customer.phone_no || '',
                enabled: customer.enabled || 0,
                img: customer.profile_pic || generateImage(customer.full_name ?customer.full_name:''   ),
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
            {({ touched,values, errors, resetForm }) => (
                
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
                                        values={values}
                                        errors={errors}
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
