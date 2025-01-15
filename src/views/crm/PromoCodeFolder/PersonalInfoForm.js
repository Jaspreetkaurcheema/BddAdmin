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
import { apiGetPool } from 'services/SalesService'

const PersonalInfoForm = (props) => {
    const { values, touched, errors } = props
    const [pools, setPools] = useState(null);
    console.log(values, 'valuesvalues')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetPool();
                setPools(response.data.data);
                values.specific_pool_ids = selectedOption(values.specific_pool_ids, response.data.data, "name")
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
    const selectedOption = (selected, list, key) => {

        let result = [];
        const selectedIds = selected.split(',').map(id => parseInt(id.trim(), 10));
        console.log(list, 'dfhjsdhfj')
        list?.forEach(item => {


            if (selectedIds.includes(item.id)) {
                result.push({ value: item.id.toString(), label: item[key] });
            }

        });
        return result;
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
                label="Code"
                invalid={errors.code && touched.code}
                errorMessage={errors.code}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="code"
                    placeholder="Code"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Amount"
                invalid={errors.amount && touched.amount}
                errorMessage={errors.amount}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="amount"
                    placeholder="Amount"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="free entries"
                invalid={errors.free_entries && touched.free_entries}
                errorMessage={errors.free_entries}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="free_entries"
                    placeholder="free entries"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Per customer limit"
                invalid={errors.once_per_customer_limit && touched.once_per_customer_limit}
                errorMessage={errors.once_per_customer_limit}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="once_per_customer_limit"
                    placeholder="Per Customer limit"
                    component={Input}
                />
            </FormItem>

            {/* <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem> */}
            <FormItem
                label="Pool Name"
                invalid={errors.specific_pool_ids && touched.specific_pool_ids}
                errorMessage={errors.specific_pool_ids}
            >
                <Field name="specific_pool_ids">
                    {({ field, form }) => {
                        const selectedPool = pools?.find(item => item.id == values?.specific_pool_ids);
                        const selectedOption = selectedPool ? { value: selectedPool.id.toString(), label: selectedPool.name } : null;

                        return (
                            <Select
                                isMulti
                                field={field}
                                form={form}
                                options={pools?.map(item => ({ value: item.id.toString(), label: item.name }))}
                                value={values.specific_pool_ids}
                                onChange={(member) => {
                                    form.setFieldValue(
                                        field.name,
                                        member
                                    )
                                }}
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
                label="Total Usage limit"
                invalid={errors.once_per_customer_limit && touched.once_per_customer_limit}
                errorMessage={errors.once_per_customer_limit}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="total_usage_limit"
                    placeholder="total_usage_limit"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="End Date"
                invalid={errors.end_date && touched.end_date}
                errorMessage={errors.end_date}
            >
                <Field
                    type="date"
                    autoComplete="off"
                    name="end_date"
                    placeholder="End Date"
                    component={Input}
                />
            </FormItem>
            <FormItem
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
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
