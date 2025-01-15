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

import { toggleStatusConfirmation } from '../Individuals/store/stateSlice'
import IndividualsStatusConfirmation from '../Individuals/components/IndividualsStatusConfirmation'

const PersonalInfoForm = (props) => {
    const dispatch = useDispatch()
    const { touched, values, errors } = props
    
   
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const Options = [
        { value: 1, label: 'Active' },
        { value: 4, label: 'Suspended' },
        { value: 0, label: 'NotVerified' }
    ]
    const initialDispatch = () => {
        dispatch(toggleStatusConfirmation(true))
    }
    const onStatus = useCallback(() => {
        initialDispatch()

        // dispatch(deletePromo({id:row.id,isDelete:true})) 
        // dispatch(getCustomers({ pageNumber:1, pageSize:10, search: '' }))
       
        // setIsVisible(true)


    })
    return (
        <>
            <FormItem
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
                                <Button
                                    type="button"
                                    onClick={onStatus}
                                    style={{
                                        text: 'right', color: 'white', backgroundColor: 'rgb(99 102 241 / var(--tw-bg-opacity))', /* Green */
                                        border: 'none',
                                        fontSize: '13px',
                                        padding: '0px 9px',


                                        cursor: 'pointer'
                                    }}
                                >
                                    Update Status

                                </Button>
                            </div>
                        </div>
                    )}
                />
            </FormItem>


         
            < IndividualsStatusConfirmation status_id={values.enabled}  id={values.id} />
            
        </>
    )
}

export default PersonalInfoForm
