import React, { useCallback } from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload, Select, Button } from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'
import { useDispatch } from 'react-redux'
import { toggleStatusConfirmation } from '../Customers/store/stateSlice'

const PersonalInfoForm = (props) => {
    const { touched, values ,errors } = props
    const dispatch = useDispatch()
console.log(values,'values 123')
    const onSetFormFile = (form, field, file ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]) )
      
    }
    const Options = [
        { value: 1, label: 'Active' },
        { value: 2, label: 'Inactive' },
     
    ]
    const initialDispatch = () => {
        dispatch(toggleStatusConfirmation(true))
    }
    const onStatus = useCallback(() => {


        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
        initialDispatch()
        // setIsVisible(true)

console.log(values,'valuesvalues')
    })
    return (
        <>
            <FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
                    {({ field, form }) => {

                        console.log(field,'fieldfield')
                        const avatarProps = field.value
                            ? { src: field.value }
                            : {}
                        return (
                            <div className="flex justify-center">
                                {/* <Upload
                                    className="cursor-pointer"
                                    // onChange={(files) =>
                                    // {
                                    //     onSetFormFile(form, field, files)
                                    //     form.setFieldValue(`${field.name}_file`, files[0])
                                    // }
                                    // }
                                    // onFileRemove={(files) =>{
                                    //     onSetFormFile(form, field, files)
                                    //     form.setFieldValue(`${field.name}_file`, '')
                                    // }
                                       
                                    // }
                                    showList={false}
                                    uploadLimit={1}
                                > */}
                                    <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={100}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
                                        {...avatarProps}
                                    />
                                {/* </Upload> */}
                            </div>
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="User Name"
                invalid={errors.username && touched.username}
                errorMessage={errors.username}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="User Name"
                    component={Input}
                    disabled={Input}           
                    prefix={<HiUserCircle className="text-xl" />}
                    
                />
            </FormItem>
            <FormItem
                label="Full Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Full Name"
                    component={Input}
                    // disabled={Input}           
                    prefix={<HiUserCircle className="text-xl" />}
                    
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
            <FormItem
                label="Status"
                invalid={errors.enabled && touched.enabled}
                errorMessage={errors.enabled}
            >
                <Field
                    name="enabled"
                    component={({ field, form }) => (
                        <div className="flex items-center  gap-2">

                            <Select
                                style={{ width: '100%' }}

                                field={field}
                                form={form}
                                options={Options}
                                value={Options.filter(
                                    (category) =>
                                        category.value == values.enabled
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option.value
                                    )
                                }
                            />

                            <div >
                            
                            </div>
                        </div>
                    )}
                />
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
