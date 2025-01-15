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
                />
            </FormItem>
            <FormItem
                label="Author"
                invalid={errors.author && touched.author}
                errorMessage={errors.author}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="author"
                    placeholder="Author"
                    component={Input}
                />
            </FormItem>
          
        </>
    )
}

export default PersonalInfoForm
