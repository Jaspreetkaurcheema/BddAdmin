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
import { apiGetCrmGames, apiGetCrmOrganizer } from 'services/CrmService'
export const categories = [
    { label: 'Percentage', value: 'Percentage' },
    { label: 'Fixed Amount', value: 'Fixed Amount' },

]
const PersonalInfoForm = (props) => {
    const { touched, values, errors } = props
    
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const [data1, setData1] = useState(null)
    const [data, setData] = useState(null)

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetCrmOrganizer();
                const response1 = await apiGetCrmGames();
                setData1(response.data.data);
                setData(response1.data.data)
                values.valid_to_event_id =selectedOption(values.valid_to_event_id, response1.data.data , "game_title" )
                values.valid_to_organizer_user_id=selectedOption(values.valid_to_organizer_user_id,response.data.data,"organizer_name")
         
       
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();

        
    }, []);
    

    const selectedOption = (selected, list,key ) => {
     
            let result = [];
            const selectedIds = selected.split(',').map(id => parseInt(id.trim(), 10));
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
                label="Coupon Name"
                invalid={errors.coupon_name && touched.coupon_name}
                errorMessage={errors.coupon_name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_name"
                    placeholder="Coupon Name"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
        
            <FormItem
                label="Code"
                invalid={errors.coupon_code && touched.coupon_code}
                errorMessage={errors.coupon_code}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_code"
                    placeholder="Code"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.coupon_description && touched.coupon_description}
                errorMessage={errors.coupon_description}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_description"
                    placeholder="description"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label="Type"
                invalid={errors.coupon_type && touched.coupon_type}
                errorMessage={errors.coupon_type}
            >
                <Field name="coupon_type">
                    {({ field, form }) => (
                        <Select 
                        isDisabled={values.usedCount === 1?true:false}
                            placeholder="Type"
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) =>
                                    category.value ===
                                    values.coupon_type
                            )}
                            onChange={(category) =>
                                form.setFieldValue(
                                    field.name,
                                    category.value
                                )
                            }
                            
                        />
                    )}
                </Field>

            </FormItem>
            <FormItem
                label="Amount/Percentage"
                invalid={errors.coupon_off && touched.coupon_off}
                errorMessage={errors.coupon_off}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_off"
                    placeholder="Amount"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label="Maximum number of usage"
                invalid={errors.max_number_of_usage && touched.max_number_of_usage}
                errorMessage={errors.max_number_of_usage}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_number_of_usage"
                    placeholder="Maximum number of usage"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label="Per user coupon limit"
                invalid={errors.max_per_user_usage && touched.max_per_user_usage}
                errorMessage={errors.max_per_user_usage}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_per_user_usage"
                    placeholder="Per user coupon limit"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label="Minimum order amount"
                invalid={errors.min_order_amount && touched.min_order_amount}
                errorMessage={errors.min_order_amount}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="min_order_amount"
                    placeholder="coupon off"
                    component={Input}
                    disabled={values.usedCount === 1?true:false}
                />
            </FormItem>
            <FormItem
                label=" Coupon Expiry date"
                invalid={errors.coupon_expiry_date && touched.coupon_expiry_date}
                errorMessage={errors.coupon_expiry_date}
            >
                <Field
                    type="date"
                    autoComplete="off"
                    name="coupon_expiry_date"
                    placeholder="coupon off"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Event Name"
                invalid={errors.valid_to_event_id && touched.valid_to_event_id}
                errorMessage={errors.valid_to_event_id}
            >
                <Field name="valid_to_event_id">
                    {({ field, form }) => (
                        <Select
                        isDisabled={values.usedCount === 1 || !!values.valid_to_organizer_user_id.length}
                            isMulti
                            className="min-w-[120px]"
                            // components={{
                            //     Option: CustomSelectOption,
                            //     MultiValueLabel: CustomControlMulti,
                            // }}
                            field={field}
                            form={form}
                            options={data?.map(item => ({ value: item.id.toString(), label: item.game_title }))}
                            value={values.valid_to_event_id}
                            onChange={(member) => {
                                form.setFieldValue(
                                    field.name,
                                    member
                                )
                            }}
                            disabled={values.usedCount === 1?true:false} 
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Organizer Name"
                invalid={errors.valid_to_organizer_user_id && touched.valid_to_organizer_user_id}
                errorMessage={errors.valid_to_organizer_user_id}
            >
                <Field name="valid_to_organizer_user_id">
                    {({ field, form }) => (
                        <Select
                        isDisabled={values.usedCount === 1 ||  !!values.valid_to_event_id.length}

                            isMulti
                            className="min-w-[120px]"
                            // components={{
                            //     Option: CustomSelectOption,
                            //     MultiValueLabel: CustomControlMulti,
                            // }}
                            field={field}
                            form={form}
                            options={data1?.map(item => ({ value: item.id.toString(), label: item.organizer_name }))}

                            value={values.valid_to_organizer_user_id}
                            onChange={(member) => {
                                form.setFieldValue(
                                    field.name,
                                    member
                                )
                            }}
                            disabled={values.usedCount === 1?true:false}
                        />
                    )}
                </Field>
            </FormItem>

        </>
    )
}

export default PersonalInfoForm
