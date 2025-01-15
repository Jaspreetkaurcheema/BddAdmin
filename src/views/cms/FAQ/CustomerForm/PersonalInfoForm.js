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
        
        </>
    )
}

export default PersonalInfoForm
