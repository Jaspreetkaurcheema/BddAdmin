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
import {apiGetFaqIdList } from 'services/SalesService'
    
const PersonalInfoForm = (props) => {
    const {values, touched, errors } = props
  
    const [faqs, setFaqs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetFaqIdList ();
                setFaqs(response.data.data);
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);

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
            {/* <FormItem
                label="Type"
                invalid={errors.type && touched.type}
                errorMessage={errors.type}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="type"
                    placeholder="Type"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem> */}
            <FormItem
                label=" Question"
                invalid={errors.tutorial_video_question && touched.tutorial_video_question}
                errorMessage={errors.tutorial_video_question}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tutorial_video_question"
                    placeholder=" Question"
                    component={Input}
                    // prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label=" Answer"
                invalid={errors.tutorial_video_answer && touched.tutorial_video_answer}
                errorMessage={errors.tutorial_video_answer}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tutorial_video_answer"
                    placeholder="Answer"
                    component={Input}
                    // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
           
              <FormItem
                label=" Type"
                invalid={errors.tutorial_video_id && touched.tutorial_video_id}
                errorMessage={errors.tutorial_video_id}
            >
                <Field name="tutorial_video_id">
                    {({ field, form }) => {
                        const selectedFaq = faqs?.find(item => item.id == values?.tutorial_video_id);
                        const selectedOption = selectedFaq ? { value:  selectedFaq.id.toString(), label: selectedFaq.type } : null;

                        return (
                            <Select
                                field={field}
                                form={form}
                                options={faqs?.map(item => ({ value: item.id.toString(), label: item.type }))}
                                value={selectedOption}
                                onChange={option => form.setFieldValue(field.name, option.value)}
                            />
                        );
                    }}
                </Field>
            </FormItem>
            {/* <FormItem
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
            </FormItem> */}
            {/* <FormItem
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
