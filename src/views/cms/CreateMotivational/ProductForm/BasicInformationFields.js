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
                label="Title"
                invalid={errors.title }
                errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Title"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.description }
                errorMessage={errors.description}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="description"
                    placeholder="Description"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Url"
                labelClass="!justify-start"
                invalid={errors.url }
                errorMessage={errors.url}
            >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="url"
                    placeholder="Url"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
