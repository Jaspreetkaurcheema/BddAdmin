import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'


dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    upload_video : Yup.string(),
    direct_message: Yup.string(),
    accept_documents: Yup.string(),
    max_chat_video_limit: Yup.string(),
    max_chat_video_size: Yup.string(),
    max_group_limit : Yup.string(),
    max_teams_limit: Yup.string(),
    view_schedule: Yup.string(),
    view_standings: Yup.string(),
    create_team_chat: Yup.string(),
    max_video_limit: Yup.string(),
    max_video_size: Yup.string(),
    facebook: Yup.string(),
    twitter: Yup.string(),
    pinterest: Yup.string(),
    linkedIn: Yup.string(),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
   

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                upload_video : customer.upload_video || '',
                direct_message: customer.direct_message || '',
                accept_documents: customer.accept_documents || '',
                max_chat_video_limit: customer.max_chat_video_limit || '',
                max_chat_video_size: customer.max_chat_video_size || '',
                max_group_limit : customer.max_group_limit || '',
                max_teams_limit: customer.max_teams_limit || '',
                view_schedule: customer.view_schedule || '',
                view_standings: customer.view_standings || '',
                create_team_chat: customer.create_team_chat || '',
                max_video_limit: customer.max_video_limit || '',
                max_video_size: customer.max_video_size || '',
                img: customer.profile_pic || '',
                
              
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
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                   Subscription Features Info
                                </TabNav>
                                {/* <TabNav value="social">Social</TabNav> */}
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
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

export default CustomerForm
