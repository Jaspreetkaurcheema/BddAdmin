import React from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload, Select } from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'
export const userType = [
    { label: 'Personal', value: '1' },
    { label: 'Business', value: '2' },

]
const PersonalInfoForm = (props) => {
    const {values, touched, errors } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    return (
        <>
            {/* <FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
                    {({ field, form }) => {
                        const avatarProps = field.value
                            ? { src: field.value }
                            : {}
                        return (
                            <div className="flex justify-center">
                                <Upload
                                    className="cursor-pointer"
                                    onChange={(files) =>
                                        onSetFormFile(form, field, files)
                                    }
                                    onFileRemove={(files) =>
                                        onSetFormFile(form, field, files)
                                    }
                                    showList={false}
                                    uploadLimit={1}
                                >
                                    <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={100}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
                                        {...avatarProps}
                                    />
                                </Upload>
                            </div>
                        )
                    }}
                </Field>
            </FormItem> */}
                   <FormItem
                label="Question"
                invalid={errors.question && touched.question}
                errorMessage={errors.question}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="question"
                    placeholder="Question"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Answer"
                invalid={errors.answer && touched.answer}
                errorMessage={errors.answer}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="answer"
                    placeholder="Answer"
                    component={Input}
                />
            </FormItem>
       
                          <FormItem
                        label="user_role_id"
                        invalid={errors.user_role_id && touched.user_role_id}
                        errorMessage={errors.user_role_id}
                    >
                        <Field name="user_role_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={userType}
                                    value={userType?.filter(
                                        (category) =>
                                            category.value == values.user_role_id
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
            {/* <FormItem
                label="Location"
                invalid={errors.location && touched.location}
                errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="location"
                    placeholder="Location"
                    component={Input}
                    prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Phone Number"
                invalid={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem>
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
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem> */}
            {/* <FormItem
                label="Birthday"
                invalid={errors.birthday && touched.birthday}
                errorMessage={errors.birthday}
            >
                <Field name="birthday" placeholder="Date">
                    {({ field, form }) => (
                        <DatePicker
                            field={field}
                            form={form}
                            value={field.value}
                            prefix={<HiCake className="text-xl" />}
                            onChange={(date) => {
                                form.setFieldValue(field.name, date)
                            }}
                        />
                    )}
                </Field>
            </FormItem> */}
        </>
    )
}

export default PersonalInfoForm
