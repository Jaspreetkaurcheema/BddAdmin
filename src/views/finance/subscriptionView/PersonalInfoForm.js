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

const PersonalInfoForm = (props) => {
    const { touched, errors, values } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const Options = [
        { value: "1", label: 'True' },
        { value: "0", label: 'False' },

    ]
    return (
        <>

          
            <div className="flex items-center justify-center gap-5">
                <div>
                    <FormItem
                        label="Max Group limit"
                        invalid={errors.max_group_limit && touched.max_group_limit}
                        errorMessage={errors.max_group_limit}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="max_group_limit"
                            placeholder="Max Group Limit"
                            component={Input}
                        // prefix={<HiUserCircle className="text-xl" />}
                        />
                    </FormItem>

                </div>
                <div>
                    <FormItem
                        label="Max Team Limit"
                        invalid={errors.max_teams_limit && touched.max_teams_limit}
                        errorMessage={errors.max_teams_limit}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="max_teams_limit"
                            placeholder="Max Team Limit"
                            component={Input}
                        // prefix={<HiMail className="text-xl" />}
                        />
                    </FormItem>

                </div>

            </div>



            <div className="flex items-center justify-center gap-5">
                <div>
                    <FormItem
                        label="Max Chat Video Limit"
                        invalid={errors.max_chat_video_limit && touched.max_chat_video_limit}
                        errorMessage={errors.max_chat_video_limit}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="max_chat_video_limit"
                            placeholder="Max Chat Video Limit   "
                            component={Input}
                        // prefix={<HiUserCircle className="text-xl" />}
                        />
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="Max Chat Video Size"
                        invalid={errors.max_chat_video_size && touched.max_chat_video_size}
                        errorMessage={errors.max_chat_video_size}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="max_chat_video_size"
                            placeholder="Max Chat Video Size"
                            component={Input}
                        // prefix={<HiMail className="text-xl" />}
                        />
                    </FormItem>
                </div>

            </div>
        
            <FormItem
                label="View Schedule"
                invalid={errors.view_schedule}
                errorMessage={errors.view_schedule}
            >
                <Field
                    name="view_schedule"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="View Standing"
                invalid={errors.view_standings && touched.view_standings}
                errorMessage={errors.view_standings}
            >
                <Field
                    name="view_standings"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Create Team Chat"
                invalid={errors.create_team_chat && touched.create_team_chat}
                errorMessage={errors.create_team_chat}
            >
                <Field
                    name="view_standings"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Max Video Limit"
                invalid={errors.max_video_limit && touched.max_video_limit}
                errorMessage={errors.max_video_limit}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_video_limit"
                    placeholder="Max Video Limit"
                    component={Input}
                // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Max Video Size"
                invalid={errors.max_video_size && touched.max_video_size}
                errorMessage={errors.max_video_size}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_video_size"
                    placeholder="Max Video Size"
                    component={Input}
                // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Upload Video"
                invalid={errors.upload_video && touched.upload_video}
                errorMessage={errors.upload_video}
            >
                <Field
                    name="upload_video"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Direct Message"
                invalid={errors.direct_message && touched.direct_message}
                errorMessage={errors.direct_message}
            >
                <Field
                    name="direct_message"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Accept Document"
                invalid={errors.accept_documents && touched.accept_documents}
                errorMessage={errors.accept_documents}
            >
                <Field
                    name="accept_documents"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} // Using find instead of filter
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
