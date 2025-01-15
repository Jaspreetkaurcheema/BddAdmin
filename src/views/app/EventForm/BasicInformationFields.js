import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { apiGetPool, apiGetPoolType, apiGetSport } from 'services/SalesService'

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

// name: Yup.string().required('Name Required'),
// description: Yup.string().required('Code Required'),
// sportId: Yup.string(),
// how_to_win: Yup.string(),
// start_date: Yup.string(),
// end_date: Yup.string(),
// poolTypeId:Yup.string(),
// is_programmed: Yup.boolean


// import { apiGetPool } from 'services/SalesService';

const BasicInformationFields = ({ values, touched, errors }) => {

    console.log(values, 'valuesvalues')
    const [pools, setPools] = useState(null);
    const [poolType, setPoolType] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetSport();
                const response1 = await apiGetPoolType()
                setPoolType(response1.data.data)
                setPools(response.data.data);


            } catch (error) {
                console.error('Error fetching pools:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);

    // if (!pools) {
    //     return <div>Loading...</div>; // Or any other loading indicator
    // }

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
            <FormItem
                label="Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="description"
                    placeholder="Description"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="How To win"
                invalid={errors.how_to_win && touched.how_to_win}
                errorMessage={errors.how_to_win}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="how_to_win"
                    placeholder="How To win"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Sport Type"
                invalid={errors.sportId && touched.sportId}
                errorMessage={errors.sportId}
            >
                <Field name="sportId">
                    {({ field, form }) => {
                        const selectedPool = pools?.find(item => item.id == values.sportId);
                        const selectedOption = selectedPool ? { value: selectedPool.id, label: selectedPool.name } : null;

                        return (
                            <Select
                                field={field}
                                form={form}
                                options={pools?.map(item => ({ value: item.id, label: item.name }))}
                                value={selectedOption}
                                onChange={option => form.setFieldValue(field.name, option.value)}
                            />
                        );
                    }}
                </Field>
            </FormItem>

            <FormItem
                label="Pool Type"
                invalid={errors.poolTypeId && touched.poolTypeId}
                errorMessage={errors.poolTypeId}
            >
                <Field name="poolTypeId">
                    {({ field, form }) => {
                        const selectedPoolType = poolType?.find(item => item.id == values.poolTypeId);
                        const selectedOption = selectedPoolType ? { value: selectedPoolType.id, label: selectedPoolType.name } : null;

                        return (
                            <Select
                                field={field}
                                form={form}
                                options={poolType?.map(item => ({ value: item.id, label: item.name }))}
                                value={selectedOption}
                                onChange={option => form.setFieldValue(field.name, option.value)}
                            />
                        );
                    }}
                </Field>
            </FormItem>



            <FormItem
                label="Start Date"
                invalid={errors.start_date && touched.start_date}
                errorMessage={errors.start_date}
            >
                <Field
                    type="date"
                    autoComplete="off"
                    name="start_date"
                    placeholder="Start date"
                    component={Input}
                />
            </FormItem>


            <FormItem
                label="end_date"
                invalid={errors.end_date && touched.end_date}
                errorMessage={errors.end_date}
            >
                <Field
                    type="date"
                    autoComplete="off"
                    name="end_date"
                    placeholder="end_date"
                    component={Input}
                />
            </FormItem>
            <FormItem label="Programed"
                invalid={errors.is_programmed && touched.is_programmed}
                errorMessage={errors.is_programmed}>
                <Field name="is_programmed">
                    {({ field, form }) => (
                        <input
                            type="checkbox"
                            {...field}
                            checked={field.value}
                            onChange={e => form.setFieldValue(field.name, e.target.checked)}
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
