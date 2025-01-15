import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { apiGetPool } from 'services/SalesService'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]
// const getPool = async () => {
//     const response = await apiGetPool()
//     return response.data
// }

export const userType = [
    { label: 'Personal', value: '1' },
    { label: 'Business', value: '2' },

]


// import { apiGetPool } from 'services/SalesService';

const BasicInformationFields = ({ values, touched, errors }) => {

    console.log(values, 'valuesvalues')
    const [pools, setPools] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await apiGetPool();
                // setPools(response.data.data);
            } catch (error) {
                console.error('Error fetching pools:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    // console.log(pools, 'pooolll')
    // if (!pools) {
    //     return <div>Loading...</div>; // Or any other loading indicator
    // }

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
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

        </AdaptableCard>
    )
}

export default BasicInformationFields
