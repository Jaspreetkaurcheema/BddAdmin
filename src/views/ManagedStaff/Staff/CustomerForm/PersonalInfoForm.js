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
                label="Username"
                invalid={errors.username && touched.username}
                errorMessage={errors.username}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="Username"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="FirstName"
                invalid={errors.firstname && touched.firstname}
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
                invalid={errors.lastname && touched.lastname}
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
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
            >
                <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            
        </>
    )
}

export default PersonalInfoForm
