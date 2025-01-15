import React, { useEffect, useState } from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload,Select } from 'components/ui'
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
    const {values, touched, errors } = props
   
   

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const Options = [
        { value: 1, label: 'Individual' },
        { value: 2, label: 'Team' },
       
    ]

    return (
        <>
             <FormItem
                label="Sports Name"
                invalid={errors.sports_name}
                errorMessage={errors.sports_name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="sports_name"
                    placeholder="Sports Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Player Per Team"
                invalid={errors.players_per_team}
                errorMessage={errors.players_per_team}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="players_per_team"
                    placeholder="Player Per Team"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Sports Type"
                invalid={errors.sports_type}
                errorMessage={errors.sports_type}
            >
                  <Field
                    name="sports_type"
                    component={({ field, form }) => (
                     
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.filter(
                                (category) =>
                                    category.value == values.sports_type
                            )}
                            onChange={(option) =>
                                form.setFieldValue(
                                    field.name,
                                    option.value
                                )
                            }
                        />
                      
                    )}
                />
                
            </FormItem>
            <FormItem
                label="Extra Members"
                invalid={errors.extra_members}
                errorMessage={errors.extra_members}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="extra_members"
                    placeholder="Extra Members"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Icon"
                invalid={errors.icon}
                errorMessage={errors.icon}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="icon"
                    placeholder="Icon"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Game Icon"
                invalid={errors.game_icon}
                errorMessage={errors.game_icon}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="game_icon"
                    placeholder="Game Icon"
                    component={Input}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
