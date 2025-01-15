import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
           <FormItem
                label="FirstName"
                invalid={errors.firstname}
                errorMessage={errors.firstname}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="firstname"
                    placeholder="FirstName"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="LastName"
                invalid={errors.lastname }
                errorMessage={errors.lastname}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="lastname"
                    placeholder="LastName"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={errors.email }
                errorMessage={errors.email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Password"
                labelClass="!justify-start"
                invalid={errors.password}
                errorMessage={errors.password}
            >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    component={Input}
                />
            </FormItem>
            
        </AdaptableCard>
    )
}

export default BasicInformationFields
