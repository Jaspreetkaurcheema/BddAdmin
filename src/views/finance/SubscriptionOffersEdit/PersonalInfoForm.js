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
import { apiGetSubscriptionList } from 'services/SalesService'
const generateWeeks = (n) => {
    let result = [];
    while (n > 0) {

        result = [{ value: n, label: `${n} Weeks` }, ...result];
        n--;
    }
    return result;
};
const PersonalInfoForm = (props) => {
    const { touched, errors, values } = props

    const [list, setList] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetSubscriptionList();
                setList(response.data.data);
            } catch (error) {
                console.error('Error fetching subscription:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const Options = [
        { value: "New User", label: 'New User' },
        { value: "Upgrade", label: 'Existing User' },

    ]
    return (
        <>

            <FormItem
                label="Subscription_Name"
                invalid={errors.subscription_id && touched.subscription_id}
                errorMessage={errors.subscription_id}
            >
                <Field name="subscription_id">
                    {({ field, form }) => {
                        const selectedSubscription = list?.find(item => item.id == values?.subscription_id);
                        const selectedOption = selectedSubscription ? { value: selectedSubscription.id.toString(), label: `${selectedSubscription.subscription_name}/${selectedSubscription.subscription_period}` } : null;

                        return (
                            <Select
                                field={field}
                                form={form}
                                options={list?.map(item => ({ value: item.id.toString(), label: `${item.subscription_name}/${item.subscription_period}` }))}
                                value={selectedOption}
                                onChange={option => form.setFieldValue(field.name, option.value)}
                            />
                        );
                    }}
                </Field>
            </FormItem>

            <FormItem
                label="Offer_Type"
                invalid={errors.offer_type}
                errorMessage={errors.offer_type}
            >
                <Field
                    name="offer_type"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.find(option => option.value === field.value)} 
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Payment_Type"
                invalid={errors.payment_type && touched.payment_type}
                errorMessage={errors.payment_type}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="payment_type"
                    placeholder="Payment_Type"
                    component={Input}
                // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            
            <FormItem
                label="Trail_Period"
                invalid={errors.discount_duration && touched.discount_duration}
                errorMessage={errors.discount_duration}
            >
                <Field
                    name="discount_duration"
                    component={({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={generateWeeks(10)}
                            value={generateWeeks(10).find(option => option.value == field.value)}
                            onChange={(option) =>{  form.setFieldValue(field.name, option.value) ; console.log(option ,field.name, "option", option.value)}}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Discount%"
                invalid={errors.discount_percentage && touched.discount_percentage}
                errorMessage={errors.discount_percentage}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="discount_percentage"
                    placeholder="Discount%"
                    component={Input}
                // prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
