import React, { forwardRef, useEffect, useState } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'
import { useLocation } from 'react-router-dom'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    id: Yup.string(),   
    email: Yup.string().required('Email Required'),
    username: Yup.string().required('User Name Required'),
    firstname: Yup.string().required('First Name Required'),
    enabled: Yup.string().required('Dropdown Required'),
  phone_number: Yup.string().matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        'Phone number is not valid'
    ),

    facebook: Yup.string(),
    twitter: Yup.string(),
    pinterest: Yup.string(),
    linkedIn: Yup.string(),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const UserForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
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
                id:customer.id || '',
                username: customer.username || '',
                email: customer.email || '',
                img: customer.profile_pic || '',
                firstname: customer.firstname || '',
                enabled: customer.enabled || 0,
      
                
                facebook: customer?.personalInfo?.facebook || '',
                twitter: customer?.personalInfo?.twitter || '',
                pinterest: customer?.personalInfo?.pinterest || '',
                linkedIn: customer?.personalInfo?.linkedIn || '',
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
                                <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
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

export default UserForm
