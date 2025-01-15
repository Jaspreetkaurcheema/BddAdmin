import React from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload } from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    return (
        <>
          
            <FormItem
                label="Title"
                invalid={errors.title && touched.title}
                errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="Title"
                    component={Input}
                    // prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="description"
                    placeholder="Description"
                    component={Input}
                    // prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Url"
                invalid={errors.url && touched.url}
                errorMessage={errors.url}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="url"
                    placeholder="Url"
                    component={Input}
                    // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
         
        </>
    )
}

export default PersonalInfoForm
