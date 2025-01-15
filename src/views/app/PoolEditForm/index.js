import React, { forwardRef } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'


import { values } from 'lodash'
import PoolEditForm from './PersonalInfoForm'

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    sportId: Yup.number(),
    how_to_win: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),
    poolTypeId: Yup.number(),
    is_programmed: Yup.boolean()
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit } = props
   

     return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: customer.name || '',
                description: customer.description || '',
                how_to_win: customer?.how_to_win || '',               
                sportId:customer?.sport_id|| '',                
                poolTypeId: customer?.pool_type_id  || '',
                start_date:  dayjs(customer?.start_date).format('YYYY-MM-DD')|| '',
                end_date: dayjs(customer?.end_date).format('YYYY-MM-DD') || '',
                is_programmed:customer.is_programmed,
          
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >{({values, touched, errors, resetForm }) => (
            
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
                                    <PoolEditForm                                 
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
