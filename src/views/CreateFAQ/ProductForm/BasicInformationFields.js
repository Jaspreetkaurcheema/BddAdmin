import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { apiGetFaqIdList } from 'services/SalesService'
export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = ({ values, touched, errors }) => {

  
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
   

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
            <FormItem
                label="Question"
                invalid={errors.tutorial_video_question }
                errorMessage={errors.tutorial_video_question}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tutorial_video_question"
                    placeholder="Question"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Answer"
                invalid={errors.tutorial_video_answer }
                errorMessage={errors.tutorial_video_answer}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tutorial_video_answer"
                    placeholder=" Answer"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Type"
                invalid={errors.tutorial_video_id}
                errorMessage={errors.tutorial_video_id}
            >
                <Field name="tutorial_video_id">
                    {({ field, form }) => {
                        const selectedFaq = faqs?.find(item => item.id == values.tutorial_video_id);
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
        </AdaptableCard>
    )
}

export default BasicInformationFields
