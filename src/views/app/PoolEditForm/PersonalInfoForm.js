import React, { useEffect, useState } from 'react'
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
import { apiGetPool, apiGetPoolType, apiGetSport } from 'services/SalesService'

const PoolEditForm = (props) => {
    const { values, touched, errors } = props

    console.log(errors,'errrrpprrr')
    const [pools, setPools] = useState(null);
    const [poolType, setPoolType] = useState(null);
    console.log(values, 'valuesvalues')
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
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    return (
        <>
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
        </>
    )
}

export default PoolEditForm
