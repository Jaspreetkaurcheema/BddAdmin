import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    sports_name: Yup.string().required('Sports Name Required'),
    players_per_team: Yup.string().required('Player Per Team Required'),
    sports_type: Yup.string().required('Sports Type Required'),
    extra_members: Yup.string().required('Extra Members Required'),
    icon: Yup.string().required('Icon Required').matches(
        /^https:\/\//,
        'Url must start with "https://"'
      ),
    game_icon: Yup.string().required('Game Icon Required').matches(
        /^https:\/\//,
        'Url must start with "https://"'
      ),
   
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
                
                sports_name: customer.sports_name || '',
                players_per_team: customer.players_per_team || '',
                sports_type: customer?.sports_type || '',  
                extra_members: customer?.extra_members || '', 
                icon: customer?.icon || '', 
                game_icon: customer?.game_icon || '', 
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
            {({values, touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Sports Info
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

export default CustomerForm
